/**
 * Used to send the backend information to preview
 * an image at a particular geometry with all filters.
 */
export default interface ResizeAllFiltersRequest {

  /** A base64 encoded string, optionally with content-data to send. */
  image: string;

  /** The geometry to resize by, this uses the ImageMagick geometry syntax. */
  geometry: string;
}
