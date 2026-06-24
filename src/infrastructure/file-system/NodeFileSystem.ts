import { access, mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import fastGlob from "fast-glob";
import type { FileSystem } from "./FileSystem";

export class NodeFileSystem implements FileSystem {
  async readText(filePath: string): Promise<string> {
    return readFile(filePath, "utf8");
  }

  async writeText(filePath: string, content: string): Promise<void> {
    await mkdir(path.dirname(filePath), { recursive: true });
    await writeFile(filePath, content, "utf8");
  }

  async exists(filePath: string): Promise<boolean> {
    try {
      await access(filePath);
      return true;
    } catch {
      return false;
    }
  }

  async listFiles(root: string, patterns: string[]): Promise<string[]> {
    return fastGlob(patterns, {
      absolute: true,
      cwd: root,
      dot: false,
      onlyFiles: true,
      unique: true,
    });
  }
}
