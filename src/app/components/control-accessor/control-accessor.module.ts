import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ControlAccessorComponent } from './control-accessor.component';


@NgModule({
    declarations: [
        ControlAccessorComponent
    ],
    imports: [
        CommonModule
    ],
    exports: [
        ControlAccessorComponent
    ],
})
export class ControlAccessorModule { }