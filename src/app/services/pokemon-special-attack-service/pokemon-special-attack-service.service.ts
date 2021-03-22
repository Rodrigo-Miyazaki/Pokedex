import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PokemonSpecialAttackServiceService {

  constructor(private _http: HttpClient) { }

  findAll() {
    return this._http.get(`${environment.url}/specialAttacks`, {  observe: 'response' });
  }
}
