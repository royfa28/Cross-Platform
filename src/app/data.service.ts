import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

import { Task } from '../models/task.interface';


@Injectable({
  providedIn: 'root'
})
export class DataService {
  public data:Array<Task> = new Array();
  public dataList$ = new BehaviorSubject<Task[]>( this.data );

  constructor() { 
    this.getData().then( (response) => { 
      if( response ) {
        this.dataList$.next(this.data) 
      }
    });
  }

  addTask( task ) {
    this.data.push(task);
    this.saveData();
    this.dataList$.next( this.data );
  }
  
  getData() {
    return new Promise( (resolve,reject) => {
      try{
        if( !window.localStorage ){
          throw('local storage not available')
        }
        else {
          let tasks = window.localStorage.getItem('tasks')
          //check if this is array
          this.data = JSON.parse( tasks )
          this.dataList$.next( this.data );
          Promise.resolve( true )
        }
      }
      catch ( error ) {
        Promise.reject( error )
      }
    })
    
  }

  saveData() {
    return new Promise(
      ( resolve, reject ) => {
        try{
          if( !window.localStorage ){
            throw('local storage not available')
          }
          else{
            window.localStorage.setItem('tasks', JSON.stringify( this.data ) )
            resolve( true )
          }
        }
        catch( error ){
          reject( error )
        }
      }
    );
  }
}
