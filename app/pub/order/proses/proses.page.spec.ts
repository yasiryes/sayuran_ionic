import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProsesPage } from './proses.page';

describe('ProsesPage', () => {
  let component: ProsesPage;
  let fixture: ComponentFixture<ProsesPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProsesPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProsesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
