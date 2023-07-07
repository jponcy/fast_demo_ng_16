import {CommonModule} from '@angular/common';
import {ChangeDetectionStrategy, Component, Signal, inject, signal} from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import {MatPaginatorModule} from '@angular/material/paginator';
import {RouterModule} from '@angular/router';
import {SliceWordsPipe} from '../../pipes/slice-words.pipe';
import {ApiService} from './../api.service';
import {FilterComponent} from './filter/filter.component';
import {Manga, PaginatedResult} from '../models';

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatButtonModule, MatPaginatorModule, FilterComponent, SliceWordsPipe, RouterModule],
  templateUrl: './manga-list.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MangaListComponent {
  private readonly api = inject(ApiService);

  readonly entities: Signal<PaginatedResult<Manga>> = this.api.entities;
  readonly pageSize = this.api.limit;
  readonly pageIndex = this.api.page;

  readonly pageSizeOptions = signal([4, 8, 16]);

  onPaginateChange(event: {pageSize: number, pageIndex: number}) {
    this.api.page.set(event.pageIndex + 1);
    this.api.limit.set(event.pageSize);
  }
}
