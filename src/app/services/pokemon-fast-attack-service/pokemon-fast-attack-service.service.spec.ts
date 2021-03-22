import { TestBed } from '@angular/core/testing';

import { PokemonFastAttackServiceService } from './pokemon-fast-attack-service.service';

describe('PokemonFastAttackServiceService', () => {
  let service: PokemonFastAttackServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PokemonFastAttackServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
