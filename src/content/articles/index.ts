import type { ComponentType } from "react";
import FleurDeSel from "./fleur-de-sel";
import AegeanSaltPans from "./aegean-salt-pans";
import APinchOffTheHeat from "./a-pinch-off-the-heat";
import FleurDeSelVsMaldon from "./fleur-de-sel-vs-maldon";
import BestSaltForSteak from "./best-salt-for-steak";
import IsExpensiveSaltWorthIt from "./is-expensive-salt-worth-it";

/** Maps an article slug to its written body. Keep in sync with ../journal.ts. */
export const ARTICLE_BODIES: Record<string, ComponentType> = {
  "fleur-de-sel": FleurDeSel,
  "aegean-salt-pans": AegeanSaltPans,
  "a-pinch-off-the-heat": APinchOffTheHeat,
  "fleur-de-sel-vs-maldon": FleurDeSelVsMaldon,
  "best-salt-for-steak": BestSaltForSteak,
  "is-expensive-salt-worth-it": IsExpensiveSaltWorthIt,
};
