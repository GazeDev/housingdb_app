import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ContentService {
  constructor() {

  }

  body(input:any) {
    let output = input.replace(/(?:\r\n|\r|\n)/g, '<br>');
    return output;
  }

}
