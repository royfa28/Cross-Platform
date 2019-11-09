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
  getData() {
    try{
      if( !window.localStorage ){
        throw('local storage not available')
      }
      else {
        let tasks = window.localStorage.getItem('tasks')
        this.data = JSON.parse( tasks )
        this.dataList$.next( this.data );
        Promise.resolve( true )
      }
    }
    catch ( error ) {
      Promise.reject( error )
    }
  }

  async saveData() {
    try{
      if( !window.localStorage ){
        throw('local storage not available')
      }
      else{
        await window.localStorage.setItem('tasks', JSON.stringify( this.data ) )
        Promise.resolve( true )
      }
    }
    catch( error ){
      Promise.reject( error )
    }
  }
}
