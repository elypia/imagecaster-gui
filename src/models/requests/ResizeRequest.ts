/**
 * Used to send the backend information to preview
 * an image at a particular geometry.
 */
export default interface ResizeRequest {

  /** A base64 encoded string, optionally with content-data to send. */
  image: string;

  /** The filter to use when resizing the image, this can be null. */
  filter?: string;

  /** The geometry to resize by, this uses the ImageMagick geometry syntax. */
  geometry: string;
}
