import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-contactenos',
  standalone: false,

  templateUrl: './contactenos.component.html',
  styleUrl: './contactenos.component.css'
})
export class ContactenosComponent {
  /**
   * Este sitio es una página estática (Angular compilado, sin backend
   * propio): no hay ningún servidor al que enviarle estos formularios.
   * Antes, los dos formularios de esta pantalla (la barra de "dudas" y
   * el "Formulario de Opinión") eran puramente decorativos: los botones
   * no tenían ningún manejador y los campos usaban clases de Bootstrap
   * is-valid/is-invalid escritas a mano, mostrando siempre el mismo
   * estado sin importar lo que la persona escribiera.
   *
   * En vez de simular un envío que no existe, ambos formularios ahora
   * validan de verdad en el navegador y, si son válidos, abren el
   * cliente de correo de quien visita la página (mailto:) con el
   * mensaje ya redactado, dirigido a la misma dirección publicada en
   * la sección de contacto.
   */
  private readonly correoContacto = 'contacto@zoofipets.com';

  enviado = false;
  dudaEnviada = false;

  formDuda: FormGroup;
  formOpinion: FormGroup;

  constructor(private fb: FormBuilder) {
    this.formDuda = this.fb.group({
      mensaje: ['', [Validators.required, Validators.minLength(5)]],
    });

    this.formOpinion = this.fb.group({
      nombre: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      tipo: ['', [Validators.required]],
      mensaje: ['', [Validators.required, Validators.minLength(10)]],
      confirmacion: [false, [Validators.requiredTrue]],
    });
  }

  get d() {
    return this.formDuda.controls;
  }

  get o() {
    return this.formOpinion.controls;
  }

  enviarDuda(): void {
    this.dudaEnviada = false;
    if (this.formDuda.invalid) {
      this.formDuda.markAllAsTouched();
      return;
    }

    const mensaje = this.formDuda.value.mensaje as string;
    const asunto = encodeURIComponent('Duda desde la web - ZoofiPets');
    const cuerpo = encodeURIComponent(mensaje);
    this.abrirCorreo(`mailto:${this.correoContacto}?subject=${asunto}&body=${cuerpo}`);

    this.dudaEnviada = true;
    this.formDuda.reset();
  }

  restablecerDuda(): void {
    this.formDuda.reset();
    this.dudaEnviada = false;
  }

  enviarOpinion(): void {
    this.enviado = false;
    if (this.formOpinion.invalid) {
      this.formOpinion.markAllAsTouched();
      return;
    }

    const { nombre, email, tipo, mensaje } = this.formOpinion.value;
    const asunto = encodeURIComponent(`Opinión (${tipo}) de ${nombre} - ZoofiPets`);
    const cuerpo = encodeURIComponent(
      `Nombre: ${nombre}\nCorreo: ${email}\nTipo de opinión: ${tipo}\n\n${mensaje}`
    );
    this.abrirCorreo(`mailto:${this.correoContacto}?subject=${asunto}&body=${cuerpo}`);

    this.enviado = true;
    this.formOpinion.reset();
  }

  /**
   * Aislado en su propio método para poder interceptarlo (spyOn) en los
   * tests unitarios sin que el navegador de pruebas intente navegar de
   * verdad a una URL mailto:.
   */
  protected abrirCorreo(href: string): void {
    window.location.href = href;
  }
}
