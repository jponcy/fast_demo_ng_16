import {JsonProperty} from '@paddls/ts-serializer';

export class Author {
  @JsonProperty('mal_id')
  id: number;

  @JsonProperty()
  type: string;

  @JsonProperty()
  name: string;
}
