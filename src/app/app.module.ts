import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { GateWorkerViewModule } from './gate-worker-view/gate-worker-view.module';
import { ConfigurationsViewModule } from './configurations-view/configurations-view.module';
import { HttpClientModule } from '@angular/common/http';
import { TitleBarComponent } from './title-bar/title-bar.component';

@NgModule({
    declarations: [
        AppComponent,
        TitleBarComponent,
    ],
    imports: [
        BrowserModule,
        HttpClientModule,
        ReactiveFormsModule,
        GateWorkerViewModule,
        ConfigurationsViewModule,
        AppRoutingModule,
        BrowserAnimationsModule
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule { }
