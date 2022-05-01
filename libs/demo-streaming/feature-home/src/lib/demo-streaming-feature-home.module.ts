import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HomeContainerComponent } from './container/home-container.component';
import { StreamingStore } from '@absa/shared/data-access';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([{ path: '', component: HomeContainerComponent }]),
  ],
  declarations: [HomeContainerComponent],
  providers: [StreamingStore],
  exports: [HomeContainerComponent],
})
export class DemoStreamingFeatureHomeModule {}
