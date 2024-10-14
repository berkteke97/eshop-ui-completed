import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { decodeToken } from '../utils/decodeToken';

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    private apiUrl = "http://localhost:8092"+"/api/login";
    private currentUserSubject: BehaviorSubject<any>;
    public currentUser: Observable<any>;

    constructor(private http: HttpClient) {
        const storedUser = localStorage.getItem('currentUser');
        this.currentUserSubject = new BehaviorSubject<any>(
            storedUser ? JSON.parse(storedUser) : null
        );
        this.currentUser = this.currentUserSubject.asObservable();
    }

    login(username: string, password: string): Observable<any> {
      const body = { user: username, pass: password };
      return this.http.post<any>(this.apiUrl, body).pipe(
          map(response => {
              if (response && response.token) {
                  // Giriş başarılı, kullanıcı oturumunu başlat
                  localStorage.setItem('currentUser', JSON.stringify(response));
                  this.currentUserSubject.next(response);
              }
              return response;
          }),
          catchError(error => {
              console.error('HTTP hatası:', error);
              // Hataları uygun şekilde ele alın
              throw new Error(error);
          })
      );
  }

  getDecodedToken(): any {
    const token = localStorage.getItem('currentUser');
    if (token) {
      const parsedToken = JSON.parse(token);
      return decodeToken(parsedToken.token);  
    }
    return null;
  }

 
  hasRole(role: string): boolean {
    const decodedToken = this.getDecodedToken();
    return decodedToken && decodedToken.role === role;
  }
    logout(): void {
        localStorage.removeItem('currentUser');
        this.currentUserSubject.next(null);
    }

    public get currentUserValue(): any {
        return this.currentUserSubject.value;
    }
    public isAuthenticated(): boolean {
        return this.currentUserValue !== null;
    }
}
