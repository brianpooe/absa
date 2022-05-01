import { Component, ChangeDetectionStrategy, OnInit } from '@angular/core';
import { map, Observable } from 'rxjs';
import { StreamingState, StreamingStore } from '@absa/shared/data-access';
import { Entry } from '@absa/shared/models';

@Component({
  selector: 'absa-home-container',
  template: `
    <absa-title></absa-title>
    <absa-content
      [isLoading]="isLoading$ | async"
      [entries]="titles$ | async"
      [error]="error$ | async"
    ></absa-content>
  `,
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
  titles$!: Observable<Entry[] | null>;
  isLoading$!: Observable<boolean>;
  error$!: Observable<string | null>;

  constructor(private readonly streamingStore: StreamingStore) {}

  ngOnInit(): void {
    this.streamingStore.getAllEntriesEffect();

    this.titles$ = this.streamingStore.vm$.pipe(
      map((value: StreamingState) => value.titles)
    );
    this.isLoading$ = this.streamingStore.vm$.pipe(
      map((value: StreamingState) => value.isLoading)
    );
    this.error$ = this.streamingStore.vm$.pipe(
      map((value: StreamingState) => value.error)
    );
  }
}
