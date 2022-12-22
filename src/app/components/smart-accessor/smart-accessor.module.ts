import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ControlAccessorComponent } from './control-accessor.component';
import { SmartProfileComponent } from './smart-profile/smart-profile.component';
@NgModule({
    declarations: [
        ControlAccessorComponent,
        SmartProfileComponent
    ],
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
    ],
    exports: [
        ControlAccessorComponent,
        SmartProfileComponent
    ],
})
export class SmartAccessorModule { }