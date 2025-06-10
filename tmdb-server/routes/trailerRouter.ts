import { Router, Request, Response } from "express";
import { AppDataSource } from "../startup/data-source";
import { Content } from "../entities/Content";

const trailerRouter = Router();

// Get trailers based on type (popular, upcoming)
trailerRouter.get("/:type", async (req: Request, res: Response) => {
  const type = req.params.type;
  console.log(`Fetching trailers of type: ${type}`);

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
      title: movie.title || "",
      overview: movie.overview || "",
      poster_path: movie.poster_path || "",
      youtubeLinks: movie.trailer_url
        ? [movie.trailer_url]
        : ["https://www.youtube.com/watch?v=dQw4w9WgXcQ"], // Fallback to default
    }));

    console.log(`Found ${moviesWithTrailers.length} trailers of type ${type}`);
    res.json(moviesWithTrailers);
  } catch (error) {
    console.error("Error fetching trailers:", error);
    res.status(500).json({
      message: "Server error while fetching trailers",
      error: error.message,
    });
  }
});

export default trailerRouter;
