import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PokemonFastAttackServiceService {

  constructor(private _http: HttpClient) { }

  findAll() {
    return this._http.get(`${environment.url}/fastAttacks`, {  observe: 'response' });
  }
}
