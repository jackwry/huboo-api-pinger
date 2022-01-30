import dotenv from "dotenv";
import { createPoller } from "./poller";
import { getAppConfig } from "./appConfig";
import { createCatFactRequester } from "./getCatFact";
import logger from "./logger";

logger.info("Huboo cat fact's API poller started");

if (process.env.NODE_ENV !== "production") dotenv.config();

const { catFactsUrl, interval, maxRequests } = getAppConfig();

const catFactRequester = createCatFactRequester({ catFactsUrl });
const poller = createPoller({
  action: async () => {
    const catFact = await catFactRequester();
    logger.info(
      `New cat fact of the day is: ${catFact.fact} (length: ${catFact.length})`
    );
  },
  interval,
  maxRequests,
});

poller.start();

const onExit = () => {
  logger.info("Terminating application...");
  poller.stop();
};

process.on("SIGTERM", onExit).on("SIGINT", onExit);
