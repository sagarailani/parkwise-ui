import { NgModule, ViewChildren } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ConfigurationsViewComponent } from './configurations-view.component';
import { ConfigurationsContainerComponent } from './configurations-container/configurations-container.component';
import { NewClientFormComponent } from './new-client-form/new-client-form.component';
import { NewPremiseFormComponent } from './new-premise-form/new-premise-form.component';

const routes: Routes = [
    {
        path: 'configurations', component: ConfigurationsViewComponent, children: [
            {
                path: '', component: ConfigurationsContainerComponent
            },
            {
                path: 'client-form', component: NewClientFormComponent,
            },
            {
                path: 'premise-form', component: NewPremiseFormComponent,
            },

        ]
    },

];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ConfigurationsViewRoutingModule { }
