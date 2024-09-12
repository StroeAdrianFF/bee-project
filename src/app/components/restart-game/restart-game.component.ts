import { Component, OnInit } from '@angular/core';
import { UtilityService } from '../../services/utility/utility.service';
import { BeeService } from '../bee/bee.service';
import { take } from 'rxjs';
import { IBee } from '../../interfaces/bee.model';
import { IGameState } from '../../interfaces/game-state.model';

@Component({
  selector: 'app-restart-game',
  standalone: true,
  imports: [],
  templateUrl: './restart-game.component.html',
  styleUrl: './restart-game.component.css'
})
export class RestartGameComponent implements OnInit {

  hasPlayerWon: boolean = false;

  constructor(
    private utilityService: UtilityService,
    private beeService: BeeService
  ) { }

  ngOnInit(): void {
    this.checkIfPlayerWon();
  }

  resetGame(): void {
    this.utilityService.setIsGameOver(false, false);
    this.resetBees();
    this.utilityService.resetPlayerHealth();
  }

  checkIfPlayerWon(): void {
    this.utilityService.getIsGameOver()
      .pipe(take(1))
      .subscribe((gameOver: IGameState) => {
        this.hasPlayerWon = gameOver.hasWon;
      });
  }

  private resetBees(): void {
    this.beeService.getBees()
      .pipe(take(1))
      .subscribe((bees: IBee[]) => {
        localStorage.removeItem('bees');
        setTimeout(() => {
          window.location.reload();
        }, 100);
      });
  }
}
