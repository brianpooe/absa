import { Component, ChangeDetectionStrategy, OnInit } from '@angular/core';
import { StreamingStore } from '@absa/shared/data-access';

@Component({
  selector: 'absa-home-container',
  template: ` <p>home container</p> `,
  styles: [
    `
      :host {
        display: block;
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeContainerComponent implements OnInit {
  constructor(private readonly streamingStore: StreamingStore) {}

  ngOnInit(): void {
    this.streamingStore.getAllEntriesEffect();
  }
}
