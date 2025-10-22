import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// Example shared component
import { HeaderComponent } from './components/header/header.component';

@NgModule({
  declarations: [
    HeaderComponent // add other shared components here
  ],
  imports: [
    CommonModule
  ],
  exports: [
    HeaderComponent,
    CommonModule // export CommonModule so ngSwitch, ngIf work in modules importing SharedModule
  ]
})
export class SharedModule {}
