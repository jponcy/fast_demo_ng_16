import {JsonProperty} from '@paddls/ts-serializer';

export class PaginatedResult<T> {
  data: T[];

  @JsonProperty('pagination.current_page')
  page: number;

  @JsonProperty('pagination.items.per_page')
  limit: number;

  @JsonProperty('pagination.items.total')
  total: number;

  @JsonProperty('pagination.has_next_page')
  hasNext: number;
}
