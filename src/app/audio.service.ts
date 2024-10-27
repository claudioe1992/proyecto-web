import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AudioService {
  private audioContext: AudioContext;
  private backgroundSound: AudioBufferSourceNode | null = null;

  constructor() {
    // Crear el contexto de audio
    this.audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
  }

  // Método para asegurarse de que el AudioContext esté activo tras la interacción del usuario
  private async ensureAudioContextRunning() {
    if (this.audioContext.state === 'suspended') {
      await this.audioContext.resume();
    }
  }

  // Reproducir sonido general
  async playSound(url: string) {
    await this.ensureAudioContextRunning();  // Asegurar que el AudioContext esté activo

    const response = await fetch(url);
    const arrayBuffer = await response.arrayBuffer();
    const audioBuffer = await this.audioContext.decodeAudioData(arrayBuffer);
    const source = this.audioContext.createBufferSource();
    source.buffer = audioBuffer;
    source.connect(this.audioContext.destination);
    source.start(0);
  }

  // Reproducir música de fondo
  async playBackgroundSound(url: string) {
    await this.ensureAudioContextRunning();  // Asegurar que el AudioContext esté activo

    if (this.backgroundSound) {
      this.backgroundSound.stop();  // Detener cualquier sonido de fondo previo
    }

    const response = await fetch(url);
    const arrayBuffer = await response.arrayBuffer();
    const audioBuffer = await this.audioContext.decodeAudioData(arrayBuffer);

    // Crear un nuevo AudioBufferSourceNode para reproducir la música de fondo
    this.backgroundSound = this.audioContext.createBufferSource();
    this.backgroundSound.buffer = audioBuffer;
    this.backgroundSound.loop = true;  // Configurar en loop
    this.backgroundSound.connect(this.audioContext.destination);
    this.backgroundSound.start(0);
  }

  // Detener la música de fondo
  stopBackgroundSound() {
    if (this.backgroundSound) {
      this.backgroundSound.stop();  // Detener la música de fondo
      this.backgroundSound = null;  // Reiniciar a null después de detener
    }
  }
}
