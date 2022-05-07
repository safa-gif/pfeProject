import { TestBed } from '@angular/core/testing';

import { CmdserviceService } from './cmdservice.service';

describe('CmdserviceService', () => {
  let service: CmdserviceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CmdserviceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
