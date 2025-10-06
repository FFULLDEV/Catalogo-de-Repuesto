import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Repuesto {
  id: number;
  nombre: string;
  marca: string;
  descripcion: string;
  precio: number;
  imagen: string;
  activo: any;
  selected?: boolean;
}

@Injectable({
  providedIn: 'root',
})
export class ApiRepuestosService {
  private apiUrl = 'http://localhost:3000/repuestos';

  constructor(private http: HttpClient) {}

  getRepuestos(): Observable<Repuesto[]> {
    return this.http.get<Repuesto[]>(this.apiUrl);
  }

  getDeshabilitados(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/deshabilitados`);
  }

  getRepuesto(id: number): Observable<Repuesto> {
    return this.http.get<Repuesto>(`${this.apiUrl}/${id}`);
  }

  crearRepuesto(data: FormData): Observable<Repuesto> {
    return this.http.post<Repuesto>(this.apiUrl, data);
  }

  toggleRepuesto(id: number): Observable<Repuesto> {
    return this.http.patch<Repuesto>(`${this.apiUrl}/${id}/toggle`, {});
  }

  // También devuelve el Observable
  actualizarRepuesto(id: number, data: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${id}`, data);
  }
}
