import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KirimPage } from './kirim.page';

describe('KirimPage', () => {
  let component: KirimPage;
  let fixture: ComponentFixture<KirimPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KirimPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KirimPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
