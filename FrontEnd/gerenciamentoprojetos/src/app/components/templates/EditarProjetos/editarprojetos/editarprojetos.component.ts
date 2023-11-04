import { Component } from '@angular/core';

import { CadastroProjetos } from 'src/app/components/interfaces/CadastroInterface';
import { CadastroTarefasProjetos } from 'src/app/components/interfaces/EditarInterface';
import { CadastroserviceService } from 'src/app/components/services/CadastroService/cadastroservice.service';
import { EditeserviceService } from 'src/app/components/services/EditeService/editeservice.service';

@Component({
  selector: 'app-editarprojetos',
  templateUrl: './editarprojetos.component.html',
  styleUrls: ['./editarprojetos.component.css']
})
export class EditarprojetosComponent {

  token:string = "";
  numero_linhas:  number = 0; 
  lista_projetos: CadastroProjetos[] = []; 
  lista_tarefas: CadastroTarefasProjetos[] = []; 
  
  constructor(private API_cadastro_service:CadastroserviceService, private API_edite_service:EditeserviceService) 
  {
    this.GetProjetoLista();
  } 

  OnInit(){
    this.token;
    this.numero_linhas;
    this.lista_projetos; 
    this.lista_tarefas;  
  }

  OnDestroy(){
    this.token;
    this.numero_linhas;
    this.lista_projetos;
    this.lista_tarefas;
    
  }
  
  async GetProjetoLista()
  {    
    this.lista_projetos = [];        
    const data = await this.API_cadastro_service.GET();
    if(data!=null)
    {
      for (var value in data) 
      {
        this.lista_projetos.push(data[value]);            
      }      
    }
  }
 
  //Vai adicionar lista de tarefas e se tiver tarefas vai caregar
  AddIten():void
  {
    const id_projeto = document.getElementById(('IDdoProjetoselect')) as HTMLInputElement || null;
    if(id_projeto!=null)
    {
      const nome_projeto = this.lista_projetos.filter((el: any) => el.ID == Number(id_projeto.value));    
      this.lista_tarefas[this.numero_linhas] = 
      {
        idProjeto : Number(id_projeto.value),
        nomeProjeto: nome_projeto[0].NomeProjeto,
        tarefa :"",
        descricao : "",
        dataInicioTarefa : "",
        dataFinalTarefa : "",
        userToken : "",
      };
      this.numero_linhas++;
    }
  }
  
  AddItenLista(id:number):void
  {
    if(id != null)
    { 
      const id_projeto = document.getElementById(('IDdoProjetoselect')) as HTMLInputElement || null;
      const tarefa = document.getElementById(('tarefa'+id)) as HTMLInputElement || null;
      const descricao_tarefa = document.getElementById(('descricao'+id)) as HTMLInputElement || null;
      const date_incicio_tarefa = document.getElementById(('dateIncicio'+id)) as HTMLInputElement || null;
      const data_final_tarefa = document.getElementById(('dataFinal'+id)) as HTMLInputElement || null;
      
      if(tarefa != null && date_incicio_tarefa != null && data_final_tarefa !=null && id_projeto!=null)
      {
        const nome_projeto = this.lista_projetos.filter((el: any) => el.ID == Number(id_projeto.value)); 
        this.lista_tarefas[id] = 
        {
          idProjeto : Number(id_projeto.value),
          nomeProjeto: nome_projeto[0].NomeProjeto,
          tarefa :tarefa.value,
          descricao :descricao_tarefa.value,
          dataInicioTarefa : date_incicio_tarefa.value,
          dataFinalTarefa : data_final_tarefa.value,
          userToken : "vazio",
        };
      }      
    }
  }

  async SalvarCadastroTarefas()
  {
    for (const valor in this.lista_tarefas)
    {
      this.AddItenLista(Number(valor));
    }
    if(this.lista_tarefas.length > 0)
    {
      const data = await this.API_edite_service.POST(this.lista_tarefas);
      if(data!=null)
      {
        if(data.ok)
        {
          window.alert("Tarefas salvas com sucesso");
          this.lista_tarefas = [];
          this.numero_linhas = 0;
        }else{
          window.alert("Erro ao salvas as tarefa");
        }
      }      
    }
  }

  DeletarIten(id:number){
    if(Array.isArray(this.lista_tarefas)){
      this.lista_tarefas.splice(id, 1); 
      this.numero_linhas--;
    } 
  }
}