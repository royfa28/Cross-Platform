import { Component, OnInit } from '@angular/core';
import { Task } from '../../models/task.interface';
import { DataService } from '../data.service';
@Component({
  selector: 'app-history',
  templateUrl: './history.page.html',
  styleUrls: ['./history.page.scss'],
})
export class HistoryPage implements OnInit {
  data:Array<Task> = [];
  dataSub:Subscription;

  constructor(private dataService:DataService) { }

  ngOnInit() {
    this.dataSub = this.dataService.dataList$.subscribe( 
      (taskData) => {
        this.data = taskData;
        console.log(taskData);
      } 
    )
  }

}
