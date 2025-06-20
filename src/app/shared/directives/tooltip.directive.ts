import { AfterViewInit, Directive, ElementRef, OnDestroy } from '@angular/core';

@Directive({
  selector: '[bTooltip]'
})
export class TooltipDirective implements AfterViewInit, OnDestroy {
  private tooltip: any;

  constructor(private elementRef: ElementRef) {}

  ngAfterViewInit() {
    const domElement: HTMLElement = this.elementRef.nativeElement;
    this.tooltip = new bootstrap.Tooltip(domElement);
  }

  ngOnDestroy(): void {
    this.tooltip.dispose();
  }
}