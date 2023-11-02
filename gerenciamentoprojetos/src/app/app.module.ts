import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CadastrarprojetosComponent } from './components/template/CadastrarProjetos/cadastrarprojetos/cadastrarprojetos.component';

const routes: Routes = [
];

@NgModule({
  declarations: [
    AppComponent,
    CadastrarprojetosComponent
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
