import { Component, OnInit, Input } from '@angular/core';
import { NavParams, ModalController } from '@ionic/angular';

import { Task } from '../../models/task.interface';

@Component({
  selector: 'app-history-detail',
  templateUrl: './history-detail.page.html',
  styleUrls: ['./history-detail.page.scss'],
})
export class HistoryDetailPage implements OnInit {
  name:string;
  start:number;
  end:number;
  duration:number;
  constructor(
    private params:NavParams,
    private modal:ModalController
  ) 
  { 
   this.name = this.params.get('name');
   this.start = this.params.get('start');
   this.end = this.params.get('end');
   this.duration = this.params.get('duration');
  }

  ngOnInit() {
    
  }
  close() {
    this.modal.dismiss();
  }
}
