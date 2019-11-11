import { Component, OnInit } from '@angular/core';
import { Task } from '../../models/task.interface';
import { DataService } from '../data.service';
import { Subscription } from 'rxjs';

import { ModalController } from '@ionic/angular';
import { HistoryDetailPage } from '../history-detail/history-detail.page';

@Component({
  selector: 'app-history',
  templateUrl: './history.page.html',
  styleUrls: ['./history.page.scss'],
})
export class HistoryPage implements OnInit {
  data:Array<Task> = [];
  dataSub:Subscription;

  constructor(
    private dataService:DataService, 
    private modal:ModalController 
  ) { }

  ngOnInit() {
    this.dataSub = this.dataService.dataList$.subscribe( 
      (taskData) => {
        this.data = taskData;
      } 
    )
  }

  async showDetail( task ){
    console.log( task );
    const detail = await this.modal.create({
      component:HistoryDetailPage,
      componentProps: task
    });
    return await detail.present();
  }
}
