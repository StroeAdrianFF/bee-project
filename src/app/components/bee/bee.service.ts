import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { IBee } from '../../interfaces/bee.model';
import bees from '../../db/bees.json';

@Injectable({
  providedIn: 'root'
})
export class BeeService {

  constructor() { }

  getBees(): Observable<IBee[]> {
    return of(bees);
  }
}
