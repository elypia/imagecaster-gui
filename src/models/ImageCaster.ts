export interface ImageCasterConfig {
  build: BuildConfig;
  montageConfig: MontageConfig;
  archiveConfig: ArchiveConfig;
  checkConfig: CheckConfig;
}

export interface BuildConfig {
  input: string;
  metadata: MetadataConfig
}

export interface MetadataConfig {
  exif: TagsConfig,
  iptc: TagsConfig
}

export interface TagsConfig {
  defaults: boolean;
  tags: Tag[];
}

export interface Tag {
  name: string;
  value: string;
}

export interface Resize {
  filter?: string;
  geometries: string[];
}

export interface Modulate {
  mask?: string;
  modulation: Modulation[];
}

export interface Modulation {
  name: string;
  prefix?: string;
  brightness: number;
  saturation: number;
  hue: number;
}

export interface MontageConfig {

}

export interface ArchiveConfig {

}

export interface CheckConfig {

}
