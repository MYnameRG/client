import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataTableService {
  private baseUrl = 'http://localhost:3000';

  constructor(private http: HttpClient) { }

  getActiveIntegrations(user_id: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/api/data-table/integrations/active?uid=${user_id}`);
  }

  getEntities(integration_id: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/api/data-table/entities?iid=${integration_id}`);
  }

  getFields(integration_id: string, entity_id: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/api/data-table/entity/fields?iid=${integration_id}&eid=${entity_id}`);
  }

  getRecords(integration_id: string, entity_id: string, search: string, page: number, pageSize: number): Observable<any> {
    return this.http.post(`${this.baseUrl}/api/data-table/entity/records?iid=${integration_id}&eid=${entity_id}`, {
      keyword: search
    });
  }
}
