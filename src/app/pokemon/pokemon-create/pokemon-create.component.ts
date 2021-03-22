import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { IMultiSelectOption, IMultiSelectSettings, IMultiSelectTexts } from 'ngx-bootstrap-multiselect';
import { PokemonServiceService } from 'src/app/services/pokemon-service/pokemon-service.service';
import { PokemonSpecialAttackServiceService } from 'src/app/services/pokemon-special-attack-service/pokemon-special-attack-service.service';
import { pokemonTypes } from '../pokemon.types';
import { pokemonFastAttacks } from '../pokemonFastAttacks';
import { pokemonIdSpecialAttacks, pokemonSpecialAttacks } from '../pokemonSpecialAttacks';

@Component({
  selector: 'app-pokemon-create',
  templateUrl: './pokemon-create.component.html',
  styleUrls: ['./pokemon-create.component.css']
})
export class PokemonCreateComponent implements OnInit {
  optionsModel: number[] = [];
  pokemon:any = {
    weight: {},
    height: {}
  };
  myOptions: IMultiSelectOption[] = pokemonTypes;
  fastAttacksOptions: IMultiSelectOption[] = pokemonFastAttacks;
  specialAttacksOptions: IMultiSelectOption[] = pokemonIdSpecialAttacks;
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

  constructor(private pokemonService: PokemonServiceService, private router: Router, private pokemonSpecialAttacksService: PokemonSpecialAttackServiceService) { }

  ngOnInit(): void {
    this.pokemonSpecialAttacksService.findAll().subscribe((res)=>{
      console.log(res.body)
    })
  }

  save(form: NgForm){
    if(form.submitted){
      if(form.valid){
        if(this.specialAttacksSelecteds){
          this.pokemon.specialAttack = [];
          this.specialAttacksSelecteds.forEach((element:any)=>{
            console.log(element)
            this.pokemon.specialAttack.push(pokemonSpecialAttacks[element]);
          })
        }
        console.log(this.pokemon)
        this.pokemonService.save(this.pokemon).subscribe(()=>{
          this.router.navigate(['/pokemon']);
        })
      }
    }
    console.log(this.pokemon)

  }

}
