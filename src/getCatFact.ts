import axios from "axios";
import logger from "./logger";

/**
 * Data type returned from cat facts API
 */
interface CatFact {
  /**
   * A fact about a cat
   */
  fact: string;

  /**
   * String length of fact
   */
  length: number;
}

export const createCatFactRequester =
  (options: { catFactsUrl: string }): (() => Promise<CatFact>) =>
  async () => {
    const response = await axios.get<CatFact>(options.catFactsUrl);

    if (response.status !== 200) {
      logger.warn(
        `HTTP request to get cat fact failed with status ${response.status}`
      );
    }

    return response.data;
  };
