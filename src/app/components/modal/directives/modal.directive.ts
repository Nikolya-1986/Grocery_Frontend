import { ComponentFactoryResolver, ComponentRef, Directive, EventEmitter, HostListener, Input, Output, ViewContainerRef } from '@angular/core';
import { Subject } from 'rxjs';

import { Grocery } from '../../../modules/home/model/grocery.model';
import { ModalComponent } from '../modal.component';

@Directive({
  selector: '[openModal]'
})
export class ModalDirective { 

  @Input() public title!: string;
  @Input() public text!: string;
  @Input() public data!: Grocery | any;
  @Output() public confirmActionEvent: EventEmitter<Grocery> = new EventEmitter<Grocery>();

  public componentSubject$!: Subject<string>;

  constructor(
    private componentFactoryResolver: ComponentFactoryResolver,
    private viewContainer: ViewContainerRef,
  ) { }

  @HostListener('click', ['$event'])
  clickEvent(event: { preventDefault: () => void; stopPropagation: () => void; }) {
    event.preventDefault();
    event.stopPropagation();
    this.openModal()
  };

  public openModal() {
    this.viewContainer.clear();
    const modalComponentFactory = this.componentFactoryResolver.resolveComponentFactory(ModalComponent);
    const modalComponentRef = this.viewContainer.createComponent(modalComponentFactory);

    modalComponentRef.instance['modalTitle'] = this.title;
    modalComponentRef.instance['modalBody'] = this.text;
    modalComponentRef.instance['item'] = this.data;
    modalComponentRef.instance['cancelActionEvent'].subscribe(() => this.cancelAction(modalComponentRef));
    modalComponentRef.instance['confirmActionEvent'].subscribe(() => this.confirmAction(modalComponentRef));
    this.componentSubject$ = new Subject<string>();
    return this.componentSubject$.asObservable();
  };

  private cancelAction(modal: ComponentRef<ModalComponent>) {
    this.componentSubject$.complete();
    modal.destroy();
  };

  private confirmAction(modal: ComponentRef<ModalComponent>) {
    this.componentSubject$.next(`${this.title}`);
    this.cancelAction(modal);
    this.confirmActionEvent.emit(this.data);
    this.componentSubject$.unsubscribe();
  };

}
