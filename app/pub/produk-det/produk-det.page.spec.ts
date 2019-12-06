import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProdukDetPage } from './produk-det.page';

describe('ProdukDetPage', () => {
  let component: ProdukDetPage;
  let fixture: ComponentFixture<ProdukDetPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProdukDetPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProdukDetPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
