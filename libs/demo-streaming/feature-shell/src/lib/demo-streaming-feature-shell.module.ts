import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { AppRoutesEnum } from '@absa/shared/models';

const routes: Routes = [
  { path: '', redirectTo: AppRoutesEnum.HOME, pathMatch: 'full' },
  {
    path: AppRoutesEnum.HOME,
    loadChildren: (): Promise<unknown> =>
      import('@absa/demo-streaming/feature-home').then(
        (m) => m.DemoStreamingFeatureHomeModule
      ),
  },
  {
    path: AppRoutesEnum.MOVIES,
    loadChildren: (): Promise<unknown> =>
      import('@absa/demo-streaming/feature-movies').then(
        (m) => m.DemoStreamingFeatureMoviesModule
      ),
  },
  {
    path: AppRoutesEnum.SERIES,
    loadChildren: (): Promise<unknown> =>
      import('@absa/demo-streaming/feature-series').then(
        (m) => m.DemoStreamingFeatureSeriesModule
      ),
  },
];

@NgModule({
  imports: [CommonModule, RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class DemoStreamingFeatureShellModule {}
