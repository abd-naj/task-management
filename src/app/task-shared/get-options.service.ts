import { Injectable } from '@angular/core';
import {combineLatest, Observable} from "rxjs";
import {map} from "rxjs/operators";
import {Task} from "../components/task/task";
import {AngularFirestore} from "@angular/fire/compat/firestore";

@Injectable({
  providedIn: 'root'
})
export class GetOptionsService {

  optionsRequest$: Observable<any[]>;
  optionsRequest: Observable<any>[] = [];
  constructor(private  afs: AngularFirestore) { }
  getOptions(options: string[]): Observable<any>{
    this.optionsRequest = [];
    const x: any[] = Array.from('x'.repeat(options.length));
    return new Observable<any>((observer) => {
      options.forEach((item, index) => {
        this.optionsRequest.push(this.getUsers(item));
        if (options.length === this.optionsRequest.length) {
          combineLatest(this.optionsRequest).subscribe((x) => {
            const result = {};
            x.forEach((o, index) => {
              result[options[index]] = o;
              if (x.length - 1 === index) {
                observer.next(result)
              }
            })
          })
        }
      });
    })
  }

  /**
   * tableName === option name
   */
  getUsers(tableName: string): Observable<any> {
    return this.afs.collection(tableName).snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as Task;
        const id = a.payload.doc.id;
        return { id, ...data };
      }))
    )
  }
}
