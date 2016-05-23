import {Directive, ElementRef, Renderer} from 'angular2/core';

@Directive({
    selector: '[styled]',
})
export class StyledDirective {
    constructor(public el: ElementRef, public renderer: Renderer) {
        // el.nativeElement.style.backgroundColor = 'yellow';
        console.log(sessionStorage.getItem("mainColor"));
        renderer.setElementStyle(el.nativeElement, 'backgroundColor', sessionStorage.getItem("mainColor"));
        renderer.setElementStyle(el.nativeElement, 'border', 'none');

    }
}