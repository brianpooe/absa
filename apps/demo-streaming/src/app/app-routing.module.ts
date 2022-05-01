import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// libs
import { AppRoutesEnum } from '@absa/shared/models';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: AppRoutesEnum.HOME,
  },
  {
    path: AppRoutesEnum.HOME,
    loadChildren: (): Promise<unknown> =>
      import('@absa/demo-streaming/feature-home').then(
        (m) => m.DemoStreamingFeatureHomeModule
      ),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
