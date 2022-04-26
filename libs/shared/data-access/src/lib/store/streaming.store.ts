import { Injectable } from '@angular/core';
import { ComponentStore, tapResponse } from '@ngrx/component-store';
import { switchMap } from 'rxjs/operators';
import { Observable, take, tap } from 'rxjs';
import { Entry } from '@absa/shared/models';
import { HttpErrorResponse } from '@angular/common/http';
import { getComponentStateSelectors } from '@absa/shared/utils/component-store-helpers';
import { StreamingService } from '../service/streaming.service';

export interface StreamingState {
  readonly entries: Entry[] | undefined;
  readonly isLoading: boolean;
  readonly loaded: boolean;
  readonly error: HttpErrorResponse | undefined;
}

export const initialStreamingState: StreamingState = {
  entries: [],
  isLoading: false,
  loaded: false,
  error: undefined,
};

@Injectable()
export class StreamingStore extends ComponentStore<StreamingState> {
  private readonly selectors = getComponentStateSelectors(this);

  readonly vm$: Observable<StreamingState> = this.select(
    this.selectors.entries$,
    this.selectors.isLoading$,
    this.selectors.loaded$,
    this.selectors.error$,
    (
      entries: Entry[] | undefined,
      isLoading: boolean,
      loaded: boolean,
      error: HttpErrorResponse | undefined
    ) => ({
      entries,
      isLoading,
      loaded,
      error,
    })
  );

  constructor(private readonly streamingService: StreamingService) {
    super(initialStreamingState);
  }

  readonly getAllEntriesEffect = this.effect((stores$) => {
    return stores$.pipe(
      tap(() => this.patchState(() => ({ isLoading: true }))),
      switchMap(() =>
        this.streamingService.getMoviesAndSeries().pipe(
          take(1),
          tapResponse(
            (response: Entry[]) => this.addEntries(response),
            (error: HttpErrorResponse) => {
              this.patchState(() => ({
                error,
              }));
            }
          )
        )
      )
    );
  });

  readonly addEntries = (entries: Entry[]): void => {
    this.patchState(() => ({
      entries,
      isLoading: false,
      loaded: true,
    }));
  };
}
