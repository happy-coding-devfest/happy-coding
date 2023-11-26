import { NgModule } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    NgOptimizedImage
  ],
  exports: [
    ReactiveFormsModule,
    NgOptimizedImage
  ]
})
export class SharedModule { }
