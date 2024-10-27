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
    console.log("entré línea 20")
      // Navegar a la página3
    this.audioService.playSound('assets/sounds/start.mp3');
    this.navCtrl.navigateForward('/home');  // Aquí se indica la ruta correcta '/pagina2'
  } 
}
