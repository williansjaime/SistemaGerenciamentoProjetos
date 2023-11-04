import { Component } from '@angular/core';

import { CadastroProjetos } from 'src/app/components/interfaces/CadastroInterface';
import { CadastroserviceService } from 'src/app/components/services/CadastroService/cadastroservice.service';
import { RealizarTarefasProjetos } from 'src/app/components/interfaces/RealizarInterface';
import { RealizartarefaserviceService } from 'src/app/components/services/RealizarTarefas/realizartarefaservice.service';

@Component({
  selector: 'app-realizartarefas',
  templateUrl: './realizartarefas.component.html',
  styleUrls: ['./realizartarefas.component.css']
})

export class RealizartarefasComponent {
  
  user:string = "";
  token:string = "";
  lista_projetos: CadastroProjetos[] = []; 
  lista_tarefas_registradas: RealizarTarefasProjetos[] = []; 
  
  constructor(private API_cadastro_service:CadastroserviceService, private API_realizar_service:RealizartarefaserviceService) 
  {
    this.GetProjetoLista();
  } 

  OnInit(){
    this.user;
    this.token;
    this.lista_projetos; 
    this.lista_tarefas_registradas; 
  }

  OnDestroy(){
    this.user;
    this.token;
    this.lista_projetos;
    this.lista_tarefas_registradas;
    
  }
  //Metodo para carregar a lista projetos
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
    this.lista_tarefas_registradas = [];   
    const data = await this.API_realizar_service.GET(id); 
    if (data !== null && data !== undefined) 
    {
      const values = Object.values(data);
      for (const value of values) 
      {
        if (value !== null && value !== undefined && value !== '') 
        {
          // Realize a conversão de tipo para 'CadastroTarefasProjetos'
          const cadastroTarefa: RealizarTarefasProjetos = value as RealizarTarefasProjetos;
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
      this.GetListaTarefas(Number(id_projeto.value));
    }
  }
  
  //Metodo para evitar que radion button seja marcado 
  CheckRadioButtons(id:number){
    // Selecione os radio buttons
    const realizartarefas = document.getElementById(('realizar'+id)) as HTMLInputElement;
    const concluirtarefa = document.getElementById(('concluida'+id)) as HTMLInputElement;

    // Adicione ouvintes de eventos de clique a ambos os radio buttons
    realizartarefas.addEventListener('click', () => {
      realizartarefas.checked = true;
      concluirtarefa.checked = false;        
    });

    concluirtarefa.addEventListener('click', () => {
      concluirtarefa.checked = true;
      realizartarefas.checked = false;
    });

  }
  
  //Atualizar lista de tarefas
  Atualizar(id:number){
    const realizartarefas = document.getElementById(('realizar'+id)) as HTMLInputElement;
    const concluirtarefa = document.getElementById(('concluida'+id)) as HTMLInputElement;
    if(realizartarefas!= null && concluirtarefa != null){
      let status:number = 1;
      status = realizartarefas.checked==true?2:status;
      status = concluirtarefa.checked==true?3:status;

      this.lista_tarefas_registradas[id] = 
          {
            ...this.lista_tarefas_registradas[id],
            status:status,
            userToken:'Atualizado',
          };
    }
  }

  SalvarStatusTarefas()
  {
    if(this.lista_tarefas_registradas.length > 0)
    {
      for(const value in this.lista_tarefas_registradas)
      {
        this.Atualizar(Number(value));
      }
      this.API_realizar_service.PATCH(this.lista_tarefas_registradas);
      this.lista_tarefas_registradas = [];
    }
  }

  //Limpar as lista de objestos
  DeletarIten(id:number)
  {   
    this.DeleteTarefa(id);    
    if(Array.isArray(this.lista_tarefas_registradas)){
      this.lista_tarefas_registradas.splice(id, 1); 
    } 
  }
  
  async DeleteTarefa(id:number)  
  {    
    this.lista_tarefas_registradas = [];   
    const data = await this.API_realizar_service.DELETE(id);
    if(data.ok){
      window.alert("Tarefa Deletada com sucesso");
    }else{
      window.alert("Erro ao deletar a tarefa")
    }
  }
}
