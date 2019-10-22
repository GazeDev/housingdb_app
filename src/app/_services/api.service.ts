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

  getProperty(id: string) {
    return this.httpClient.get<Property>(`${this.apiUrl}/properties/${id}`);
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

  getLandlordProperties(landlordId) {
    return this.httpClient.get<Property[]>(`${this.apiUrl}/landlords/${landlordId}/properties`);
  }

  addLandlord(landlord: Landlord) {
    return this.httpClient.post<any>(`${this.apiUrl}/landlords`, landlord, {observe: 'response'});
  }

  addLandlordToProperty(propertyId, landlordId) {
    let landlord = {
      id: landlordId,
    };
    return this.httpClient.post(`${this.apiUrl}/properties/${propertyId}/landlord`, landlord);
  }

  /*
  * Account Methods
  */

  getAccount(observeResponse: boolean = false) {
    if (observeResponse) {
      return this.httpClient.get<any>(`${this.apiUrl}/accounts`, {observe: 'response'});
    } else {
      return this.httpClient.get<any>(`${this.apiUrl}/accounts`);
    }

  }

  createAccount() {
    return this.httpClient.post<any>(`${this.apiUrl}/accounts`, '');
  }

  getAccountLandlords() {
    return this.httpClient.get<any>(`${this.apiUrl}/accounts/landlords`);
  }

  getAccountProperties() {
    return this.httpClient.get<any>(`${this.apiUrl}/accounts/properties`);
  }

  getAccountReviews() {
    return this.httpClient.get<any>(`${this.apiUrl}/accounts/reviews`);
  }

  /*
  * Review Methods
  */

  getLandlordReviews(landlordId) {
    return this.httpClient.get<any>(`${this.apiUrl}/landlords/${landlordId}/reviews`);
  }

  addLandlordReview(landlordId, landlordReview) {
    return this.httpClient.post<any>(`${this.apiUrl}/landlords/${landlordId}/reviews`, landlordReview);
  }

  getPropertyReviews(propertyId) {
    return this.httpClient.get<any>(`${this.apiUrl}/properties/${propertyId}/reviews`);
  }

  addPropertyReview(propertyId, propertyReview) {
    return this.httpClient.post<any>(`${this.apiUrl}/properties/${propertyId}/reviews`, propertyReview);
  }

  /*
  * External Review Methods
  */

  getLandlordExternalReviews(landlordId) {
    return this.httpClient.get<any>(`${this.apiUrl}/landlords/${landlordId}/external-reviews`);
  }

  getPropertyExternalReviews(propertyId) {
    return this.httpClient.get<any>(`${this.apiUrl}/properties/${propertyId}/external-reviews`);
  }

}
