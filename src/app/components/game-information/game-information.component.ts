import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-game-information',
  standalone: true,
  imports: [
    CommonModule
  ],
  templateUrl: './game-information.component.html',
  styleUrl: './game-information.component.css'
})
export class GameInformationComponent {

  isTooltipHovered: boolean = false;

}
