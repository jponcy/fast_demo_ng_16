import {JsonProperty} from '@paddls/ts-serializer';
import {Author} from './author.model';
import {MangaImages} from './manga-images.model';

export class Manga {
  @JsonProperty('mal_id')
  id: number;

  @JsonProperty()
  title: string;

  @JsonProperty()
  approved: boolean;

  @JsonProperty(() => Author)
  authors: Author[];

  @JsonProperty()
  synopsis: string;

  @JsonProperty({ field: 'images.jpg', type: () => MangaImages })
  images: MangaImages;

  @JsonProperty()
  rank: number;

  public constructor(data: Partial<Manga> = {}) {
    Object.assign(this, data);
  }
}
