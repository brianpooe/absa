import { EMPTY, Observable, of } from 'rxjs';
import {
  createServiceFactory,
  SpectatorService,
  SpyObject,
} from '@ngneat/spectator/jest';
import { subscribeSpyTo } from '@hirez_io/observer-spy';
import { StreamingService } from '../service/streaming.service';
import { StreamingState, StreamingStore } from '../store/streaming.store';
import { Entry } from '@absa/shared/models';

describe(StreamingStore.name, () => {
  let spectator: SpectatorService<StreamingStore>;
  let mockStreamingService: SpyObject<StreamingService>;
  let vm$: Observable<StreamingState>;

  const getVm = (partial: Partial<StreamingState> = {}) => ({
    entries: [],
    isLoading: false,
    loaded: false,
    ...partial,
  });

  const createService = createServiceFactory({
    service: StreamingStore,
    providers: [
      {
        provide: StreamingService,
        useValue: {
          getMoviesAndSeries: jest.fn(() => EMPTY),
        },
      },
    ],
  });

  beforeEach(() => {
    spectator = createService();
    mockStreamingService = spectator.inject(StreamingService);
    vm$ = spectator.service.vm$;
  });

  describe('initialize', () => {
    it('should create', () => {
      expect(spectator.service).toBeTruthy();
      expect(vm$).toBeTruthy();
    });

    it('should emit default value for vm$', () => {
      const observerSpy = subscribeSpyTo(vm$);
      expect(observerSpy.getFirstValue()).toEqual(getVm());
    });
  });

  describe('getAllEntriesEffects', () => {
    it('should call service getMoviesAndSeries', () => {
      // Arrange
      const observerSpy = subscribeSpyTo(vm$);
      const expected: Entry = {
        description: 'test',
        images: {
          'Poster Art': {
            url: 'test',
            height: 200,
            width: 200,
          },
        },
        programType: 'test.movies',
        releaseYear: 2001,
        title: 'test title',
      };
      mockStreamingService.getMoviesAndSeries.mockReturnValueOnce(
        of([expected])
      );

      // Act
      spectator.service.getAllEntriesEffect();

      // Assert
      expect(observerSpy.getLastValue()).toEqual(
        getVm({
          entries: [expected],
          isLoading: false,
          loaded: true,
          error: undefined,
        })
      );
    });
  });
});
