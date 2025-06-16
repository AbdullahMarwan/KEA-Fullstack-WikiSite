import { User } from "../../entities/User";

describe("User.createUser", () => {
  it("should create a User instance with the correct properties", () => {
    const user = User.createUser(
      "Alice",
      "Smith",
      "alice@example.com",
      "secret123"
    );
    console.log("Created user:", user);
    expect(user).toBeInstanceOf(User);
    expect(user.first_name).toBe("Alice");
    expect(user.last_name).toBe("Smith");
    expect(user.email).toBe("alice@example.com");
  });
});