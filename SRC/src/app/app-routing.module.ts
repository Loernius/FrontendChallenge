import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CadastroEquipesComponent } from './pages/cadastro-equipes/cadastro-equipes.component';
import { ControleTorneioComponent } from './pages/controle-torneio/controle-torneio.component';


const routes: Routes = [
  {
    path: '',
    component: CadastroEquipesComponent
  },
  {
    path: 'tournament',
    component: ControleTorneioComponent
  },
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full'
  },
  {
    path: '**',
    redirectTo: '/home',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
