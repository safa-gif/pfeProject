import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CbnComponent } from './cbn.component';

describe('CbnComponent', () => {
  let component: CbnComponent;
  let fixture: ComponentFixture<CbnComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CbnComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CbnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
