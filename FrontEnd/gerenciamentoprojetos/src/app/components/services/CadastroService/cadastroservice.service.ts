import { Injectable } from '@angular/core';
import { API_URL } from 'src/app/env';
import { CadastroProjetos } from '../../interfaces/CadastroInterface';
import { LoginserviceService } from '../LoginService/loginservice.service';

@Injectable({
  providedIn: 'root'
})
export class CadastroserviceService {
  url_API:string = "";

  constructor(private login_server: LoginserviceService) 
  {
    this.url_API = "/api/v1/cadastrarprojetos/"+this.login_server.getToken();
  }

  async GET(){
    try{
        this.url_API = "/api/v1/cadastrarprojetos/"+this.login_server.getToken();
        const requestOptions = {
          method: 'GET',
          headers: { 
              'Content-Type': 'application/json',
              'Access-Control-Allow-Origin': 'http://localhost:4200'
          },
        };
        const data = await fetch(API_URL+this.url_API,requestOptions)
            .then(response => response.json());
            return data;
      } catch (error) {
        return error;
      } 
  }

  async POST(dataJSON:CadastroProjetos[])
  { 
    try{
        this.url_API = "/api/v1/cadastrarprojetos/"+this.login_server.getToken();
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
