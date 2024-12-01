import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular'; // Para la navegación
import { AudioService } from '../audio.service';  // Para el servicio de audio
import { addIcons } from 'ionicons';  // Para añadir iconos personalizados
import { library, playCircle, radio, search } from 'ionicons/icons';  // Los iconos que vas a registrar

@Component({
  selector: 'app-page2',
  templateUrl: './page2.page.html',
  styleUrls: ['./page2.page.scss'],
})
export class Page2Page implements OnInit {  

  constructor(private navCtrl: NavController, private audioService: AudioService) {
    // Añadir los iconos que se registrarán en la aplicación
    addIcons({ library, playCircle, radio, search });
  }

  ngOnInit() {
    console.log('Página 2 inicializada');
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
    this.navCtrl.navigateForward('/page3');  // Cambia '/page3' a la ruta correcta de tu app
  }
}
