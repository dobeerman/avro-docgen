import type { FileSystem } from "../infrastructure/file-system/FileSystem";

export class GeneratedFileComparator {
  constructor(private readonly fileSystem: FileSystem) {}

  async matches(path: string, expectedContent: string): Promise<boolean> {
    if (!(await this.fileSystem.exists(path))) {
      return false;
    }

    return (await this.fileSystem.readText(path)) === expectedContent;
  }
}
