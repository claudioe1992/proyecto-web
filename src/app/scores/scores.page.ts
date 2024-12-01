import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-scores',
  templateUrl: './scores.page.html',
  styleUrls: ['./scores.page.scss'],
})
export class ScoresPage implements OnInit {
  scores: { initials: string; score: number; page: string }[] = [];

  constructor() {}

  ngOnInit() {
    this.loadScores();
  }

  loadScores() {
    try {
      // Leer las puntuaciones guardadas en localStorage
      const savedScores = JSON.parse(localStorage.getItem('scores') || '[]');

      // Validar que los datos cargados sean un array
      if (Array.isArray(savedScores)) {
        // Asegurarnos de que cada objeto tenga la estructura correcta
        this.scores = savedScores
          .filter((score) => this.isValidScore(score))
          .sort((a, b) => b.score - a.score); // Ordenar por puntuación descendente
      } else {
        this.scores = [];
      }
    } catch (error) {
      console.error('Error cargando las puntuaciones:', error);
      this.scores = [];
    }
  }

  isValidScore(score: any): boolean {
    // Validar la estructura de cada entrada
    return (
      score &&
      typeof score.initials === 'string' &&
      typeof score.score === 'number' &&
      typeof score.page === 'string'
    );
  }

  clearScores() {
    localStorage.removeItem('scores');
    this.scores = [];
  }
}
