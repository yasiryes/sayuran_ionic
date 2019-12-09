import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { CariProdukPage } from './cari-produk.page';

describe('CariProdukPage', () => {
  let component: CariProdukPage;
  let fixture: ComponentFixture<CariProdukPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CariProdukPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(CariProdukPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
