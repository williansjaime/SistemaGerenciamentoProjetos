import { Injectable } from '@angular/core';

import { API_URL } from 'src/app/env';
import { RealizarTarefasProjetos } from '../../interfaces/RealizarInterface';
import { LoginserviceService } from '../LoginService/loginservice.service';

@Injectable({
  providedIn: 'root'
})
export class RealizartarefaserviceService {

  url_API:string = "";

  constructor(private login_server: LoginserviceService) { 
    this.url_API = "/api/v1/realizarprojetos/"+this.login_server.getToken();
  }

  async GET(id:number){
    try{
       this.url_API = "/api/v1/realizarprojetos/"+this.login_server.getToken();
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

  async POST(dataJSON:RealizarTarefasProjetos[])
  { 
    try{
      
        this.url_API = "/api/v1/realizarprojetos/"+this.login_server.getToken();

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

  async PATCH(dataJSON:RealizarTarefasProjetos[])
  { 
    try{
        const requestOptions = {
          method: 'PATCH',
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

  async DELETE(id:number)
  { 
    try{
        const requestOptions = {
          method: 'DELETE',
          headers: { 
              'Content-Type': 'application/json',
              'Access-Control-Allow-Origin': 'http://localhost:4200'
          }
        };
        const data = await fetch(API_URL+this.url_API+"/"+id, requestOptions)
        .then(response => response.json());
        return data;
    } catch (error) {
      return error;
    }  
  }

}
