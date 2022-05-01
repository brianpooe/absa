import { Component } from '@angular/core';

@Component({
  selector: 'absa-root',
  template: `
    <div class="container">
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

      .container {
        display: grid;
        height: 100vh;
        grid-template-rows: auto 1fr auto;
      }
    `,
  ],
})
export class AppComponent {}
