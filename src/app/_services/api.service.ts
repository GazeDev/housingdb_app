import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Property } from '_models/property.model';
import { Landlord } from '_models/landlord.model';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  public apiUrl:string;

  public firstPage: string = "";
  public prevPage: string = "";
  public nextPage: string = "";
  public lastPage: string = "";


  constructor(
    private httpClient: HttpClient
  ) {

  }

  setUrl(url:string) {
    this.apiUrl = url;
  }

  getUrl() {
    return this.apiUrl;
  }

  /*
  * Backend Status
  */

  checkStatus() {
    return this.httpClient.get<any>(`${this.apiUrl}/`);
  }

  /*
  * Property Methods
  */

  getProperties() {
    return this.httpClient.get<Property[]>(`${this.apiUrl}/properties`);
  }

  addProperty(property: Property) {
    return this.httpClient.post<Property>(`${this.apiUrl}/properties`, property);
  }

  /*
  * Landlord Methods
  */

  getLandlords() {
    return this.httpClient.get<Landlord[]>(`${this.apiUrl}/landlords`);
  }

  getLandlord(id) {
    return this.httpClient.get<Landlord>(`${this.apiUrl}/landlords/${id}`);
  }

  addLandlord(landlord: Landlord) {
    return this.httpClient.post<Landlord>(`${this.apiUrl}/landlords`, landlord);
  }

  addLandlordToProperty(propertyId, landlordId) {
    let landlord = {
      id: landlordId,
    };
    return this.httpClient.post(`${this.apiUrl}/properties/${propertyId}/landlord`, landlord);
  }

}
