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

@NgModule({
    declarations: [ConfigurationsViewComponent, TitleBarComponent, ConfigurationsContainerComponent, ConfigurationsCardComponent, NewClientFormComponent, NewPremiseFormComponent, NewPremiseManagerFormComponent],
    imports: [
        CommonModule,
        ConfigurationsViewRoutingModule,
        ReactiveFormsModule
    ]
})
export class ConfigurationsViewModule { }
