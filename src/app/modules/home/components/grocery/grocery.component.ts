import { AfterContentInit, Component, ContentChild, ElementRef, Input, Renderer2 } from '@angular/core';
import { Grocery } from '../../model/grocery.model';

@Component({
  selector: 'app-grocery',
  templateUrl: './grocery.component.html',
  styleUrls: ['./grocery.component.scss']
})
export class GroceryComponent implements AfterContentInit {

  @ContentChild('contentImage', { read: ElementRef<HTMLImageElement>, static: false }) private imageElementRef!: ElementRef<HTMLImageElement>;

  @Input() grocery!: Grocery;
  @Input() isPreloader!: boolean | any;

  constructor(
    private renderer: Renderer2,
  ) { }

  public ngAfterContentInit(): void {
    // this.renderer.setStyle(this.imageElementRef.nativeElement, "position", "fixed");
    // this.renderer.setStyle(this.imageElementRef.nativeElement, "top", "25%");
    // this.renderer.setStyle(this.imageElementRef.nativeElement, "left", "40%");
  };

}
