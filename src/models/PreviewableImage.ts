/**
 * A model representing an image that has been modified
 * by backend preview endpoints.
 */
export default interface PreviewableImage {

  /**
   * A value representing this image, this should
   * be unique no matter what image was generated or when.
   */
  id: number;

  /** The raw data itself. */
  data: string;

  /** The time that this image was created. */
  timestamp: Date;

  parameters: any;
}
