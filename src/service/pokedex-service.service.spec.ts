import { TestBed } from '@angular/core/testing';

import { PokedexService } from './pokemon.service';

describe('PokedexServiceService', () => {
  let service: PokedexService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PokedexService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
