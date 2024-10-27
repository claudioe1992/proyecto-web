import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular'; // Asegúrate de importar NavController
import { AudioService } from '../audio.service';  // Importar el servicio de audio

@Component({
  selector: 'app-page3',
  templateUrl: './page3.page.html',
  styleUrls: ['./page3.page.scss'],
})
export class Page3Page implements OnInit {

  constructor(private navCtrl: NavController, private audioService: AudioService) {}

  // Método obligatorio cuando implementamos OnInit
  ngOnInit() {
    
  }

  navigateToComponent() {
    console.log("Comenzar partida clickeado");

    // Reproducir el sonido y navegar a la siguiente página
    this.audioService.playSound('assets/sounds/start.mp3').then(() => {
      console.log("Reproducción de sonido iniciada");
    }).catch(err => {
      console.error("Error al reproducir sonido:", err);
    });

    // Navegar a la siguiente página inmediatamente
    this.navCtrl.navigateForward('/terror');  // Cambia '/page3' a la ruta correcta de tu app
  }
}
