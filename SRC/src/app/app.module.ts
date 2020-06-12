import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CadastroEquipesComponent } from './pages/cadastro-equipes/cadastro-equipes.component';
import { ControleTorneioComponent } from './pages/controle-torneio/controle-torneio.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgxWarehouseModule } from 'ngx-warehouse';
import { FormsModule } from '@angular/forms';
import { ToastsComponent } from './components/toasts/toasts.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@NgModule({
  declarations: [
    AppComponent,
    CadastroEquipesComponent,
    ControleTorneioComponent,
    ToastsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    NgxWarehouseModule,
    NgbModule,
    FontAwesomeModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
