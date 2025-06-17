import axios from "axios";
import { DataSource } from "typeorm";
import { People } from "../entities/People";
import * as dotenv from "dotenv";

dotenv.config();

// Define your base URL and API key
const API_KEY = process.env.TMDB_API_KEY || process.env.VITE_API_KEY;
const BASE_URL = "https://api.themoviedb.org/3";

export const seedPeople = async (dataSource: DataSource) => {
  if (!API_KEY) {
    console.error("TMDB API key is missing! Add it to your .env file");
    return;
  }

  try {
    const peopleRepository = dataSource.getRepository(People);
    console.log("Starting people seeder...");

    // First check if data already exists
    const existingPeopleCount = await peopleRepository.count();
    if (existingPeopleCount > 0) {
      console.log(
        `People table already has ${existingPeopleCount} records. Skipping seeding.`
      );
      return;
    }

    // We'll fetch multiple pages to get more people
    const totalPages = 2; // Reduced for testing, increase later

    // Batch variables for saving in chunks
    let batch: People[] = [];
    const batchSize = 20; // Adjust batch size as needed

    for (let page = 1; page <= totalPages; page++) {
      console.log(`Fetching people page ${page}/${totalPages}...`);

      // Fetch popular people from the API
      const response = await axios.get(`${BASE_URL}/person/popular`, {
        params: {
          api_key: API_KEY,
          page: page,
        },
      });

      const popularPeople = response.data.results;
      console.log(`Retrieved ${popularPeople.length} people from page ${page}`);

      // Debug the first person to see the structure
      if (page === 1) {
        console.log(
          "Example person data:",
          JSON.stringify(popularPeople[0], null, 2)
        );
      }

      // For each person, we need to get their full details to get the birthday and biography
      for (const person of popularPeople) {
        try {
          console.log(
            `Fetching details for ${person.name} (ID: ${person.id})...`
          );

          // Get detailed person info
          const detailResponse = await axios.get(
            `${BASE_URL}/person/${person.id}`,
            {
              params: {
                api_key: API_KEY,
              },
            }
          );

          const personDetail = detailResponse.data;

          // Debug the first person's details
          if (page === 1 && popularPeople.indexOf(person) === 0) {
            console.log(
              "Person details example:",
              JSON.stringify(personDetail, null, 2)
            );
          }

          // Create a People entity with the data
          const newPerson = new People();
          newPerson.id = person.id;
          newPerson.name = person.name || "Unknown";
          newPerson.known_for = person.known_for_department || "Unknown";
          newPerson.gender = person.gender || 0;
          newPerson.profile_path = person.profile_path || null;

          // Handle birthday - make sure it's a valid date or null
          if (personDetail.birthday && personDetail.birthday !== "") {
            try {
              newPerson.birthday = new Date(personDetail.birthday);
              // Check if valid date
              if (isNaN(newPerson.birthday.getTime())) {
                newPerson.birthday = null;
              }
            } catch (e) {
              newPerson.birthday = null;
            }
          } else {
            newPerson.birthday = null;
          }

          // Handle biography - trim if needed (your column is limited to 200 chars)
          if (personDetail.biography) {
            newPerson.biography =
              personDetail.biography.length > 197
                ? personDetail.biography.substring(0, 197) + "..."
                : personDetail.biography;
          } else {
            newPerson.biography = "";
          }

          batch.push(newPerson);

          if (batch.length === batchSize) {
            await peopleRepository.save(batch);
            console.log(
              `Saved batch of ${batch.length} people.`
            );
            batch = [];
          }

          // Add a small delay to avoid hitting rate limits
          await new Promise((resolve) => setTimeout(resolve, 300));
        } catch (error: any) {
          console.error(
            `Error fetching details for person ${person.id}:`,
            error.message || "Unknown error"
          );
        }
      }
    }

    // Save any remaining people in the last batch
    if (batch.length > 0) {
      await peopleRepository.save(batch);
      console.log(
        `Saved final batch of ${batch.length} people.`
      );
    }

    console.log("People data seeded successfully!");
  } catch (error: any) {
    console.error(
      "Error seeding people data:",
      error.message || "Unknown error"
    );
  }
};

// Run the seeder if this file is executed directly
if (require.main === module) {
  // Import here to avoid circular dependencies when run directly
  import("../data-source").then(({ AppDataSource }) => {
    AppDataSource.initialize()
      .then(() => seedPeople(AppDataSource))
      .then(() => AppDataSource.destroy())
      .then(() => process.exit(0))
      .catch((error: any) => {
        console.error(error.message || error);
        process.exit(1);
      });
  });
}
