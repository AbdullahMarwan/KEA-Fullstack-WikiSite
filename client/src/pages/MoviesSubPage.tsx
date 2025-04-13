import { useLocation } from "react-router-dom";
import {
  Heading,
  Box,
  Select,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  RadioGroup,
  Radio,
  Checkbox,
  Stack,
  Input,
  Wrap,
  WrapItem,
  Button,
} from "@chakra-ui/react";
import Cards from "../components/Homepage/Cards";
import {
  fetchTrendingMovies,
  fetchPopularMovies,
  fetchStreamingMovies,
  fetchNowPlayingMovies,
  fetchTopRatedMovies,
  fetchUpcomingMovies,
} from "../services/api";

const MoviesSubPage = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const category = queryParams.get("category") || "popular"; // Default to "popular"
  const defaultTimeWindow = category === "popular" ? "popular" : category;

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

  const getFetchFunction = () => {
    switch (category) {
      case "popular":
        return fetchPopularMovies;
      case "now-playing":
        return fetchNowPlayingMovies;
      case "upcoming":
        return fetchUpcomingMovies;
      case "top-rated":
        return fetchTopRatedMovies;
      default:
        return fetchTrendingMovies;
    }
  };

  return (
    <Box p={4}>
      <Heading mb={4}>{getCategoryHeading()}</Heading>
      <Box
        borderWidth="1px"
        borderRadius="lg"
        p={4}
        bg="white"
        boxShadow="md"
        maxWidth="300px"
      >
        {/* Sort Section */}
        <Box mb={4}>
          <Heading size="sm" mb={2}>
            Sort
          </Heading>
          <Select placeholder="Sort Results By">
            <option value="popularity.desc">Popularity Descending</option>
            <option value="popularity.asc">Popularity Ascending</option>
            <option value="release_date.desc">Release Date Descending</option>
            <option value="release_date.asc">Release Date Ascending</option>
          </Select>
        </Box>

        {/* Filters Section */}
        <Accordion allowToggle>
          {/* Show Me Section */}
          <AccordionItem>
            <AccordionButton>
              <Box flex="1" textAlign="left">
                Filters
              </Box>
              <AccordionIcon />
            </AccordionButton>
            <AccordionPanel pb={4}>
              {/* Show Me */}
              <Heading size="sm" mb={2}>
                Show Me
              </Heading>
              <RadioGroup defaultValue="everything">
                <Stack direction="column">
                  <Radio value="everything">Everything</Radio>
                  <Radio value="not-seen">Movies I Haven't Seen</Radio>
                  <Radio value="seen">Movies I Have Seen</Radio>
                </Stack>
              </RadioGroup>

              {/* Availabilities */}
              <Heading size="sm" mt={4} mb={2}>
                Availabilities
              </Heading>
              <Checkbox defaultChecked>Search all availabilities?</Checkbox>

              {/* Release Dates */}
              <Heading size="sm" mt={4} mb={2}>
                Release Dates
              </Heading>
              <Checkbox defaultChecked>Search all releases?</Checkbox>
              <Stack direction="row" mt={2}>
                <Input type="date" placeholder="From" />
                <Input type="date" placeholder="To" />
              </Stack>

              {/* Genres */}
              <Heading size="sm" mt={4} mb={2}>
                Genres
              </Heading>
              <Wrap>
                {[
                  "Action",
                  "Adventure",
                  "Animation",
                  "Comedy",
                  "Crime",
                  "Documentary",
                  "Drama",
                  "Family",
                  "Fantasy",
                  "History",
                  "Horror",
                  "Music",
                  "Mystery",
                  "Romance",
                  "Science Fiction",
                  "TV Movie",
                  "Thriller",
                  "War",
                  "Western",
                ].map((genre) => (
                  <WrapItem key={genre}>
                    <Button
                      size="sm"
                      variant="outline"
                      colorScheme="blue"
                      _hover={{ bg: "blue.100" }}
                    >
                      {genre}
                    </Button>
                  </WrapItem>
                ))}
              </Wrap>
            </AccordionPanel>
          </AccordionItem>
        </Accordion>
      </Box>
      <Cards
        fetchFunction={getFetchFunction()}
        maxItems={10}
        title="Trending"
        showLinkSelector={true}
        links={[
          { name: "I dag", href: "#", value: category }, // Use the category variable here
          { name: "Denne uge", href: "#", value: "week" },
        ]}
        defaultTimeWindow={defaultTimeWindow} // Use the defaultTimeWindow variable here as well
      />
    </Box>
  );
};

export default MoviesSubPage;