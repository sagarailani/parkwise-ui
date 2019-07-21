import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { GateWorkerViewComponent } from './gate-worker-view.component';


const routes: Routes = [
    { path: 'gate-worker-view', component: GateWorkerViewComponent },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class GateWorkerViewRoutingModule { }
