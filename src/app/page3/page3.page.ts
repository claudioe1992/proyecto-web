import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular'; // Importa NavController
import { AudioService } from '../audio.service';  // Importa el servicio de audio

@Component({
  selector: 'app-page3',
  templateUrl: './page3.page.html',
  styleUrls: ['./page3.page.scss'],
})
export class Page3Page implements OnInit {

  constructor(private navCtrl: NavController, private audioService: AudioService) {}

  ngOnInit() {}

  navigateToComponent() {
    console.log("Comenzar partida clickeado");
    this.audioService.playSound('assets/sounds/suspenso4.mp3').then(() => {
      console.log("Reproducción de sonido iniciada");
    }).catch(err => {
      console.error("Error al reproducir sonido:", err);
    });
    this.navCtrl.navigateForward('/terror'); // Navega a la página de terror
  }

  // Método para redirigir a la página de error
  navigateToError() {
    console.log("Redirigiendo a la página de error");
    this.navCtrl.navigateForward('/pagina-error'); // Navega a la página de error
  }
}
