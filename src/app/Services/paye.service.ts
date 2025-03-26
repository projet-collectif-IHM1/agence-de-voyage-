import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
// L'URL de base de votre API FastAPI
const API_URL = 'http://localhost:8000';

@Injectable({
  providedIn: 'root'
})

export class PayeService {

  constructor(private http: HttpClient) { }

    // Méthode pour récupérer tous les utilisateurs
    getPaye(): Observable<any> {
      return this.http.get(`${API_URL}/payes/`);
    }
  
    // Méthode pour créer un utilisateur
    createpaye(paye: any): Observable<any> {
      return this.http.post(`${API_URL}/payes/`, paye);
    }
}
