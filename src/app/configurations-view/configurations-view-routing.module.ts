import { NgModule, ViewChildren } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ConfigurationsViewComponent } from './configurations-view.component';
import { ConfigurationsContainerComponent } from './configurations-container/configurations-container.component';
import { NewClientFormComponent } from './new-client-form/new-client-form.component';
import { NewPremiseFormComponent } from './new-premise-form/new-premise-form.component';
import { NewPremiseManagerFormComponent } from './new-premise-manager-form/new-premise-manager-form.component';
import { PricingFormComponent } from './pricing-form/pricing-form.component';
import { NewGateWorkerFormComponent } from './new-gate-worker-form/new-gate-worker-form.component';
import { UpdatePremiseConfigurationFormComponent } from './update-premise-configuration-form/update-premise-configuration-form.component';
import { GeneratePassFormComponent } from './generate-pass-form/generate-pass-form.component';
import { GateFormComponent } from './gate-form/gate-form.component';
import { RegisteredVehicleComponent } from './registered-vehicle/registered-vehicle.component';
import { UpdatePricingConfigurationFormComponent } from './update-pricing-configuration-form/update-pricing-configuration-form.component';
import { PassConfigFormComponent } from './pass-config-form/pass-config-form.component';

const routes: Routes = [
    {
        path: 'configurations', component: ConfigurationsViewComponent, children: [
            {
                path: '',
                component: ConfigurationsContainerComponent
            },
            {
                path: 'client-form',
                component: NewClientFormComponent,
            },
            {
                path: 'premise-form',
                component: NewPremiseFormComponent
            },
            {
                path: 'new-premise-manager',
                component: NewPremiseManagerFormComponent
            },
            {
                path: 'new-gate-worker',
                component: NewGateWorkerFormComponent
            },
            {
                path: 'pricing',
                component: PricingFormComponent
            },
            {
                path: 'update-premise-configuration',
                component: UpdatePremiseConfigurationFormComponent
            },
            {
                path: 'generate-pass',
                component: GeneratePassFormComponent
            },
            {
                path: 'gate-config',
                component: GateFormComponent
            },
            {
                path: 'registered-vehicle',
                component: RegisteredVehicleComponent
            },
            {
                path: 'pricing-config',
                component: UpdatePricingConfigurationFormComponent,
            },
            {
                path: 'pass-config',
                component: PassConfigFormComponent
            }
        ]
    },

];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ConfigurationsViewRoutingModule { }
