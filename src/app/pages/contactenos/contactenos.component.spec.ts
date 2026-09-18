import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';

import { ContactenosComponent } from './contactenos.component';

describe('ContactenosComponent', () => {
  let component: ContactenosComponent;
  let fixture: ComponentFixture<ContactenosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule],
      declarations: [ContactenosComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ContactenosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('no debe permitir enviar la duda si el mensaje esta vacio', () => {
    component.formDuda.setValue({ mensaje: '' });
    component.enviarDuda();
    expect(component.dudaEnviada).toBeFalse();
    expect(component.formDuda.touched).toBeTrue();
  });

  it('no debe permitir enviar la opinion si falta confirmar', () => {
    component.formOpinion.setValue({
      nombre: 'Ana',
      email: 'ana@example.com',
      tipo: 'queja',
      mensaje: 'Este es un mensaje de prueba valido',
      confirmacion: false,
    });
    component.enviarOpinion();
    expect(component.enviado).toBeFalse();
  });

  it('debe marcar la opinion como enviada cuando todos los campos son validos', () => {
    const abrirCorreoSpy = spyOn<any>(component, 'abrirCorreo');

    component.formOpinion.setValue({
      nombre: 'Ana',
      email: 'ana@example.com',
      tipo: 'queja',
      mensaje: 'Este es un mensaje de prueba valido',
      confirmacion: true,
    });
    component.enviarOpinion();

    expect(component.enviado).toBeTrue();
    expect(abrirCorreoSpy).toHaveBeenCalledTimes(1);
    expect(abrirCorreoSpy.calls.mostRecent().args[0]).toContain('mailto:contacto@zoofipets.com');
  });
});
