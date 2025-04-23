import dayjs from "dayjs";

/**
 * Sorts an array of movies based on their release date in ascending or descending order.
 * @param movies - The array of movies to sort.
 * @param order - The sorting order: "asc" for ascending, "desc" for descending.
 * @returns The sorted array of movies.
 */
export const sortByDate = (
  movies: { release_date: string | undefined }[],
  order: "asc" | "desc" = "asc"
): { release_date: string | undefined }[] => {
  return movies.sort((a, b) => {
    const d1 = dayjs(a.release_date);
    const d2 = dayjs(b.release_date);

    if (!d1.isValid() || !d2.isValid()) {
      return 0; // Treat invalid dates as equal
    }

    return order === "asc" ? d1.diff(d2) : d2.diff(d1);
  });
};

//TODO add sortByPopularity function