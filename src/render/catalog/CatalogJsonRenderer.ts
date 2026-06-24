import type { AvroCatalog } from "../../domain/avro/AvroCatalog";
import { stableJsonStringify } from "../../utils/jsonUtils";

export class CatalogJsonRenderer {
  render(catalog: AvroCatalog): string {
    return `${stableJsonStringify(catalog)}\n`;
  }
}
