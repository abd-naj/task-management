import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AppSettings } from '../../app.settings';
import { Settings } from '../../app.settings.model';
import { UserInfo, UserProfile, UserWork, UserContacts, UserSocial, UserSettings } from './user.model';
import { UsersService } from './users.service';
import { UserDialogComponent } from './user-dialog/user-dialog.component';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
  encapsulation: ViewEncapsulation.None,
  providers: [ UsersService ]
})
export class UsersComponent implements OnInit {
    public users: UserInfo[];
    public searchText: string;
    public page:any;
    public settings: Settings;
    constructor(public appSettings:AppSettings,
                public dialog: MatDialog,
                public usersService:UsersService){
        this.settings = this.appSettings.settings;
    }

    ngOnInit() {
        this.getUsers();
    }

    public getUsers(): void {
        this.users = null; //for show spinner each time
      this.usersService.getUsers().subscribe(users => {
        this.users = users;
        console.log(users)
      })
    }
    public addUser(user:UserInfo){
        // this.usersService.addUser(user).subscribe(user => this.getUsers());
    }
    public updateUser(user:UserInfo){
        // this.usersService.updateUser(user).subscribe(user => this.getUsers());
      console.log(user);
      this.usersService.updateUser(user);
    }
    public deleteUser(user:UserInfo){
       // this.usersService.deleteUser(user.id).subscribe(user => this.getUsers());
    }


    public onPageChanged(event){
        this.page = event;
        this.getUsers();
        if(this.settings.fixedHeader){
            document.getElementById('main-content').scrollTop = 0;
        }
        else{
            document.getElementsByClassName('mat-drawer-content')[0].scrollTop = 0;
        }
    }

    public openUserDialog(user){
        let dialogRef = this.dialog.open(UserDialogComponent, {
            data: user,
          height: '371px',
          width: '570px',
          hasBackdrop: true,
          disableClose: true
        });

        dialogRef.afterClosed().subscribe(user => {
            if(user){
                (user.uid) ? this.updateUser(user) : this.addUser(user);
            }
        });
    }

  changeUserStatus(user: UserInfo) {
    user.settings.isDeleted = !user.settings.isDeleted;
    this.usersService.updateUser(user);
  }
}
