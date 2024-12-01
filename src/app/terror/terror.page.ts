import { Component, OnInit, OnDestroy } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';
import { AudioService } from '../audio.service';

@Component({
  selector: 'app-terror',
  templateUrl: './terror.page.html',
  styleUrls: ['./terror.page.scss'],
})
export class TerrorPage implements OnInit, OnDestroy {
  grid: { color: string; active: boolean }[] = [];
  colors = ['red', 'green', 'blue'];
  score = 0;
  activeIndex: number | null = null;
  timeLimit = 60; // 1 minuto
  timer = this.timeLimit; // Tiempo restante
  gameStarted = false;
  interval: any;
  timerInterval: any;
  isPlaying = false;
  alertPresented = false;

  constructor(
    private audioService: AudioService,
    private alertController: AlertController,
    private router: Router
  ) {}

  ngOnInit() {
    this.audioService.stopBackgroundSound();
    this.initGrid();
  }

  ngOnDestroy() {
    this.audioService.stopBackgroundSound();
    this.dismissAlert();
  }

  initGrid() {
    this.grid = Array(9)
      .fill(0)
      .map(() => ({ color: 'black', active: false }));
  }

  startGame() {
    this.audioService.playBackgroundSound('assets/sounds/musicafondo.mp3');
    this.gameStarted = true;
    this.score = 0;
    this.timer = this.timeLimit;

    this.timerInterval = setInterval(() => {
      this.timer--;
      if (this.timer <= 0) {
        this.endGame();
      }
    }, 1000);

    this.interval = setInterval(() => {
      this.activateRandomCell();
    }, 1000);
  }

  activateRandomCell() {
    if (this.activeIndex !== null) {
      this.grid[this.activeIndex].color = 'black';
      this.grid[this.activeIndex].active = false;
    }

    const randomIndex = Math.floor(Math.random() * this.grid.length);
    this.grid[randomIndex].color = this.colors[Math.floor(Math.random() * 3)];
    this.grid[randomIndex].active = true;
    this.activeIndex = randomIndex;
  }

  onCellClick(index: number) {
    if (index === this.activeIndex) {
      this.audioService.playSound('assets/sounds/start.mp3');
      this.score++;
      this.grid[index].color = 'black';
      this.grid[index].active = false;
      this.activeIndex = null;
    }
  }

  resetGame() {
    clearInterval(this.interval);
    clearInterval(this.timerInterval);
    this.audioService.stopBackgroundSound();
    this.timer = this.timeLimit;
    this.score = 0;
    this.initGrid();
    this.gameStarted = false;
  }

  async endGame() {
    clearInterval(this.interval);
    clearInterval(this.timerInterval);
    this.audioService.stopBackgroundSound();
    this.gameStarted = false;

    if (this.alertPresented) {
      return;
    }
    this.alertPresented = true;

    const alert = await this.alertController.create({
      header: '¡Juego Terminado!',
      subHeader: `Tu puntuación es: ${this.score} puntos.`,
      message: 'Ingresa tus iniciales para guardar tu puntuación:',
      inputs: [
        {
          name: 'initials',
          type: 'text',
          placeholder: 'Tus iniciales (máx 3)',
          attributes: {
            maxlength: 3,
          },
        },
      ],
      buttons: [
        {
          text: 'Guardar',
          handler: (data) => {
            this.saveScore(data.initials || '---'); // Guardar puntuación con iniciales
            this.router.navigate(['/terror']); // Reiniciar página
          },
        },
        {
          text: 'Cerrar',
          handler: () => {
            this.router.navigate(['/page3']); // Ir a otra página
          },
        },
      ],
    });

    await alert.present();

    alert.onDidDismiss().then(() => {
      this.alertPresented = false;
    });
  }

  saveScore(initials: string) {
    const scores = JSON.parse(localStorage.getItem('scores') || '[]');
    scores.push({
      initials: initials.toUpperCase(),
      score: this.score,
      page: 'Terror',
    });
    localStorage.setItem('scores', JSON.stringify(scores));
  }

  dismissAlert() {
    if (this.alertPresented) {
      this.alertController.dismiss().catch(() => {});
      this.alertPresented = false;
    }
  }

  ionViewWillLeave() {
    this.endGame();
  }
}
