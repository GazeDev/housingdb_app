import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '../../environments/environment';
import * as mapboxgl from 'mapbox-gl';
import { GeoJson, FeatureCollection } from '_models/geo-json';
import { Observable, of, from } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class MapboxService {
  public markers: any;
  public markersObservable: any;

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
          'coordinates': ['-79.9306895', '40.4761533']
        },
        'properties': {
          'message': '1000 jancy'
        }
      }, {
        'type': 'Feature',
        'geometry': {
          'type': 'Point',
          'coordinates': ['-79.951206', '40.4393701']
        },
        'properties': {
          'message': '15 boundary'
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
