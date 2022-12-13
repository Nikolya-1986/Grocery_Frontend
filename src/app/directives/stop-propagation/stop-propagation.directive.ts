import { AfterViewInit, Directive, ElementRef } from "@angular/core";
import { fromEvent } from "rxjs";

@Directive({
    selector: '[stopPropagation]'
})
export class StopPropagationDirective implements AfterViewInit {

    constructor(
        private elementRef: ElementRef
    ){}

    public ngAfterViewInit(): void {
        fromEvent<MouseEvent>(this.elementRef.nativeElement, 'click', { capture: false })
        .subscribe(event => {
            console.log('capture');
            event.stopPropagation();
        })
    }

}