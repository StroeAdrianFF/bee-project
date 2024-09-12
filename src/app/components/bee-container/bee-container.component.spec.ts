import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BeeContainerComponent } from './bee-container.component';
import { ComponentRef } from '@angular/core';
import { BeeService } from '../bee/bee.service';
import { of } from 'rxjs';
import { IBee } from '../../interfaces/bee.model';
import { BeeTypeEnum } from '../../../enums/bee.enum';

describe('BeeContainerComponent', () => {
  let component: BeeContainerComponent;
  let componentRef: ComponentRef<BeeContainerComponent>;
  let fixture: ComponentFixture<BeeContainerComponent>;
  let beeService: BeeService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BeeContainerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BeeContainerComponent);
    beeService = TestBed.inject(BeeService);

    jest.spyOn(beeService, 'getBees').mockReturnValue(of([
      { beeType: BeeTypeEnum.QUEEN, health: 3 } as unknown as IBee,
      { beeType: BeeTypeEnum.WORKER, health: 75 } as unknown as IBee,
      { beeType: BeeTypeEnum.DRONE, health: 50 } as unknown as IBee
    ]));

    component = fixture.componentInstance;

    componentRef = fixture.componentRef;
    componentRef.setInput('damageReceived', 2)

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should remove worker bees after they are dead', () => {
    componentRef.setInput('damageReceived', 10);
    expect(component.workerBees.length).toBe(0);
  });

  it('should remove drone bees after they are dead', () => {
    componentRef.setInput('damageReceived', 50);
    expect(component.droneBees.length).toBe(0);
  });

  it('should empty all bees arrays if queen is dead', () => {
    componentRef.setInput('damageReceived', 5);

    expect(component.queenBees.length).toBe(0);
    expect(component.workerBees.length).toBe(0);
    expect(component.droneBees.length).toBe(0);
  });
});
