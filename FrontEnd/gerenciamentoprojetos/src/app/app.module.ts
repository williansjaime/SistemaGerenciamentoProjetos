import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { Routes, RouterModule } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { LoginComponent } from './components/templates/Login/login/login.component';
import { CadastrarprojetosComponent } from './components/templates/CadastrarProjetos/cadastrarprojetos/cadastrarprojetos.component';
import { EditarprojetosComponent } from './components/templates/EditarProjetos/editarprojetos/editarprojetos.component';
import { HeaderComponent } from './components/templates/Header/header/header.component';
import { RealizartarefasComponent } from './components/templates/RealizarTarefas/realizartarefas/realizartarefas.component';
import { CadastrausuarioComponent } from './components/templates/CadastrarUsuario/cadastrausuario/cadastrausuario.component';

const routes: Routes = [
];

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    CadastrarprojetosComponent,
    EditarprojetosComponent,
    HeaderComponent,
    RealizartarefasComponent,
    CadastrausuarioComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule.forRoot(routes, { useHash: true })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

