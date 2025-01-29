import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OAuthService {
  private baseUrl = 'http://localhost:3000';

  constructor(private http: HttpClient) { }

  authenticate(): Observable<any> {
    return this.http.get(`${this.baseUrl}/api/auth/integrate`);
  }

  remove(user_id: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/api/auth/remove?uid=${user_id}`);
  }

  fetchAllGithubData(user_id: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/api/auth/data?uid=${user_id}`);
  }
}
