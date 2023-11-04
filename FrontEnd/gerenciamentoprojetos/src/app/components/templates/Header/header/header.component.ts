import { Component } from '@angular/core';
import { Router} from '@angular/router';
import { LoginserviceService } from 'src/app/components/services/LoginService/loginservice.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css','./sb-admin-2.min.css','./sb-admin-2.css',]
})

export class HeaderComponent {
  urlRetorno:string="";  
  authToken:any = null;
  user:string = "";
  cabecalho:string = "";
  isSidebarToggled: boolean = false;

  constructor(private readonly router: Router, private loginserver: LoginserviceService) {    
    this.urlRetorno = router.url;
    this.authToken =  true;
    this.user = "WILLIANS";
    this.cabecalho = "";
  }

  atualisarRoute(url:string){
      this.urlRetorno="";
      this.urlRetorno = url;
      this.cabecalho = "";
      if(url == '/header/cadastrar'){this.cabecalho = "Cadastrar Projetos"}
      if(url == '/header/editar'){this.cabecalho = "Editar Projetos"}
  }

  DoLogout() {
    window.localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }

  Autorizacao(){
    if(this.user == 'WILLIANS')
    {
      this.CabecalhoRota();
      return true;
    }else{
      this.CabecalhoRota();
      return false;
    }
  }

  
  CabecalhoRota() {
    const urlToCabecalho: {
      [key: string]: string;
    } = {
      '/header/cadastrarprojetos': 'Cadastrar Projetos',
      '/header/editarprojetos': 'Editar Projetos',
    };
    
    this.cabecalho = urlToCabecalho[this.urlRetorno] || '';
  }
   
  ToggleSidebar(): void {
    this.isSidebarToggled = !this.isSidebarToggled;
  }
  
  ToggleCadastro(): void {
    this.isSidebarToggled = false;
  }

}
