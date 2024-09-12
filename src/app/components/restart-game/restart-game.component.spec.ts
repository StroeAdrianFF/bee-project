import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RestartGameComponent } from './restart-game.component';
import { UtilityService } from '../../services/utility/utility.service';

describe('RestartGameComponent', () => {
  let component: RestartGameComponent;
  let fixture: ComponentFixture<RestartGameComponent>;
  let utilityService: UtilityService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RestartGameComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RestartGameComponent);
    utilityService = TestBed.inject(UtilityService);

    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  
  it('should call resetGame when Play Again button is clicked', () => {
    const resetHealthSpy: jest.SpyInstance = jest.spyOn(utilityService, 'resetPlayerHealth');
    const button = fixture.debugElement.nativeElement.querySelector('.play-again');
    button.click();
    expect(resetHealthSpy).toHaveBeenCalled();
  });
});
