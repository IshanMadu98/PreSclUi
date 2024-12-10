import { NgModule } from '@angular/core';
import { ExtraOptions, PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { Paths } from './@application/enums/paths';
import { UnauthorizedComponent } from './public/unauthorized/unauthorized.component';

const routerOptions: ExtraOptions = {
  scrollPositionRestoration: 'enabled',
  anchorScrolling: 'enabled',
  scrollOffset: [0, 64],
  preloadingStrategy: PreloadAllModules
};

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./public/public.module').then(m => m.PublicModule)
  },
  {
    path: '',
    loadChildren: () => import('./private/administration/administration.module').then(m => m.AdministrationModule),
  },
  {
    path: '',
    loadChildren: () => import('./private/student/student.module').then(m => m.StudentModule),
  },
  {
    path: Paths.Unauthorized,
    component: UnauthorizedComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes,routerOptions)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
