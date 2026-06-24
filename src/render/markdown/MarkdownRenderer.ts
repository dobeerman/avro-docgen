import type { AvroCatalog } from "../../domain/avro/AvroCatalog";
import { IndexPageRenderer } from "./IndexPageRenderer";

export class MarkdownRenderer {
  constructor(private readonly indexPageRenderer = new IndexPageRenderer()) {}

  renderIndex(catalog: AvroCatalog): string {
    return this.indexPageRenderer.render(catalog);
  }
}
