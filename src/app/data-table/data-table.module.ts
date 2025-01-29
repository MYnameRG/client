import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DataTableRoutingModule } from './data-table-routing.module';
import { TableGridComponent } from './table-grid/table-grid.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

import { AgGridAngular } from "ag-grid-angular";

@NgModule({
  declarations: [
    TableGridComponent
  ],
  imports: [
    AgGridAngular,
    CommonModule,
    DataTableRoutingModule,
    MatToolbarModule,
    MatSelectModule,
    MatFormFieldModule,
    MatInputModule
  ]
})
export class DataTableModule { }
