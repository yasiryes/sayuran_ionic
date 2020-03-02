import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PopCartPage } from './pop-cart.page';

describe('PopCartPage', () => {
  let component: PopCartPage;
  let fixture: ComponentFixture<PopCartPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PopCartPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PopCartPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
