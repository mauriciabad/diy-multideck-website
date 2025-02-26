///////////////////////////////////////////////////////////////////////////////////////////////
// This is an AI translation of the extension:                                               //
// https://marketplace.visualstudio.com/items?itemName=Cardinal90.multi-cursor-case-preserve //
///////////////////////////////////////////////////////////////////////////////////////////////

import type * as monaco from 'monaco-editor'
import { loader } from './monacoConfig'

type EditorState = {
  selectionsData: SelectionData[]
  numberOfSelections: number
  lines: string[]
}

type SelectionData = {
  text?: string
  start?: monaco.Position
  range?: monaco.Range
  type?: 'caps' | 'lower' | 'upper'
}

export class MonacoMultiCursorCasePreserve {
  private store = new Map<string, EditorState>()
  private monaco: typeof monaco | null = null

  constructor(private editor: monaco.editor.IStandaloneCodeEditor) {
    this.initialize()
  }

  private async initialize() {
    this.monaco = await loader.init()

    // Handle selection changes
    this.editor.onDidChangeCursorSelection(
      (e: monaco.editor.ICursorSelectionChangedEvent) => {
        const selections = [e.selection, ...e.secondarySelections]
        this.update({
          selections,
          textModel: this.editor.getModel()!,
        })
      }
    )

    // Handle text changes
    this.editor.onDidChangeModelContent(() => {
      const selections = this.editor.getSelections() || []
      if (selections.length > 0) {
        this.update({
          selections,
          textModel: this.editor.getModel()!,
        })
      }
    })
  }

  private createLineArray(
    textModel: monaco.editor.ITextModel,
    selections: monaco.Selection[]
  ) {
    return selections.map((selection) =>
      textModel.getLineContent(selection.startLineNumber)
    )
  }

  private createNewEditorState(args: {
    selections: monaco.Selection[]
    textModel: monaco.editor.ITextModel
  }): EditorState {
    const state = {
      selectionsData: [],
      numberOfSelections: args.selections.length,
      lines: this.createLineArray(args.textModel, args.selections),
    }
    this.store.set(args.textModel.uri.toString(), state)
    return state
  }

  private areSelectionsEmpty(selections: monaco.Selection[]) {
    return selections.every((selection) => selection.isEmpty())
  }

  private areSelectionsEqualOrEmpty(args: {
    selections: monaco.Selection[]
    textModel: monaco.editor.ITextModel
  }) {
    let text = ''
    return args.selections.every((selection) => {
      text =
        !text && !selection.isEmpty()
          ? args.textModel.getValueInRange(selection).toLowerCase()
          : text
      return (
        selection.isEmpty() ||
        args.textModel.getValueInRange(selection).toLowerCase() === text
      )
    })
  }

  private areSelectionsStrictlyEqualOrEmpty(args: {
    selections: monaco.Selection[]
    textModel: monaco.editor.ITextModel
  }) {
    let text = ''
    return args.selections.every((selection) => {
      text =
        !text && !selection.isEmpty()
          ? args.textModel.getValueInRange(selection)
          : text
      return (
        selection.isEmpty() ||
        args.textModel.getValueInRange(selection) === text
      )
    })
  }

  private areRangesEqualLength(selectionsData: SelectionData[]) {
    if (!selectionsData[0]?.range) return false
    const firstLen =
      selectionsData[0].range.endColumn - selectionsData[0].range.startColumn

    for (let i = 0; i < selectionsData.length; i++) {
      const range = selectionsData[i]?.range
      if (!range) continue
      if (range.endLineNumber !== range.startLineNumber) {
        return false
      }
      const len = range.endColumn - range.startColumn
      if (len !== firstLen) {
        return false
      }
    }
    return true
  }

  private initSelectionsData(
    args: {
      selections: monaco.Selection[]
      textModel: monaco.editor.ITextModel
    },
    state: EditorState
  ) {
    if (!this.monaco) return state.selectionsData

    const Monaco = this.monaco
    return args.selections.reduce((selectionsData, selection, index) => {
      const newSelectionData = selectionsData[index] || {}
      newSelectionData.text = args.textModel.getValueInRange(selection)
      newSelectionData.start = new Monaco.Position(
        selection.startLineNumber,
        selection.startColumn
      )
      selectionsData[index] = newSelectionData
      return selectionsData
    }, state.selectionsData)
  }

