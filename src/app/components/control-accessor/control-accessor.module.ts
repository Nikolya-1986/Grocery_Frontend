import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ControlAccessorComponent } from './control-accessor.component';
@NgModule({
    declarations: [
        ControlAccessorComponent
    ],
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
    ],
    exports: [
        ControlAccessorComponent
    ],
})
export class ControlAccessorModule { }