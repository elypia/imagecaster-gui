/**
 * Used to send the backend information to preview
 * an image at a particular modulation.
 */
export default interface ModulateRequest {

  /** A base64 encoded image, optionally with content-type to send. */
  image: string;

  /** The base64 encoded clipping mask, optionally with content-type to send.,  */
  mask?: string;

  /** What to adjust the brightness by, between 0 to 200, 100 changes nothing. */
  brightness?: number;

  /** What to adjust the saturation by, between 0 to 200, 100 changes nothing. */
  saturation?: number;

  /** What to adjust the hue by, between 0 to 200, 100 changes nothing. */
  hue?: number;
}
