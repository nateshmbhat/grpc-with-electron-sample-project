import {clearImportPaths} from './importPaths';
import {clearTLS} from './tls';

export * from './importPaths';
export * from './tls';

export function clearAll() {
  clearImportPaths();
  clearTLS();
}