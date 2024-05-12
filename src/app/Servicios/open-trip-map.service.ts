import { Injectable } from '@angular/core';
import { respuestaWSSuggest2, respuestaWSxid } from '../webservice/IOpenTripMap';

@Injectable({
  providedIn: 'root'
})
export class OpenTripMapService {
  //apikey
  apiKey: string = "5ae2e3f221c38a28845f05b6adb7ae661b26837503e4398db2543c8b"
  // variables necesarias para el GET autoSuggest
  urlBaseautosuggest: string = "https://api.opentripmap.com/0.1/en/places/autosuggest?name="
  nameBusqueda: string = "montaña"
  urlFinalSuggest: string = "&radius=99999999999999&lon=-33&lat=-70&format=geojson&limit=5&apikey="
  // variables necesarias para el GET xid
  urlBaseXid: string = "https://api.opentripmap.com/0.1/en/places/xid/"
  xid:string = "";
  urlFinalXid:string = "?apikey="
  xidRespuesta: respuestaWSSuggest2 [] = []

  constructor() { }

  async getXid(nameBusqueda: string):Promise<respuestaWSSuggest2>{
      
      //url armada con variables
      const url = `${this.urlBaseautosuggest}${nameBusqueda}${this.urlFinalSuggest}${this.apiKey}`;
      const respuesta = await fetch(url)
      const data = await respuesta.json()
      return data
  }

  async getDetalleXid(buscarXid: string):Promise<respuestaWSxid>{

      //url armada con variables
      const urlXid = `${this.urlBaseXid}${buscarXid}${this.urlFinalXid}${this.apiKey}`
      const respuesta = await fetch(urlXid)
      const data = await respuesta.json()
      return data 

  }
}
