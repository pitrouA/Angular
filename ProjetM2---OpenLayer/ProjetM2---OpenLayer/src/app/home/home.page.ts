import { Component, OnInit, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import OlMap from 'ol/Map';
import OlXYZ from 'ol/source/XYZ';
import OlTileLayer from 'ol/layer/Tile';
import OlView from 'ol/View';
import OlOSM from 'ol/source/OSM';
import OlTileWMS from 'ol/source/TileWMS';

import * as constShared from '../constShared';

import { fromLonLat } from 'ol/proj';

import 'ol/ol.css';
import {Map, View} from 'ol/index';
import GeoJSON from 'ol/format/GeoJSON';
import {Modify, Select, Draw, Snap} from 'ol/interaction';
import {Tile as TileLayer, Vector as VectorLayer} from 'ol/layer';
import {Cluster, OSM, Vector as VectorSource} from 'ol/source';
import {useGeographic} from 'ol/proj';
import { map } from 'rxjs/operators';

import {Circle as CircleStyle, Fill, Stroke, Style, Text, clusterStyle, Icon} from 'ol/style';

import {WFS} from 'ol/format';

import * as imp from '../images/images.page'
import { ModalController } from '@ionic/angular';
import { ImageArbreComponent } from '../image-arbre.component';
import { PostgreService } from '../postgre.service';
import { ImagesPage } from '../images/images.page';
import { ImageModalPage } from '../image-modal/image-modal.page';
import { SelectModalComponent } from '../select-modal/select-modal.component';
import { ActivatedRoute, Router } from '@angular/router';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { Features } from '../features';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  info = 'Appuyer sur F12 ou alt pour actualiser la map';
  map1: Map;
  sourceOSM: OlOSM;
  sourceDechets: OlTileWMS;
  sourceDechetsWFS: VectorSource;
  sourceBancs: OlTileWMS;
  sourceBancsWFS: VectorSource;
  sourceAbres: OlTileWMS;
  sourceArbresWFS: VectorSource;
  sourcePoubelles: OlTileWMS;
  sourcePoubellesWFS: VectorSource;
  sourceToilettes: OlTileWMS;
  sourceToilettesWFS: VectorSource;
  layerOSM: OlTileLayer;
  layerDechets: OlTileLayer;
  layerDechetsWFS: VectorLayer;
  layerBancs: OlTileLayer;
  layerBancsWFS: VectorLayer;
  layerArbres: OlTileLayer;
  layerArbresWFS: VectorLayer;
  layerPoubelles: OlTileLayer;
  layerPoubellesWFS: VectorLayer;
  layerToilettes: OlTileLayer;
  layerToilettesWFS: VectorLayer;

  source: VectorSource;
  sourceClustersArbres: Cluster;
  sourceClustersToilettes: Cluster;
  sourceClustersDechets: Cluster;
  sourceClustersPoubelles: Cluster;
  sourceClustersBancs: Cluster;
  styleCacheToilettes: {};
  styleCacheArbres: {};
  styleCacheDechets: {};
  styleCachePoubelles: {};
  styleCacheBancs: {};
  layerClustersArbres: VectorLayer;
  layerClustersToilettes: VectorLayer;
  layerClustersDechets: VectorLayer;
  layerClustersPoubelles: VectorLayer;
  layerClustersBancs: VectorLayer;
  view: OlView;
  data: any;

  constructor(private ps: PostgreService,public modalController: ModalController,route: ActivatedRoute, router: Router, private geolocation: Geolocation) {

    //console.log(this.router.snapshot.paramMap.get('longitude'));
    route.queryParams.subscribe(params => {
      if (params && params.special) {
        this.data = JSON.parse(params.special);
        console.log("longitude : "+(1.9+this.data.longitude)+" latitude : "+(47.9+this.data.latitude))
        /*this.view = new OlView({
          center: fromLonLat([this.data.longitude, this.data.latitude]),
          zoom: 12
        });
        this.map1 = new Map({
          layers: [this.layerOSM, this.layerDechets,this.layerToilettes,this.layerPoubelles,this.layerArbresWFS,this.layerBancsWFS],
          target: 'map',
          view: this.view
        });*/
        this.map1.getView().setCenter(fromLonLat([1.9+this.data.longitude, 47.9+this.data.latitude]));
      }
    });
  }

  /*ngAfterContentInit() {
    this.map1.setTarget('map2');
  }*/

  ngOnInit() {

    // let res='Id:'  + '<br>' +
    //             'Secteur:' +'<br>' +
                
    //             'Remarque:' ;

    // this.openSelectModal(res);
    this.sourceOSM = new OSM();


    this.sourceDechets = new OlTileWMS({
      url :
      constShared.GEOURL_DECHETS,
      params: {LAYERS : constShared.GEOLAYER_DECHETS, TILED : true},
      serverType: 'geoserver',
      transition: 0
      // extent
    });

    this.sourceBancs = new OlTileWMS({
      url :
      constShared.GEOURL_BANCS,
      params: {LAYERS : constShared.GEOLAYER_BANCS, TILED : true},
      serverType: 'geoserver',
      transition: 0
      // extent
    });

    this.sourceAbres = new OlTileWMS({
      url :
      constShared.GEOURL_ARBRES,
      params: {LAYERS : constShared.GEOLAYER_ARBRES, TILED : true},
      serverType: 'geoserver',
      transition: 0
      // extent
    });

    this.sourcePoubelles = new OlTileWMS({
      url :
      constShared.GEOURL_POUBELLES,
      params: {LAYERS : constShared.GEOLAYER_POUBELLES, TILED : true},
      serverType: 'geoserver',
      transition: 0
      // extent
    });

    this.sourceToilettes = new OlTileWMS({
      url :
      constShared.GEOURL_TOILETTES,
      params: {LAYERS : constShared.GEOLAYER_TOILETTES, TILED : true},
      serverType: 'geoserver',
      transition: 0
      // extent
    });

    this.layerOSM = new OlTileLayer({
      source: this.sourceOSM
    });

    this.layerDechets = new OlTileLayer({
      source: this.sourceDechets
    });

    this.layerBancs = new OlTileLayer({
      source: this.sourceBancs
    });

    this.layerArbres = new OlTileLayer({
      source: this.sourceAbres
    });

    this.layerPoubelles = new OlTileLayer({
      source: this.sourcePoubelles
    });

    this.layerToilettes = new OlTileLayer({
      source: this.sourceToilettes
    });

    this.view = new OlView({
      center: fromLonLat([1.9, 47.9]),
      zoom: 12
    });

    this.sourcePoubellesWFS = new VectorSource({
      url: constShared.GEOURL_POUBELLESWFS,
      format: new GeoJSON()
    });

    this.sourceBancsWFS = new VectorSource({
      url: constShared.GEOURL_BANCSWFS,
      format: new GeoJSON()
    });

    this.sourceDechetsWFS = new VectorSource({
      url: constShared.GEOURL_DECHETSWFS,
      format: new GeoJSON()
    });

    this.sourceToilettesWFS = new VectorSource({
      url: constShared.GEOURL_TOILETTESWFS,
      format: new GeoJSON()
    });

    this.sourceArbresWFS = new VectorSource({
      url: constShared.GEOURL_ARBRESWFS,
      format: new GeoJSON()
    });

    this.layerPoubellesWFS = new VectorLayer({
      source: this.sourcePoubellesWFS,
      //  style: this.customStyleFunction
    });

    this.layerBancsWFS = new VectorLayer({
      source: this.sourceBancsWFS,
      // style: this.styleBanc
    });

    this.layerDechetsWFS = new VectorLayer({
      source: this.sourceDechetsWFS,
      //  style: this.customStyleFunction
    });

    this.layerToilettesWFS = new VectorLayer({
      source: this.sourceToilettesWFS,
      //  style: this.customStyleFunction
    });

    this.layerArbresWFS = new VectorLayer({
      source: this.sourceArbresWFS,
      style: this.customStyleFunction
    });

    this.sourceClustersArbres = new Cluster({
      distance: 15,
      source: this.sourceArbresWFS
    });

    this.sourceClustersToilettes = new Cluster({
      distance: 15,
      source: this.sourceToilettesWFS
    });

    this.sourceClustersBancs = new Cluster({
      distance: 15,
      source: this.sourceBancsWFS
    });

    this.sourceClustersDechets = new Cluster({
      distance: 15,
      source: this.sourceDechetsWFS
    });

    this.sourceClustersPoubelles = new Cluster({
      distance: 15,
      source: this.sourcePoubellesWFS
    });

    this.styleCacheArbres = {};
    this.layerClustersArbres = new VectorLayer({
      source: this.sourceClustersArbres,
      style: (feature) => {
      const size = feature.get('features').length;
      let style = this.styleCacheArbres[size];
      if (!style) {
        style = new Style({
          image: new CircleStyle({
            radius: 10,
            stroke: new Stroke({
              color: '#fff'
            }),
            fill: new Fill({
              color: '#00AA00'
            })
          }),
          text: new Text({
            text: size.toString(),
            fill: new Fill({
              color: '#fff'
            })
          })
        });
        this.styleCacheArbres[size] = style;
      }
      return style;
    }
    });

    this.styleCacheToilettes = {};
    this.layerClustersToilettes = new VectorLayer({
      source: this.sourceClustersToilettes,
      style: (feature) => {
        const size = feature.get('features').length;
        let style = this.styleCacheToilettes[size];
        if (!style) {
          style = new Style({
            image: new CircleStyle({
              radius: 10,
              stroke: new Stroke({
                color: '#111'
              }),
              fill: new Fill({
                color: '#EEEEEE'
              })
            }),
            text: new Text({
              text: size.toString(),
              fill: new Fill({
                color: '#111'
              })
            })
          });
          this.styleCacheToilettes[size] = style;
        }
        return style;
      }
    });

    this.styleCacheDechets = {};
    this.layerClustersDechets = new VectorLayer({
      source: this.sourceClustersDechets,
      style: (feature) => {
        const size = feature.get('features').length;
        let style = this.styleCacheDechets[size];
        if (!style) {
          style = new Style({
            image: new CircleStyle({
              radius: 10,
              stroke: new Stroke({
                color: '#fff'
              }),
              fill: new Fill({
                color: '#777777'
              })
            }),
            text: new Text({
              text: size.toString(),
              fill: new Fill({
                color: '#fff'
              })
            })
          });
          this.styleCacheDechets[size] = style;
        }
        return style;
      }
    });

    this.styleCachePoubelles = {};
    this.layerClustersPoubelles = new VectorLayer({
      source: this.sourceClustersPoubelles,
      style: (feature) => {
        const size = feature.get('features').length;
        let style = this.styleCachePoubelles[size];
        if (!style) {
          style = new Style({
            image: new CircleStyle({
              radius: 10,
              stroke: new Stroke({
                color: '#fff'
              }),
              fill: new Fill({
                color: '#AAAAAA'
              })
            }),
            text: new Text({
              text: size.toString(),
              fill: new Fill({
                color: '#fff'
              })
            })
          });
          this.styleCachePoubelles[size] = style;
        }
        return style;
      }
    });

    this.styleCacheBancs = {};
    this.layerClustersBancs = new VectorLayer({
      source: this.sourceClustersBancs,
      style: (feature) => {
        const size = feature.get('features').length;
        let style = this.styleCacheBancs[size];
        if (!style) {
          style = new Style({
            image: new CircleStyle({
              radius: 10,
              stroke: new Stroke({
                color: '#fff'
              }),
              fill: new Fill({
                color: '#D89F5B'
              })
            }),
            text: new Text({
              text: size.toString(),
              fill: new Fill({
                color: '#fff'
              })
            })
          });
          this.styleCacheBancs[size] = style;
        }
        return style;
      }
    });

    // this.map1 = new Map({
    //   layers: [this.layerOSM,this.layerArbresWFS,this.layerBancsWFS],
    //   target: 'map',
    //   view: this.view
    // });


    this.map1 = new Map({
      layers: [this.layerOSM, this.layerClustersDechets, this.layerClustersToilettes, this.layerClustersPoubelles, this.layerClustersBancs, this.layerClustersArbres],
      target: 'map',
      view: this.view
    });

    this.geolocation.getCurrentPosition().then((resp) => {
      this.map1.setView(new OlView({
        center: fromLonLat([resp.coords.longitude, resp.coords.latitude]),
        zoom: 19
      }));
      console.log(resp.coords.latitude, resp.coords.longitude);
    }).catch((error) => {
      console.log('Error getting location', error);
    });




    this.map1.on('click', (evt) => {
      let feature = this.map1.forEachFeatureAtPixel(evt.pixel, function(feature) { return feature; });
      if (this.isCluster(feature)) {
        // si c'est un cluster, boucle sur toutes ces features
        let features = feature.get('features');
        if (features.length === 1) {

          this.openSelectModal(features);
          // if (features[0].getId().includes('bancs')) {
          //   console.log(features[0].getId());
          //   let res='Id:' + features[0].getId() + '<br />' +
          //       'Secteur:' + features[0].getProperties().banc_secteur + '<br>' +
          //       'Detail:' + features[0].getProperties().banc_detail + '\n' +
          //       'Localisation:' + features[0].getProperties().banc_loc + '\n' +
          //       'Remarque:' + features[0].getProperties().banc_remarque;

          //   // alert(
          //   //     'Id:' + features[0].getId() + '\n' +
          //   //     'Secteur:' + features[0].getProperties().banc_secteur + '\n' +
          //   //     'Detail:' + features[0].getProperties().banc_detail + '\n' +
          //   //     'Localisation:' + features[0].getProperties().banc_loc + '\n' +
          //   //     'Remarque:' + features[0].getProperties().banc_remarque
          //   // );
          //   this.openSelectModal(features);

          // } else if (features[0].getId().includes('arbres')) {
          //   console.log(features[0].getId());
          //   // alert(
          //   //     'Id:' + features[0].getId() + '\n' +
          //   //     'Code Commune:' + features[0].getProperties().codcomm + '\n' +
          //   //     'Nom du site:' + features[0].getProperties().nom_site + '\n' +
          //   //     'Espece:' + features[0].getProperties().espece + '\n' +
          //   //     'Mode Condition:' + features[0].getProperties().mode_cond
          //   // );
          //   this.openSelectModal(features);
          //   //this.openModal(features[0].getId().split(".")[1]);



          // }
        }
        // for(let i = 0; i < features.length; i++) {
        //   // ici on a accès à nos attributs
        //   console.log(features[i].getId());
        // }
      } else {
        // cas pas un cluster
        //console.log(feature.getId());
      }
      /*let pixel = evt.pixel;
      console.log(pixel);
      console.log(this.layerClustersBancs.getSource().getFeatures().length);
      this.map1.forEachFeatureAtPixel(pixel, function(feature, layer) {
        if (feature.getId().includes('bancs')) {
          console.log(feature.getId());
          alert(
            'Id:' + feature.getId() + '\n' +
            'Secteur:' + feature.getProperties().banc_secteur + '\n' +
            'Detail:' + feature.getProperties().banc_detail + '\n' +
            'Localisation:' + feature.getProperties().banc_loc + '\n' +
            'Remarque:' + feature.getProperties().banc_remarque
          );
        } else if (feature.getId().includes('arbres')) {
          console.log(feature.getId());
          alert(
            'Id:' + feature.getId() + '\n' +
            'Code Commune:' + feature.getProperties().codcomm + '\n' +
            'Nom du site:' + feature.getProperties().nom_site + '\n' +
            'Espece:' + feature.getProperties().espece + '\n' +
            'Mode Condition:' + feature.getProperties().mode_cond
          );

          let ia = new ImageArbreComponent();
          ia.descImgA = "myname";
          ia.nameImgA="nameImage";
          ia.dataImgA = "uploadImage";
          ia.idArbreFK=feature.getId().split(".")[1];

          //this.postImage(ia);


        }


      });*/



    });

    setTimeout(() => {
      this.map1.updateSize();
    }, 500);

    // this.layerClustersBancs.setVisible(false);
    // this.layerClustersToilettes.setVisible(false);
    // this.layerClustersArbres.setVisible(false);
    // this.layerClustersPoubelles.setVisible(false);
    // this.layerClustersDechets.setVisible(false);

  }

  public isCluster(feature) {
    if (!feature || !feature.get('features')) {
      return false;
    }
    return true;
    // return feature.get('features').length > 1;
  }
  @ViewChild('fileLoader', { static: false }) fileLoader: ElementRef;
  dataReturned: any;

  

  public styleBanc(feature, resolution) {
    // this happens when the source is a cluster


    feature.setStyle(new Style({
      image: new Icon({
        anchorXUnits: 'fraction',
        anchorYUnits: 'pixels',
        src: '/assets/icon/bench.png'
      })

    }));

  }

  async openModal(features:any,choiveEv:any) {
    console.log("IDDD:"+features[0].getId());
    const modal = await this.modalController.create({
      component: ImageModalPage,
      componentProps: {
        paramFeatures: features,
        paramChoiveEv: choiveEv 
      }
    });

    modal.onDidDismiss().then((dataReturned) => {
      if (dataReturned !== null) {
        //this.dataReturned = dataReturned.data[0];
        //alert('Modal Sent Data :'+ this.dataReturned);

        //this.todos.push({todo:dataReturned.data[0],img:dataReturned.data[1],checked:true});



      } else {
        this.dataReturned = null;
      }
    });

    return await modal.present();
  }

  async openSelectModal(res:any) {
    //const format = new GeoJSON();
    //format.readFeatures(res);
    //console.log(res[0].getId());
    const modal = await this.modalController.create({
      component: SelectModalComponent,
      cssClass: 'my-custom-modal-css',
      componentProps: {
        paramRes: res,
        
      }
    });

    modal.onDidDismiss().then((dataReturned) => {
      if (dataReturned.data!== null) {
        if(dataReturned.data[1]=="deg"){
          console.log("deg");
        }else if(dataReturned.data[1]=="err"){
          console.log("err");
        }else if(dataReturned.data[1]=="addim"){
          console.log("addim");
        }
        this.dataReturned = dataReturned.data;
        console.log(this.dataReturned[1]);
        this.openModal(this.dataReturned[0],this.dataReturned[1]);
        //alert('Modal Sent Data :'+ this.dataReturned);

        //this.todos.push({todo:dataReturned.data[0],img:dataReturned.data[1],checked:true});
      }else{
        console.log("fermer");
      }



    });

    return await modal.present();
  }

  public postImage(ia:ImageArbreComponent){
    this.ps.postImage(ia).subscribe({
            next: ia => {
              //this.testImage = ia.nameImgA + "";
              console.log("idA:"+ia.idArbreFK);
            }
          });
  }

  public customStyleFunction(feature, resolution) {
    // this happens when the source is a cluster


    feature.setStyle(new Style({
      image: new Icon({
        anchor: [0.5, 46],
        anchorXUnits: 'fraction',
        anchorYUnits: 'pixels',
        src: 'https://openlayers.org/en/latest/examples/data/icon.png'
      })

    }));

  }




  /*public open() {
    // alert('Open ');
    // this.map1.setTarget(null)

    this.map1 = new OlMap({
      layers: [this.layerOSM, this.layerDechets],
      target: 'map',
      view: this.view
    });

    // this.map1.setTarget('map1')
  }*/

  public ShowLayerBancs() {
    // this.layerBancs.setVisible(!this.layerBancs.getVisible());
    this.layerClustersBancs.setVisible(!this.layerClustersBancs.getVisible());
    // this.map1.addLayer(this.layerBancs);*/
  }

  public ShowLayerDechets() {
    this.layerClustersDechets.setVisible(!this.layerClustersDechets.getVisible());
  }

  public ShowLayerToilettes() {
    this.layerClustersToilettes.setVisible(!this.layerClustersToilettes.getVisible());
  }

  public ShowLayerPoubelles() {
    this.layerClustersPoubelles.setVisible(!this.layerClustersPoubelles.getVisible());
  }

  public ShowLayerArbres() {
    this.layerClustersArbres.setVisible(!this.layerClustersArbres.getVisible());
  }




}
