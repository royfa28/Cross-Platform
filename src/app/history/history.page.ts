import { Component, OnInit, ViewChild  } from '@angular/core';
import { IonInfiniteScroll } from '@ionic/angular';
import { Task } from '../../models/task.interface';
import { DataService } from '../data.service';
import { Subscription } from 'rxjs';

import { ModalController } from '@ionic/angular';
import { HomePage } from '../home/home.page';

@Component({
  selector: 'app-history',
  templateUrl: './history.page.html',
  styleUrls: ['./history.page.scss'],
})
export class HistoryPage implements OnInit {
  history:Array<Task> = [];
  historySub:Subscription;
  infiniteScroll: IonInfiniteScroll;

  constructor(
    private dataService:DataService
  ) { }

  loadData(event) {
    setTimeout(() => {
      console.log('Done');
      event.target.complete();

      // App logic to determine if all data is loaded
      // and disable the infinite scroll
      if (this.history.length == 1000) {
        event.target.disabled = true;
      }
    }, 500);
  }

  toggleInfiniteScroll() {
    this.infiniteScroll.disabled = !this.infiniteScroll.disabled;
  }

  ngOnInit() {
    this.historySub = this.dataService.list$.subscribe( (taskData) => {
      this.history = taskData.filter((data)=>{
        if(data.status == false){
          return data;
        }
      });
    } );
  }

  duration(stop,start) {
    return ((stop - start) / 1000).toFixed(2);
  }

  delete( itemStart ) {
    this.dataService.deleteFromList( itemStart );
  }
}
