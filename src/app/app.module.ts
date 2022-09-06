import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { OverlayContainer } from '@angular/cdk/overlay';
import { CustomOverlayContainer } from './theme/utils/custom-overlay-container';

import { AgmCoreModule } from '@agm/core';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { PERFECT_SCROLLBAR_CONFIG } from 'ngx-perfect-scrollbar';
import { PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';
const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
  wheelPropagation: true,
  suppressScrollX: true
};
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';

import { SharedModule } from './shared/shared.module';
import { PipesModule } from './theme/pipes/pipes.module';
import { AppRoutingModule } from './app.routing';

import { AppComponent } from './app.component';
import { PagesComponent } from './pages/pages.component';
import { BlankComponent } from './pages/blank/blank.component';
import { SearchComponent } from './pages/search/search.component';
import { NotFoundComponent } from './pages/errors/not-found/not-found.component';
import { ErrorComponent } from './pages/errors/error/error.component';
import { AppSettings } from './app.settings';

import { SidenavComponent } from './theme/components/sidenav/sidenav.component';
import { VerticalMenuComponent } from './theme/components/menu/vertical-menu/vertical-menu.component';
import { HorizontalMenuComponent } from './theme/components/menu/horizontal-menu/horizontal-menu.component';
import { BreadcrumbComponent } from './theme/components/breadcrumb/breadcrumb.component';
import { FlagsMenuComponent } from './theme/components/flags-menu/flags-menu.component';
import { FullScreenComponent } from './theme/components/fullscreen/fullscreen.component';
import { ApplicationsComponent } from './theme/components/applications/applications.component';
import { MessagesComponent } from './theme/components/messages/messages.component';
import { UserMenuComponent } from './theme/components/user-menu/user-menu.component';
import {AngularFireModule} from "@angular/fire/compat";
import {AngularFireStorageModule} from "@angular/fire/compat/storage";
import {AngularFireDatabaseModule} from "@angular/fire/compat/database";
import {AngularFirestoreModule} from "@angular/fire/compat/firestore";
import {AngularFireAuthModule} from "@angular/fire/compat/auth";
import {environment} from "../environments/environment";

@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyAO7Mg2Cs1qzo_3jkKkZAKY6jtwIlm41-I'
    }),
    PerfectScrollbarModule,
    CalendarModule.forRoot({
      provide: DateAdapter,
      useFactory: adapterFactory
    }),
    SharedModule,
    PipesModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireAuthModule,
    AngularFirestoreModule,
    AngularFireStorageModule,
    AngularFireDatabaseModule
  ],
  declarations: [
    AppComponent,
    PagesComponent,
    BlankComponent,
    SearchComponent,
    NotFoundComponent,
    ErrorComponent,
    SidenavComponent,
    VerticalMenuComponent,
    HorizontalMenuComponent,
    BreadcrumbComponent,
    FlagsMenuComponent,
    FullScreenComponent,
    ApplicationsComponent,
    MessagesComponent,
    UserMenuComponent
  ],
  providers: [
    AppSettings,
    { provide: PERFECT_SCROLLBAR_CONFIG, useValue: DEFAULT_PERFECT_SCROLLBAR_CONFIG },
    { provide: OverlayContainer, useClass: CustomOverlayContainer },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
