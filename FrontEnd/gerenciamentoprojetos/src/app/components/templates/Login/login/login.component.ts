import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Login } from 'src/app/components/interfaces/LoginInterface';
import { LoginserviceService } from 'src/app/components/services/LoginService/loginservice.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent
 {
  authToken:any='';
  loading:boolean = false;
  user:string = "";
  login_lista : Login[]=[];
  constructor(private router: Router,private loginserver: LoginserviceService)
  {   
    
  }
  
  async login() 
  { 
    this.loading = true;   
    const userId = document.getElementById('usuario')  as HTMLInputElement || null;
    const senhaId = document.getElementById('password') as HTMLInputElement || null;
    //Stop submit
    var form = document.querySelector('form');
    if(form != null) {form.addEventListener('submit', function(e){
    e.preventDefault();})}
    
    if (senhaId != null && userId != null && userId!=undefined && senhaId!=undefined) 
    {
      this.login_lista[0]={
        usuario:userId.value,
        senha:senhaId.value
      }
      this.loginserver.GET(this.login_lista);
      
      this.router.navigate(['/header/cadastrar']);
    }else{
      this.loading = false;
      window.alert("Erro ao efetuar Login\n Digite os dados corretamente!");
    }
  }

  cadastrar(){
    var form = document.querySelector('form');
    if(form != null) {form.addEventListener('submit', function(e){
      e.preventDefault();})}
    this.router.navigate(['/cadastrausuario']);
  }
}