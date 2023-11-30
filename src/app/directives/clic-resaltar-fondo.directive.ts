import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[appClicResaltarFondo]'
})
export class ClicResaltarFondoDirective {
  private fondoResaltado = false;
  constructor(private el: ElementRef) {}


  @HostListener('mouseenter') onMouseEnter() {
    this.fondoResaltado = !this.fondoResaltado;
    this.el.nativeElement.style.backgroundColor = this.fondoResaltado ? '#fff' : 'initial';
  }
  @HostListener('mouseleave') onMouseLeave() {
    this.el.nativeElement.style.backgroundColor = 'initial';
  }

}
