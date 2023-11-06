import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CadastroUsuario } from 'src/app/components/interfaces/CadastraUsuarioInterface';
import { CadastrausuarioService } from 'src/app/components/services/CadastraUsuarioService/cadastrausuario.service';


@Component({
  selector: 'app-cadastrausuario',
  templateUrl: './cadastrausuario.component.html',
  styleUrls: ['./cadastrausuario.component.css']
})

export class CadastrausuarioComponent {

    loading:boolean = false;
    cadastro_usuario:CadastroUsuario[] = [];
    constructor(private router: Router,private cadastro_serve: CadastrausuarioService)
    {
  
    }
         
    async Enviar()
    {
      var form = document.querySelector('form');
      if(form != null) {form.addEventListener('submit', function(e){
      e.preventDefault();})}
      
      const usuario = document.getElementById('InputUsuario') as HTMLInputElement || null;
      const email = document.getElementById('InputEmail')as HTMLInputElement || null;
      const senha = document.getElementById('InputPassword')as HTMLInputElement || null;
      const senha_verificar = document.getElementById('InputPasswordVerifica')as HTMLInputElement || null;
      
      if (email != null && senha != null && senha_verificar != null && usuario!= null) 
      { 
        if(senha_verificar.value !="" && senha.value != "" && senha_verificar.value == senha.value && usuario.value != "")
        { 
          this.cadastro_usuario[0] = {
            usuario:usuario.value,
            senha:senha.value,
            email:email.value
          }
          const data = await this.cadastro_serve.POST(this.cadastro_usuario);
          if(data!=null)
          {
            if(data.ok)
            {
              window.alert("Tarefas salvas com sucesso");
              this.router.navigate(['/login']);
            }else{
              window.alert("Erro ao cadastrar usuário\n Digite os dados corretamente!") 
              this.router.navigate(['/cadastrausuario']);
            }
          }          
        }
      }else{
        this.router.navigate(['/cadastrausuario']);
      }
    }
    
    Cancelar()
    {
      this.router.navigate(['/login']);
    }
  }