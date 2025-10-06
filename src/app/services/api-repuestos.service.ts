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
  selected?: boolean; // Propiedad opcional para seguimiento de selección
}

@Injectable({
  providedIn: 'root'
})
export class ApiRepuestosService {

  private apiUrl = 'http://localhost:3000/repuestos'; // Reemplaza con la URL real de tu API

  constructor( private http:HttpClient) { }

  getRepuestos(): Observable<Repuesto[]> {
    return this.http.get<Repuesto[]>(this.apiUrl);
  }

  getRepuesto(id: number): Observable<Repuesto> {
    return this.http.get<Repuesto>(`${this.apiUrl}/${id}`);
  }

  crearRepuesto(data: FormData): Observable<Repuesto> {
    return this.http.post<Repuesto>(this.apiUrl, data);
  }

  deshabilitarRepuesto(id: number): Observable<Repuesto> {
    return this.http.patch<Repuesto>(`${this.apiUrl}/${id}/deshabilitar`, {});
  }
}
