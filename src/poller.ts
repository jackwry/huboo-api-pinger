import logger from "./logger";

/**
 * Creates an instance of a poller which is a wrapper around setTimeout
 * @param options Configuration for the poller
 * @returns A poller which can be started and stopped
 */
export const createPoller = (options: {
  interval: number;
  action: () => Promise<void>;
  maxRequests?: number;
}) => {
  let interval: NodeJS.Timer | undefined;
  let totalRequests = 0;

  const stop = () => {
    if (!interval) {
      const message = "No cat facts service to stop";
      logger.error(message);
      throw message;
    }

    clearInterval(interval);
  };

  const start = () => {
    interval = setInterval(async () => {
      logger.info("Running new action...");
      await options.action();

      totalRequests++;

      if (options.maxRequests && totalRequests >= options.maxRequests) {
        logger.info("Maximum requests reached... stopping poller");
        stop();
      }
    }, options.interval);
  };

  return { start, stop };
};
