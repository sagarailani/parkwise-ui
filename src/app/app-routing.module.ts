import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
    {
        path: 'gw',
        redirectTo: '/gate-worker-view',
        pathMatch: 'full',
    },
    {
        path: '',
        redirectTo: '/configurations',
        pathMatch: 'full'
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
