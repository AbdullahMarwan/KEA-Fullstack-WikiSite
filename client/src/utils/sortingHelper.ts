import dayjs from "dayjs";

/**
 * Sorts two values based on date in ascending or descending order.
 * @param date1 - The first date value.
 * @param date2 - The second date value.
 * @param order - The sorting order: "asc" for ascending, "desc" for descending.
 * @returns A number indicating the sort order.
 */
export const sortByDate = (
  date1: string | undefined,
  date2: string | undefined,
  order: "asc" | "desc" = "asc"
): number => {
  const d1 = dayjs(date1);
  const d2 = dayjs(date2);

  if (!d1.isValid() || !d2.isValid()) {
    return 0; // Treat invalid dates as equal
  }

  return order === "asc" ? d1.diff(d2) : d2.diff(d1);
};