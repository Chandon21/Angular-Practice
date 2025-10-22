import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';

// Feature Modules
import { AuthModule } from './auth/auth.module';
import { SharedModule } from './shared/shared.module';
import { EmployeesModule } from './employees/employees.module';
import { TasksModule } from './tasks/tasks.module';

// Interceptors
import { JwtInterceptor } from './shared/interceptors/jwt.interceptor';

@NgModule({
  declarations: [
    AppComponent // Root component
  ],
  imports: [
    BrowserModule,
    AppRoutingModule, // Routing module
    HttpClientModule, // For HTTP requests
    ReactiveFormsModule, // For reactive forms
    AuthModule, // Auth feature module
    SharedModule, // Shared components, pipes, directives
    EmployeesModule, // Employee feature module
    TasksModule // Task feature module
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true } // JWT interceptor
  ],
  bootstrap: [AppComponent] // Bootstraps the app
})
export class AppModule { }
