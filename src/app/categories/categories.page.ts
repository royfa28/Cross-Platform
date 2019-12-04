import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { Task } from 'src/models/task.interface';
import { Subscription } from 'rxjs';
import { IonInfiniteScroll, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.page.html',
  styleUrls: ['./categories.page.scss'],
})
export class CategoriesPage implements OnInit {
  history:Array<Task> = [];
  historySub:Subscription;
  infiniteScroll: IonInfiniteScroll;

  constructor(
    private dataService:DataService,
    public toastController: ToastController
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

  async presentToast() {
    const toast = await this.toastController.create({
      message: 'Your task has been deleted',
      duration: 2000
    });
    toast.present();
  }

  toggleInfiniteScroll() {
    this.infiniteScroll.disabled = !this.infiniteScroll.disabled;
  }

  ngOnInit() {
    this.historySub = this.dataService.list$.subscribe( (taskData) => {
      this.history = taskData.filter((data)=>{
        if(data.status == true){
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
    this.presentToast();
  }
}
