import { Component } from '@angular/core';
import { LoginserviceService } from 'src/app/components/services/LoginService/loginservice.service';
import { CadastroserviceService } from 'src/app/components/services/CadastroService/cadastroservice.service';
import { CadastroProjetos } from 'src/app/components/interfaces/CadastroInterface';


@Component({
  selector: 'app-cadastrarprojetos',
  templateUrl: './cadastrarprojetos.component.html',
  styleUrls: ['./cadastrarprojetos.component.css']
})

export class CadastrarprojetosComponent {

  user_token:string;
  numero_linhas:  number = 0;
  lista_projeto: CadastroProjetos[] = []; 
  loading:boolean =  false;  
  
  constructor(private api_cadastro_projetos: CadastroserviceService,private loginserver: LoginserviceService) 
  {
    this.user_token = this.loginserver.getToken();
    this.lista_projeto[0] = {
      ID:String(this.numero_linhas),
      NomeProjeto: "",
      DescricaoProjeto : "",
      dataInicio : "",
      userToken:this.user_token
    };
  } 

  OnInit(){
    this.numero_linhas;
    this.lista_projeto;
  }
  
  AddIten(){
    this.numero_linhas++;
    this.lista_projeto[this.numero_linhas] = {
      ID:String(this.numero_linhas),
      NomeProjeto: "",
      DescricaoProjeto : "",
      dataInicio : "",
      userToken:this.user_token
    };       
  }  

  AddItenLista(id:number){
    if(id != null)
    {
      const nome_projeto = document.getElementById(('NomeProjeto'+id)) as HTMLInputElement ;
      const descricao_projeto = document.getElementById(('DescricaoProjeto'+id)) as HTMLInputElement;
      const date_incicio = document.getElementById(('dateIncicio'+id)) as HTMLInputElement;
      if(nome_projeto != null && descricao_projeto != null && 
        descricao_projeto.value !="" && nome_projeto.value != "" && date_incicio.value != "")
      {
        this.lista_projeto[id] = {
          ID:String(this.numero_linhas),
          NomeProjeto:nome_projeto.value,
          DescricaoProjeto : descricao_projeto.value,
          dataInicio: date_incicio.value,
          userToken:this.user_token 
        };                         
      }else{
        window.alert("Preencha todos os campos.");
      }
    }
  }
  

  async SalvarProjeto()
  {
    for(const valor in this.lista_projeto)
    {
      this.AddItenLista(Number(valor));
    }
    if(this.lista_projeto.length > 0){
      const data = await this.api_cadastro_projetos.POST(this.lista_projeto);
      if(data!=null)
      {
        if(data.ok){
          window.alert("Projeto salvo com sucesso.");
          this.lista_projeto = [];
          this.numero_linhas = 0;
          this.lista_projeto[0] = {
            ID:String(this.numero_linhas),
            NomeProjeto: "",
            DescricaoProjeto : "",
            dataInicio : "",
            userToken:this.user_token
          };
        }else{
          window.alert("Erro ao salvar projeto.");
        }
      }
    }
  }

  DeletarProjeto(id:number)
  {
    if(Array.isArray(this.lista_projeto)){
      this.lista_projeto.splice(id, 1); 
      this.numero_linhas--;
    } 
  }
}
