import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgZorroModule } from './ng-zorro/ng-zorro.module';
import { MaterialModule } from './material/material.module';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    NgZorroModule,
    MaterialModule,

  ],
  exports: [
    NgZorroModule,
    MaterialModule,

  ]
})
export class SharedModule { }
