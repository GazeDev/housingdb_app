export class Landlord {
  id?: string; // guid
  quickInfo?: string; // only on create
  name?: string;
  body?: string;
  phone?: string;
  phoneCountry?: string;
  phoneNational?: string;
  phoneExtension?: string;
  website?: string;
  email?: string;
  OwnerId?: string; // guid
}
