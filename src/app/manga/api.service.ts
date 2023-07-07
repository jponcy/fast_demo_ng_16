import {HttpClient, HttpParams} from '@angular/common/http';
import {Injectable, computed, inject, signal} from '@angular/core';
import {toObservable, toSignal} from '@angular/core/rxjs-interop';
import {NgxSerializerService} from '@paddls/ngx-serializer';
import {JikanResponse, Manga as MangaDTO} from '@tutkli/jikan-ts';
import {map, switchMap, tap} from 'rxjs';
import {Manga, PaginatedResult} from './models';
import {JsonProperty} from '@paddls/ts-serializer';

const URL = 'https://api.jikan.moe/v4';
const URL_MANGA = `${URL}/manga`;
const URL_GENRE = `${URL}/genres/manga`;

export interface MangaFilter {
  title: string;
  genre: number|null;
}

export class MangaGenre {
  @JsonProperty('mal_id')
  id: number;

  @JsonProperty()
  name: string;
}

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private readonly http = inject(HttpClient);
  private readonly serializer = inject(NgxSerializerService);

  readonly page = signal(1);
  readonly limit = signal(4);
  readonly search = signal<Partial<MangaFilter>>({});

  readonly genres = toSignal(this.http.get<{ data: any[]}>(URL_GENRE).pipe(
    tap(genres => console.log('GENRES', genres)),
    map(res => this.serializer.deserializeAll(MangaGenre, res.data))
  ));

  private readonly entities$ = toObservable(computed(() => ({
    page: this.page(),
    limit: this.limit(),
    search: this.search()
  }))).pipe(
    switchMap(({page, limit, search}) => {
      let params = new HttpParams()
        .append('page', page.toString())
        .append('limit', limit.toString());

      if (search) {
        if (search.title) params = params.append('q', `${search.title}`);
        if (search.genre) params = params.append('genres', `${search.genre}`);
        // params = params.append('q', search);
      }

      return this.http.get<JikanResponse<MangaDTO[]>>(URL_MANGA, {params});
    }),
    tap(res => console.log('DTO', res.data)),
    map(res => ({
      ...this.serializer.deserialize(PaginatedResult, res),
      data: this.serializer.deserializeAll(Manga, res.data)
    }))
  );
  readonly entities = toSignal(this.entities$);
}
