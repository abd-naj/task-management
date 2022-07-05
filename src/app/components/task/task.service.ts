import { Injectable } from '@angular/core';
import {Task} from "./task";
import {AngularFireDatabase, AngularFireList} from "@angular/fire/compat/database";
import {AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument} from "@angular/fire/compat/firestore";
import {Observable} from "rxjs";
import {map} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  taskRef: AngularFireList<Task>;
  private itemsCollection: AngularFirestoreCollection<Task>;
  task$: Observable<Task[]>;
  taskDoc$: Observable<Task>;
  private itemDoc: AngularFirestoreDocument<Task>;
  constructor(private  afs: AngularFirestore) {
  }
  getAll(): Observable<any> {
    return this.afs.collection('tasks').snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as Task;
        const id = a.payload.doc.id;
        return { id, ...data };
      }))
    )
  }
  create(task: Task): Promise<any> {
    return this.afs.collection('tasks').add(JSON.parse(JSON.stringify(task)));

  }
  update(key: string, task: any): Promise<any> {
    // this.taskDoc$ = this.itemDoc.valueChanges();
    this.itemDoc = this.afs.doc<Task>(`tasks/${key}`);
    return this.itemDoc.update(task)
  }
  delete(key: string): Promise<any> {
    this.itemDoc = this.afs.doc<Task>(`tasks/${key}`);
    return this.itemDoc.delete()
  }
  deleteAll(): Promise<void> {
    return this.taskRef.remove();
  }
}
