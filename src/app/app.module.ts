import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { GateWorkerViewModule } from './gate-worker-view/gate-worker-view.module';
import { ConfigurationsViewModule } from './configurations-view/configurations-view.module';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { TitleBarComponent } from './title-bar/title-bar.component';
import { NavbarComponent } from './navbar/navbar.component';
import { ContentComponent } from './content/content.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { TokenInterceptor } from './token.interceptor';


@NgModule({
    declarations: [
        AppComponent,
        TitleBarComponent,
        NavbarComponent,
        ContentComponent,

    ],
    imports: [
        BrowserModule,
        HttpClientModule,
        ReactiveFormsModule,
        GateWorkerViewModule,
        ConfigurationsViewModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        NgbModule
    ],
    providers: [
        {
            provide: HTTP_INTERCEPTORS,
            useClass: TokenInterceptor,
            multi: true
        }
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
