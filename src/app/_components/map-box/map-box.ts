import { Input, Component, OnInit } from '@angular/core';
import * as mapboxgl from 'mapbox-gl';
import { MapboxService } from '_services/mapbox.service';
import { GeoJson, FeatureCollection } from '_models/geo-json';


@Component({
  selector: 'map-box',
  templateUrl: './map-box.html',
  styleUrls: ['./map-box.scss']
})
export class MapBoxComponent implements OnInit{

  @Input('coordinates')
  public coordinates: any;

  /// default settings
  map: mapboxgl.Map;
  style = 'mapbox://styles/gazedev/ck54iimuo01je1cqmyxrmwolz';

  // data
  source: any;
  markers: any;

  constructor(
    private mapService: MapboxService
  ) {

  }

  ngOnInit() {
    this.initializeMap();
  }

  private initializeMap() {
    this.buildMap();
  }

  buildMap() {
    this.map = new mapboxgl.Map({
      container: 'map',
      style: this.style,
      zoom: 13,
      center: [40.4419416,-80.01321],
    });


    /// Add map controls
    this.map.addControl(new mapboxgl.NavigationControl());

    /// Add realtime firebase data on map load
    this.map.on('load', (event) => {

      this.map.addSource('propertyMarkers', {
        type: 'geojson',
        data: {
          type: 'FeatureCollection',
          features: []
        }
      });

      // let markers = this.mapService.getMarkers();
      let markers = [new GeoJson(this.coordinates)];
      // console.log('markers', markers);
      let data = {
        type: 'FeatureCollection',
        features: markers,
      };
      this.map.getSource('propertyMarkers').setData(data);

      this.map.addLayer({
        id: 'propertyMarkersId',
        source: 'propertyMarkers',
        type: 'symbol',
        layout: {
          'icon-image': 'property',
          'icon-anchor': 'bottom',
        },
      });
      this.map.setCenter(this.coordinates);
      // this.flyTo();
    })

  }


  /// Helpers

  // removeMarker(marker) {
  //   this.mapService.removeMarker(marker.$key)
  // }

  flyTo() {
    this.map.flyTo({
      center: this.coordinates,
    })
  }
}
