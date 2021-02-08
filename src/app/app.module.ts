import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule, ErrorHandler, APP_INITIALIZER, CUSTOM_ELEMENTS_SCHEMA  } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router } from "@angular/router";
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { AngularFileUploaderModule } from "angular-file-uploader";
import { ModuleModule } from './_material/module/module.module';
import { AppRoutingModule } from './app.routing';
import { ComponentsModule } from './components/components.module';
import { AppComponent } from './app.component';
import * as Sentry from "@sentry/angular";

import {
  AgmCoreModule
} from '@agm/core';
import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { CdkTableModule } from '@angular/cdk/table';
import { MatTableModule } from '@angular/material/table';
import { ListUserComponent } from './list-user/list-user.component';
import { MoreNotificationComponent } from './more-notification/more-notification.component';
import { LoginComponent } from './login/login.component';
import { UserInvoiceComponent } from './user-invoice/user-invoice.component';
import { PqrAnsweredComponent } from './pqr-answered/pqr-answered.component';
import { RecommendationsComponent } from './recommendations/recommendations.component';



@NgModule({
  imports: [
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    ComponentsModule,
    RouterModule,
    AppRoutingModule,
    AngularFileUploaderModule,
    MatSnackBarModule,
    CdkTableModule,
    MatTableModule,
    ModuleModule,
    
    AgmCoreModule.forRoot({
      apiKey: 'YOUR_GOOGLE_MAPS_API_KEY'
    })
  ],

  declarations: [
    AppComponent,
    AdminLayoutComponent,
    LoginComponent,
    MoreNotificationComponent,
    UserInvoiceComponent,
    PqrAnsweredComponent,
    RecommendationsComponent
  ],

  providers: [
    {
      provide: ErrorHandler,
      useValue: Sentry.createErrorHandler({
        showDialog: true,
      }),
    },
    {
      provide: Sentry.TraceService,
      deps: [Router],
    },
    {
      provide: APP_INITIALIZER,
      useFactory: () => () => {},
      deps: [Sentry.TraceService],
      multi: true,
    },


  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
