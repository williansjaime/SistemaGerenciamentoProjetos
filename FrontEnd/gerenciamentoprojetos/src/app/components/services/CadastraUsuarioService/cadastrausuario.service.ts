import { Injectable } from '@angular/core';
import { API_URL } from 'src/app/env';
import { CadastroUsuario } from '../../interfaces/CadastraUsuarioInterface';

@Injectable({
  providedIn: 'root'
})
export class CadastrausuarioService {

  url_API:string = "";

  constructor() { 
    this.url_API = "/api/v1/cadastrousuario";
  }

  async POST(dataJSON:CadastroUsuario[])
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
        const data = await fetch(API_URL+this.url_API, requestOptions)
        .then(response => response.json());
        return data;
    } catch (error) {
      return error;
    }  
  } 
}
