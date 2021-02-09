import { TestBed } from '@angular/core/testing';

import { GamedbService } from './gamedbservice.service';

describe('GamedbserviceService', () => {
  let service: GamedbService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GamedbService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
