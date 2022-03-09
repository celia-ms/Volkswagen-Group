import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { paths } from './app-paths';
import { LayoutComponent } from './core/pages/layout/layout.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: paths.dashboard,
  },
  {
    path: paths.dashboard,
    component: LayoutComponent,
    loadChildren: () =>
      import('./features/dashboard/dashboard.module').then(
        (m) => m.DashboardModule
      ),
  },
  {
    path: '**',
    pathMatch: 'full',
    redirectTo: paths.dashboard,
  },
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      useHash: true,
      preloadingStrategy: PreloadAllModules,
    }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
