/**
 * Used to send the backend information to preview
 * an image at a particular geometry.
 */
import ResizeAllFiltersRequest from "./ResizeAllFiltersRequest";

/**
 * This is just the {@link ResizeAllFiltersRequest} except we specify
 * a single filter to export instead of all filters.
 */
export default interface ResizeRequest extends ResizeAllFiltersRequest {

  /** The filter to use when resizing the image, this can be null. */
  filter?: string;
}
