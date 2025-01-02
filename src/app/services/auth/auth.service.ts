import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'YOUR_BACKEND_API_URL';

  constructor(private http: HttpClient) { }

  register(user: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, user);
  }

  login(credentials: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, credentials);
  }

  logout() {
    localStorage.removeItem('jwt_token');
  }

  isAuthenticated(): boolean {
    const token = localStorage.getItem('jwt_token');
    return !!token; 
  }

  getRole(): string | null {
    const token = localStorage.getItem('jwt_token');
    if (token) {
      const decodedToken = JSON.parse(atob(token.split('.')[1]));
      return decodedToken.role;
    }
    return null;
  }
}