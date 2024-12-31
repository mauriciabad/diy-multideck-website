import { useMemo, type FC } from 'react'
import Editor from '@monaco-editor/react'
import Split from '@uiw/react-split'
import { useState } from 'react'
import { useLocalStorage } from 'usehooks-ts'
import {
  Button,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
} from '@nextui-org/react'
import { MappingTableVariants } from './MappingTableVariants'
import {
  gameMappingsSchema,
  type GameMapping,
} from '../../lib/schemas/gameMappingsSchema'
import { IconTrash, IconBook } from '@tabler/icons-react'
import Markdown from 'react-markdown'

const helpContent = `
## Game Mapping Editor Help

Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.

### Key Features
- **JSON Validation**: Your mappings are validated in real-time
- **Live Preview**: See your changes instantly in the preview panel
- **Auto-save**: All changes are saved to your browser's local storage

### Tips
1. Use the preview panel to verify your mapping structure
2. The editor will highlight any JSON syntax errors
3. Your work is automatically saved as you type

For more information, visit our documentation.
`

const defaultJson: GameMapping = {
  variants: [
    {
      name: 'Basic',
      slug: 'basic',
      layout: 'basic',
      cells: [],
    },
  ],
}

export const NewGameEditor: FC = () => {
  const [jsonContent, setJsonContent] = useLocalStorage(
    'game-mapping-editor',
    JSON.stringify(defaultJson, null, 2)
  )
  const [error, setError] = useState<string>('')
  const [parsedData, setParsedData] = useState<GameMapping>(defaultJson)
  const { isOpen, onOpen, onClose } = useDisclosure()
  const {
    isOpen: isHelpOpen,
    onOpen: onHelpOpen,
    onClose: onHelpClose,
  } = useDisclosure()

  const handleEditorChange = (value: string | undefined) => {
    if (!value) return
    setJsonContent(value)

    try {
      const parsed = JSON.parse(value)
      const validated = gameMappingsSchema.parse(parsed)
      setParsedData(validated)
      setError('')
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Invalid JSON')
    }
  }

  const isDefaultJson = useMemo(
    () => jsonContent === JSON.stringify(defaultJson, null, 2),
    [jsonContent]
  )

  const handleClear = () => {
    if (isDefaultJson) return
    onOpen()
  }

  const confirmClear = () => {
    const defaultContent = JSON.stringify(defaultJson, null, 2)
    setJsonContent(defaultContent)
    setParsedData(defaultJson)
    setError('')
    onClose()
  }

  return (
    <div className="flex h-screen w-full flex-col bg-background text-foreground">
      <Navbar className="bg-default-100 dark text-foreground" maxWidth="full">
        <NavbarBrand>
          <p className="font-bold text-inherit tracking-wide font-heading">
            Game Mapping Editor
          </p>
        </NavbarBrand>
        <NavbarContent justify="end">
          <NavbarItem>
            <Button
              variant="solid"
              size="sm"
              onPress={onHelpOpen}
              startContent={<IconBook className="size-4" />}
              className="mr-2"
            >
              Documentation
            </Button>
            <Button
              color="danger"
              variant="flat"
              size="sm"
              onPress={handleClear}
              startContent={<IconTrash className="size-4" />}
              isDisabled={isDefaultJson}
            >
              Clear
            </Button>
          </NavbarItem>
        </NavbarContent>
      </Navbar>

      <div className="flex-1">
        <Split mode="horizontal" className="h-full">
          <div className="h-full w-2/3">
            <Editor
              defaultLanguage="json"
              value={jsonContent}
              onChange={handleEditorChange}
              theme="vs-dark"
              options={{
                minimap: { enabled: false },
                fontSize: 14,
                lineNumbers: 'on',
                scrollBeyondLastLine: false,
                automaticLayout: true,
              }}
            />
          </div>
          <Split mode="vertical" className="h-full w-1/3">
            <div className="h-2/3 w-full overflow-auto p-4">
              <MappingTableVariants mapping={parsedData} />
            </div>
            <div className="h-1/3 w-full overflow-auto p-4 text-sm text-red-500 whitespace-pre">
              {error}
            </div>
          </Split>
        </Split>
      </div>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalContent>
          <ModalHeader>Confirm Reset</ModalHeader>
          <ModalBody>Are you sure? All changes will be lost.</ModalBody>
          <ModalFooter>
            <Button color="default" variant="light" onPress={onClose}>
              Cancel
            </Button>
            <Button color="danger" onPress={confirmClear}>
              Reset
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      <Modal size="2xl" isOpen={isHelpOpen} onClose={onHelpClose}>
        <ModalContent>
          <ModalHeader>Help</ModalHeader>
          <ModalBody>
            <div className="prose prose-invert max-w-none">
              <Markdown>{helpContent}</Markdown>
            </div>
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onPress={onHelpClose}>
              Got it
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  )
}
