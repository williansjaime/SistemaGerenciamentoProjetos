import { Injectable } from '@angular/core';
import { API_URL } from 'src/app/env';
import { Login } from '../../interfaces/LoginInterface';


@Injectable({
  providedIn: 'root'
})
export class LoginserviceService {

  url_API:string = "";

  constructor() { 
    this.url_API = "/api/v1/login";
    window.localStorage.setItem('token', '');    
  }

  
  getToken(){
    return String( window.localStorage.getItem('token'));
  }
  getUser(){
    return String(window.localStorage.getItem('user'));
  }
  get isLoggedIn(): boolean {
    let authToken =  this.getToken();
    return authToken != null && authToken != "" ? true : false;
  }

  async GET(dataJSON:Login[])
  { 
    try{
        const requestOptions = {
          method: 'GET',
          headers: { 
              'Content-Type': 'application/json',
              'Access-Control-Allow-Origin': 'http://localhost:4200'
          },
        };
        const data = await fetch(API_URL+this.url_API+"/"+dataJSON[0].senha+"/"+dataJSON[0].usuario, requestOptions)
        .then(response => response.json());
        if(data != null){                    
          window.localStorage.setItem('token',data["token"]);
          window.localStorage.setItem('user',dataJSON[0].usuario);
          return data;
        }else{
          return data;
        }  
        
    } catch (error) {
      return error;
    }  
  } 

  async POST(dataJSON:Login[])
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
        if(data != null){
          if (data.status >= 200 && data.status < 300) 
          {
            const data_token  = await  data.json();
            localStorage.setItem('token',data_token[0].token);
            localStorage.setItem('user',dataJSON[0].usuario);
            return data_token;
          }else{
            return data;
          }  
        } 
    } catch (error) {
      return error;
    }  
  } 
}
