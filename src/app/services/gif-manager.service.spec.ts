import { TestBed } from '@angular/core/testing';

import { GifManagerService } from './gif-manager.service';

describe('GifManagerService', () => {
  let service: GifManagerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GifManagerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
