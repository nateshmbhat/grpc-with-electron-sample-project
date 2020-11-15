import {clearImportPaths} from './importPaths';
import { clearProtoFiles } from './protos';
import {clearTLS} from './tls';

export * from './importPaths';
export * from './protos';
export * from './tls';

export function clearAll() {
  clearImportPaths();
  clearTLS();
  clearProtoFiles();
}