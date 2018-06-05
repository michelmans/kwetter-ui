import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { MatButtonModule, MatCheckboxModule, MatInputModule, MatToolbarModule, MatFormFieldModule, MatCardModule, MatDividerModule, MatListModule, MatGridListModule, MatIconModule, MatDialogModule, MatTab, MatTabsModule } from '@angular/material';


import {NgxPaginationModule} from 'ngx-pagination';
import { AlertModule } from 'ngx-bootstrap';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { RoutingService } from './services/routing/routing.service';

import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { TimelineComponent } from './components/timeline/timeline.component';
import { LoginService } from './services/login/login.service';
import { RegisterService } from './services/register/register.service';
import { TimelineService } from './services/timeline/timeline.service';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { ProfileService } from './services/profile/profile.service';
import { ProfileComponent } from './components/profile/profile.component';
import { WebsocketService } from './services/websocket/websocket.service';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    TimelineComponent,
    ProfileComponent
  ],
  imports: [
    AlertModule.forRoot(),
    BrowserModule,
    HttpClientModule,
    MatButtonModule,
    MatCheckboxModule,
    FormsModule,
    MatToolbarModule,
    AppRoutingModule,
    MatFormFieldModule,
    MatInputModule,
    BrowserAnimationsModule,
    MatCardModule,
    MatDividerModule,
    MatListModule,
    MatGridListModule,
    NgxPaginationModule, 
    MatIconModule, 
    MatDialogModule, 
    MatTabsModule
  ],
  providers: [RoutingService, LoginService, RegisterService, TimelineService, ProfileService, WebsocketService],
  bootstrap: [AppComponent]
})
export class AppModule { }
