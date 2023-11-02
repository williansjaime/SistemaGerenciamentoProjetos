import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router';
import { CadastrarprojetosComponent } from './components/template/CadastrarProjetos/cadastrarprojetos/cadastrarprojetos.component';

const routes: Routes = [  
  { 
    path: '', 
    component:CadastrarprojetosComponent,
    children: [
      { path: '', redirectTo: 'cadastrarprojetos', pathMatch: 'full' },
      { path:'cadastrarprojetos', component: CadastrarprojetosComponent},
      
  ]
  },
  { path:'cadastrarprojetos', component: CadastrarprojetosComponent},
  ];
@NgModule({
  imports: [RouterModule.forRoot(routes),
    HttpClientModule,],
  exports: [RouterModule]
})
export class AppRoutingModule { }
