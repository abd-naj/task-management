import { Injectable } from '@angular/core';
import {Subdomain} from "./subdomains";
import {AngularFireDatabase, AngularFireList} from "@angular/fire/compat/database";
import {AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument} from "@angular/fire/compat/firestore";
import {Observable} from "rxjs";
import {map} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class SubdomainsService {
  taskRef: AngularFireList<Subdomain>;
  private itemsCollection: AngularFirestoreCollection<Subdomain>;
  task$: Observable<Subdomain[]>;
  taskDoc$: Observable<Subdomain>;
  private itemDoc: AngularFirestoreDocument<Subdomain>;
  constructor(private  afs: AngularFirestore) {
  }
  getAll(): Observable<any> {
    return this.afs.collection('subdomains').snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as Subdomain;
        const id = a.payload.doc.id;
        return { id, ...data };
      }))
    )
  }
  create(task: Subdomain): Promise<any> {
    return this.afs.collection('subdomains').add(JSON.parse(JSON.stringify(task)));

  }
  update(key: string, task: any): Promise<any> {
    // this.taskDoc$ = this.itemDoc.valueChanges();
    this.itemDoc = this.afs.doc<Subdomain>(`subdomains/${key}`);
    return this.itemDoc.update(task)
  }
  delete(key: string): Promise<any> {
    this.itemDoc = this.afs.doc<Subdomain>(`subdomains/${key}`);
    return this.itemDoc.delete()
  }
  deleteAll(): Promise<void> {
    return this.taskRef.remove();
  }
}
