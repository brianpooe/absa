import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';

// libs
import { DemoStreamingFeatureShellModule } from '@absa/demo-streaming/feature-shell';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, DemoStreamingFeatureShellModule],
  bootstrap: [AppComponent],
})
export class AppModule {}
