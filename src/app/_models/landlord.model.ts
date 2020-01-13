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
  AuthorId?: string; // guid
  metadata?: any; // metadata object with more info
}
