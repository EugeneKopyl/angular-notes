import { Directive, ElementRef, Renderer2, HostListener } from '@angular/core';

@Directive({
    selector: '[appToggleExpanded]',
})
export class ToggleExpandedDirective {
    private isExpanded: boolean = false;

    constructor(
        private el: ElementRef,
        private renderer: Renderer2,
    ) {}

    @HostListener('click')
    toggleExpanded(): void {
        this.isExpanded = !this.isExpanded;
        if (this.isExpanded) {
            this.renderer.addClass(this.el.nativeElement, 'expanded');
        } else {
            this.renderer.removeClass(this.el.nativeElement, 'expanded');
        }
    }
}
