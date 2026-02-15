import { TestBed } from '@angular/core/testing';
import { ResolveFn } from '@angular/router';

import { bailResolver } from './bail.resolver';

describe('bailResolver', () => {
  const executeResolver: ResolveFn<boolean> = (...resolverParameters) => 
      TestBed.runInInjectionContext(() => bailResolver(...resolverParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeResolver).toBeTruthy();
  });
});
