import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';  // Importar Router para navegación

@Component({
  selector: 'app-recuperacion',
  templateUrl: './recuperacion.page.html',
  styleUrls: ['./recuperacion.page.scss'],
})
export class RecuperacionPage implements OnInit {
  recoveryForm!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router  // Inyectar Router para la navegación
  ) {}

  ngOnInit() {
    // Configurar el formulario reactivo con una validación de correo electrónico
    this.recoveryForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]]
    });
  }

  onSubmit() {
    if (this.recoveryForm.valid) {
      console.log('Correo válido', this.recoveryForm.value.email);
      // Aquí iría la lógica para enviar el enlace de recuperación, como una llamada a una API
      // Simulación de éxito en la recuperación de contraseña

      // Redirigir a la página de inicio de sesión (login)
      this.router.navigate(['/login']);
    } else {
      console.log('Formulario inválido');
    }
  }
}
