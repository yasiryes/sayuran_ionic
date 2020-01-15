import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { PromoDetPage } from './promo-det.page';

describe('PromoDetPage', () => {
  let component: PromoDetPage;
  let fixture: ComponentFixture<PromoDetPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PromoDetPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(PromoDetPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
