import { fetchCombinedCredits, fetchCrewJobs } from "../services/api";

export const doSorting = async (
  value: string,
  id: string,
  setPersonJobs: React.Dispatch<React.SetStateAction<any[]>>
) => {
  if (!id) {
    console.warn("ID is undefined");
    return;
  }

  switch (value.toLowerCase()) {
    case "all":
      // Combine cast and crew jobs
      const combinedCredits = await fetchCombinedCredits(id);
      const crewJobsData = await fetchCrewJobs(id);
      setPersonJobs([...combinedCredits, ...crewJobsData]);
      break;

    case "cast":
      // Fetch only cast jobs
      const castJobs = await fetchCombinedCredits(id);
      setPersonJobs(castJobs);
      break;

    case "crew":
      // Fetch only crew jobs
      const crewJobsOnly = await fetchCrewJobs(id);
      setPersonJobs(crewJobsOnly);
      break;

    default:
      console.warn("Invalid sorting option");
      break;
  }
};