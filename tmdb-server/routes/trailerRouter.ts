import { Router, Request, Response } from "express";
import { AppDataSource } from "../startup/data-source";
import { Content } from "../entities/Content";
import { Not } from "typeorm";

const trailerRouter = Router();

// Get trailers based on type (popular, upcoming)
trailerRouter.get("/:type", async (req: Request, res: Response) => {
  const type = req.params.type;
  console.log(`[DEBUG] Fetching trailers of type: ${type}`);

  try {
    const contentRepo = AppDataSource.getRepository(Content);
    let query = contentRepo.createQueryBuilder("content");

    // Filter based on requested type
    switch (type) {
      case "popular-trailer":
        query = query
          .where("content.content_type = :type", { type: "movie" })
          .orderBy("content.vote_average", "DESC");
        break;
      case "upcoming-trailer":
        query = query
          .where("content.content_type = :type", { type: "movie" })
          .orderBy("content.release_date", "DESC");
        break;
      default:
        query = query
          .where("content.content_type = :type", { type: "movie" })
          .orderBy("content.vote_average", "DESC");
    }

    // Limit to 4 trailers for performance
    const movies = await query.take(4).getMany();

    // Transform to match expected client format
    const moviesWithTrailers = movies.map((movie) => ({
      movieId: movie.id,
      id: movie.id, // Add this to match expected format
      title: movie.title || "",
      overview: movie.overview || "",
      poster_path: movie.poster_path || "",
      backdrop_path: movie.poster_path || "", // Add this since the component expects it
      youtubeLinks: movie.trailer_url
        ? [movie.trailer_url]
        : ["https://www.youtube.com/watch?v=dQw4w9WgXcQ"], // Fallback
    }));

    // Log the SQL query being generated
    console.log("[DEBUG] Query:", query.getSql());

    // After fetching results
    console.log(
      `[DEBUG] Found ${moviesWithTrailers.length} trailers with data:`,
      moviesWithTrailers.slice(0, 2) // Log first 2 items to avoid console clutter
    );

    res.json(moviesWithTrailers);
  } catch (error) {
    console.error("[DEBUG] Error fetching trailers:", error);
    res.status(500).json({
      message: "Server error while fetching trailers",
      error: error.message,
    });
  }
});

// Add a new simple route that returns all movie trailers without filtering
trailerRouter.get("/", async (req: Request, res: Response) => {
  console.log("[DEBUG] Fetching all trailers");

  try {
    const contentRepo = AppDataSource.getRepository(Content);

    // Simple query to get movies with trailers
    const movies = await contentRepo.find({
      where: {
        content_type: "movie",
        trailer_url: Not(""), // Only get movies with non-empty trailer URLs
      },
      take: 4,
    });

    console.log(`[DEBUG] Found ${movies.length} movies with trailers`);

    // If no movies found, return all movies regardless of trailer
    if (movies.length === 0) {
      console.log("[DEBUG] No movies with trailers found, fetching any movies");
      const anyMovies = await contentRepo.find({
        where: { content_type: "movie" },
        take: 4,
      });

      console.log(
        `[DEBUG] Found ${anyMovies.length} movies (without filtering for trailers)`
      );

      const fallbackMovies = anyMovies.map((movie) => ({
        movieId: movie.id,
        id: movie.id,
        title: movie.title || "",
        overview: movie.overview || "",
        poster_path: movie.poster_path || "",
        backdrop_path: movie.poster_path || "",
        youtubeLinks: ["https://www.youtube.com/watch?v=dQw4w9WgXcQ"], // Fallback trailer
      }));

      return res.json(fallbackMovies);
    }

    // Transform to match expected client format
    const moviesWithTrailers = movies.map((movie) => ({
      movieId: movie.id,
      id: movie.id,
      title: movie.title || "",
      overview: movie.overview || "",
      poster_path: movie.poster_path || "",
      backdrop_path: movie.poster_path || "",
      youtubeLinks: movie.trailer_url
        ? [movie.trailer_url]
        : ["https://www.youtube.com/watch?v=dQw4w9WgXcQ"],
    }));

    console.log(
      "[DEBUG] Returning trailer data:",
      moviesWithTrailers.slice(0, 1)
    );

    res.json(moviesWithTrailers);
  } catch (error) {
    console.error("[DEBUG] Error fetching trailers:", error);
    res.status(500).json({
      message: "Server error while fetching trailers",
      error: error.message,
    });
  }
});

export default trailerRouter;
