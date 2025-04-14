export interface ActionHandler {
  /**
   * Execute the action handler
   * @param to - The recipient's WhatsApp ID
   * @param messageId - The ID of the message to mark as read
   */
  execute(to: string, messageId: string): Promise<void>;
}
