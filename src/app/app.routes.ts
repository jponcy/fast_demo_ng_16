import {Routes} from '@angular/router';
import {MangaListComponent} from './manga/manga-list/manga-list.component';

export const routes: Routes = [
  { path: 'list', component: MangaListComponent },
  { path: ':id', loadComponent: () => import('./details/details.component').then(m => m.DetailsComponent) },
  { path: '', redirectTo: '/list', pathMatch: 'full' },
  { path: '**', redirectTo: '/list', pathMatch: 'full' },
];
