import { NgModule } from '@angular/core';

import { StopPropagationDirective } from './stop-propagation/stop-propagation.directive';
import { TooltipDirective } from './tool-tip/tool-tip.directive';


@NgModule({
  declarations: [
    TooltipDirective,
    StopPropagationDirective,
  ],
  exports: [
    TooltipDirective,
    StopPropagationDirective,
  ]
})
export class DirectivesModule { }
