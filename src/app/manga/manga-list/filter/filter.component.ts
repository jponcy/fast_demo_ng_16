import {CommonModule} from '@angular/common';
import {ChangeDetectionStrategy, Component, inject} from '@angular/core';
import {toSignal} from '@angular/core/rxjs-interop';
import {FormBuilder, ReactiveFormsModule} from '@angular/forms';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import {debounceTime, tap} from 'rxjs';
import {ApiService, MangaFilter} from '../../api.service';

@Component({
  selector: 'app-filter',
  standalone: true,
  imports: [CommonModule, MatFormFieldModule, MatSelectModule, MatInputModule, ReactiveFormsModule],
  templateUrl: './filter.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FilterComponent {
  private readonly api = inject(ApiService);
  readonly genres = this.api.genres;
  readonly form = inject(FormBuilder).group<MangaFilter>({
    title: '',
    genre: null
  });

  constructor() {
    toSignal(this.form.valueChanges.pipe(
      debounceTime(200),
      tap(value => this.api.search.set(value)),
      tap(console.log)
    ));
  }
}
