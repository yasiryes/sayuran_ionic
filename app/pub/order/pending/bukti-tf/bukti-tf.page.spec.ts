import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { BuktiTfPage } from './bukti-tf.page';

describe('BuktiTfPage', () => {
  let component: BuktiTfPage;
  let fixture: ComponentFixture<BuktiTfPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BuktiTfPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(BuktiTfPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
