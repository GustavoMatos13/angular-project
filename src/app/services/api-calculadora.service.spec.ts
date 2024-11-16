import { TestBed } from '@angular/core/testing';

import { ApiCalculadoraService } from './api-calculadora.service';

describe('ApiCalculadoraService', () => {
  let service: ApiCalculadoraService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ApiCalculadoraService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
