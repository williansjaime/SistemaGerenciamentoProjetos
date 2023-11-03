import { Injectable } from '@angular/core';
import { API_URL } from 'src/app/env';
import { CadastroProjetos } from '../../interfaces/CadastroInterface';

@Injectable({
  providedIn: 'root'
})
export class CadastroserviceService {
  url_API:string = "";

  constructor() { 
    this.url_API = "/api/v1/cadastrarprojetos/williansLindo";
  }

  async GET(){
    try{
        const requestOptions = {
          method: 'GET',
          headers: { 
              'Content-Type': 'application/json',
              'Access-Control-Allow-Origin': '*'
          },
        };
        const data = await fetch(API_URL+this.url_API,requestOptions)
            .then(response => response.json());
            return data;
      } catch (error) {
        console.error(error);
      } 
  }

  async POST(dataJSON:CadastroProjetos[])
  { 
    try{
        const requestOptions = {
          method: 'POST',
          headers: { 
              'Content-Type': 'application/json',
              'Access-Control-Allow-Origin': '*'
          },
          body: JSON.stringify(dataJSON)
        };
        const data = await fetch(API_URL+this.url_API, requestOptions)
        .then(response => response.json());
        return data;
    } catch (error) {
      console.error(error);
    }  
  } 
}
