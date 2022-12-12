import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ModalComponent } from './modal.component';
import { ModalDirective } from './directives/modal.directive';

@NgModule({
    declarations: [
        ModalComponent,
        ModalDirective
    ],
    imports: [
        CommonModule
    ],
    exports: [
        ModalComponent,
        ModalDirective
    ],
})
export class ModalModule { }