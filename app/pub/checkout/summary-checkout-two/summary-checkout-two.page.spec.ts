import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { SummaryCheckoutTwoPage } from './summary-checkout-two.page';

describe('SummaryCheckoutTwoPage', () => {
  let component: SummaryCheckoutTwoPage;
  let fixture: ComponentFixture<SummaryCheckoutTwoPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SummaryCheckoutTwoPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(SummaryCheckoutTwoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
