import axios from "axios";
import logger from "./logger";

export const createCatFactsPoller = (options: {
  interval: number;
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
    interval = setInterval(() => {
      logger.info("Polling new cat fact...");
      totalRequests++;

      if (options.maxRequests && totalRequests >= options.maxRequests) {
        stop();
      }
    }, options.interval);
  };

  return { start, stop };
};
