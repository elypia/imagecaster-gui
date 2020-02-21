/** Utility methods to perform misc string functions. */
export default class StringUtils {

  /**
   * Check if the URL is internal or external, this is determined
   * based on if the string starts with a /.
   *
   * @param url The URL to check against.
   * @returns True if the url is an external url.
   */
  public static isExternalUrl(url: string): boolean {
    return url[0] !== '/';
  }
}
