import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';

// libs
import { DemoStreamingFeatureShellModule } from '@absa/demo-streaming/feature-shell';
import { SharedUiHeaderModule } from '@absa/shared/ui/header';
import { SharedUiFooterModule } from '@absa/shared/ui/footer';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    HttpClientModule,
    DemoStreamingFeatureShellModule,
    SharedUiHeaderModule,
    SharedUiFooterModule,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
