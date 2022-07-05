import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserInfo } from './user.model';
import {AngularFirestore, AngularFirestoreDocument} from "@angular/fire/compat/firestore";
import {Task} from "../task/task";
import {map} from "rxjs/operators";

@Injectable()
export class UsersService {
    public url = "api/users";
  private itemDoc: AngularFirestoreDocument<UserInfo>;

  constructor(public http:HttpClient,
                private  afs: AngularFirestore) { }

    getUsers(): Observable<UserInfo[]> {
      return this.afs.collection('users').snapshotChanges().pipe(
        map(actions => actions.map(a => {
          const data = a.payload.doc.data() as UserInfo;
          const id = a.payload.doc.id;
          return { id, ...data };
        }))
      )
    }

    addUser(user:UserInfo){
      return this.afs.collection('users').add(JSON.parse(JSON.stringify(user)));
    }

    updateUser(key: string, user:UserInfo){
    console.log(key)
      this.itemDoc = this.afs.doc<UserInfo>(`users/${key}`);
      return this.itemDoc.update(user)
    }

    deleteUser(key: string) {
      this.itemDoc = this.afs.doc<UserInfo>(`users/${key}`);
      return this.itemDoc.delete()
    }
}
