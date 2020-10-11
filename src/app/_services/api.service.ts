import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

import { Property } from '_models/property.model';
import { Landlord } from '_models/landlord.model';
import { HousingAvailable } from '_models/housing-available.model';
import { emptyish } from '_helpers/emptyish';


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
  * Generic get
  */

  getJSONUrl(url) {
    return this.httpClient.get<any>(url);
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

  getProperties(options = {}) {
    let params = {};
    for (var key in options) {
      if (
        emptyish(options[key])
        || options[key] == undefined
      ) {
        continue;
      }
      params[key] = options[key];
    }
    return this.httpClient.get<Property[]>(`${this.apiUrl}/properties`, {
      params: params,
    });
  }

  getProperty(id: string) {
    return this.httpClient.get<Property>(`${this.apiUrl}/properties/${id}`);
  }

  getPropertyByMachineName(machineName: string) {
    return this.httpClient.get<Property>(`${this.apiUrl}/properties/machine-name/${machineName}`);
  }

  addProperty(property: Property) {
    return this.httpClient.post<Property>(`${this.apiUrl}/properties`, property);
  }

  patchProperty(id, property: Property) {
    return this.httpClient.patch<any>(`${this.apiUrl}/properties/${id}`, property, {observe: 'response'});
  }

  /*
  * Landlord Methods
  */

  getLandlords(options = {}) {
    let params = {};
    for (var key in options) {
      if (
        emptyish(options[key])
        || options[key] == undefined
      ) {
        continue;
      }
      params[key] = options[key];
    }
    return this.httpClient.get<Landlord[]>(`${this.apiUrl}/landlords`, {
      params: params,
    });
  }

  getLandlord(id) {
    return this.httpClient.get<Landlord>(`${this.apiUrl}/landlords/${id}`);
  }

  getLandlordByMachineName(machineName: string) {
    return this.httpClient.get<Landlord>(`${this.apiUrl}/landlords/machine-name/${machineName}`);
  }

  getLandlordProperties(landlordId) {
    return this.httpClient.get<Property[]>(`${this.apiUrl}/landlords/${landlordId}/properties`);
  }

  addLandlord(landlord: Landlord) {
    return this.httpClient.post<any>(`${this.apiUrl}/landlords`, landlord, {observe: 'response'});
  }

  patchLandlord(id, landlord: Landlord) {
    return this.httpClient.patch<any>(`${this.apiUrl}/landlords/${id}`, landlord, {observe: 'response'});
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

  patchAccount(accountId, account) {
    let patchAccount = removeEmptyishFromObjectRecursive(account);
    return this.httpClient.patch<any>(`${this.apiUrl}/accounts/${accountId}`, patchAccount);
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
   * Housing Available methods;
   */
  getHousingAvailables() {
    return this.httpClient.get<HousingAvailable[]>(`${this.apiUrl}/housing-available`);
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

  addReview(reviewableType, reviewableId, review) {
    if (reviewableType === 'landlord') {
      return this.httpClient.post<any>(`${this.apiUrl}/landlords/${reviewableId}/reviews`, review);
    } else if (reviewableType === 'property') {
      return this.httpClient.post<any>(`${this.apiUrl}/properties/${reviewableId}/reviews`, review);
    } else {
      throw 'Err. Not a valid reviewableType';
    }
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

  /*
  * Location Methods
  */

  getLocations() {
    return this.httpClient.get<any>(`${this.apiUrl}/locations`);
  }

  getLocation(id) {
    return this.httpClient.get<any>(`${this.apiUrl}/locations/${id}`);
  }

}

function removeEmptyishFromObjectRecursive(value) {
  // iterate through passed in value
  // assume we are passed an object to start
  // if value[i] is type object, recurse
  // save response of recurse function
  // keep value if returned value isn't false
  // if value[i] is not type object, add it to a holding object and return at end
  if (Object.keys(value).length == 0) {
    return null;
  }
  let builder = {};
  for (var key in value) {
    if (typeof value[key] == 'object') {
      let result = removeEmptyishFromObjectRecursive(value[key]);
      if (result !== null) {
        builder[key] = result;
      }
    } else {
      if (
        emptyish(value[key])
        || value[key] == undefined
      ) {
        continue;
      }
      builder[key] = value[key];
    }
  }
  if (Object.keys(builder).length == 0) {
    return null;
  }
  return builder;
}
