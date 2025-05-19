import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import {
  Heading,
  Box,
  Portal,
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
  Grid,
  GridItem,
} from "@chakra-ui/react";

import { sortByDate, sortByPopularity } from "../utils/sortingHelper";

//import { createListCollection } from "@chakra-ui/select"; // Import from @chakra-ui/select

import Cards from "../components/Homepage/Cards";
import { fetchTemplate } from "../services/api";

const MoviesSubPage = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const category = queryParams.get("category") || "popular"; // Default to "popular"
  const type = queryParams.get("type") || "movie"; // Default to "movie" (can be "movie" or "tv")

  const [items, setItems] = useState<any[]>([]); // State to store the fetched data

  const sortingOptions = [
    { label: "Popularity Descending", value: "popularity.desc" },
    { label: "Popularity Ascending", value: "popularity.asc" },
    { label: "Release Date Descending", value: "release_date.desc" },
    { label: "Release Date Ascending", value: "release_date.asc" },
  ];

  const getCategoryHeading = () => {
    if (type === "tv") {
      switch (category) {
        case "popular":
          return "Popular TV Shows";
        case "top-rated":
          return "Top Rated TV Shows";
        case "on-the-air":
          return "Currently Airing TV Shows";
        case "airing-today":
          return "TV Shows Airing Today";
        default:
          return "TV Shows";
      }
    } else {
      switch (category) {
        case "popular":
          return "Popular Movies";
        case "now_playing":
          return "Now Playing Movies";
        case "upcoming":
          return "Upcoming Movies";
        case "top_rated":
          return "Top Rated Movies";
        default:
          return "Movies";
      }
    }
  };

  const getFetchFunction = async () => {
    console.log("Fetching data for:", { type, category });

    if (type === "tv") {
      switch (category) {
        case "popular":
          return await fetchTemplate("popular", "tv");
        case "top-rated":
          return await fetchTemplate("top-rated", "tv");
        case "on-the-air":
          return await fetchTemplate("on-the-air", "tv");
        case "airing-today":
          return await fetchTemplate("airing-today", "tv");
        default:
          return await fetchTemplate("popular", "tv");
      }
    } else if (type === "movie") {
      switch (category) {
        case "popular":
          return await fetchTemplate("popular", "movie");
        case "now-playing":
          return await fetchTemplate("now-playing", "movie");
        case "upcoming":
          return await fetchTemplate("upcoming", "movie");
        case "top-rated":
          return await fetchTemplate("top-rated", "movie");
        default:
          return await fetchTemplate("popular", "movie");
      }
    } else {
      throw new Error(`Invalid type: ${type}`);
    }
  };

  const doSorting = (value: string) => {
    switch (value) {
      case "release_date.desc":
        return sortByDate(items, "desc");
      case "release_date.asc":
        return sortByDate(items, "asc");
      case "popularity.desc":
        return sortByPopularity(items, "desc");
      case "popularity.asc":
        return sortByPopularity(items, "asc");
      default:
        console.warn("Invalid sorting option");
        return items;
    }
  };

  useEffect(() => {
    const fetchItems = async () => {
      try {
        console.log("Fetching data for:", { type, category });
        const data = await getFetchFunction(); // Call the fetch function
        setItems(data.results || []); // Update the items state
      } catch (error) {
        console.error("Error fetching items:", error);
      }
    };

    fetchItems();
  }, [category, type]); // Re-run the effect when the category or type changes

  return (
    <Box padding="20px">
      <Grid
        templateAreas={{
          base: `"header" 
          "aside" 
          "main"`, // Stack vertically on mobile
          md: `"header header" 
          "aside main"`, // Side by side on medium screens and up
        }}
        gridTemplateColumns={{
          base: "1fr", // Full width single column on mobile
          md: "300px 1fr", // Fixed width aside, flexible main on medium screens and up
        }}
        width="100%"
        maxWidth="1300px"
        margin="0 auto"
        columnGap={6} // Add gap only between columns (side-to-side)
      >
        {/* Aside Section */}
        <GridItem area={"aside"}>
          <Heading size="lg" mb={4}>
            {getCategoryHeading()}
          </Heading>
          {/* Sort Section */}
          <Box
            borderWidth="1px"
            borderRadius="lg"
            bg="white"
            boxShadow="md"
            borderColor="gray.300"
            mb={4}
          >
            <Accordion allowToggle>
              <AccordionItem>
                <AccordionButton>
                  <Box flex="1" textAlign="left">
                    <Heading size="md" mb={2}>
                      {" "}
                      {/* Increased size to "md" */}
                      Sort
                    </Heading>
                  </Box>
                  <AccordionIcon />
                </AccordionButton>
                <AccordionPanel
                  pb={4}
                  borderTop="1px solid"
                  borderColor="gray.300"
                >
                  <Box>
                    <Heading size="xs" mb={2}>
                      Sort Results By
                    </Heading>

                    <Select
                      placeholder="Select sorting option"
                      onChange={(e: any) => {
                        const sortedItems = doSorting(e.target.value); // Get the sorted movies
                        setItems([...sortedItems]); // Update the movies state with the sorted movies
                      }}
                    >
                      {sortingOptions.map((option: any) => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </Select>
                  </Box>
                </AccordionPanel>
              </AccordionItem>
            </Accordion>
          </Box>

          {/* Filter Section */}
          <Box
            borderWidth="1px"
            borderRadius="lg"
            bg="white"
            boxShadow="md"
            borderColor="gray.300"
          >
            <Accordion allowToggle defaultIndex={[0]}>
              <AccordionItem>
                <AccordionButton>
                  <Box flex="1" textAlign="left">
                    <Heading size="md" mb={2}>
                      {" "}
                      {/* Increased size to "md" */}
                      Filters
                    </Heading>
                  </Box>
                  <AccordionIcon />
                </AccordionButton>
                <AccordionPanel
                  pb={4}
                  borderTop="1px solid"
                  borderColor="gray.300"
                >
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

                  <Box borderTop="1px solid" borderColor="gray.300">
                    {/* Availabilities */}
                    <Heading size="sm" mt={4} mb={2}>
                      Availabilities
                    </Heading>
                    <Checkbox defaultChecked>
                      Search all availabilities?
                    </Checkbox>
                  </Box>

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
        </GridItem>

        {/* Main Section */}
        <GridItem area={"main"}>
          <Box>
            <Cards
              customData={items} // Pass the fetched movies as customData
              maxItems={20} // Show more items in grid layout
              showLinkSelector={false}
              defaultTimeWindow={category}
              isGrid={true} // Enable grid layout
            />
          </Box>
        </GridItem>
      </Grid>
    </Box>
  );
};

export default MoviesSubPage;
