import Editor from '@monaco-editor/react'
import {
  Button,
  Card,
  CardBody,
  Chip,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Select,
  SelectItem,
  useDisclosure,
} from '@nextui-org/react'
import {
  IconBook,
  IconCode,
  IconDownload,
  IconTrash,
} from '@tabler/icons-react'
import Split from '@uiw/react-split'
import { useCallback, useMemo, useState, type FC } from 'react'
import Markdown from 'react-markdown'
import { useLocalStorage } from 'usehooks-ts'
import {
  gameMappingsSchema,
  type GameMapping,
} from '../../lib/schemas/gameMappingsSchema'
import { MappingTableVariants } from './MappingTableVariants'

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

interface Props {
  examples: Array<{
    name: string
    content: GameMapping
  }>
}

export const NewGameEditor: FC<Props> = ({ examples }) => {
  const [jsonContent, setJsonContent] = useLocalStorage(
    'game-mapping-editor',
    JSON.stringify(defaultJson, null, 2)
  )
  const [error, setError] = useState<string>('')
  const [parsedData, setParsedData] = useState<GameMapping>(defaultJson)
  const [selectedExample, setSelectedExample] = useState<string>('')
  const { isOpen, onOpen, onClose } = useDisclosure()
  const {
    isOpen: isHelpOpen,
    onOpen: onHelpOpen,
    onClose: onHelpClose,
  } = useDisclosure()
  const {
    isOpen: isExamplesOpen,
    onOpen: onExamplesOpen,
    onClose: onExamplesClose,
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
      // Keep the last valid state in preview if JSON is invalid
      try {
        const parsed = JSON.parse(value)
        if (parsed?.variants) {
          setParsedData(parsed as GameMapping)
        }
      } catch {
        // If JSON parsing fails, keep the last valid state
      }
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

  const selectedExampleContent = useMemo(() => {
    const example = examples.find((e) => e.name === selectedExample)
    return example ? JSON.stringify(example.content, null, 2) : ''
  }, [selectedExample, examples])

  const loadExample = () => {
    if (!selectedExampleContent) return
    setJsonContent(selectedExampleContent)
    try {
      setParsedData(JSON.parse(selectedExampleContent) as GameMapping)
    } catch (e) {
      console.error('Error parsing example:', e)
    }
    onExamplesClose()
  }

  const handleDownload = useCallback(() => {
    const timestamp = new Date()
      .toISOString()
      .replace('T', ' ')
      .replace(/[:]/g, '-')
      .split('.')[0]

    const blob = new Blob([jsonContent], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `game-mapping-${timestamp}.json`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }, [jsonContent])

  return (
    <div className="flex h-screen w-full flex-col bg-background">
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
              onPress={onExamplesOpen}
              startContent={<IconCode className="size-4" />}
              className="mr-2"
            >
              Examples
            </Button>
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
              variant="solid"
              size="sm"
              onPress={handleDownload}
              startContent={<IconDownload className="size-4" />}
              className="mr-2"
            >
              Download
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
          <div className="h-full" style={{ width: '67%' }}>
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
          <div className="h-full" style={{ width: '33%' }}>
            <Split mode="vertical" className="h-full">
              <div style={{ height: '67%' }} className="overflow-auto">
                <div className="p-4">
                  <MappingTableVariants mapping={parsedData} />
                </div>
              </div>
              <div
                style={{ height: '33%' }}
                className="overflow-auto bg-default-50"
              >
                <div className="p-4">
                  {error ? (
                    <div className="flex flex-col gap-2">
                      <div className="flex items-center gap-2">
                        <span className="text-lg text-danger">⚠️</span>
                        <span className="font-medium text-danger">
                          Validation Error
                        </span>
                        <Chip variant="flat" color="danger" size="sm">
                          JSON
                        </Chip>
                      </div>
                      <Card className="border-danger">
                        <CardBody className="text-sm">
                          <pre className="whitespace-pre-wrap font-mono text-danger">
                            {error}
                          </pre>
                        </CardBody>
                      </Card>
                    </div>
                  ) : (
                    <Card className="border-success bg-success-50/50">
                      <CardBody>
                        <div className="flex items-center gap-2 text-success">
                          <span className="text-lg">✓</span>
                          <span className="text-sm font-medium">
                            JSON is valid
                          </span>
                        </div>
                      </CardBody>
                    </Card>
                  )}
                </div>
              </div>
            </Split>
          </div>
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

      <Modal
        size="full"
        isOpen={isExamplesOpen}
        onClose={onExamplesClose}
        scrollBehavior="inside"
        classNames={{
          base: 'h-[100dvh]',
          body: 'p-0',
          wrapper: 'h-[100dvh]',
        }}
      >
        <ModalContent className="h-full">
          <ModalHeader className="border-b border-divider">
            Browse Game Mappings
          </ModalHeader>
          <ModalBody className="flex flex-col gap-0">
            <div className="border-b border-divider p-4">
              <Select
                label="Game"
                labelPlacement="outside"
                placeholder="Choose a game mapping"
                selectedKeys={selectedExample ? [selectedExample] : []}
                onChange={(e) => setSelectedExample(e.target.value)}
                classNames={{
                  base: 'max-w-xs',
                }}
              >
                {examples.map((example) => (
                  <SelectItem key={example.name} value={example.name}>
                    {example.name}
                  </SelectItem>
                ))}
              </Select>
            </div>
            <div className="flex-1 min-h-0">
              {selectedExampleContent && (
                <Split mode="horizontal" className="h-full">
                  <div className="h-full w-2/3">
                    <Editor
                      height="100%"
                      defaultLanguage="json"
                      value={selectedExampleContent}
                      theme="vs-dark"
                      options={{
                        readOnly: true,
                        minimap: { enabled: false },
                        fontSize: 14,
                        lineNumbers: 'on',
                        scrollBeyondLastLine: false,
                        automaticLayout: true,
                      }}
                    />
                  </div>
                  <div className="h-full w-1/3 overflow-y-auto">
                    <div className="p-4">
                      <MappingTableVariants
                        mapping={
                          examples.find((e) => e.name === selectedExample)
                            ?.content ?? defaultJson
                        }
                      />
                    </div>
                  </div>
                </Split>
              )}
            </div>
          </ModalBody>
          <ModalFooter className="border-t border-divider bg-stone-800 text-foreground dark">
            <Button color="default" variant="flat" onPress={onExamplesClose}>
              Cancel
            </Button>
            <Button
              color="primary"
              onPress={loadExample}
              isDisabled={!selectedExample}
            >
              Use This Example
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  )
}
