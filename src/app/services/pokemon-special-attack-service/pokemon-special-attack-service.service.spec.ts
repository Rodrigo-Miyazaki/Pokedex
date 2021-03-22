import { TestBed } from '@angular/core/testing';

import { PokemonSpecialAttackServiceService } from './pokemon-special-attack-service.service';

describe('PokemonSpecialAttackServiceService', () => {
  let service: PokemonSpecialAttackServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PokemonSpecialAttackServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
