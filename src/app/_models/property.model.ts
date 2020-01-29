export class Property {
  id?: string; // guid
  name: string;
  address: string;
  body: string;
  LocationId: string; // guid
  LandlordId: string; // guid
}

export class PropertyGetOptions {
  search?: string;
  name?: string;
  address?: string;
  bedrooms?: number;
  locations?: string; // guid[,guid][,guid]
}
