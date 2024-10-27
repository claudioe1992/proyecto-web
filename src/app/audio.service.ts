import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AudioService {
  private audioContext: AudioContext;
  private backgroundSound: AudioBufferSourceNode | null = null;
  private backgroundDuration = 0;

  constructor() {
    this.audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
  }

  private async ensureAudioContextRunning() {
    if (this.audioContext.state === 'suspended') {
      await this.audioContext.resume();
    }
  }

  async playSound(url: string) {
    await this.ensureAudioContextRunning();
    const response = await fetch(url);
    const arrayBuffer = await response.arrayBuffer();
    const audioBuffer = await this.audioContext.decodeAudioData(arrayBuffer);
    const source = this.audioContext.createBufferSource();
    source.buffer = audioBuffer;
    source.connect(this.audioContext.destination);
    source.start(0);
  }

  async playBackgroundSound(url: string) {
    await this.ensureAudioContextRunning();
    if (this.backgroundSound) {
      this.stopBackgroundSound(); // Detener el sonido anterior
    }
    
    const response = await fetch(url);
    const arrayBuffer = await response.arrayBuffer();
    const audioBuffer = await this.audioContext.decodeAudioData(arrayBuffer);

    // Crear un nuevo buffer source
    this.backgroundSound = this.audioContext.createBufferSource();
    this.backgroundSound.buffer = audioBuffer;
    this.backgroundSound.loop = true;
    this.backgroundSound.connect(this.audioContext.destination);
    this.backgroundSound.start(0);

    this.backgroundDuration = audioBuffer.duration;
  }

  stopBackgroundSound() {
    if (this.backgroundSound) {
      this.backgroundSound.stop();
      this.backgroundSound = null;
    }
  }

  getDuration() {
    return this.backgroundDuration;
  }

  getCurrentTime() {
    return this.audioContext.currentTime;
  }

  seekTo(time: number) {
    this.stopBackgroundSound(); // Detener la reproducción actual

    if (this.backgroundSound && this.backgroundSound.buffer) {
      this.backgroundSound = this.audioContext.createBufferSource();
      this.backgroundSound.buffer = this.backgroundSound.buffer;
      this.backgroundSound.connect(this.audioContext.destination);
      this.backgroundSound.loop = true;
      this.backgroundSound.start(0, time); // Reproducir desde el tiempo especificado
    }
  }
}
