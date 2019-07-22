import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ConfigurationsViewRoutingModule } from './configurations-view-routing.module';
import { ConfigurationsViewComponent } from './configurations-view.component';
import { TitleBarComponent } from './title-bar/title-bar.component';
import { ConfigurationsContainerComponent } from './configurations-container/configurations-container.component';
import { ConfigurationsCardComponent } from './configurations-card/configurations-card.component';
import { NewClientFormComponent } from './new-client-form/new-client-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { NewPremiseFormComponent } from './new-premise-form/new-premise-form.component';
import { NewPremiseManagerFormComponent } from './new-premise-manager-form/new-premise-manager-form.component';
import { PricingFormComponent } from './pricing-form/pricing-form.component';
import { NewGateWorkerFormComponent } from './new-gate-worker-form/new-gate-worker-form.component';
import { UpdatePremiseConfigurationFormComponent } from './update-premise-configuration-form/update-premise-configuration-form.component';
import { GeneratePassFormComponent } from './generate-pass-form/generate-pass-form.component';
import { GateFormComponent } from './gate-form/gate-form.component';
import { RegisteredVehicleComponent } from './registered-vehicle/registered-vehicle.component';

@NgModule({
    declarations: [ConfigurationsViewComponent, TitleBarComponent, ConfigurationsContainerComponent, ConfigurationsCardComponent, NewClientFormComponent, NewPremiseFormComponent, NewPremiseManagerFormComponent, PricingFormComponent, NewGateWorkerFormComponent, UpdatePremiseConfigurationFormComponent, GeneratePassFormComponent, GateFormComponent, RegisteredVehicleComponent],
    imports: [
        CommonModule,
        ConfigurationsViewRoutingModule,
        ReactiveFormsModule
    ]
})
export class ConfigurationsViewModule { }
