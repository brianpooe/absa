import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HomeContainerComponent } from './container/home-container.component';
import { StreamingStore } from '@absa/shared/data-access';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([
      { path: '', pathMatch: 'full', component: HomeContainerComponent },
    ]),
  ],
  declarations: [HomeContainerComponent],
  providers: [StreamingStore],
})
export class DemoStreamingFeatureHomeModule {}
