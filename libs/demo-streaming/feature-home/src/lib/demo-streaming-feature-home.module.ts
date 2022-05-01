import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HomeContainerComponent } from './container/home-container.component';
import { StreamingStore } from '@absa/shared/data-access';
import { SharedUiTitleModule } from '@absa/shared/ui/title';
import { SharedUiContentModule } from '@absa/shared/ui/content';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([{ path: '', component: HomeContainerComponent }]),
    SharedUiTitleModule,
    SharedUiContentModule,
  ],
  declarations: [HomeContainerComponent],
  providers: [StreamingStore],
  exports: [HomeContainerComponent],
})
export class DemoStreamingFeatureHomeModule {}
