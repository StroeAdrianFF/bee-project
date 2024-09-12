import { Component, effect, input, InputSignal } from '@angular/core';
import { BeeTypeEnum } from '../../../enums/bee.enum';

@Component({
  selector: 'app-bee',
  standalone: true,
  imports: [],
  templateUrl: './bee.component.html',
  styleUrl: './bee.component.css'
})
export class BeeComponent {
  beeWidth: InputSignal<number> = input.required<number>();
  beeImage: InputSignal<string> = input.required<string>();
  beeName: InputSignal<string> = input.required<string>();
  beeHealth: InputSignal<number> = input.required<number>();
  beeMaxHealth: InputSignal<number> = input.required<number>();

  readonly beeTypeEnum: typeof BeeTypeEnum = BeeTypeEnum;

  constructor() {
  }

  /**
   * Determines the color of the health bar based on the bee type and health
   * @returns a string that represents the color of the health bar 
   */
  setHPColor(): string {
    const healthThresholds = this.beeName() === this.beeTypeEnum.DRONE ? [35, 15] : [50, 25];
    if (this.beeHealth() > healthThresholds[0]) {
      return 'green';
    } else if (this.beeHealth() > healthThresholds[1]) {
      return 'orange';
    } else {
      return 'red';
    }
  }
}
