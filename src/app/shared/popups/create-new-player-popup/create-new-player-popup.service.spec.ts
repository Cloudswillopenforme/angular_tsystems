import { TestBed } from '@angular/core/testing';

import { CreateNewPlayerPopupService } from './create-new-player-popup.service';

describe('CreateNewPlayerPopupService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CreateNewPlayerPopupService = TestBed.get(CreateNewPlayerPopupService);
    expect(service).toBeTruthy();
  });
});
