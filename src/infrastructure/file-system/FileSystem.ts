export interface FileSystem {
  readText(path: string): Promise<string>;
  writeText(path: string, content: string): Promise<void>;
  exists(path: string): Promise<boolean>;
  listFiles(root: string, patterns: string[]): Promise<string[]>;
}
