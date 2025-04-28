export interface Media {
  /**
   * Build the media data to send
   * @param data - The data to build the media data to send
   * @returns The media data to send
   */
  buildDataToSend(data: Record<string, unknown>): Record<string, unknown>;

  /**
   * Generate the data to send
   * @returns The data to send
   */
  generateDataToSend(): Record<string, unknown>;
}
