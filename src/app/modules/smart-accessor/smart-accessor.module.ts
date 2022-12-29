import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ControlAccessorComponent } from './control-accessor.component';
import { SmartProfileComponent } from './smart-profile/smart-profile.component';
import { SmartPasswordComponent } from './smart-password/smart-password.component';
import { FavoriteFoodsComponent } from './smart-favorite-foods/smart-favorite-foods.component';
@NgModule({
    declarations: [
        ControlAccessorComponent,
        SmartProfileComponent,
        SmartPasswordComponent,
        FavoriteFoodsComponent
    ],
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
    ],
    exports: [
        ControlAccessorComponent,
        SmartProfileComponent,
        SmartPasswordComponent,
        FavoriteFoodsComponent
    ],
})
export class SmartAccessorModule { }