import { NgModule } from '@angular/core';

import { TooltipDirective } from './tool-tip/tool-tip.directive';


@NgModule({
  declarations: [
    TooltipDirective,
  ],
  exports: [
    TooltipDirective,
  ]
})
export class DirectivesModule { }
