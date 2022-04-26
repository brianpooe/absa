import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Entry, MoviesAndSeriesModel } from '@absa/shared/models';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class StreamingService {
  BASE_URL = 'assets/feed';

  constructor(private httpClient: HttpClient) {}

  getMoviesAndSeries = (): Observable<Entry[]> =>
    this.httpClient
      .get<MoviesAndSeriesModel>(`${this.BASE_URL}/sample.json`)
      .pipe(
        map(
          (moviesAndSeriesModel: MoviesAndSeriesModel) =>
            moviesAndSeriesModel?.entries ?? []
        )
      );
}
