import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ModalController, NavParams } from '@ionic/angular';
import { ImageArbreComponent } from '../image-arbre.component';
import { PostgreService } from '../postgre.service';
import { DegradationBanc } from '../degradation-banc';
import { DegradationPoubelle } from '../degradation-poubelle';
import { DegradationDechet } from '../degradation-dechet';
import { DegradationArbre } from '../degradation-arbre';
import { DegradationToilette } from '../degradation-toilette';

@Component({
  selector: 'app-image-modal',
  templateUrl: './image-modal.page.html',
  styleUrls: ['./image-modal.page.scss'],
})
export class ImageModalPage implements OnInit {

  modalTitle: string;
  modelId: number;

  processing: boolean;
  uploadImage: string;
  nameImage:string;
  testImage: string;
  myname: string;
  longitude: number;
  latitude: number;
  image: ImageArbreComponent;
  showUpload: boolean;

  features:any;
  choiveEv:any;
  descdeg:any;


  @ViewChild('msg', { static: false }) msg: ElementRef;

  constructor(
    private modalController: ModalController,
    private navParams: NavParams,
    private ps: PostgreService
  ) { }

  ngOnInit() {
    console.table(this.navParams);

    this.modelId = this.navParams.data.paramFeatures[0].getId().split(".")[1];
    this.features=this.navParams.data.paramFeatures;
    this.choiveEv=this.navParams.data.paramChoiveEv;
    //console.log("choice:"+this.choiveEv);
    //console.log("feat:"+this.features[0].getId());
    //this.modalTitle = this.navParams.data.paramTitle;
    
    

    if(this.choiveEv=="addim" && this.image != null){
      this.image = this.navParams.data.image;
      this.myname = this.image.nameImgA;
      this.showUpload = true
    }
    //else{
      
      this.longitude = 0;
      this.latitude = 0;
    //  this.showUpload = false;
    // }
  }

  async closeModal(){
    await this.modalController.dismiss(null);
  }

  async valideModal() {
    //console.log("aaaaaaa");
    //const message:string = this.myname;
    const returns = [
      this.myname,
      this.uploadImage
    ]

    if(this.choiveEv=="deg"){
      if (this.features[0].getId().includes('bancs')) {

        
        let db=new DegradationBanc();
        db.description=this.descdeg;
        db.idBancFk=this.modelId;
        

        this.ps.postDegBanc(db).subscribe({
          next: ia => {
            //this.testImage = null;
            //console.log("IDD:"+ia.idArbreFK);
          }
        });

        
      }else if (this.features[0].getId().includes('poubelles')){
        let dp=new DegradationPoubelle();
        dp.description=this.descdeg;
        dp.idPouFk=this.modelId;
        

        this.ps.postDegPou(dp).subscribe({
          next: ia => {
            //this.testImage = null;
            //console.log("IDD:"+ia.idArbreFK);
          }
        });
  
      }else if (this.features[0].getId().includes('dechets')){
        let dd=new DegradationDechet();
        dd.description=this.descdeg;
        dd.idDecFk=this.modelId;
        

        this.ps.postDegDec(dd).subscribe({
          next: ia => {
            //this.testImage = null;
            //console.log("IDD:"+ia.idArbreFK);
          }
        });
  
      }else if (this.features[0].getId().includes('arbres')){
        let da=new DegradationArbre();
        da.description=this.descdeg;
        
        da.idArbFk=this.modelId;

        console.log("idddd:"+da.idArbFk);
        

        this.ps.postDegArb(da).subscribe({
          next: ia => {
            //this.testImage = null;
            //console.log("IDD:"+ia.idArbreFK);
          }
        });
      
      }else if (this.features[0].getId().includes('toilettes')){
        let dt=new DegradationToilette();
        dt.description=this.descdeg;
        dt.idToiFk=this.modelId;
        

        this.ps.postDegToi(dt).subscribe({
          next: ia => {
            //this.testImage = null;
            //console.log("IDD:"+ia.idArbreFK);
          }
        });
        
      }
    } 
    else if(this.choiveEv=="addim"){
      
      this.saveDataImageArbre(this.myname,this.uploadImage,this.nameImage, 0, 0);
    
    }
    
    await this.modalController.dismiss(returns);
  }

