import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IntegrateComponent } from './integrate/integrate.component';
import { authGuard } from '../guards/auth.guard';

const routes: Routes = [
  {
    path: '',
    component: IntegrateComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class IntegrationRoutingModule { }
