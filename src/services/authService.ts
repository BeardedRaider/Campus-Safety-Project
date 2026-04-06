// -------------------------------------------------------------
// Fake Auth Service (temporary for testing)
// -------------------------------------------------------------

// 1. Hardcoded test user
export const testUser = {
  email: "student@uws.ac.uk",
  password: "Password123",
  name: "Shane Crossman",
};

// 2. Login function with correct typing
export function loginUser(
  email: string,
  password: string,
): {
  success: boolean;
  user?: typeof testUser;
  message: string;
} {
  if (email === testUser.email && password === testUser.password) {
    return {
      success: true,
      user: testUser,
      message: "",
    };
  }

  return {
    success: false,
    message: "Incorrect email or password.",
  };
}
