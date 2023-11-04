import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router';

//Componentes
import { LoginComponent } from './components/templates/Login/login/login.component'; 
import { HeaderComponent } from './components/templates/Header/header/header.component';
import { CadastrarprojetosComponent } from './components/templates/CadastrarProjetos/cadastrarprojetos/cadastrarprojetos.component';
import { EditarprojetosComponent } from './components/templates/EditarProjetos/editarprojetos/editarprojetos.component';

const routes: Routes = [  
  { 
    path: '', 
    component:LoginComponent,
    children: [
      { path: '', redirectTo: 'cadastrarprojetos', pathMatch: 'full' },
      { path:'login', component: LoginComponent},
      
  ]
  },
  {
    path: 'header',
    component: HeaderComponent,
    children: [
    { path:'cadastrar', component: CadastrarprojetosComponent},
    { path:'editar', component: EditarprojetosComponent},
    
    ]
  }
  ];


@NgModule({
  imports: [RouterModule.forRoot(routes),
    HttpClientModule,],
  exports: [RouterModule]
})

export class AppRoutingModule {}
