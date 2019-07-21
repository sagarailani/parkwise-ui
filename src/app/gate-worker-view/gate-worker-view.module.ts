import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { GateWorkerViewRoutingModule } from './gate-worker-view-routing.module';
import { GateWorkerViewComponent } from './gate-worker-view.component';
import { CardContainerComponent } from './card-container/card-container.component';
import { TitleBarComponent } from './title-bar/title-bar.component';
import { EntryExitComponent } from './entry-exit/entry-exit.component';
import { EntryTypeCardComponent } from './entry-type-card/entry-type-card.component';
import { VehicleTypeCardComponent } from './vehicle-type-card/vehicle-type-card.component';
import { DataEntryFormComponent } from './data-entry-form/data-entry-form.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
    declarations: [
        GateWorkerViewComponent,
        CardContainerComponent,
        TitleBarComponent,
        EntryExitComponent,
        EntryTypeCardComponent,
        VehicleTypeCardComponent,
        DataEntryFormComponent
    ],
    imports: [
        BrowserModule,
        GateWorkerViewRoutingModule,
        BrowserAnimationsModule,
        ReactiveFormsModule
    ]
})
export class GateWorkerViewModule { }
