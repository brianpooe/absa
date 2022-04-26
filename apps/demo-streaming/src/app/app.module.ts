import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';

// libs
import { DemoStreamingFeatureShellModule } from '@absa/demo-streaming/feature-shell';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, HttpClientModule, DemoStreamingFeatureShellModule],
  bootstrap: [AppComponent],
})
export class AppModule {}
