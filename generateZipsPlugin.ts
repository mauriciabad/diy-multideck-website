import type { AstroIntegration } from 'astro'
import JSZip from 'jszip'
import fs from 'node:fs/promises'
import path from 'node:path'
import type { Plugin, ResolvedConfig } from 'vite'

type PathOrFolder = string | { [name: string]: PathOrFolder }

type AssetZips = {
  name: string
  content: Record<string, PathOrFolder>
}[]

async function addFileOrFolder(
  zip: JSZip,
  publicDir: string,
  contentPath: string,
  name: string
): Promise<void>
async function addFileOrFolder(
  zip: JSZip,
  publicDir: string,
  folderContent: Record<string, PathOrFolder>,
  name?: string
): Promise<void>
async function addFileOrFolder(
  zip: JSZip,
  publicDir: string,
  content: PathOrFolder,
  name?: string
): Promise<void>
async function addFileOrFolder(
  zip: JSZip,
  publicDir: string,
  content: PathOrFolder,
  name?: string
) {
  if (typeof content === 'string') {
    if (!name) throw new Error('Name is required for files')
    const filePath = path.join(publicDir, content)
    const data = await fs.readFile(filePath)
    zip.file(name, new Uint8Array(data))
    return
  }

  const folder = name ? zip.folder(name) : zip
  if (!folder) throw new Error('Error creating folder')
  await Promise.all(
    Object.entries(content).map(
      async ([fileOrFolderName, fileOrFolderContent]) => {
        return await addFileOrFolder(
          folder,
          publicDir,
          fileOrFolderContent,
          fileOrFolderName
        )
      }
    )
  )
}

/**
 * Generates zip files from the specified assets.
 * @param zips For each zip file, specify the name and the content of the zip file.
 *                  The content is an object where the keys are file/folder names and the values
 *                  are either the file paths or deeper folder structures.
 */
export const generateZipsVitePlugin = (options: {
  zips: AssetZips
  /** Base directory to read files from. Defaults to Vite's public directory. */
  baseDir?: string
}) => {
  let config: ResolvedConfig

  const plugin: Plugin = {
    name: 'generate-zips',

    configResolved(resolvedConfig) {
      config = resolvedConfig
    },

    async buildEnd() {
      const publicDir = options?.baseDir
        ? path.resolve(options.baseDir)
        : config.publicDir
          ? path.resolve(config.root, config.publicDir)
          : path.resolve(config.root, 'public')

      const outDir = config.build.outDir
        ? path.resolve(config.root, config.build.outDir)
        : path.resolve(config.root, 'dist')

      for (const zipDefinition of options.zips) {
        try {
          console.log(`[generate-zips] Generating ${zipDefinition.name}...`)
          const zip = new JSZip()

          await addFileOrFolder(zip, publicDir, zipDefinition.content)

          const zipContent = await zip.generateAsync({
            type: 'nodebuffer',
          })
          const outputPath = path.join(outDir, zipDefinition.name)
          await fs.mkdir(path.dirname(outputPath), { recursive: true })
          await fs.writeFile(outputPath, new Uint8Array(zipContent))
        } catch (error) {
          console.error(
            `[generate-zips] Error generating zip "${zipDefinition.name}":`
          )

          throw error
        }
      }
    },
  }

  return plugin
}

export const generateZips = (options: {
  zips: AssetZips
  /** Base directory to read files from. Defaults to Vite's public directory. */
  baseDir?: string
}) => {
  const integration: AstroIntegration = {
    name: 'generate-zips',
    hooks: {
      'astro:config:setup': ({ updateConfig }) => {
        updateConfig({
          vite: {
            plugins: [generateZipsVitePlugin(options)],
          },
        })
      },
    },
  }
  return integration
}
