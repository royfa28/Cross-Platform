import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormGroup} from '@angular/forms';
import { Observable } from 'rxjs';
import {timer} from 'rxjs';

import { DataService } from '../data.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  started:Boolean = false;
  duration:number = 0;

  time:number;
  timerObj:Observable;

  startTime:number;
  stopTime:number;

  taskForm:FormGroup;
  constructor( 
    private data:DataService,
    private formBuilder:FormBuilder
  ) { }

  ngOnInit() {
    this.taskForm = this.formBuilder.group(
      {
        name: ['', [Validators.required, Validators.minLength(3) ]]
      }
    );
  }

  start(){
    this.started = true;
    this.startTime = new Date().getTime();
    const t = timer(0,1000);
    this.timerObj = t.subscribe( (val) => this.time = val );
  }

  stop() {
    this.started = false;
    this.stopTime = new Date().getTime();
    this.duration = this.stopTime - this.startTime;
    this.timerObj.unsubscribe();
  }

  save() {
    this.duration = 0;
  }
}
