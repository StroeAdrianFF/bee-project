import { CommonModule } from '@angular/common';
import { Component, effect, input, InputSignal, OnInit } from '@angular/core';
import { BeeComponent } from '../bee/bee.component';
import { BeeTypeEnum } from '../../../enums/bee.enum';
import { BeeService } from '../bee/bee.service';
import { take } from 'rxjs';
import { IBee } from '../../interfaces/bee.model';
import { UtilityService } from '../../services/utility/utility.service';

@Component({
  selector: 'app-bee-container',
  standalone: true,
  imports: [
    CommonModule,
    BeeComponent
  ],
  templateUrl: './bee-container.component.html',
  styleUrl: './bee-container.component.css'
})
export class BeeContainerComponent implements OnInit {
  damageReceived: InputSignal<number> = input.required<number>();

  queenBees: IBee[] = [];
  workerBees: IBee[] = [];
  droneBees: IBee[] = [];

  readonly beeType: typeof BeeTypeEnum = BeeTypeEnum;

  constructor(
    private beeService: BeeService,
    private utilityService: UtilityService
  ) {
    effect(() => {
      if (this.damageReceived() > 0) {
        this.checkBeeToHit(this.damageReceived());
      }
    });
  }

  ngOnInit(): void {
    this.getBees();
  }

  /**
   * Checks the damage value against the bees and updates their health accordingly
   * @param damageValue {@link number} - the damage value to check against the bees
   * @returns void
   */
  checkBeeToHit(damageValue: number): void {
    if (damageValue > 0 && damageValue <= 7) {
      this.queenBees.forEach((queenBee: IBee) => {
        queenBee.health -= 8;
        if (queenBee.health <= 0) {
          // no bees after queen is dead
          this.clearBees();
          this.utilityService.setIsGameOver(true, true);
        }
      });
    } else if (damageValue > 7 && damageValue <= 42) {
      this.attackDroneOrWorkerBee(this.workerBees, 10);
    } else {
      this.attackDroneOrWorkerBee(this.droneBees, 12);
    }

    localStorage.setItem('bees', JSON.stringify([...this.queenBees, ...this.workerBees, ...this.droneBees]));
  }

  private getBees(): void {
    const hive: string | null = localStorage.getItem('bees');
    if (!hive || hive ===  '[]') {
      this.beeService.getBees()
        .pipe(take(1))
        .subscribe((bees: IBee[]) => {
          this.processBees(bees);
        });
    } else {
      const bees = JSON.parse(hive);
      this.processBees(bees);
    }
  }

  private processBees(bees: IBee[]): void {
    bees.forEach((bee: IBee) => {
      if (bee.beeType === BeeTypeEnum.QUEEN) {
        this.queenBees.push(bee);
      } else if (bee.beeType === BeeTypeEnum.WORKER) {
        this.workerBees.push(bee);
      } else if (bee.beeType === BeeTypeEnum.DRONE) {
        this.droneBees.push(bee);
      }
    });
  }

  private attackDroneOrWorkerBee(beesToAttack: IBee[], damageToDeal: number): void {
    const randomBee = beesToAttack[Math.floor(Math.random() * beesToAttack.length)];
    if (randomBee) {
      randomBee.health -= damageToDeal;
      this.removeDeadBees(randomBee, beesToAttack);
    } else {
      this.utilityService.setPlayerHealth();
    }
  }

  private removeDeadBees(bee: IBee, arrayToRemoveFrom: IBee[]): void {
    if (bee.health <= 0) {
      const index = arrayToRemoveFrom.indexOf(bee);
      if (index !== -1) {
        arrayToRemoveFrom.splice(index, 1);
      }
    }
  }

  private clearBees(): void {
    this.queenBees = [];
    this.workerBees = [];
    this.droneBees = [];
  }
}
