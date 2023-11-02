import { Component } from '@angular/core';
import { LoginserviceService } from 'src/app/components/services/LoginService/loginservice.service';
import { CadastroserviceService } from 'src/app/components/services/CadastroService/cadastroservice.service';

export interface CadastroProjetos
{
  ID : string;
  NomeProjeto: string;
  DescricaoProjeto : string;
  dataInicio : string;
  user : string;
}

@Component({
  selector: 'app-cadastrarprojetos',
  templateUrl: './cadastrarprojetos.component.html',
  styleUrls: ['./cadastrarprojetos.component.css']
})

export class CadastrarprojetosComponent {

  user:string = "";
  token:string = "";
  now:Date = new Date();
  total_dias:  number = 0;
  contar_lista:  number = 0;
  contar_listas: CadastroProjetos[] = []; 
  loading:boolean =  false;  
  
  constructor(private api_cadastro_projetos: CadastroserviceService,private loginserver: LoginserviceService) 
  {
    this.contar_listas[0] = {
      ID:String(this.contar_lista),
      NomeProjeto: "",
      DescricaoProjeto : "",
      dataInicio : "",
      user:this.user
    };
  } 

  OnInit(){
    this.now;
    this.total_dias;
    this.contar_lista;
    this.contar_listas;
  }
  
  AddIten(){
    this.contar_lista++;
    this.contar_listas[this.contar_lista] = {
      ID:String(this.contar_lista),
      NomeProjeto: "",
      DescricaoProjeto : "",
      dataInicio : "",
      user:this.user
    };       
  }  

  AddItenLista(id:number){
    if(id != null)
    {
      const nome_projeto = document.getElementById(('NomeProjeto'+id)) as HTMLInputElement ;
      const descricao_projeto = document.getElementById(('DescricaoProjeto'+id)) as HTMLInputElement;
      const date_incicio = document.getElementById(('dateIncicio'+id)) as HTMLInputElement;

      if(nome_projeto != null && descricao_projeto != null)
      {
        this.contar_listas[id] = {
          ID:String(this.contar_lista),
          NomeProjeto:nome_projeto.value,
          DescricaoProjeto : descricao_projeto.value,
          dataInicio: date_incicio.value,
          user:this.user 
        };                         
      }
    }
  }
  

  SalvarProjeto(){
    for (let i = 0; i <= this.contar_lista; i++)
    {
      this.AddItenLista(i);
    }
    if(this.contar_listas.length > 0){
      /*const data = this.api_cadastro_projetos.PostJsonCadastroMaquina(this.contar_listas);
      if(data!=null){
        console.log(data);
        this.contar_listas = [];
        this.contar_lista = 0;
        this.contar_listas[0] = {
          ID:String(this.contar_lista),
          MaquinaNome:"",
          tipoMaquina : "",
          datacriacao : this.now.toLocaleDateString(), 
          user:this.user
        };
      }*/
    }
  }

  DeletarProjeto(id:number)
  {
    if(Array.isArray(this.contar_listas)){
      this.contar_listas.splice(id, 1); 
      this.contar_lista--;
    } 
  }
}
