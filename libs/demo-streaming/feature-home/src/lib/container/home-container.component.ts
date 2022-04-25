import { Component, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'absa-home-container',
  template: ` <p>home-container works!</p> `,
  styles: [
    `
      :host {
        display: block;
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeContainerComponent {}
