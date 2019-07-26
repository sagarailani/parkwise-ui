import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ContentComponent } from './content/content.component';

const routes: Routes = [
    {
        path: '',
        component: ContentComponent,
    },
    {
        path: 'gw/:clientId/:premiseId/:role/:workerId',
        redirectTo: '/gate-worker-view/:clientId/:premiseId/:role/:workerId',
        pathMatch: 'full',
    },
    {
        path: 'other/:clientId/:premiseId/:role',
        redirectTo: 'configurations/:clientId/:premiseId/:role',
        pathMatch: 'full'
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
