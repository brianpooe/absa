import * as moviesAndSeriesRaw from './raw/sample.json';
import {StreamingService} from './streaming.service';
import {HttpErrorResponse} from '@angular/common/http';
import {
  createHttpFactory,
  HttpMethod,
  SpectatorHttp,
} from '@ngneat/spectator/jest';
import DoneCallback = jest.DoneCallback;
import {Entry} from "@absa/shared/models";

describe(StreamingService.name, () => {
  let spectator: SpectatorHttp<StreamingService>;
  const createHttp = createHttpFactory(StreamingService);

  beforeEach(() => {
    spectator = createHttp();
  });

  it('should make an HttpClient.get call', () => {
    spectator.service.getMoviesAndSeries().subscribe({
      next: (data: Entry[]) => {
        expect(data).toEqual(moviesAndSeriesRaw)
      }
    });

    const request = spectator.expectOne(
      `${spectator.service.BASE_URL}/sample.json`,
      HttpMethod.GET
    );

    request.flush(moviesAndSeriesRaw);
  });

  it('can test for 404 error', (done: DoneCallback) => {
    const msg = 'deliberate 404 error';
    spectator.service.BASE_URL = '/data';

    spectator.service.getMoviesAndSeries().subscribe({
      next: () => done.fail(new Error('fail')),
      error: (error: HttpErrorResponse) => {
        expect(error.status).toEqual(404);
        expect(error.statusText).toEqual('Not Found');
        expect(error.error).toEqual(msg);
        done();
      },
    });

    const request = spectator.expectOne(
      `${spectator.service.BASE_URL}/sample.json`,
      HttpMethod.GET
    );

    request.flush(msg, {status: 404, statusText: 'Not Found'});
  });
});
