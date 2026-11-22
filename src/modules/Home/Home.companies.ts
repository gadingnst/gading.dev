export interface WorkedWithCompany {
  id: string;
  name: string;
  url: string;
  /** path under /public; left out, the chip shows the initials */
  logo?: string;
}

/**
 * "Worked with" strip on the homepage: companies only, products live on /portfolio.
 * TODO: add the companies you worked with; while empty, the strip is hidden.
 */
export const WORKED_WITH: WorkedWithCompany[] = [];
