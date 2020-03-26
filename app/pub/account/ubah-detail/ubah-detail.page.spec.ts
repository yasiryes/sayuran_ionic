import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { UbahDetailPage } from './ubah-detail.page';

describe('UbahDetailPage', () => {
  let component: UbahDetailPage;
  let fixture: ComponentFixture<UbahDetailPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UbahDetailPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(UbahDetailPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
