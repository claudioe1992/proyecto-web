import { Component, OnInit, OnDestroy } from '@angular/core';
import { AudioService } from '../audio.service'; // Asegúrate de que la ruta sea correcta

@Component({
  selector: 'app-terror',
  templateUrl: './terror.page.html',
  styleUrls: ['./terror.page.scss'],
})
export class TerrorPage implements OnInit, OnDestroy {
  isPlaying = false;
  currentTime = '0:00';
  duration = '2:00'; // Duración simulada para el ejemplo

  // Audio para sonidos adicionales
  additionalSounds: HTMLAudioElement[] = [
    new Audio('assets/sounds/grito 1.mp3'),
    new Audio('assets/sounds/vidrio2.mp3'),
    new Audio('assets/sounds/fantasma3.mp3'),
    new Audio('assets/sounds/sound4.mp3')
  ];

  // Estado de los sonidos adicionales
  isSoundPlaying: boolean[] = [false, false, false, false];

  constructor(private audioService: AudioService) {}

  ngOnInit() {
    this.audioService.stopBackgroundSound(); // Detener el sonido de fondo al cargar la página
  }

  ngOnDestroy() {
    this.audioService.stopBackgroundSound(); // Asegura que se detenga al salir
  }

  togglePlay() {
    if (this.isPlaying) {
      this.audioService.stopBackgroundSound(); // Detiene el sonido de fondo
    } else {
      this.audioService.playBackgroundSound('assets/sounds/musica fondo.mp3'); // Inicia el sonido de fondo
    }
    this.isPlaying = !this.isPlaying;
  }

  updateCurrentTime() {
    // Implementación de la lógica para actualizar el tiempo
  }

  formatTime(seconds: number) {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  }

  playAdditionalSound(index: number) {
    const sound = this.additionalSounds[index - 1];

    if (this.isSoundPlaying[index - 1]) {
      // Si ya se está reproduciendo, detenerlo
      sound.pause();
      sound.currentTime = 0; // Reiniciar el sonido
      this.isSoundPlaying[index - 1] = false;
    } else {
      // Si no se está reproduciendo, reproducirlo
      sound.currentTime = 0; // Reiniciar el sonido
      sound.play();
      this.isSoundPlaying[index - 1] = true;
    }
  }
}
