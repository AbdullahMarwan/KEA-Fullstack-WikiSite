import { DataSource } from "typeorm";
import { User } from "../entities/User";
import bcrypt from "bcrypt";

export const seedUsers = async (dataSource: DataSource): Promise<User[]> => {
  console.log("Seeding users...");

  const userRepository = dataSource.getRepository(User);

  // Define user data
  const usersData = [
    {
      first_name: "John",
      last_name: "Doe",
      email: "john.doe@example.com",
      password: "password1",
    },
    {
      first_name: "Jane",
      last_name: "Smith",
      email: "jane.smith@example.com",
      password: "password2",
    },
    {
      first_name: "Michael",
      last_name: "Johnson",
      email: "michael.j@example.com",
      password: "password3",
    },
    {
      first_name: "Emily",
      last_name: "Williams",
      email: "emily.w@example.com",
      password: "password4",
    },
    {
      first_name: "David",
      last_name: "Brown",
      email: "david.brown@example.com",
      password: "password5",
    },
  ];

  const users: User[] = [];
  for (const u of usersData) {
    const hashed = await bcrypt.hash(u.password, 12);
    const user = userRepository.create({ ...u, password: hashed });
    users.push(await userRepository.save(user));
  }

  console.log(`Seeded ${users.length} users`);
  return users;
};
