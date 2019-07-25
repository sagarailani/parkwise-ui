import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ContentComponent } from './content/content.component';

const routes: Routes = [
    {
        path: '',
        component: ContentComponent,
    },
    {
        path: 'gw/:clientId/:premiseId/:role',
        redirectTo: '/gate-worker-view/:clientId/:premiseId/:role',
        pathMatch: 'full',
    },
    {
        path: 'other',
        redirectTo: '/configurations',
        pathMatch: 'full'
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
