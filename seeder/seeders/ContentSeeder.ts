import { DataSource } from "typeorm";
import { Content } from "../entities/Content";
import axios from "axios";
import dotenv from "dotenv";

dotenv.config();

const totalPages = 6; // Reduced to just 1 page per category to limit data volume
const API_KEY = process.env.TMDB_API_KEY || "dfd45a50a0761538bfed7f664cacb4d7";
const BASE_URL = "https://api.themoviedb.org/3";

// Define types for API responses
interface TMDBMovie {
  id: number;
  title: string;
  overview: string;
  release_date: string;
  poster_path: string;
  vote_average: number;
}

interface TMDBTVShow {
  id: number;
  name: string;
  overview: string;
  first_air_date: string;
  poster_path: string;
  vote_average: number;
}

type TMDBContent = TMDBMovie | TMDBTVShow;

// Helper function to fetch trailer URLs
async function fetchTrailerUrl(id: number, type: string): Promise<string> {
  try {
    const response = await axios.get(
      `${BASE_URL}/${type}/${id}/videos?api_key=${API_KEY}`
    );

    const results = response.data.results;
    if (!results || results.length === 0) {
      return "";
    }

    // First try to find an official trailer
    const trailer = results.find(
      (v: any) => v.site === "YouTube" && v.type === "Trailer"
    );

    // If no official trailer, use any YouTube video
    const youtubeVideo = results.find((v: any) => v.site === "YouTube");

    if (trailer || youtubeVideo) {
      const video = trailer || youtubeVideo;
      return `https://www.youtube.com/watch?v=${video.key}`;
    }

    return "";
  } catch (error: any) {
    console.error(`Error fetching trailer for ${type} ${id}:`, error.message);
    return "";
  }
}

export const seedContent = async (
  dataSource: DataSource
): Promise<Map<number, string>> => {
  console.log("Starting content import from TMDB API...");

  const contentRepository = dataSource.getRepository(Content);
  const contentCategoryMap = new Map<number, string>(); // Track content source for category mapping

  // Insert content from TMDB
  const processedIds = new Set<number>();

  // Define movie endpoints to fetch based on categories
  const movieEndpoints = [
    { name: "popular", url: "movie/popular", category: "popular" },
    { name: "now_playing", url: "movie/now_playing", category: "now_playing" },
    { name: "upcoming", url: "movie/upcoming", category: "upcoming" },
    { name: "trending", url: "trending/movie/week", category: "trending" },
  ];

  // Define TV endpoints
  const tvEndpoints = [
    { name: "popular", url: "tv/popular", category: "popular" },
  ];

  // Fetch movies from all endpoints
  for (const endpoint of movieEndpoints) {
    console.log(`Fetching ${endpoint.name} movies...`);
    let allContent: TMDBContent[] = [];

    // Only fetch 1 page per endpoint
    const url = `${BASE_URL}/${endpoint.url}?api_key=${API_KEY}&page=1`;
    const response = await axios.get(url);
    allContent = response.data.results;
    console.log(`Fetched ${allContent.length} ${endpoint.name} movies`);

    for (const item of allContent) {
      // Skip if we've already processed this content ID
      if (processedIds.has(item.id)) {
        continue;
      }

      processedIds.add(item.id); // Mark as processed

      try {
        // Fetch trailer data for this content item
        console.log(`Fetching trailer for movie ID: ${item.id}`);
        const trailerUrl = await fetchTrailerUrl(item.id, "movie");

        const content = contentRepository.create({
          id: item.id,
          title: (item as TMDBMovie).title,
          overview: item.overview,
          release_date: (item as TMDBMovie).release_date,
          poster_path: item.poster_path,
          vote_average: item.vote_average,
          content_type: "movie",
          trailer_url: trailerUrl,
        });

        await contentRepository.save(content);

        // Store which category this content belongs to
        contentCategoryMap.set(item.id, endpoint.category);
      } catch (error: any) {
        console.error(
          `Error processing movie ID ${item.id}:`,
          error.message || "Unknown error"
        );
      }
    }
  }

  // Fetch TV shows (only 1 page)
  for (const endpoint of tvEndpoints) {
    console.log(`Fetching ${endpoint.name} TV shows...`);

    const url = `${BASE_URL}/${endpoint.url}?api_key=${API_KEY}&page=1`;
    const response = await axios.get(url);
    const allContent = response.data.results;
    console.log(`Fetched ${allContent.length} ${endpoint.name} TV shows`);

    for (const item of allContent) {
      // Skip if we've already processed this content ID
      if (processedIds.has(item.id)) {
        continue;
      }

      processedIds.add(item.id); // Mark as processed

      try {
        // Fetch trailer data for this content item
        console.log(`Fetching trailer for TV show ID: ${item.id}`);
        const trailerUrl = await fetchTrailerUrl(item.id, "tv");

        const content = contentRepository.create({
          id: item.id,
          title: (item as TMDBTVShow).name,
          overview: item.overview,
          release_date: (item as TMDBTVShow).first_air_date,
          poster_path: item.poster_path,
          vote_average: item.vote_average,
          content_type: "tv",
          trailer_url: trailerUrl,
        });

        await contentRepository.save(content);

        // Store which category this content belongs to
        contentCategoryMap.set(item.id, endpoint.category);
      } catch (error: any) {
        console.error(
          `Error processing TV show ID ${item.id}:`,
          error.message || "Unknown error"
        );
      }
    }
  }

  console.log(`Content seeding completed with ${processedIds.size} items`);
  return contentCategoryMap;
};
