import { TestBed } from '@angular/core/testing';

import { IntrospectionViewService } from './introspection-view.service';

describe('IntrospectionViewService', () => {
  let service: IntrospectionViewService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(IntrospectionViewService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
