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
            }
        ]
    },

];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ConfigurationsViewRoutingModule { }
