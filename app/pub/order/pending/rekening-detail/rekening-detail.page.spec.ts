import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { RekeningDetailPage } from './rekening-detail.page';

describe('RekeningDetailPage', () => {
  let component: RekeningDetailPage;
  let fixture: ComponentFixture<RekeningDetailPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RekeningDetailPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(RekeningDetailPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
