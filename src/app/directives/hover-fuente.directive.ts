import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[appHoverFuente]'
})
export class HoverFuenteDirective {

  @HostListener('mouseenter') onMouseEnter() {
    this.el.nativeElement.style.fontSize = '1.2em';
  }

  @HostListener('mouseleave') onMouseExit() {
    this.el.nativeElement.style.fontSize = '1em';
  }

  constructor(private el: ElementRef) {}
}