import { Injectable } from '@angular/core';

import { ApiService } from '_services/api.service';

@Injectable({
  providedIn: 'root'
})
export class PropertyService {

  constructor(
    private apiService: ApiService,
  ) {

  }

  addProperty(data: any) {

  }
}
