export class PostalAddress {
  id?: string; // guid
  hash: string;
  address: string;
  addressNumber: string;
  addressRoute: string;
  addressNeighborhood?: string;
  addressCounty: string;
  streetAddress: string;
  addressLocality: string;
  addressRegion: string;
  addressCountry?: string;
  postalCode: string;
  createdAt?: string; // datetime
  updatedAt?: string; // datetime
  PropertyId: string; // guid
}

export class Property {
  id?: string; // guid
  name: string;
  address: string;
  body: string;
  LocationId: string; // guid
  LandlordId: string; // guid
  PostalAddresses?: PostalAddress[];
}

export class PropertyGetOptions {
  search?: string;
  name?: string;
  address?: string;
  bedrooms?: number;
  locations?: string; // guid[,guid][,guid]
}
