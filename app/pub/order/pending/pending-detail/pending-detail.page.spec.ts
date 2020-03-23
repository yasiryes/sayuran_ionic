import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { PendingDetailPage } from './pending-detail.page';

describe('PendingDetailPage', () => {
  let component: PendingDetailPage;
  let fixture: ComponentFixture<PendingDetailPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PendingDetailPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(PendingDetailPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
