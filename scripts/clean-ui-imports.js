#!/usr/bin/env node
/* eslint-disable */

const fs = require('fs')
const path = require('path')
const glob = require('glob')

/**
 * Script to clean up imports to use barrel exports
 * Converts:
 *   - import { Button } from '@/components/ui/button' → '@/components/ui'
 *   - import { RequestStatus } from '@/types/request' → '@/types'
 */

function cleanBarrelImports(filePath) {
  const content = fs.readFileSync(filePath, 'utf8')
  let cleanedContent = content

  // Clean UI imports: @/components/ui/something → @/components/ui
  const uiImportRegex = /from\s+['"]@\/components\/ui\/[^'"]*['"]/g
  cleanedContent = cleanedContent.replace(uiImportRegex, (match) => {
    const quote = match.includes('"') ? '"' : "'"
    return `from ${quote}@/components/ui${quote}`
  })

  // Clean Types imports: @/types/something → @/types
  const typesImportRegex = /from\s+['"]@\/types\/[^'"]*['"]/g
  cleanedContent = cleanedContent.replace(typesImportRegex, (match) => {
    const quote = match.includes('"') ? '"' : "'"
    return `from ${quote}@/types${quote}`
  })

  // Only write if content changed
  if (content !== cleanedContent) {
    fs.writeFileSync(filePath, cleanedContent, 'utf8')
    console.log(`Cleaned: ${filePath}`)
    return true
  }

  return false
}

function main() {
  console.log('🧹 Cleaning imports to use barrel exports...\n')

  // Find all TypeScript files
  const files = glob.sync('**/*.{ts,tsx}', {
    ignore: [
      'node_modules/**',
      '.next/**',
      'dist/**',
      'build/**',
      'components/ui/**', // Don't modify the UI components themselves
      'types/**', // Don't modify the types themselves
    ],
  })

  let totalCleaned = 0

  files.forEach((file) => {
    if (cleanBarrelImports(file)) {
      totalCleaned++
    }
  })

  console.log(`\nCleaned ${totalCleaned} files!`)

  if (totalCleaned > 0) {
    console.log('\nChanges made:')
    console.log(
      "   UI:    import { Button } from '@/components/ui/button' → '@/components/ui'"
    )
    console.log(
      "   Types: import { RequestStatus } from '@/types/request' → '@/types'"
    )
  }
}

if (require.main === module) {
  main()
}

module.exports = { cleanBarrelImports }
