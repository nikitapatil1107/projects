import { NgModule } from '@angular/core';
import {
  BrowserModule,
  provideClientHydration,
} from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { EmployeeModule } from './employee/employee.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
  provideHttpClient,
  withFetch,
  HttpClientModule,
} from '@angular/common/http';
import { EmployerModule } from './employer/employer.module';
import { SharedModule } from './shared/shared.module';
import { ToastrModule } from 'ngx-toastr';

import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

@NgModule({
  declarations: [AppComponent, PageNotFoundComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    EmployeeModule,
    EmployerModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    SharedModule,
    ToastModule,
    ToastrModule.forRoot(),
  ],
  providers: [provideClientHydration(), provideHttpClient(withFetch()), MessageService],
  bootstrap: [AppComponent],
})
export class AppModule {}

//"analytics": "8cff5b3a-9956-4450-ab40-52391d73cb13"
//"analytics": "acacd27c-8159-43ed-9e59-bd251a6ba884"