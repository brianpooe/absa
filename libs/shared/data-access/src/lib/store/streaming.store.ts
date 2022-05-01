import { Injectable } from '@angular/core';
import { ComponentStore, tapResponse } from '@ngrx/component-store';
import { switchMap } from 'rxjs/operators';
import { Observable, take, tap } from 'rxjs';
import { Entry } from '@absa/shared/models';
import { HttpErrorResponse } from '@angular/common/http';
import { getComponentStateSelectors } from '@absa/shared/utils/component-store-helpers';
import { StreamingService } from '../service/streaming.service';

export interface StreamingState {
  readonly entries: Entry[] | null;
  readonly titles: Entry[];
  readonly isLoading: boolean;
  readonly loaded: boolean;
  readonly error: string | null;
}

export const initialStreamingState: StreamingState = {
  entries: [],
  titles: [],
  isLoading: false,
  loaded: false,
  error: null,
};

@Injectable()
export class StreamingStore extends ComponentStore<StreamingState> {
  private readonly selectors = getComponentStateSelectors(this);
  readonly key = 'programType';

  readonly vm$: Observable<StreamingState> = this.select(
    this.selectors.entries$,
    this.selectors.isLoading$,
    this.selectors.loaded$,
    this.selectors.error$,
    (
      entries: Entry[] | null,
      isLoading: boolean,
      loaded: boolean,
      error: string | null
    ) => ({
      entries,
      titles: [
        ...new Map(
          entries?.map((item) => [item?.['programType'], item])
        ).values(),
      ],
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
              console.error(error);
              this.patchState(() => ({
                error: 'Oops, something went wrong.',
              }));
            }
          )
        )
      )
    );
  });

  readonly addEntries = (entries: Entry[] = []): void => {
    this.patchState(() => ({
      entries,
      isLoading: false,
      loaded: true,
    }));
  };
}
