import {
    Directive,
    ElementRef,
    Input,
    OnChanges,
    SimpleChanges,
} from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Directive({
    selector: '[appSafeUrl]',
})
export class SafeUrlDirective implements OnChanges {
    @Input() appSafeUrl: string | undefined;

    constructor(private el: ElementRef, private sanitizer: DomSanitizer) {}

    ngOnChanges(changes: SimpleChanges): void {
        if (changes['appSafeUrl']) {
            const sanitizedUrl: SafeResourceUrl =
                this.sanitizer.bypassSecurityTrustResourceUrl(
                    this.appSafeUrl ?? ''
                );

            // For example, if the element is an iframe, update the src attribute
            const nativeElement = this.el.nativeElement;
            if (nativeElement.tagName === 'IFRAME') {
                nativeElement.src = sanitizedUrl as string;
            } else {
                nativeElement.setAttribute('src', sanitizedUrl as string);
            }
        }
    }
}
