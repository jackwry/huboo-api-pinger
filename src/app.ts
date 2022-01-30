import { createCatFactsPoller } from "./poller";
import logger from "./logger";

logger.info("Huboo cat fact's API poller started");

const catFactsPoller = createCatFactsPoller({ interval: 3000 });

catFactsPoller.start();

const onExit = () => {
  logger.info("Terminating application...");
  catFactsPoller.stop();
};

process.on("SIGTERM", onExit).on("SIGINT", onExit);
