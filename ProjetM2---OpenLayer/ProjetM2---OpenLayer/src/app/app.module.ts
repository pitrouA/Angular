import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { HomePage } from './home/home.page';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { FileChooser } from '@ionic-native/file-chooser/ngx';
import {Base64} from "@ionic-native/base64/ngx";
import {ImageModalPage} from './image-modal/image-modal.page';
import { SelectModalComponent } from './select-modal/select-modal.component';
import { Geolocation } from '@ionic-native/geolocation/ngx';


@NgModule({
  declarations: [
    AppComponent,
    ImageModalPage,
    SelectModalComponent
  ],
  entryComponents: [ImageModalPage,SelectModalComponent],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    FormsModule,
    HttpClientModule
    ],
  providers: [
    StatusBar,
    SplashScreen,
    Base64,
    Geolocation,
    FileChooser,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
