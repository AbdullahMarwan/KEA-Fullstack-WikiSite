import { useLocation } from "react-router-dom";
import { Heading, Box } from "@chakra-ui/react";

const MoviesSubPage = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const category = queryParams.get("category");

  const getCategoryHeading = () => {
    switch (category) {
      case "popular":
        return "Popular Movies";
      case "now-playing":
        return "Now Playing Movies";
      case "upcoming":
        return "Upcoming Movies";
      case "top-rated":
        return "Top Rated Movies";
      default:
        return "Movies";
    }
  };

  return (
    <Box>
      <Heading>{getCategoryHeading()}</Heading>
      {/* Add logic here to fetch and display movies based on the category */}
    </Box>
  );
};

export default MoviesSubPage;