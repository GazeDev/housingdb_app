import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '_environment';
import * as mapboxgl from 'mapbox-gl';
import { GeoJson, FeatureCollection } from '_models/geo-json';


@Injectable({
  providedIn: 'root'
})
export class MapboxService {

  constructor(

  ) {
    mapboxgl.accessToken = environment.mapbox.accessToken;
  }

  getMarkers() {
    const geoJson = [
      {
        'type': 'Feature',
        'geometry': {
          'type': 'Point',
          'coordinates': ['-79', '40']
        },
        'properties': {
          'message': 'A custom message'
        }
      }
    ];
    return geoJson;
  }

  createMarker(data: GeoJson) {
    return null;
  }

  removeMarker($key: string) {
    return null;
  }

}
