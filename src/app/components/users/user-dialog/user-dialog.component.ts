import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { UntypedFormGroup, UntypedFormBuilder, Validators} from '@angular/forms';
import { UserInfo, UserProfile, UserWork, UserContacts, UserSocial, UserSettings } from '../user.model';

@Component({
  selector: 'app-user-dialog',
  templateUrl: './user-dialog.component.html',
  styleUrls: ['./user-dialog.component.scss']
})
export class UserDialogComponent implements OnInit {
  public form:UntypedFormGroup;
  public passwordHide:boolean = true;
  constructor(public dialogRef: MatDialogRef<UserDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public user: UserInfo,
              public fb: UntypedFormBuilder) {
    user.profile.birthday = new Date(user.profile.birthday.seconds * 1000);
    this.form = this.fb.group({
      uid: null,
      displayName: null,
      email: [null, Validators.compose([Validators.required, Validators.minLength(5)])],
      profile: this.fb.group({
        name: null,
        surname: null,
        birthday: null,
        gender: null,
        image: null
      }),
      work: this.fb.group({
        company: null,
        position: null,
        salary: null
      }),
      contacts: this.fb.group({
        contactEmail: null,
        phone: null,
        address: null
      }),
      settings: this.fb.group({
        isActive: null,
        isDeleted: null,
        registrationDate: null,
        joinedDate: null
      })
    });
  }

  ngOnInit() {
    if(this.user){
      this.form.patchValue(this.user);
      console.log(this.form);
    }
    else{
      this.user = new UserInfo();
      this.user.profile = new UserProfile();
      this.user.work = new UserWork();
      this.user.contacts = new UserContacts();
      // this.user.social = new UserSocial();
      this.user.settings = new UserSettings();
    }
  }

  close(): void {
    this.user.profile.birthday = {seconds: (new Date(this.form.controls.profile.get('birthday').value)?.getTime() /1000) || 0};
    this.dialogRef.close();
  }

  save() {
    this.dialogRef.close(this.form.value)
  }
}
