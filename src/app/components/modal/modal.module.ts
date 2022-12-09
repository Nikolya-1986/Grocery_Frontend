import { NgModule } from '@angular/core';

import { ModalComponent } from './modal.component';
import { ModalDirective } from './directives/modal.directive';
import { CommonModule } from '@angular/common';

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