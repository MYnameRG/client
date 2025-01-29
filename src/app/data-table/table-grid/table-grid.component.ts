import { Component, OnInit } from '@angular/core';
import type { ColDef } from 'ag-grid-community'; // Column Definition Type Interface
import { AllCommunityModule, ModuleRegistry } from "ag-grid-community";
import { CookieService } from 'ngx-cookie-service';
import { DataTableService } from '../../services/data-table.service';
import { Router } from '@angular/router';
import { AppComponent } from '../../app.component';

ModuleRegistry.registerModules([AllCommunityModule]);

@Component({
  selector: 'app-table-grid',
  standalone: false,
  templateUrl: './table-grid.component.html',
  styleUrl: './table-grid.component.scss'
})
export class TableGridComponent implements OnInit {
  rowData: any[] = [];
  colDefs: ColDef<any>[] = [];
  defaultColDef: ColDef = {};

  integrations: any = [];
  selectedIntegrationId: any = null;
  entities: any = [];
  selectedEntityId: any = null;
  fields: any = [];

  pagination: boolean = true;
  currentPage: number = 1;
  lastPage: number = 1;
  paginationPageSize: number = 10;
  paginationPageSizeSelector: any = [10, 20, 50, 100];

  constructor(private cookieService: CookieService,
    private dataTableService: DataTableService,
    private appComponent: AppComponent) { }

  ngOnInit() {
    this.appComponent.checkUrl = window.location.pathname;
    let user_id = this.cookieService.get('user_id');
    if (user_id != null && user_id != '') {
      user_id = user_id.slice(2).replace(/"/g, "");
      this.getIntegrations(user_id);
    }
  }

  getIntegrations(user_id: string) {
    this.dataTableService.getActiveIntegrations(user_id).subscribe((response) => {
      if (response != null && response.isSuccess == true) {
        this.integrations = response.data.integrations;
        this.appComponent.isConnected = true;
      } else {
        console.log(response.message);
      }
    });
  }

  getEntities(integration_id: string) {
    this.selectedIntegrationId = integration_id;
    this.dataTableService.getEntities(integration_id).subscribe((response) => {
      if (response != null && response.isSuccess == true) {
        this.entities = response.data.entities;
      } else {
        console.log(response.message);
      }
    });
  }

  getFields(integration_id: string, entity_id: string) {
    this.selectedEntityId = entity_id;
    this.dataTableService.getFields(integration_id, entity_id).subscribe((response) => {
      if (response != null && response.isSuccess == true) {
        this.colDefs = response.data.fields;
        this.getRecords(integration_id, entity_id, this.currentPage, this.paginationPageSize);
      } else {
        console.log(response.message);
      }
    });
  }

  getRecords(integration_id: string, entity_id: string, currentPage: number, paginationPageSize: number) {
    this.dataTableService.getRecords(integration_id, entity_id, '', currentPage, paginationPageSize).subscribe((response) => {
      if (response != null && response.isSuccess == true) {
        this.rowData = response.data.records;
      } else {
        console.log(response.message);
      }
    });
  }

  onSearchValue(event: any) {
    this.dataTableService.getRecords(this.selectedIntegrationId, this.selectedEntityId, event.target.value, this.currentPage, this.paginationPageSize).subscribe((response) => {
      if (response != null && response.isSuccess == true) {
        this.rowData = response.data.records;
      } else {
        console.log(response.message);
      }
    });
  }
}