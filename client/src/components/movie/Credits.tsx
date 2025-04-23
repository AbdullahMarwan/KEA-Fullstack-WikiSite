import React from "react";
import { Box, SimpleGrid, Text, VStack, Heading } from "@chakra-ui/react";

// Define interfaces for the props
interface Crew {
  id: number;
  name: string;
  job: string;
  department: string;
  profile_path: string | null;
}

interface Cast {
  id: number;
  name: string;
  character: string;
  profile_path: string | null;
}

interface Credits {
  id: number;
  cast: Cast[];
  crew: Crew[];
}

interface Movie {
  credits?: Credits;
}

interface CreditsProps {
  movie: Movie;
}

function Credits({ movie }: CreditsProps) {
  // Check if credits exist before rendering
  if (!movie.credits) {
    return <Text color="gray.500">No credits information available</Text>;
  }

  // Organize crew by name to consolidate roles
  const crewByName: {
    [key: string]: { id: number; name: string; jobs: string[] };
  } = {};

  // Get important crew members (directors, writers, etc)
  const importantJobs = [
    "director",
    "writer",
    "screenplay",
    "story",
    "characters",
  ];

  // Group crew members by name and combine their jobs
  movie.credits.crew.forEach((person) => {
    const jobLower = person.job.toLowerCase();
    if (importantJobs.includes(jobLower)) {
      if (crewByName[person.name]) {
        // Person already exists, add this job if not already included
        if (!crewByName[person.name].jobs.includes(person.job)) {
          crewByName[person.name].jobs.push(person.job);
        }
      } else {
        // Create new entry for this person
        crewByName[person.name] = {
          id: person.id,
          name: person.name,
          jobs: [person.job],
        };
      }
    }
  });

  // Convert to array for rendering
  const consolidatedCrew = Object.values(crewByName);

  // Get top cast members (limit to 6)
  const topCast = movie.credits.cast.slice(0, 6);

  return (
    <Box width="100%">
      <VStack align="flex-start" spacing={6} width="100%">
        {/* Key crew section */}
        <SimpleGrid columns={[2, 3, 4]} spacing={4} width="100%">
          {consolidatedCrew.map((person) => (
            <Box key={`crew-${person.id}`} borderRadius="md">
              <Text fontWeight="semibold">{person.name}</Text>
              <Text fontSize="sm" color="gray.400">
                {person.jobs.join(", ")}
              </Text>
            </Box>
          ))}
        </SimpleGrid>
      </VStack>
    </Box>
  );
}

export default Credits;
