import { Component, OnInit, AfterViewInit } from '@angular/core';
/*import Map from 'ol/Map';
import OlXYZ from 'ol/source/XYZ';
import TileLayer from 'ol/layer/Tile';
import View from 'ol/View';

import { fromLonLat } from 'ol/proj';*/

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})
export class TabsPage {

  constructor() {}

  /*mapX: Map;
  source: OlXYZ;
  layer: TileLayer;
  view: View;

  ngOnInit() {
    this.source = new OlXYZ({
      url: //'http://localhost:8080/geoserver/nurc/wms?service=WMS&version=1.1.0&request=GetMap&layers=nurc%3AImg_Sample&bbox=-130.85168%2C20.7052%2C-62.0054%2C54.1141&width=768&height=372&srs=EPSG%3A4326&format=application/openlayers'
      //'https://www.openstreetmap.org/#map=12/47.8906/1.9739'
      //'http://tile.osm.org/12/47.8906/1.9739.png'
      'http://tile.osm.org/{z}/{x}/{y}.png'
      //'http://localhost:8080/geoserver/empereurHadrian/wms?service=WMS&version=1.1.0&request=GetMap&layers=empereurHadrian%3Alignes-tao-gtfs&bbox=1.801197%2C47.80344%2C2.069027%2C47.969681&width=768&height=476&srs=EPSG%3A4326&format=application/openlayers'
    });

    //this.source = new OlOSM();

    this.layer = new TileLayer({
      source: this.source
    });

    this.view = new View({
      center: fromLonLat([1.9, 47.9]),
      zoom: 2
    });

    this.mapX = new Map({
      layers: [this.layer],
      target: 'mapX',
      view: this.view
    });
  }*/

}
