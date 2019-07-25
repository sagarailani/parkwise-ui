import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { GateWorkerViewComponent } from './gate-worker-view.component';
import { CardContainerComponent } from './card-container/card-container.component';


const routes: Routes = [
    { path: 'gate-worker-view/:clientId/:premiseId/:role', component: CardContainerComponent },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class GateWorkerViewRoutingModule { }
