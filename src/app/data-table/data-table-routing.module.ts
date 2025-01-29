import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TableGridComponent } from './table-grid/table-grid.component';
import { authGuard } from '../guards/auth.guard';

const routes: Routes = [
  {
    path: '',
    component: TableGridComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DataTableRoutingModule { }
