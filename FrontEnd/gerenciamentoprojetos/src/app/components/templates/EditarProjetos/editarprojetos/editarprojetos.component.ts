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

  user:string = "";
  token:string = "";
  contar_lista:  number = 0; 
  lista_projetos: CadastroProjetos[] = []; 
  lista_tarefas: CadastroTarefasProjetos[] = []; 
  lista_tarefas_registradas: CadastroTarefasProjetos[] = []; 
  
  constructor(private API_cadastro_service:CadastroserviceService, private API_edite_service:EditeserviceService) 
  {
    this.GetProjetoLista();
  } 

  OnInit(){
    this.user;
    this.token;
    this.contar_lista;
    this.lista_projetos; 
    this.lista_tarefas;  
    this.lista_tarefas_registradas; 
  }

  OnDestroy(){
    this.user;
    this.token;
    this.contar_lista;
    this.lista_projetos;
    this.lista_tarefas;
    this.lista_tarefas_registradas;
    
  }
  
  async GetProjetoLista()
  {    
    this.lista_projetos = [];        
    const data = await this.API_cadastro_service.GET();
    if(data!=null){
      for (var value in data) 
      {
        this.lista_projetos.push(data[value]);            
      }
    }
  }
   
  //Metodo para pegar as tarefas já cadastrar neste projeto
  async GetListaTarefas(id:number) 
  {    
    this.lista_tarefas = [];        
    const data = await this.API_edite_service.GET(id); 
    if (data !== null && data !== undefined) 
    {
      const values = Object.values(data);
      for (const value of values) 
      {
        if (value !== null && value !== undefined && value !== '') 
        {
          // Realize a conversão de tipo para 'CadastroTarefasProjetos'
          const cadastroTarefa: CadastroTarefasProjetos = value as CadastroTarefasProjetos;
          this.lista_tarefas_registradas.push(cadastroTarefa);            
        }
      }
    }
  }
  
  //Vai adicionar lista de tarefas e se tiver tarefas vai caregar
  AddIten():void
  {
    const id_projeto = document.getElementById(('IDdoProjetoselect')) as HTMLInputElement || null;
    if(id_projeto!=null)
    {
      //this.GetListaTarefas(Number(id_projeto.value));
      const nome_projeto = this.lista_projetos.filter((el: any) => el.ID == Number(id_projeto.value));    
      this.lista_tarefas[this.contar_lista] = 
      {
        idProjeto : Number(id_projeto.value),
        nomeProjeto: nome_projeto[0].NomeProjeto,
        tarefa :"",
        descricao : "",
        dataInicioTarefa : "",
        dataFinalTarefa : "",
        userToken : "",
      };
      this.contar_lista++;
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

  SalvarCadastroTarefas()
  {
    for (let i = 0; i <= this.contar_lista; i++)
    {
      this.AddItenLista(i);
    }
    if(this.lista_tarefas.length > 0)
    {
      this.API_edite_service.POST(this.lista_tarefas);
      this.lista_tarefas = [];
      this.contar_lista = 0;
    }
  }

  DeletarIten(id:number){
    if(Array.isArray(this.lista_tarefas)){
      this.lista_tarefas.splice(id, 1); 
      this.contar_lista--;
    } 
  }
}