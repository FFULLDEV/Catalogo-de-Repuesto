import { TestBed } from '@angular/core/testing';

import { ApiRepuestosService } from './api-repuestos.service';

describe('ApiRepuestosService', () => {
  let service: ApiRepuestosService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ApiRepuestosService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
