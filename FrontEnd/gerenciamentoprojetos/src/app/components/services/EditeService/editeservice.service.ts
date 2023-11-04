import { Injectable } from '@angular/core';

import { API_URL } from 'src/app/env';
import { CadastroTarefasProjetos } from '../../interfaces/EditarInterface';

@Injectable({
  providedIn: 'root'
})

export class EditeserviceService {
  url_API:string = "";

  constructor() { 
    this.url_API = "/api/v1/editarprojetos/williansLindo";
  }

  async GET(id:number){
    try{
        const requestOptions = {
          method: 'GET',
          headers: { 
              'Content-Type': 'application/json',
              'Access-Control-Allow-Origin': 'http://localhost:4200'
          },
        };
        const data = await fetch(API_URL+this.url_API+"/"+id,requestOptions)
            .then(response => response.json());
            return data;
      } catch (error) {
        return error;
      } 
  }

  async POST(dataJSON:CadastroTarefasProjetos[])
  { 
    try{
        const requestOptions = {
          method: 'POST',
          headers: { 
              'Content-Type': 'application/json',
              'Access-Control-Allow-Origin': 'http://localhost:4200'
          },
          body: JSON.stringify(dataJSON)
        };
        const data = await fetch(API_URL+this.url_API+"/0", requestOptions)
        .then(response => response.json());
        return data;
    } catch (error) {
      return error;
    }  
  } 
}
