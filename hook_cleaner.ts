// biome-ignore lint/correctness/noNodejsModules: <explanation>
import * as fs from 'node:fs'

function removeImportExportStatements(filePath: string, outputPath?: string): string {
  // Read the content of the file
  const tsCode = fs.readFileSync(filePath, 'utf-8')

  // Regular expression patterns for import and export statements
  const importPattern = /^\s*import\s+.*?;\s*$/gm
  const exportPattern = /^\s*export\s*\{[^}]*\};?\s*$/gm
  const commentPattern = /^\s*\/\/.*$/gm

  // Remove import statements
  let cleanedCode = tsCode.replace(importPattern, '')

  // Remove export statements
  cleanedCode = cleanedCode.replace(exportPattern, '')

  // Remove comment statements
  cleanedCode = cleanedCode.replace(commentPattern, '')

  cleanedCode = cleanedCode.trim()

  // If an output path is provided, write the cleaned content to the output file
  if (outputPath) {
    fs.writeFileSync(outputPath, cleanedCode, 'utf-8')
  }

  return cleanedCode
}

function main() {
  // Set up argument parser
  const args = process.argv.slice(2)
  if (args.length < 1) {
    // biome-ignore lint/style/noRestrictedGlobals: <explanation>
    console.error('Usage: tsx hook_cleaner.ts <input_file> [output_file]')
    process.exit(1)
  }

  const inputFile = args[0]
  const outputFile = args[1]

  // Call the function with the provided arguments
  const cleanedCode = removeImportExportStatements(inputFile, outputFile)

  // Print the cleaned code if no output file is specified
  if (!outputFile) {
    // biome-ignore lint/style/noRestrictedGlobals: <explanation>
    console.log(cleanedCode)
  }
}

main()
