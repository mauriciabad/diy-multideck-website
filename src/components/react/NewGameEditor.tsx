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
  IconChevronsRight,
  IconCode,
  IconDownload,
} from '@tabler/icons-react'
import Split from '@uiw/react-split'
import {
  useCallback,
  useMemo,
  useState,
  type ComponentPropsWithoutRef,
  type FC,
} from 'react'
import Markdown from 'react-markdown'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { vscDarkPlus } from 'react-syntax-highlighter/dist/cjs/styles/prism'
import { useLocalStorage } from 'usehooks-ts'
import {
  gameMappingsSchema,
  type GameMapping,
} from '../../lib/schemas/gameMappingsSchema'
import { MappingTableVariants } from './MappingTableVariants'

const documentationContent = `# Game Mapping Editor Documentation

## Overview
The Game Mapping Editor allows you to create and edit game mappings in JSON format. Each mapping represents a card game's layout and configuration, with support for multiple variants, custom layouts, and rich card customization.


## Schema Structure

### Root Object
\`\`\`typescript
{
  variants: GameMappingVariant[]
}
\`\`\`

### Variant Object
Each variant represents a different version or configuration of the game.

\`\`\`typescript
{
  name: string           // Display name of the variant
  slug: string          // Unique identifier for the variant
  description?: string  // Optional description of the variant
  layout: "basic" | "3d" | "3d-alt" | "number"  // Layout style
  cells: Cell[]         // Array of card cells
  notes?: string       // Optional notes about the variant
  groups?: Record<string, Group>  // Card grouping definitions
  templateDrawings?: Record<string, DrawingTemplate>  // Drawing templates
  templateIcons?: Record<string, IconTemplate>        // Icon templates
  templateCells?: Record<string, CellTemplate>        // Cell templates
}
\`\`\`

### Cell Object
Represents a single card in the game.

\`\`\`typescript
{
  cardId: number        // Unique identifier for the card position (0-159)
  name?: string         // Display name of the card
  notes?: string       // Optional notes about the card
  bgFill?: string      // Background color (color)
  templateCellId?: string  // Use properties from a cell template
  icon?: Icon          // Card's icon configuration
  emoji?: {            // Optional emoji display
    content: string
    transform?: Transform
  }
  text?: {             // Optional text display
    content: string
    size?: number
    fill?: string      // Text color (color)
    stroke?: Stroke
    transform?: Transform
    weight?: "thin" | "light" | "normal" | "medium" | "semi-bold" | "bold" | "black"
  }
  drawings?: Drawing[]  // Array of drawings on the card
  groups?: string[]    // Array of group identifiers
}
\`\`\`

### Icon Object
Configures the icon display on a card.

\`\`\`typescript
{
  srcIconId: string     // Icon identifier from the icon library
  templateIconId?: string  // Use properties from an icon template
  fill?: string        // Icon fill color (color, supports rainbow)
  bgFill?: string      // Icon background color (color)
  stroke?: {           // Icon outline configuration
    width?: number
    color?: string     // Stroke color (color)
  }
  transform?: Transform  // Icon positioning and scaling
}
\`\`\`

### Drawing Object
Represents a drawing or annotation on a card.

\`\`\`typescript
{
  area?: {             // Drawing area position
    letter: "A" | "B" | "C" | "D" | "E"
    number?: number    // Specific section within the area
  }
  name: string         // Drawing name
  notes?: string       // Optional notes about the drawing
  templateDrawingId?: string  // Use properties from a drawing template
}
\`\`\`

### Group Object
Defines a group of related cards.

\`\`\`typescript
{
  name: string         // Display name of the group
  notes?: string      // Optional notes about the group
  color: string       // Group highlight color (color)
  icon?: Icon         // Optional group icon
  emoji?: string      // Optional group emoji
}
\`\`\`

### Transform Object
Controls positioning and appearance of elements.

\`\`\`typescript
{
  scale?: number       // Scaling factor
  translateX?: number  // Horizontal offset
  translateY?: number  // Vertical offset
  rotate?: number      // Rotation angle in degrees
}
\`\`\`

## Templates
When using \`templateCellId\`, \`templateIconId\`, or \`templateDrawingId\`, the object will merge with the referenced template. Properties you specify will override the template's values, while unspecified properties will use the template's defaults. This is useful for maintaining consistency across similar elements.

Example:
\`\`\`typescript
// Template
templateCells: {
  "red-card": {
    bgFill: "red",
    icon: { fill: "white" }
  }
}

// Usage
{
  templateCellId: "red-card",  // Gets red background and white icon
  icon: { fill: "yellow" }     // Overrides just the icon color
}
\`\`\`

## Color Values
Valid color formats:
- Named colors: \`red\`, \`blue\`, \`green\`, \`yellow\`, \`orange\`, \`purple\`, \`white\`, \`black\`, \`pink\`, \`cyan\`, and \`brown\`.
- Special values: \`rainbow\` (*Only valid for icon fills*).
- Hex and rgb/rgba colors.

## Layout Types
- **basic**: Traditional grid layout
- **3d**: Three-dimensional perspective view
- **3d-alt**: Alternative 3D perspective
- **number**: Numbered grid layout

## Best Practices
1. Group related cards using the groups feature
2. Use templates to reduce repetition
3. Provide clear names and notes
4. Choose layout type based on your game's style
5. Use drawings for annotations when needed

## Example
Check the Examples panel to see complete mapping configurations.`

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
  const {
    isOpen: isDocumentationOpen,
    onOpen: onDocumentationOpen,
    onClose: onDocumentationClose,
  } = useDisclosure()
  const {
    isOpen: isExamplesOpen,
    onOpen: onExamplesOpen,
    onClose: onExamplesClose,
  } = useDisclosure()

  const handleEditorChange = (value: string | undefined) => {
    if (!value) {
      setJsonContent('')
      setError('JSON cannot be empty')
      setParsedData(defaultJson)
      return
    }
    setJsonContent(value)

    try {
      const parsed = JSON.parse(value)
      const validated = gameMappingsSchema.parse(parsed)
      setParsedData(validated)
      setError('')
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Invalid JSON')
      // Don't update parsedData when there's a validation error
      // This ensures the last valid state is maintained
    }
  }

  const selectedExampleContent = useMemo(() => {
    const example = examples.find((e) => e.name === selectedExample)
    return example ? JSON.stringify(example.content, null, 2) : ''
  }, [selectedExample, examples])

  const loadExample = () => {
    if (!selectedExampleContent) return
    setJsonContent(selectedExampleContent)
    try {
      const parsed = JSON.parse(selectedExampleContent)
      const validated = gameMappingsSchema.parse(parsed)
      setParsedData(validated)
      setError('')
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Invalid JSON')
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
              onPress={onDocumentationOpen}
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
            >
              Download
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

      <Modal
        size="2xl"
        isOpen={isDocumentationOpen}
        onClose={onDocumentationClose}
        scrollBehavior="inside"
      >
        <ModalContent>
          <ModalHeader className="border-b border-divider">
            Documentation
          </ModalHeader>
          <ModalBody>
            <div className="prose max-w-none">
              <Markdown
                components={{
                  code(
                    props: ComponentPropsWithoutRef<'code'> & {
                      inline?: boolean
                    }
                  ) {
                    const { className, children, inline } = props
                    const match = /language-(\w+)/.exec(className || '')
                    return !inline && match ? (
                      <SyntaxHighlighter
                        style={vscDarkPlus}
                        language={match[1]}
                        PreTag="div"
                        customStyle={{
                          margin: 0,
                          border: 'none',
                          background: 'transparent',
                        }}
                      >
                        {String(children).replace(/\n$/, '')}
                      </SyntaxHighlighter>
                    ) : (
                      <code className={className}>{children}</code>
                    )
                  },
                }}
              >
                {documentationContent}
              </Markdown>
            </div>
          </ModalBody>
          <ModalFooter className="border-t border-divider">
            <Button color="secondary" onPress={onDocumentationClose}>
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
              <div className="flex items-end gap-4">
                <Select
                  label="Game"
                  labelPlacement="outside-left"
                  placeholder="Choose a game mapping"
                  selectedKeys={selectedExample ? [selectedExample] : []}
                  onChange={(e) => setSelectedExample(e.target.value)}
                  classNames={{
                    base: 'max-w-xs items-center',
                  }}
                >
                  {examples.map((example) => (
                    <SelectItem key={example.name} value={example.name}>
                      {example.name}
                    </SelectItem>
                  ))}
                </Select>
                <Button
                  variant="solid"
                  color="secondary"
                  onPress={loadExample}
                  isDisabled={!selectedExample}
                  startContent={<IconChevronsRight className="size-4" />}
                >
                  Use this example
                </Button>
              </div>
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
        </ModalContent>
      </Modal>
    </div>
  )
}
