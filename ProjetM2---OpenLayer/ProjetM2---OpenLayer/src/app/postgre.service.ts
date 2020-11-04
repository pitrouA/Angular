import { Injector, Injectable } from "@angular/core";
import { HttpClient,HttpErrorResponse} from "@angular/common/http";
import { Observable, throwError } from 'rxjs';
import { catchError,tap} from 'rxjs/operators';
import { ResponseTransfertComponent } from './response-transfer.component';
import { ImageArbreComponent } from './image-arbre.component';

import * as constShared from './constShared';
import {DegradationArbre} from "./degradation-arbre";
import {DegradationBanc} from "./degradation-banc";
import {DegradationDechet} from "./degradation-dechet";
import {DegradationPoubelle} from "./degradation-poubelle";
import {DegradationToilette} from "./degradation-toilette";

@Injectable({
    providedIn:'root'
})
export class PostgreService{

   // urlWebService:string='http://localhost:8081/';
    urlWebService:string=constShared.LOCALADDRESS+constShared.PORTSERV;


    constructor(private http:HttpClient){

    }


    getAllImages():Observable<Array<ImageArbreComponent>>{

        return this.http.get<Array<ImageArbreComponent>>(this.urlWebService+"image").pipe(
            tap(data=> console.log("GetAllJson:"+JSON.stringify(data))),
            catchError(this.handleError)
        );

    }

    getImage():Observable<ImageArbreComponent>{

        return this.http.get<ImageArbreComponent>(this.urlWebService+"image/2").pipe(
            tap(data=> console.log("Json:"+JSON.stringify(data))),
            catchError(this.handleError)
        );

    }


    postImage(ia:ImageArbreComponent):Observable<ImageArbreComponent>{


        return this.http.post<ImageArbreComponent>(this.urlWebService+"image",ia).pipe(
            tap(data=> console.log("PostJson:"+JSON.stringify(data))),
            catchError(this.handleError)
        );

    }

    updateImage(ia:ImageArbreComponent):Observable<ImageArbreComponent>{


        return this.http.post<ImageArbreComponent>(this.urlWebService+"imageUpdate",ia).pipe(
            tap(data=> console.log("PostJsonUpdate:"+JSON.stringify(data))),
            catchError(this.handleError)
        );

    }

    deleteImage(ia:ImageArbreComponent):Observable<ImageArbreComponent>{


        return this.http.post<ImageArbreComponent>(this.urlWebService+"imageDelete",ia).pipe(
            tap(data=> console.log("PostJsonDelete:"+JSON.stringify(data))),
            catchError(this.handleError)
        );
    }

    postDegArb(da:DegradationArbre):Observable<DegradationArbre>{
        
        return this.http.post<DegradationArbre>(this.urlWebService+"degradationArb",da).pipe(
            tap(data=> console.log("PostJson:"+JSON.stringify(data))),
            catchError(this.handleError)
        );
    }

    getAllDegArb(): Observable<Array<DegradationArbre>>{
        return this.http.get<Array<DegradationArbre>>(this.urlWebService+"degradationArb").pipe(
            tap(data=> console.log("PostJson:"+JSON.stringify(data))),
            catchError(this.handleError)
        );
    }

    getDegArb(id:number):Observable<DegradationArbre>{

        return this.http.get<DegradationArbre>(this.urlWebService+"degradationArb/"+id).pipe(
            tap(data=> console.log("Json:"+JSON.stringify(data))),
            catchError(this.handleError)
        );

    }

    postDegBanc(db: DegradationBanc): Observable<DegradationBanc>{
        console.log("DegradationBanc):"+db.description);

        return this.http.post<DegradationBanc>(this.urlWebService + 'degradationBanc', db).pipe(
            tap(data => console.log('PostJson:' + JSON.stringify(data))),
            catchError(this.handleError)
        );
    }

    getAllDegBanc(): Observable<Array<DegradationBanc>> {
        return this.http.get<Array<DegradationBanc>>(this.urlWebService + 'degradationBanc').pipe(
            tap(data => console.log('PostJson:' + JSON.stringify(data))),
            catchError(this.handleError)
        );
    }

    getDegBanc(id: number): Observable<DegradationBanc> {
        return this.http.get<DegradationBanc>(this.urlWebService + 'degradationBanc/' + id).pipe(
            tap(data => console.log('PostJson:' + JSON.stringify(data))),
            catchError(this.handleError)
        );
    }

    postDegDec(dc: DegradationDechet): Observable<DegradationDechet> {
        return this.http.post<DegradationDechet>(this.urlWebService + 'degradationDec', dc).pipe(
            tap(data => console.log('PostJson:' + JSON.stringify(data))),
            catchError(this.handleError)
        );
    }

    getAllDegDec(): Observable<Array<DegradationDechet>> {
        return this.http.get<Array<DegradationDechet>>(this.urlWebService + 'degradationDec').pipe(
            tap(data => console.log('PostJson:' + JSON.stringify(data))),
            catchError(this.handleError)
        );
    }

    getDegDec(id: number): Observable<DegradationDechet> {
        return this.http.get<DegradationDechet>(this.urlWebService + 'degradationDec/' + id).pipe(
            tap(data => console.log('PostJson:' + JSON.stringify(data))),
            catchError(this.handleError)
        )
    }

    postDegPou(dp: DegradationPoubelle): Observable<DegradationPoubelle> {
        return this.http.post<DegradationPoubelle>(this.urlWebService + 'degradationPou', dp).pipe(
            tap(data => console.log('PostJson:' + JSON.stringify(data))),
            catchError(this.handleError)
        );
    }

    getAllDegPou(): Observable<Array<DegradationPoubelle>> {
        return this.http.get<Array<DegradationPoubelle>>(this.urlWebService + 'degradationPou').pipe(
            tap(data => console.log('PostJson:' + JSON.stringify(data))),
            catchError(this.handleError)
        );
    }

    getDegPou(id: number): Observable<DegradationPoubelle> {
        return this.http.get<DegradationPoubelle>(this.urlWebService + 'degradationPou/' + id).pipe(
            tap(data => console.log('PostJson:' + JSON.stringify(data))),
            catchError(this.handleError)
        );
    }

    postDegToi(dt: DegradationToilette): Observable<DegradationToilette> {
        return this.http.post<DegradationToilette>(this.urlWebService + 'degradationToi', dt).pipe(
            tap(data => console.log('PostJson:' + JSON.stringify(data))),
            catchError(this.handleError)
        );
    }

    getAllDegToi(): Observable<Array<DegradationToilette>> {
        return this.http.get<Array<DegradationToilette>>(this.urlWebService + 'degradationToi').pipe(
            tap(data => console.log('PostJson:' + JSON.stringify(data))),
            catchError(this.handleError)
        );
    }

    getDegToi(id: number): Observable<DegradationToilette> {
        return this.http.get<DegradationToilette>(this.urlWebService + 'degradationToi/' + id).pipe(
            tap(data => console.log('PostJson:' + JSON.stringify(data))),
            catchError(this.handleError)
        );
    }



    private handleError(err: HttpErrorResponse){
        let errorMessage="OAnError";
        return throwError(errorMessage);
    }

}
