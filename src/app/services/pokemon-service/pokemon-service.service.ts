import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PokemonServiceService {

  constructor(private _http: HttpClient) { }

  findByName(name:string, params:any) {
    return this._http.get(`${environment.url}/pokemons/search/${encodeURIComponent(name)}`, { params:  params,  observe: 'response' });
  }

  findAll(params:any) {
    return this._http.get(`${environment.url}/pokemons`, { params:  params,  observe: 'response' });
  }

  findById(id:string) {
    return this._http.get(`${environment.url}/pokemons/${id}`, { observe: 'response' });
  }

  deleteById(id:string){
    return this._http.delete(`${environment.url}/pokemons/${id}`, { observe: 'response' });
  }

  update(pokemon:any){
    return this._http.patch(`${environment.url}/pokemons`, pokemon, { observe: 'response' });
  }

  save(pokemon:any): Observable<any>{
    return this._http.post(`${environment.url}/pokemons`, pokemon, {  observe: 'response' });
  }
}
