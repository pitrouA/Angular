import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { NavParams, ModalController } from '@ionic/angular';

@Component({
  selector: 'app-select-modal',
  templateUrl: './select-modal.component.html',
  styleUrls: ['./select-modal.component.scss'],
})
export class SelectModalComponent implements OnInit {

  modalTitle:any;
  features:any;
  
  //modelId:number;

  choiveEv:any;

  @ViewChild('msg', { static: false }) msg: ElementRef;

  constructor(
    private modalController: ModalController,
    private navParams: NavParams,
   
  ) { }

  ngOnInit() {
    console.table(this.navParams);
    
    
    this.features=this.navParams.data.paramRes;
    //this.modalTitle = this.navParams.data.paramTitle;
  }

  async closeModal() {
    //const message:string = this.myname;
    // if(this.choiveEv=="deg"){
    //   console.log("deg");
    // }else if(this.choiveEv=="err"){
    //   console.log("err");
    // }else if(this.choiveEv=="addim"){
    //   console.log("addim");
    // }
    console.log("tttttt");
    const tab = null;
    //console.log(returns[0]);
    await this.modalController.dismiss(tab);
  }

  async valideModal() {
    //const message:string = this.myname;
    // if(this.choiveEv=="deg"){
    //   console.log("deg");
    // }else if(this.choiveEv=="err"){
    //   console.log("err");
    // }else if(this.choiveEv=="addim"){
    //   console.log("addim");
    // }
    //console.log("tttttt");
    const tab = [this.features,this.choiveEv];
    //console.log(returns[0]);
    await this.modalController.dismiss(tab);
  }

  
  radioGroupChange(event) {
    //console.log("radioGroupChange "+event.detail);
    //let radioSelectedName = 
    this.choiveEv=event.detail.value;
    
  }

}
