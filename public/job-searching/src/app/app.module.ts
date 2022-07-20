import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { JobOpeningsComponent } from './job-openings/job-openings.component';
import { JobOpeningComponent } from './job-opening/job-opening.component';
import { NavigationComponent } from './navigation/navigation.component';
import { RouterModule } from '@angular/router';
import { JobOpeningFormComponent } from './job-opening-form/job-opening-form.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    JobOpeningsComponent,
    JobOpeningComponent,
    NavigationComponent,
    JobOpeningFormComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    ReactiveFormsModule,
    RouterModule.forRoot([
      {path:'', component: HomeComponent},
      {path:'job-openings', component: JobOpeningsComponent},
      {path:'job-opening/add', component: JobOpeningFormComponent},
      {path:'job-opening/edit/:jobOpeningId', component: JobOpeningFormComponent},
      {path:'job-openings/:jobOpeningId', component: JobOpeningComponent},
    ])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
