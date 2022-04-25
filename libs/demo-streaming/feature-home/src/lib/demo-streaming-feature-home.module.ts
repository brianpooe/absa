import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HomeContainerComponent } from './container/home-container.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([
      { path: '', pathMatch: 'full', component: HomeContainerComponent },
    ]),
  ],
  declarations: [HomeContainerComponent],
})
export class DemoStreamingFeatureHomeModule {}
