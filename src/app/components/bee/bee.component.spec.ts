import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BeeComponent } from './bee.component';
import { ComponentRef } from '@angular/core';
import { BeeTypeEnum } from '../../../enums/bee.enum';

describe('BeeComponent', () => {
  let component: BeeComponent;
  let componentRef: ComponentRef<BeeComponent>;
  let fixture: ComponentFixture<BeeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BeeComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(BeeComponent);
    component = fixture.componentInstance;

    componentRef = fixture.componentRef;
    componentRef.setInput('beeWidth', 100);
    componentRef.setInput('beeImage', 'bee.png');
    componentRef.setInput('beeName', 'bee');
    componentRef.setInput('beeHealth', 100);
    componentRef.setInput('beeMaxHealth', 100);

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should return green for DRONE with health > 35', () => {
    componentRef.setInput('beeName', BeeTypeEnum.DRONE);
    componentRef.setInput('beeHealth', 36);
    fixture.detectChanges();
    expect(component.setHPColor()).toBe('green');
  });

  it('should return orange for DRONE with health > 15 and <= 35', () => {
    componentRef.setInput('beeName', BeeTypeEnum.DRONE);
    componentRef.setInput('beeHealth', 20);
    fixture.detectChanges();
    expect(component.setHPColor()).toBe('orange');
  });

  it('should return red for DRONE with health <= 15', () => {
    componentRef.setInput('beeName', BeeTypeEnum.DRONE);
    componentRef.setInput('beeHealth', 10);
    fixture.detectChanges();
    expect(component.setHPColor()).toBe('red');
  });

  it('should return green for non-DRONE with health > 50', () => {
    componentRef.setInput('beeName', BeeTypeEnum.WORKER);
    componentRef.setInput('beeHealth', 51);
    fixture.detectChanges();
    expect(component.setHPColor()).toBe('green');
  });

  it('should return orange for non-DRONE with health > 25 and <= 50', () => {
    componentRef.setInput('beeName', BeeTypeEnum.WORKER);
    componentRef.setInput('beeHealth', 30);
    fixture.detectChanges();
    expect(component.setHPColor()).toBe('orange');
  });

  it('should return red for non-DRONE with health <= 25', () => {
    componentRef.setInput('beeName', BeeTypeEnum.WORKER);
    componentRef.setInput('beeHealth', 20);
    fixture.detectChanges();
    expect(component.setHPColor()).toBe('red');
  });
});
