import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UtilityService {

  private isGameOver: BehaviorSubject<{gameOver: boolean, hasWon: boolean}> = new BehaviorSubject<{gameOver: boolean, hasWon: boolean}>({gameOver: false, hasWon: false});
  private playerHealth: BehaviorSubject<number> = new BehaviorSubject<number>(100);

  constructor() { }

  getIsGameOver(): Observable<{gameOver: boolean, hasWon: boolean}> {
    return this.isGameOver.asObservable();
  }

  setIsGameOver(gameOver: boolean, hasWon: boolean): void {
    this.isGameOver.next({gameOver, hasWon});
  }

  resetPlayerHealth(): void {
    this.playerHealth.next(100);
    localStorage.setItem('playerHealth', JSON.stringify(100));
  }

  setPlayerHealth(): void {
    this.playerHealth.next(this.playerHealth.value - 1);
    if (this.playerHealth.value <= 0) {
      localStorage.setItem('playerHealth', JSON.stringify(0));
    } else {
      localStorage.setItem('playerHealth', JSON.stringify(this.playerHealth.value));
    }
  }

  getPlayerHealth(): Observable<number> {
    const playerHealth = localStorage.getItem('playerHealth');
    if (playerHealth) {
     this.playerHealth.next(JSON.parse(playerHealth));
    }
    return this.playerHealth.asObservable();
  }

  savePlayerName(playerName: string): void {
    localStorage.setItem('playerName', playerName);
  }

  getPlayerName(): string {
    return localStorage.getItem('playerName') || '';
  }
}
