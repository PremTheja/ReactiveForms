import { TestBed } from '@angular/core/testing';

import { BailFormService } from './bail-form.service';

describe('BailFormService', () => {
  let service: BailFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BailFormService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
