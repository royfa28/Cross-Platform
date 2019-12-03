import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormGroup} from '@angular/forms';
import { Subscription } from 'rxjs';
import {timer} from 'rxjs';

import { DataService } from '../data.service';
import { Task } from '../../models/task.interface';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})

export class HomePage implements OnInit {

  taskList = [];

  started:Boolean = false;
  duration:number = 0;

  time:number;
  timerObj:Subscription;

  startTime:number;
  endTime:number;

  taskForm:FormGroup;
  constructor( 
    private dataService:DataService,
    private formBuilder:FormBuilder
  ) { }

  ngOnInit() {
    this.taskForm = this.formBuilder.group(
      {
        name: ['', [Validators.required, Validators.minLength(3) ]]
      }
    );
  }

  /*
  start(){
    this.started = true;
    this.startTime = new Date().getTime();
    const t = timer(0,1000);
    this.timerObj = t.subscribe( (val) => this.time = val );
  }
  */

  addTask(){
    
  }

  stop() {
    this.started = false;
    this.endTime = new Date().getTime();
    this.duration = this.endTime - this.startTime;
    this.timerObj.unsubscribe();
  }

  save() {
    let task:Task = {
      name: this.taskForm.get('name').value, 
      start: this.startTime,
      end: this.endTime,
      duration: this.duration
    }
    this.dataService.addTask( task );
    this.taskForm.reset();
    this.duration = 0;
    this.time = 0;
  }
}
