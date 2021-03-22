import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { IMultiSelectOption, IMultiSelectSettings, IMultiSelectTexts } from 'ngx-bootstrap-multiselect';
import { Observable } from 'rxjs';
import { PokemonServiceService } from 'src/app/services/pokemon-service/pokemon-service.service';
import { pokemonTypes } from '../pokemon.types';
import { map } from 'rxjs/operators';
import { PokemonFastAttackServiceService } from 'src/app/services/pokemon-fast-attack-service/pokemon-fast-attack-service.service';
import {pokemonFastAttacks, pokemonIdFastAttacks} from '../pokemonFastAttacks'
import { pokemonIdSpecialAttacks, pokemonSpecialAttacks } from '../pokemonSpecialAttacks';

@Component({
  selector: 'app-pokemon-edit',
  templateUrl: './pokemon-edit.component.html',
  styleUrls: ['./pokemon-edit.component.css']
})
export class PokemonEditComponent implements OnInit {

  optionsModel: number[] = [];
  pokemon:any = {
    weight: {

    },
    height: {}
  };
  weight:any = {};
  height:any = {};
  myOptions: IMultiSelectOption[] = pokemonTypes;
  fastAttacksOptions: IMultiSelectOption[] = pokemonIdFastAttacks;
  specialAttacksOptions: IMultiSelectOption[] = pokemonIdSpecialAttacks;
  fastAttacksSelecteds:any[] = [];
  specialAttacksSelecteds:any[] = [];

  myTexts: IMultiSelectTexts = {
    checkAll: 'Select all',
    uncheckAll: 'Unselect all',
    checked: 'item selected',
    checkedPlural: 'items selected',
    searchPlaceholder: 'Find',
    searchEmptyResult: 'Nothing found...',
    searchNoRenderText: 'Type in search box to see results...',
    defaultTitle: 'Select',
    allSelected: 'All selected',
};

mySettings: IMultiSelectSettings = {
  enableSearch: true,
  checkedStyle: 'checkboxes',
  dynamicTitleMaxItems: 3,
  displayAllSelectedText: true
};

  constructor(private pokemonService: PokemonServiceService, private router: Router,
     private route: ActivatedRoute, private pokemonFastAttacksService: PokemonFastAttackServiceService) {

      const getId: Observable<string> = route.params.pipe(map(p => p.id));
    getId.subscribe((id:string)=>{
      
      this.find(id);
    })
    
   }

  ngOnInit(): void {
    
  }

  find(id:string){
    this.pokemonService.findById(id).subscribe((res)=>{
      if(res.body){
        console.log(res.body)
        this.pokemon = res.body;
        if(this.pokemon.weight){
          this.weight.minimum = this.pokemon.weight.Minimum ? this.pokemon.weight.Minimum : "";
          this.weight.maximum = this.pokemon.weight.Maximum ? this.pokemon.weight.Maximum : "";
        }
        if(this.pokemon.height){
          this.height.minimum = this.pokemon.height.Minimum ? this.pokemon.height.Minimum : "";
          this.height.maximum = this.pokemon.height.Maximum ? this.pokemon.height.Maximum : "";
        }
        if(this.pokemon.fastAttack){
         this.pokemon.fastAttack.map((element:any) => {
           pokemonIdFastAttacks.forEach((elementFilter)=>{
              if(elementFilter.name === element.Name){
                this.fastAttacksSelecteds.push(elementFilter.id)              
              }
            })
          });
        }
        if(this.pokemon.specialAttack){
          this.pokemon.specialAttack.map((element:any) => {
            
            pokemonIdSpecialAttacks.forEach((elementFilter)=>{
              console.log(element.Name)
               if(elementFilter.name === element.Name){
                 console.log(elementFilter)
                 this.specialAttacksSelecteds.push(elementFilter.id)              
               }
             })
           });
         }
      }
    })
  }

  save(form: NgForm){
    if(form.submitted){
      if(form.valid){
        if(!this.pokemon.weight){
          this.pokemon.weight = {};
        }
        if(!this.pokemon.height){
          this.pokemon.height = {};
        }
        if(this.weight){
          this.pokemon.weight.Maximum = this.weight.maximum;
          this.pokemon.weight.Minimum = this.weight.minimum;
        }
        if(this.height){
          this.pokemon.height.Maximum = this.height.maximum;
          this.pokemon.height.Minimum = this.height.minimum;
        }
        if(this.fastAttacksSelecteds){
          this.pokemon.fastAttack = [];
          this.fastAttacksSelecteds.forEach((element:any)=>{
            this.pokemon.fastAttack.push(pokemonFastAttacks[element].id);
          })
        }
        if(this.specialAttacksSelecteds){
          this.pokemon.specialAttack = [];
          this.specialAttacksSelecteds.forEach((element:any)=>{
            console.log(element)
            this.pokemon.specialAttack.push(pokemonSpecialAttacks[element]);
          })
        }
        console.log(this.pokemon.specialAttack)
        this.pokemonService.update(this.pokemon).subscribe(()=>{
          this.router.navigate(['/pokemon']);
        })
      }
    }

  }



}
