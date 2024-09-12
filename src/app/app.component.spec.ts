import { TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { UtilityService } from './services/utility/utility.service';
import { of } from 'rxjs';

describe('AppComponent', () => {
    let component: AppComponent;
    let utilityService: UtilityService;

    beforeEach(async () => {
        const utilityServiceMock = {
            getIsGameOver: jest.fn().mockReturnValue(of({ gameOver: false, hasWon: false }))
        };

        await TestBed.configureTestingModule({
            imports: [AppComponent],
            providers: [
                { provide: UtilityService, useValue: utilityServiceMock }
            ]
        }).compileComponents();

        const fixture = TestBed.createComponent(AppComponent);
        component = fixture.componentInstance;
        utilityService = TestBed.inject(UtilityService);
    });

    it('should create the app component', () => {
        expect(component).toBeTruthy();
    });

    it(`should have as title 'Bee Game'`, () => {
        expect(component.title).toEqual('Bee Game');
    });

    it('should call getIsGameOver on init', () => {
        component.ngOnInit();

        expect(utilityService.getIsGameOver).toHaveBeenCalled();
    });

    it('should set damage to a random value between 0 and 99 when attackBees is called', () => {
        jest.spyOn(Math, 'random').mockReturnValue(0.5);
        component.attackBees();
        expect(component.damage).toBe(50);
    });
});