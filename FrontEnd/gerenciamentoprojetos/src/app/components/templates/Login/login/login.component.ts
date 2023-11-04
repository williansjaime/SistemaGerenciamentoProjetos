import { Component } from '@angular/core';
import { Router } from '@angular/router';
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
  
  constructor(private router: Router,private loginserver: LoginserviceService)
  {   
    
  }
  
  async login() 
  { 
    this.loading = true;   
    const userId = document.getElementById('usuario')  as HTMLElement || null;
    const senhaId = document.getElementById('password') as HTMLElement || null;
    //Stop submit
    var form = document.querySelector('form');
    if(form != null) {form.addEventListener('submit', function(e){
    e.preventDefault();})}
    
    if (senhaId != null && userId != null && userId!=undefined && senhaId!=undefined) 
    {
      console.log(senhaId,userId);
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
    this.router.navigate(['/cadastrousuario']);
  }
}