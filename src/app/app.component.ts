import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { BeeContainerComponent } from "./components/bee-container/bee-container.component";
import { BeeTypeEnum } from '../enums/bee.enum';
import { RestartGameComponent } from './components/restart-game/restart-game.component';
import { UtilityService } from './services/utility/utility.service';
import { Observable, take } from 'rxjs';
import { AsyncPipe, CommonModule } from '@angular/common';
import { PlayerComponent } from './components/player/player.component';
import { GameInformationComponent } from "./components/game-information/game-information.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    BeeContainerComponent,
    RestartGameComponent,
    AsyncPipe,
    PlayerComponent,
    GameInformationComponent
],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  title = 'Bee Game';

  damage: number = 0;
  isGameOver$: Observable<{ gameOver: boolean; hasWon: boolean }> | null = null;
  readonly beeTypeEnum: typeof BeeTypeEnum = BeeTypeEnum;

  constructor(
    private utilityService: UtilityService
  ) { }

  ngOnInit(): void {
    this.isGameOver$ = this.utilityService.getIsGameOver();
  }

  attackBees(): void {
    this.damage = Math.floor(Math.random() * 100);
  }

}
