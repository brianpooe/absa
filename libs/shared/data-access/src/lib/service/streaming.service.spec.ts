import * as moviesAndSeriesRaw from './raw/sample.json';
import { StreamingService } from './streaming.service';
import { HttpErrorResponse } from '@angular/common/http';
import {
  createHttpFactory,
  HttpMethod,
  SpectatorHttp,
} from '@ngneat/spectator/jest';

describe(StreamingService.name, () => {
  let spectator: SpectatorHttp<StreamingService>;
  const createHttp = createHttpFactory(StreamingService);

  beforeEach(() => {
    spectator = createHttp();
  });

  it('should make an HttpClient.get call', () => {
    spectator.service.getMoviesAndSeries().subscribe();

    // The following `expectOne()` will match the request's URL.
    // If no requests or multiple requests matched that URL
    // `expectOne()` would throw.
    const request = spectator.expectOne(
      `${spectator.service.BASE_URL}/sample.json`,
      HttpMethod.GET
    );

    // Respond with mock data, causing Observable to resolve.
    // Subscribe callback asserts that correct data was returned.
    request.flush(moviesAndSeriesRaw);
  });

  it('can test for 404 error', () => {
    const msg = 'deliberate 404 error';
    spectator.service.BASE_URL = '/data';

    spectator.service.getMoviesAndSeries().subscribe({
      next: () => fail('should have failed with the 404 error'),
      error: (error: HttpErrorResponse) => {
        expect(error.status).toEqual(404);
        expect(error.error).toEqual(msg);
      },
    });

    const request = spectator.expectOne(
      `${spectator.service.BASE_URL}/sample.json`,
      HttpMethod.GET
    );

    // Respond with mock error
    request.flush(msg, { status: 404, statusText: 'Not Found' });
  });
});
