import { Router, Request, Response } from "express";
import { AppDataSource } from "../startup/data-source";
import { People } from "../entities/People";

const router = Router();

// Get all people - this route must come BEFORE the /:id route
router.get("/all", async (req: Request, res: Response) => {
  console.log("[DEBUG] Fetching all people");

  try {
    const peopleRepo = AppDataSource.getRepository(People);
    const people = await peopleRepo.find({
      take: 100, // Limit to 100 people
      order: {
        name: "ASC", // Order by name
      },
    });

    console.log(`[DEBUG] Found ${people.length} people`);
    res.json(people);
  } catch (error) {
    console.error("[DEBUG] Error fetching people:", error);
    res.status(500).json({ message: "Error fetching people" });
  }
});

// Add this before your /:id route
router.get("/", async (req: Request, res: Response) => {
  console.log("[DEBUG] Fetching all people from base route");

  try {
    const peopleRepo = AppDataSource.getRepository(People);
    const people = await peopleRepo.find({
      take: 100,
      order: {
        name: "ASC",
      },
    });

    console.log(`[DEBUG] Found ${people.length} people`);
    res.json(people);
  } catch (error) {
    console.error("[DEBUG] Error fetching people:", error);
    res.status(500).json({ message: "Error fetching people" });
  }
});

// Get person by ID - this route must come AFTER any specific routes
router.get("/:id", async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  console.log(`[DEBUG] Fetching person with ID: ${id}`);

  try {
    const peopleRepo = AppDataSource.getRepository(People);
    const person = await peopleRepo.findOneBy({ id });

    if (!person) {
      console.log(`[DEBUG] Person with ID ${id} not found`);
      return res.status(404).json({ message: "Person not found" });
    }

    console.log(`[DEBUG] Found person: ${person.name}`);
    res.json(person);
  } catch (error) {
    console.error(`[DEBUG] Error fetching person with ID ${id}:`, error);
    res.status(500).json({ message: "Error fetching person" });
  }
});

export default router;
