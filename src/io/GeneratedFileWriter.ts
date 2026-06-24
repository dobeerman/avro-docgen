import type { FileSystem } from "../infrastructure/file-system/FileSystem";

export class GeneratedFileWriter {
  constructor(private readonly fileSystem: FileSystem) {}

  async write(path: string, content: string): Promise<void> {
    await this.fileSystem.writeText(path, content);
  }
}
