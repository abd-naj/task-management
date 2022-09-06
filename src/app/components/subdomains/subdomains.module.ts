import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../../shared/shared.module';
import {SubdomainsPreviewComponent} from "./subdomains/subdomains-preview.component";
import {CrudSubdomainsComponent} from "./crud-subdomains/crud-subdomains.component";
import {
  MAT_COLOR_FORMATS,
  NGX_MAT_COLOR_FORMATS,
  NgxMatColorPickerModule
} from "@angular-material-components/color-picker";

export const routes: Routes = [
  { path: '', redirectTo: 'subdomainPreview', pathMatch: 'full' },
  { path: 'subdomainPreview', component: SubdomainsPreviewComponent },
  { path: 'subdomain', component: CrudSubdomainsComponent }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    NgxMatColorPickerModule
  ],
  declarations: [
    SubdomainsPreviewComponent,
    CrudSubdomainsComponent,
  ],
  exports: [
    SubdomainsPreviewComponent,
    CrudSubdomainsComponent
  ],
  providers: [
    { provide: MAT_COLOR_FORMATS, useValue: NGX_MAT_COLOR_FORMATS }
  ]
})
export class SubdomainsModule { }
