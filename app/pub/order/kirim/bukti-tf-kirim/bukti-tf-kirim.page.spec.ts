import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { BuktiTfKirimPage } from './bukti-tf-kirim.page';

describe('BuktiTfKirimPage', () => {
  let component: BuktiTfKirimPage;
  let fixture: ComponentFixture<BuktiTfKirimPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BuktiTfKirimPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(BuktiTfKirimPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
