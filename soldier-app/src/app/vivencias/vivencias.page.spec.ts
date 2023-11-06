import { ComponentFixture, TestBed } from '@angular/core/testing';
import { VivenciasPage } from './vivencias.page';

describe('VivenciasPage', () => {
  let component: VivenciasPage;
  let fixture: ComponentFixture<VivenciasPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(VivenciasPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
