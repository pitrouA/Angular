import { Component, OnInit, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import OlMap from 'ol/Map';
import OlXYZ from 'ol/source/XYZ';
import OlTileLayer from 'ol/layer/Tile';
import OlView from 'ol/View';
import OlOSM from 'ol/source/OSM';
import { AlertController } from '@ionic/angular';
import { FileChooser } from '@ionic-native/file-chooser/ngx';
import { NavController } from '@ionic/angular';

import { fromLonLat } from 'ol/proj';
import { PostgreService } from '../postgre.service';
import { ModalController } from '@ionic/angular';
import { ImageModalPage } from '../image-modal/image-modal.page'
import { ImageArbreComponent } from '../image-arbre.component';
import { Routes, RouterModule, NavigationExtras, Router } from '@angular/router';
import {DegradationArbre} from "../degradation-arbre";
import {DegradationBanc} from "../degradation-banc";
import {DegradationDechet} from "../degradation-dechet";
import {DegradationPoubelle} from "../degradation-poubelle";
import {DegradationToilette} from "../degradation-toilette";

@Component({
  selector: 'app-images',
  templateUrl: 'images.page.html',
  styleUrls: ['images.page.scss']
})

export class ImagesPage implements OnInit {
  title = 'Carte qui ne veux pas s\'afficher';
  testImage: string;

  // todos = [{
  //      todo: 'Do the laundry',
  //      img: '../assets/assuprimer1.jpg',
  //      checked: false
  //  }, {
  //      todo: 'Check out new Mobiscroll features',
  //      img: '../assets/assuprimer1.jpg',
  //      checked: false

  //  }];

  imageTab: Array<ImageArbreComponent>;

  degArb: Array<DegradationArbre>;

  degBanc: Array<DegradationBanc>;

  degDechet: Array<DegradationDechet>;

  degPou: Array<DegradationPoubelle>;

  degToi: Array<DegradationToilette>;


  constructor(public alertCtrl: AlertController, private ps: PostgreService, public fileChooser: FileChooser, public navCtrl: NavController, public modalController: ModalController, public router: Router) { }

  ngOnInit() {
    // this.ps.getAllImages().subscribe({
    //   next: ia => {
    //     this.imageTab = ia;
    //     //console.log(stri);
    //   },
    //   error: err => this.errorMessage = err
    // });
  }

  @ViewChild('fileLoader', { static: false }) fileLoader: ElementRef;
  dataReturned: any;
  radioSelectedName: string;

  // async openModal(image) {
  //   const modal = await this.modalController.create({
  //     component: ImageModalPage,
  //     componentProps: {
  //       "paramID": 123,
  //       "paramTitle": "Test Title",
  //       "image": image
  //   }
  // });

  //   modal.onDidDismiss().then((dataReturned) => {
  //     if (dataReturned !== null) {
  //       this.dataReturned = dataReturned.data[0];
  //       //alert('Modal Sent Data :'+ dataReturned);

  //       //this.todos.push({todo:dataReturned.data[0],img:dataReturned.data[1],checked:true});

  //       this.ps.getAllImages().subscribe({
  //         next: ia => {
  //           this.imageTab = ia;
  //           //console.log(stri);
  //         },
  //         error: err => this.errorMessage = err
  //       });

  //     } else {
  //       this.dataReturned = null;
  //     }
  //   });

  //   return await modal.present();
  // }

  errorMessage: string;
  onClick(): void {
    // if(this.radioSelectedName=="deg"){

    // }else if(this.radioSelectedName=="im"){

    // }
    // this.ps.getAllImages().subscribe({
    //   next: ia => {
    //     this.testImage = ia[ia.length - 1].dataImgA + "";
    //     //console.log(stri);
    //   },
    //   error: err => this.errorMessage = err
    // });
  }

  doSomething(image):void {
    if(this.radioSelectedName == "locate"){
      this.locateOnMap(image)
    } else if(this.radioSelectedName == "modify"){
      //this.openModal(image)
    } else if(this.radioSelectedName == "delete"){
      this.ps.deleteImage(image).subscribe({
        next: ia => {
          //do nothing
        },
        error: err => this.errorMessage = err
      });
    }
  }

  locateOnMap(image):void {
    console.log("image : "+image.name+" longitude / latitude : "+image.longitude+" "+image.latitude);
    //this.router.navigate(['/tabs/home']);
    let navigationExtras: NavigationExtras = {
      queryParams: {
        special: JSON.stringify(image)
      }
    };
    this.router.navigate(['/tabs/home'],  navigationExtras);
  }

  radioGroupChange(event) {
    
    this.radioSelectedName = event.detail.value;
    console.log(this.radioSelectedName);
    
  }

  valide(){

    if(this.radioSelectedName=="deg"){
      this.imageTab = null;

      this.ps.getAllDegArb().subscribe({
        next: degA =>{
          this.degArb = degA;
        }
      });

      this.ps.getAllDegBanc().subscribe({
        next: degB =>{
          this.degBanc = degB;
        }
      });

      this.ps.getAllDegDec().subscribe({
        next: degD =>{
          this.degDechet = degD;
        }
      });

      this.ps.getAllDegPou().subscribe({
        next: degP =>{
          this.degPou = degP;
        }
      });

      this.ps.getAllDegToi().subscribe({
        next: degT =>{
          this.degToi = degT;
        }
      });
      console.log("deggg");
    }else if(this.radioSelectedName=="addim"){
      this.ps.getAllImages().subscribe({
        next: ia => {
          this.imageTab = ia;
          this.degArb = null;
          this.degBanc = null;
          this.degDechet = null;
          this.degPou = null;
          this.degToi = null;
          console.log("all found");
          //this.testImage = ia[ia.length - 1].dataImgA + "";
          //console.log(stri);
        },
        error: err => this.errorMessage = err
      });
      
    }
  }
}
