import { Input, Renderer2, HostListener,  Directive, ElementRef, TemplateRef, ViewContainerRef,  ContentChild } from '@angular/core';
    
@Directive({ 
    selector: '[tooltipDirective]'
})
export class TooltipDirective {
     
  private timer: string | any;

  constructor(
    private renderer: Renderer2,
    private elementRef: ElementRef,
    private viewContainerRef: ViewContainerRef
  ) { }
        
  @ContentChild('tooltipContent') private tooltipTemplateRef!: TemplateRef<Object>;
        
  @HostListener('mouseenter') onMouseEnter(): void {
    this.timer = setTimeout(() => {
      let x = this.elementRef.nativeElement.getBoundingClientRect().left + this.elementRef.nativeElement.offsetWidth / 2;// Get the middle of the element
      let y = this.elementRef.nativeElement.getBoundingClientRect().top + this.elementRef.nativeElement.offsetHeight + 6; // Get the bottom of the element, plus a little extra
      this.createTooltipPopup(x, y);
    }, 600)
  };
     
  @HostListener('mouseleave') onMouseLeave(): void {
    const tooltipContainer = this.viewContainerRef;
    if (this.timer) {
      clearTimeout(this.timer);
    };
    if(tooltipContainer) {
      tooltipContainer.clear();
    }
  };

  private createTooltipPopup(x: number, y: number) {
    const view = this.viewContainerRef.createEmbeddedView(this.tooltipTemplateRef);
    view.rootNodes.forEach(node => {
      node.style.top = y.toString() + 'px';
      node.style.left = x.toString() + 'px';
      this.renderer.appendChild(this.elementRef.nativeElement, node);
    });
    setTimeout(() => {
      if (this.viewContainerRef) {
        this.viewContainerRef.clear();
      }
    }, 6000); 
  }

}