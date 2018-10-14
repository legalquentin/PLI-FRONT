import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Pipe({name: 'cbSafeHtml'})
export class CbSafeHtml implements PipeTransform {
  constructor(private sanitizer: DomSanitizer) {}

  transform(html) {
    this.sanitizer.bypassSecurityTrustStyle(html);
    return this.sanitizer.bypassSecurityTrustHtml(html);
  }
}