  saveDataImageArbre(myname:string,uploadImage:string,nameImage:string, longitude:number,latitude:number ):void{
    let ia = new ImageArbreComponent();
    ia.descImgA = myname;
    ia.longitude = longitude;
    ia.latitude = latitude;
    ia.nameImgA=nameImage;
    ia.dataImgA = uploadImage;
    console.log(this.modelId);
    ia.idArbreFK=this.modelId;
    //console.log("III:"+ia.idArbreFK);
    if(this.image){
      this.ps.updateImage(ia).subscribe({
        next: ia => {
          this.testImage = null;
          //console.log("IDD:"+ia.idArbreFK);
        }
      });
    }else{
      this.ps.postImage(ia).subscribe({
        next: ia => {
          this.testImage = ia.nameImgA+"";
          console.log("IDD:"+ia.idArbreFK);
        }
      });
    }

  }

  presentActionSheet(fileLoader) {
    fileLoader.click();
    var that = this;
    fileLoader.onchange = function () {
      var file = fileLoader.files[0];

      var reader = new FileReader();

      reader.addEventListener("load", function () {
        that.processing = true;
        that.getOrientation(fileLoader.files[0], function (orientation) {
          if (orientation > 1) {
            that.resetOrientation(reader.result, orientation, function (resetBase64Image) {
              that.uploadImage = resetBase64Image;
            });
          } else {
            that.uploadImage = reader.result.toString();
            that.nameImage=file.name;
            console.log(file.name);

          }
        });
      }, false);

      if (file) {
        reader.readAsDataURL(file);


      }
    }
  }
  imageLoaded() {
    this.processing = false;
  }
  getOrientation(file, callback) {
    var reader = new FileReader();
    reader.onload = function (e: any) {

      var view = new DataView(e.target.result);
      if (view.getUint16(0, false) != 0xFFD8) return callback(-2);
      var length = view.byteLength, offset = 2;
      while (offset < length) {
        var marker = view.getUint16(offset, false);
        offset += 2;
        if (marker == 0xFFE1) {
          if (view.getUint32(offset += 2, false) != 0x45786966) return callback(-1);
          var little = view.getUint16(offset += 6, false) == 0x4949;
          offset += view.getUint32(offset + 4, little);
          var tags = view.getUint16(offset, little);
          offset += 2;
          for (var i = 0; i < tags; i++)
            if (view.getUint16(offset + (i * 12), little) == 0x0112)
              return callback(view.getUint16(offset + (i * 12) + 8, little));
        }
        else if ((marker & 0xFF00) != 0xFF00) break;
        else offset += view.getUint16(offset, false);
      }
      return callback(-1);
    };
    reader.readAsArrayBuffer(file);
  }
  resetOrientation(srcBase64, srcOrientation, callback) {
    var img = new Image();

    img.onload = function () {
      var width = img.width,
        height = img.height,
        canvas = document.createElement('canvas'),
        ctx = canvas.getContext("2d");

      // set proper canvas dimensions before transform & export
      if (4 < srcOrientation && srcOrientation < 9) {
        canvas.width = height;
        canvas.height = width;
      } else {
        canvas.width = width;
        canvas.height = height;
      }

      // transform context before drawing image
      switch (srcOrientation) {
        case 2: ctx.transform(-1, 0, 0, 1, width, 0); break;
        case 3: ctx.transform(-1, 0, 0, -1, width, height); break;
        case 4: ctx.transform(1, 0, 0, -1, 0, height); break;
        case 5: ctx.transform(0, 1, 1, 0, 0, 0); break;
        case 6: ctx.transform(0, 1, -1, 0, height, 0); break;
        case 7: ctx.transform(0, -1, -1, 0, height, width); break;
        case 8: ctx.transform(0, -1, 1, 0, 0, width); break;
        default: break;
      }

      // draw image
      ctx.drawImage(img, 0, 0);

      // export base64
      callback(canvas.toDataURL());
    };

    img.src = srcBase64;
  }
  removePic() {
    this.uploadImage = null;
  }

}
