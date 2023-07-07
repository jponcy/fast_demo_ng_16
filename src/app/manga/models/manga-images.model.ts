import {JsonProperty} from '@paddls/ts-serializer';

export class MangaImages {
  @JsonProperty('image_url')
  imageUrl: string;

  @JsonProperty('small_image_url')
	smallImageUrl?: string;

  @JsonProperty('medium_image_url')
	mediumImageUrl?: string;

  @JsonProperty('large_image_url')
	largeImageUrl?: string;

  @JsonProperty('maximum_image_url')
	maximumImageUrl?: string;
}
