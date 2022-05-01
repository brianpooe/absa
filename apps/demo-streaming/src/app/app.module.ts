import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

// libs
import { DemoStreamingFeatureShellModule } from '@absa/demo-streaming/feature-shell';
import { DemoStreamingFeatureHeaderModule } from '@absa/demo-streaming/feature-header';
import { DemoStreamingFeatureHomeModule } from '@absa/demo-streaming/feature-home';
import { DemoStreamingFeatureFooterModule } from '@absa/demo-streaming/feature-footer';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    DemoStreamingFeatureHomeModule,
    DemoStreamingFeatureShellModule,
    DemoStreamingFeatureHeaderModule,
    DemoStreamingFeatureFooterModule,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
