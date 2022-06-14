import { Injectable } from '@angular/core';
import {Task} from "./task";
import {AngularFireDatabase, AngularFireList} from "@angular/fire/compat/database";
import {AngularFirestore} from "@angular/fire/compat/firestore";

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  taskRef: AngularFireList<Task>;
  constructor(private  store: AngularFirestore) {
  }
  getAll() {
    // this.taskRef = this.db.list('/tasks');
    // return this.taskRef;
    this.store.collection('tasks').snapshotChanges().subscribe((response) => {
      console.log('reponse ', response);
    })
  }
  create(task: Task): any {
    console.log(task)
    this.store.collection('tasks').add(JSON.parse(JSON.stringify(task))).then(x => console.log(x));

  }
  update(key: string, value: any): Promise<void> {
    return this.taskRef.update(key, value);
  }
  delete(key: string): Promise<void> {
    return this.taskRef.remove(key);
  }
  deleteAll(): Promise<void> {
    return this.taskRef.remove();
  }
}
