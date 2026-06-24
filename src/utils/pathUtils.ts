export function toPosixPath(path: string): string {
  return path.replaceAll("\\", "/");
}
