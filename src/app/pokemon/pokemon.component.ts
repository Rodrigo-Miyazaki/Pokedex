import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginServiceService } from 'src/app/services/login-service/login-service.service';
import { PokemonServiceService } from '../services/pokemon-service/pokemon-service.service';

@Component({
  selector: 'app-pokemon',
  templateUrl: './pokemon.component.html',
  styleUrls: ['./pokemon.component.css']
})
export class PokemonComponent implements OnInit {

  tfa: any = {};
  authcode: string = "";
  errorMessage: any = null;
  cols:any[] = [];
  pokemons:any[] = [];
  totalRecords:number = 0;
  rowsByPage = 10;
  first = 0;
  skip = 0;
  totalPages = 0;
  filter:string ="";
  constructor(private _loginService: LoginServiceService, private router: Router, private pokemonService: PokemonServiceService) {
    this.getAuthDetails();
  }

  ngOnInit() {
    this.cols = [
      {header: "Nome", field: "name"},
      {header: "Geração", field: "generation"},
      {header: "Tipos", field: "types"},
      {header: "Quantidade de ataques", field: "qtdAttack"},
    ]

  }

  find(){
    let name = this.filter;
    console.log(name)
    let params = {
      first: this.first,
      skip: this.skip,
      limit: this.rowsByPage
    }
    if(this.filter){
      this.pokemonService.findByName(this.filter, params).subscribe((res:any)=>{
        console.log(res);
        if(res.body){
          console.log(res.body)
          this.totalRecords = res.body.totalRecords;
          this.totalPages = Math.floor(this.totalRecords/10)+1
          this.pokemons = res.body.items;
        }
  
      })
    } else {
      this.pokemonService.findAll(params).subscribe((res:any)=>{
        console.log(res);
        if(res.body){
          console.log(res.body)
          this.totalRecords = res.body.totalRecords;
          this.totalPages = Math.floor(this.totalRecords/10)+1
          this.pokemons = res.body.items;
        }
  
      })
    }

  }

  nextPage(index:any){
    console.log(index)
    this.first = index;
    this.skip = index * 10;
    this.find();
  }

  getAuthDetails() {
    this._loginService.getAuth().subscribe((data) => {
      const result = data.body
      if (data['status'] === 200) {
        console.log(result);
        if (result == null) {
          this.setup();
          
        } else {
          this.tfa = result;
        }
        this.find();
      }
    });
  }

  setup() {
    this._loginService.setupAuth().subscribe((data) => {
      const result = data.body
      if (data['status'] === 200) {
        console.log(result);
        this.tfa = result;
      }
    });
  }

  confirm() {
    this._loginService.verifyAuth(this.authcode).subscribe((data) => {
      let result:any = {status: null,  message: null}
      result = data.body;
      if (result['status'] === 200) {
        console.log(result);
        this.errorMessage = null;
        this.tfa.secret = this.tfa.tempSecret;
        this.tfa.tempSecret = "";
      } else {
        this.errorMessage = result['message'];
      }
    });
  }

  disabledTfa() {
    this._loginService.deleteAuth().subscribe((data) => {
      const result = data.body
      if (data['status'] === 200) {
        console.log(result);
        this.authcode = "";
        this.getAuthDetails();
      }
    });
  }

  criar(){
    this.router.navigate(['pokemon/create']);
  }

  edit(row:any){
console.log(row)
  this.router.navigate([`pokemon/edit/${row._id}`]);
  }

  delete(row:any){
    this.pokemonService.deleteById(row._id).subscribe(()=>{
      this.find();
    })
  }

}
