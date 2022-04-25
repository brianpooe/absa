import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { AppRoutesEnum } from '@absa/shared/models';

const routes: Routes = [
  { path: '', redirectTo: AppRoutesEnum.HOME, pathMatch: 'full' },
  {
    path: 'home',
    loadChildren: (): Promise<unknown> =>
      import('@absa/demo-streaming/feature-home').then(
        (m) => m.DemoStreamingFeatureHomeModule
      ),
  },
];

@NgModule({
  imports: [CommonModule, RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class DemoStreamingFeatureShellModule {}
