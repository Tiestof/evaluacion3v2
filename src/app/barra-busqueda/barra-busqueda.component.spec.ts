import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { BarraBusquedaComponent } from './barra-busqueda.component';

describe('BarraBusquedaComponent', () => {
  let component: BarraBusquedaComponent;
  let fixture: ComponentFixture<BarraBusquedaComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [BarraBusquedaComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(BarraBusquedaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
