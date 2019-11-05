import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

import { Task } from '../models/task.interface';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  public data:Array<Task> = [];
  public dataList$ = new BehaviorSubject<Task[]>( this.data );

  constructor() { }
  addTask( task ) {
    this.data.push(task);
    this.dataList$.next( this.data );
  }
  getData() {}
  saveData() {}
}
