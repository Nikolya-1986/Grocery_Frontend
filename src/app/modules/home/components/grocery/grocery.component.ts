import { AfterContentInit, Component, ContentChild, ContentChildren, ElementRef, Input, QueryList, Renderer2 } from '@angular/core';
import { Grocery } from '../../model/grocery.model';

@Component({
  selector: 'app-grocery',
  templateUrl: './grocery.component.html',
  styleUrls: ['./grocery.component.scss']
})
export class GroceryComponent implements AfterContentInit {

  // @ContentChild('contentImage', { read: ElementRef<HTMLImageElement>, static: false }) private imageElementRef!: ElementRef<HTMLImageElement>;
  @ContentChildren('contentImage') imageQueryList!: QueryList<ElementRef<HTMLImageElement>>;
  @Input() grocery!: Grocery;
  @Input() isPreloader!: boolean | any;


  constructor(
    private renderer: Renderer2,
  ) { }

  public ngAfterContentInit(): void {
    const images: ElementRef<HTMLImageElement>[] = this.imageQueryList.toArray();
    images.forEach((image: ElementRef<HTMLImageElement>) => {
      this.renderer.setStyle(image.nativeElement, 'padding', '0 .36rem 0 .36rem');
      this.renderer.setStyle(image.nativeElement, 'cursor', 'pointer');
    })
    // this.renderer.setStyle(this.imageElementRef.nativeElement, "position", "fixed");
    // this.renderer.setStyle(this.imageElementRef.nativeElement, "top", "25%");
    // this.renderer.setStyle(this.imageElementRef.nativeElement, "left", "40%");
  };

}
