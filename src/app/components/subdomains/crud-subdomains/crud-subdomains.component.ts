import {Component, Inject, OnInit} from '@angular/core';
import {Subdomain} from "../subdomains";
import {SubdomainsService} from "../subdomains.service";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {GetOptionsService} from "../../../task-shared/get-options.service";
import {User} from "../../auth/user";
import {ThemePalette} from "@angular/material/core";
import {AbstractControl, FormControl} from "@angular/forms";

@Component({
  selector: 'app-crud-task',
  templateUrl: './crud-subdomains.component.html',
  styleUrls: ['./crud-subdomains.component.scss']
})
export class CrudSubdomainsComponent implements OnInit {
  task: Subdomain;
  submitted = false;
  message = '';
  users: User[] = [];
  options: any;
  imageError: string[] = [];
  cardImageBase64: string[] = [];
  isImageSaved: boolean[] = [];
  public color: ThemePalette = 'primary';
  colorCtr: AbstractControl = new FormControl(null);
  constructor(private taskService: SubdomainsService,
              private getOptionsService: GetOptionsService,
              public dialogRef: MatDialogRef<CrudSubdomainsComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any,) {
    this.task = this.data.task ? this.data.task : new Subdomain();
    this.colorCtr.setValue(this.task.font_color)
    /*getOptionsService.getOptions(['users', 'tasks', 'status']).subscribe((x) => {
      this.options = x;
      console.log(x);
    });*/
  }
  ngOnInit(): void {
    this.message = '';
  }
  saveTutorial(): void {
    this.task.font_color = this.colorCtr.value;
    this.taskService.create(this.task).then(x => {
      this.submitted = true;
      // this.dialogRef.close()
    });
  }
  newTutorial(): void {
    this.submitted = false;
    this.task = new Subdomain();
  }
  updatePublished(status?: string): void {
    console.log(this.task)
    if (this.task.id) {
      this.taskService.update(this.task.id, { published: status })
        .then(() => {
          this.task.published = status;
          this.message = 'The status was updated successfully!';
          this.dialogRef.close();
        })
        .catch(err => console.log(err));
    }
  }
  updateTutorial(): void {
    const data = {
      title: this.task.subdomain,
      description: this.task.text1,
    };
    if (this.task.id) {
      this.taskService.update(this.task.id, this.task)
        .then(() => {
          this.message = 'The tutorial was updated successfully!';
          this.dialogRef.close();
        })
        .catch(err => console.log(err));
    }
  }
  deleteTutorial(): void {
    if (this.task.id) {
      this.taskService.delete(this.task.id)
        .then(() => {
          this.message = 'The tutorial was updated successfully!';
          this.dialogRef.close();
        })
        .catch(err => console.log(err));
    }
  }
  compareFn(a: any, b: any) {
    return a && b ? a.id === b.id : a === b;
  }

  fileChangeEvent(fileInput: any, imageNO: 0 | 1) {
    this.imageError[imageNO] = null;
    if (fileInput.target.files && fileInput.target.files[0]) {
      // Size Filter Bytes
      const max_size = 20971520;
      const allowed_types = ['image/png', 'image/jpeg'];
      const max_height = 15200;
      const max_width = 25600;

      if (fileInput.target.files[0].size > max_size) {
        this.imageError[imageNO] =
          'Maximum size allowed is ' + max_size / 1000 + 'Mb';

        return false;
      }

      if (!fileInput.target.files[0].type.includes(allowed_types)) {
        this.imageError[imageNO] = 'Only Images are allowed ( JPG | PNG )';
        return false;
      }
      const reader = new FileReader();
      reader.onload = (e: any) => {
        const image = new Image();
        image.src = e.target.result;
        image.onload = rs => {
          const img_height = rs.currentTarget['height'];
          const img_width = rs.currentTarget['width'];

          console.log(img_height, img_width);


          if (img_height > max_height && img_width > max_width) {
            this.imageError[imageNO] =
              'Maximum dimentions allowed ' +
              max_height +
              '*' +
              max_width +
              'px';
            return false;
          } else {
            const imgBase64Path = e.target.result;
            this.cardImageBase64[imageNO] = imgBase64Path;
            this.isImageSaved[imageNO] = true;
            // this.previewImagePath = imgBase64Path;
          }
        };
      };

      reader.readAsDataURL(fileInput.target.files[0]);
    }
  }

  removeImage([imageNO]) {
    this.cardImageBase64[imageNO] = null;
    this.isImageSaved[imageNO] = false;
  }
}
