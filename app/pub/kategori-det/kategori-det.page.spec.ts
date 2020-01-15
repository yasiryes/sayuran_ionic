import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { KategoriDetPage } from './kategori-det.page';

describe('KategoriDetPage', () => {
  let component: KategoriDetPage;
  let fixture: ComponentFixture<KategoriDetPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KategoriDetPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(KategoriDetPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
