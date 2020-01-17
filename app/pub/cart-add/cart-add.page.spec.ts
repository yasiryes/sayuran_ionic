import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { CartAddPage } from './cart-add.page';

describe('CartAddPage', () => {
  let component: CartAddPage;
  let fixture: ComponentFixture<CartAddPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CartAddPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(CartAddPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
