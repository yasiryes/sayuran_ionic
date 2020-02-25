import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { SmsVerifyPage } from './sms-verify.page';

describe('SmsVerifyPage', () => {
  let component: SmsVerifyPage;
  let fixture: ComponentFixture<SmsVerifyPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SmsVerifyPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(SmsVerifyPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
