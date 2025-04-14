export interface Media {
  /**
   * Build the media object
   * @param data - The data to build the media object
   * @returns The media object
   */
  build(data: Record<string, unknown>): Record<string, unknown>;
}
