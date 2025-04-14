import { ActionHandler } from '../actions/ActionHandler.js';
import { SchedulerAction } from '../actions/SchedulerAction.js';
import { QueryAction } from '../actions/QueryAction.js';
import { LocationHandler } from '../actions/LocationHandler.js';
import { DefaultHandler } from '../actions/DefaultHandler.js';
import { SERVICES } from '@/services/whatsapp/constants/Services.js';

/**
 * Factory class for creating interactive message action handlers.
 * Implements the Factory Pattern with a default fallback handler.
 * This factory manages different types of interactive actions like scheduling calls,
 * querying services, and handling location requests.
 */
export class InteractiveHandlerFactory {
  /**
   * Default action key used when no matching handler is found
   * @private
   */
  private static default = 'default';

  /**
   * Registry of action handlers mapped to their corresponding service types.
   * Includes a default handler for unrecognized actions.
   * @private
   *
   * @example Action mapping:
   * - SCHEDULE_CALL -> SchedulerAction (handles call scheduling)
   * - ABOUT_SERVICES -> QueryAction (handles service inquiries)
   * - GET_LOCATION -> LocationHandler (handles location requests)
   * - default -> DefaultHandler (fallback handler)
   */
  private static actions: Record<string, ActionHandler> = {
    [SERVICES.SCHEDULE_CALL]: new SchedulerAction(),
    [SERVICES.ABOUT_SERVICES]: new QueryAction(),
    [SERVICES.GET_LOCATION]: new LocationHandler(),
    [this.default]: new DefaultHandler(),
  };

  /**
   * Creates an action handler based on the provided option.
   * If no matching handler is found, returns the default handler.
   *
   * @param option - The service option selected by the user
   * @returns The appropriate action handler or the default handler if no match is found
   *
   * @example
   * ```typescript
   * const handler = InteractiveHandlerFactory.createAction(SERVICES.SCHEDULE_CALL);
   * await handler.execute(message);
   * ```
   */
  static createAction(option: string): ActionHandler {
    return this.actions[option] ?? this.actions[this.default];
  }
}
