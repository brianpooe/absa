import { Component } from '@angular/core';

@Component({
  selector: 'absa-root',
  template: `
    <div>
      <absa-header></absa-header>
      <div>
        <router-outlet></router-outlet>
      </div>
      <absa-footer></absa-footer>
    </div>
  `,
  styles: [
    `
      :host {
        display: block;
      }
    `,
  ],
})
export class AppComponent {}
