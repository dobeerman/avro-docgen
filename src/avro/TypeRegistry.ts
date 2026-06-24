import type { AvroNamedType } from "../domain/avro/AvroNamedType";

export class TypeRegistry {
  private readonly byFullname = new Map<string, AvroNamedType>();

  constructor(namedTypes: AvroNamedType[]) {
    for (const namedType of namedTypes) {
      this.byFullname.set(namedType.fullname, namedType);
    }
  }

  find(fullname: string): AvroNamedType | undefined {
    return this.byFullname.get(fullname);
  }
}
