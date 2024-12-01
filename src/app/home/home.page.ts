import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular'; // Asegúrate de importar NavController
import { AudioService } from '../audio.service';  // Importar el servicio de audio

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  constructor(private navCtrl: NavController, private audioService: AudioService) {}

  ngOnInit() {
    // Reproducir la música de fondo al cargar la página
    this.audioService.playBackgroundSound('assets/sounds/background.mp3');
  }

  navigateToComponent() {
     // Navegar a la página2
    this.navCtrl.navigateForward('/page2');  // Asegúrate de que '/page2' sea la ruta correcta
     // Reproducir sonido al presionar el botón 'Start'
    this.audioService.playSound('assets/sounds/start.mp3');
  }
}