  private categorizeSelections(state: EditorState) {
    state.selectionsData.forEach((selectionData) => {
      if (!selectionData.text) return
      if (
        /^[^a-z]+$/.test(selectionData.text) &&
        selectionData.text.length > 1
      ) {
        selectionData.type = 'caps'
      } else if (/^[a-z].*/.test(selectionData.text)) {
        selectionData.type = 'lower'
      } else if (/^[A-Z].*/.test(selectionData.text)) {
        selectionData.type = 'upper'
      }
    })
  }

  private calculateSelectionRanges(
    args: {
      selections: monaco.Selection[]
      textModel: monaco.editor.ITextModel
    },
    state: EditorState
  ) {
    if (!this.monaco) return state.selectionsData

    const Monaco = this.monaco
    let count = 0
    let len = 1
    let line = -1
    return args.selections.reduce((selectionsData, selection, index) => {
      const selectionData = selectionsData[index] || {}
      const start = selectionData.start
      if (!start) return selectionsData

      if (start.lineNumber === line) {
        count++
      } else {
        count = 0
        len = selection.endColumn - start.column
      }
      line = start.lineNumber

      selectionData.range = new Monaco.Range(
        start.lineNumber,
        start.column + count * (len - (selectionData.text?.length || 0)),
        selection.endLineNumber,
        selection.endColumn
      )
      selectionsData[index] = selectionData
      return selectionsData
    }, state.selectionsData)
  }

  private editSelections(
    args: {
      selections: monaco.Selection[]
      textModel: monaco.editor.ITextModel
    },
    state: EditorState
  ) {
    if (state.selectionsData.every((data) => !data.text?.length)) {
      return
    }

    const edits: monaco.editor.IIdentifiedSingleEditOperation[] = []

    state.selectionsData.forEach((selectionData) => {
      if (!selectionData.range) return
      const text = args.textModel.getValueInRange(selectionData.range)
      let newText = text

      switch (selectionData.type) {
        case 'caps':
          newText = text.toUpperCase()
          break
        case 'lower':
          newText = text[0]?.toLowerCase() + text.substring(1)
          break
        case 'upper':
          newText = text[0]?.toUpperCase() + text.substring(1)
          break
      }

      if (text !== newText) {
        edits.push({
          range: selectionData.range,
          text: newText,
        })
      }
    })

    if (edits.length === 0) {
      return
    }

    this.editor.executeEdits('multi-cursor-case-preserve', edits)
    state.lines = this.createLineArray(args.textModel, args.selections)
  }

  private update(args: {
    selections: monaco.Selection[]
    textModel: monaco.editor.ITextModel
  }) {
    if (!args || !args.selections || !args.textModel || !this.monaco) {
      return
    }

    // Work only with two or more selections
    if (args.selections.length < 2) {
      this.store.delete(args.textModel.uri.toString())
      return
    }

    // Which are either equal or empty, but not strictly equal
    if (
      !this.areSelectionsEqualOrEmpty(args) ||
      (this.areSelectionsStrictlyEqualOrEmpty(args) &&
        !this.areSelectionsEmpty(args.selections))
    ) {
      return
    }

    // Sort selections to correctly process multiple selections in the same line
    args.selections.sort((a, b) => {
      if (a.startLineNumber === b.startLineNumber) {
        return a.startColumn - b.startColumn
      }
      return a.startLineNumber - b.startLineNumber
    })

    // For every text editor there is a separate current state
    let state =
      this.store.get(args.textModel.uri.toString()) ||
      this.createNewEditorState(args)

    // If number of selections is different, recalculate everything
    if (args.selections.length !== state.numberOfSelections) {
      state = this.createNewEditorState(args)
    }

    // Check if all selections are empty
    const selectionIsEmpty = this.areSelectionsEmpty(args.selections)

    if (!selectionIsEmpty) {
      state.selectionsData = this.initSelectionsData(args, state)
      this.categorizeSelections(state)
      state.lines = this.createLineArray(args.textModel, args.selections)
    } else {
      state.selectionsData = this.calculateSelectionRanges(args, state)
      const rangesAreEqual = this.areRangesEqualLength(state.selectionsData)
      if (rangesAreEqual) {
        this.editSelections(args, state)
      }
    }
  }

  dispose() {
    this.store.clear()
  }
}
