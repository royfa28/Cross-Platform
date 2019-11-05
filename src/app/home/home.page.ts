import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormGroup} from '@angular/forms';
import {timer} from 'rxjs';

import { DataService } from '../data.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  private started:Boolean = false;
  private duration:number = 0;
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
  }

  stop() {
    this.started = false;
  }
}
