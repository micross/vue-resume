import type { ID } from "~/lib/schema";

export type TemplateProps = {
  columns: ID[][];
  isFirstPage?: boolean;
};
