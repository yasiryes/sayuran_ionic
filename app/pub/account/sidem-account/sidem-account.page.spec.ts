import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SidemAccountPage } from './sidem-account.page';

describe('SidemAccountPage', () => {
  let component: SidemAccountPage;
  let fixture: ComponentFixture<SidemAccountPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SidemAccountPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SidemAccountPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
