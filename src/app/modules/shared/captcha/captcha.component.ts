import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-captcha',
  templateUrl: './captcha.component.html',
  styleUrls: ['./captcha.component.scss']
})
export class CaptchaComponent {
  imagenes = [
    { path: './assets/captcha_1.png', textoSubrayado: 'mxyxq' },
    { path: './assets/captcha_2.png', textoSubrayado: 'x2cnn' },
    { path: './assets/captcha_3.png', textoSubrayado: '74853' },
    { path: './assets/captcha_4.png', textoSubrayado: 'n4xx5' },
  ];
  @Output() captchaVerificado = new EventEmitter<boolean>();


  imagenSeleccionada = '';
  respuestaUsuario = '';

  constructor() {
    // Selecciona una imagen aleatoria al inicializar
    this.seleccionarImagenAleatoria();
  }

  seleccionarImagenAleatoria() {
    const indiceAleatorio = Math.floor(Math.random() * this.imagenes.length);
    this.imagenSeleccionada = this.imagenes[indiceAleatorio].path;
  }

  verificarCaptcha() {
    const captchaCorrecto = this.imagenes.find(
      (imagen) => imagen.path === this.imagenSeleccionada && imagen.textoSubrayado === this.respuestaUsuario
    );

    if (captchaCorrecto) {
      const captchaPaso = true; 
      this.captchaVerificado.emit(captchaPaso);
      console.log('Captcha válido. ¡No es un robot!');
    } else {
      const captchaPaso = true; 
      this.captchaVerificado.emit(captchaPaso);
      console.log('Captcha inválido. Podría ser un robot.');
      this.seleccionarImagenAleatoria();
      this.respuestaUsuario = '';
    }
  }
}