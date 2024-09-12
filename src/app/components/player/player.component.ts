import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { UtilityService } from '../../services/utility/utility.service';
import { AsyncPipe } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-player',
  standalone: true,
  imports: [
    AsyncPipe,
    FormsModule
  ],
  templateUrl: './player.component.html',
  styleUrl: './player.component.css'
})
export class PlayerComponent implements OnInit, OnDestroy {

  playerHealth: number = 100;
  playerName: string = '';
  editPlayerName: boolean = false;

  private unsubscribe$ = new Subject<void>();

  constructor(
    private utilityService: UtilityService
  ) { }


  ngOnInit(): void {
    this.getPlayerHealth();
    this.checkPlayerName();
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  applyNameChanges(editName: boolean): void {
    this.editPlayerName = editName;
    this.utilityService.savePlayerName(this.playerName);
  }

  private checkPlayerName(): void {
    this.playerName = this.utilityService.getPlayerName()
  }

  private getPlayerHealth(): void {
    this.utilityService.getPlayerHealth()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((health: number) => {
        this.playerHealth = health;
        if (health <= 0) {
          this.playerHealth = 0;
          this.utilityService.setIsGameOver(true, false);
        }
      });
  }
}
