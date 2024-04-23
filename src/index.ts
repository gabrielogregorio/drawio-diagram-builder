import { BaseStructure } from './types';
import { buildDrawIo } from './buildDrawIo';

const fs = require('fs');
const path = require('path');

function findHarFiles(dirPath: string, callback?: (dir: string) => void) {
  fs.readdir(dirPath, { withFileTypes: true }, (err: any, entries: any[]) => {
    if (err) {
      console.error('Erro ao ler o diretório:', err);
      return;
    }

    entries.forEach((entry) => {
      const fullPath = path.join(dirPath, entry.name);
      if (entry.isDirectory()) {
        findHarFiles(fullPath, callback);
      } else if (entry.isFile() && entry.name === 'index.har') {
        callback?.(dirPath);
      }
    });
  });
}

function saveContext(dirPath: string) {
  const file = fs.readFileSync(dirPath + '/index.json', { encoding: 'utf-8' }).toString();

  const connections = JSON.parse(file) as BaseStructure;

  buildDrawIo(connections);
}

findHarFiles('../docbytestflow/cypress/screenshots', saveContext);
