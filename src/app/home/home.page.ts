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

  started:Boolean = false;
  status:Boolean = false;
  duration:number = 0;

  time:number;
  timerSub:Subscription;

  startDate:number;
  startTime:number;
  endTime:number;
  stopTime:number = 0;

  taskForm:FormGroup;
  constructor( 
    private dataService:DataService,
    private formBuilder:FormBuilder
  ) { }

  ngOnInit() {
    this.taskForm = this.formBuilder.group(
      {
        name: ['', [Validators.required, Validators.minLength(3) ]],
        description: ['', [Validators.required, Validators.minLength(5) ]]
      }
    );
  }

  start(){
    this.started = true;
    this.status = false;
    this.startTime = new Date().getTime();
    const t = timer(0,1000);
    this.timerSub = t.subscribe( (val) => this.time = val );
    this.save();
    this.taskForm.reset();
    console.log('this.startTime');
  }
  
  stop() {
    this.started = false;
    this.status = true;
    this.endTime = new Date().getTime();
    this.timerSub.unsubscribe();
    this.save();
    this.taskForm.reset();
  }

  save() {
    let task:Task = {
      name: this.taskForm.get('name').value,
      description: this.taskForm.get('description').value,
      start: this.startTime,
      status: this.status,
      stop: this.stopTime
    }
    this.dataService.addToList( task );
  }
}
