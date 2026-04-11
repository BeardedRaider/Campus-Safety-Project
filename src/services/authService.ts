// -------------------------------------------------------------
// Auth Service (LocalStorage-based + Hardcoded Test User)
// Purpose: Provide simple register + login functionality
// for prototype / university submission.
//
// Features:
// - Hardcoded test user for quick login
// - Real user registration stored in localStorage
// - Real login checking both test user and stored users
// -------------------------------------------------------------

// -------------------------------------------------------------
// 1. Hardcoded test user (for development)
// -------------------------------------------------------------
export const testUser = {
  id: "test-user-1",
  name: "Shane Crossman",
  email: "student@uws.ac.uk",
  password: "Password123",
};

// -------------------------------------------------------------
// 2. Helpers for localStorage user database
// -------------------------------------------------------------
function loadUsers() {
  return JSON.parse(localStorage.getItem("users") || "[]");
}

function saveUsers(users: any[]) {
  localStorage.setItem("users", JSON.stringify(users));
}

// -------------------------------------------------------------
// 3. Register a new user (saved to localStorage)
// -------------------------------------------------------------
export function registerUser(
  name: string,
  email: string,
  password: string,
): {
  success: boolean;
  user?: any;
  message: string;
} {
  const users = loadUsers();

  // Prevent duplicate email
  if (users.some((u: any) => u.email === email) || email === testUser.email) {
    return {
      success: false,
      message: "Email is already registered.",
    };
  }

  const newUser = {
    id: crypto.randomUUID(),
    name,
    email,
    password, // plain text for prototype
  };

  users.push(newUser);
  saveUsers(users);

  return {
    success: true,
    user: newUser,
    message: "",
  };
}

// -------------------------------------------------------------
// 4. Login (checks test user first, then real users)
// -------------------------------------------------------------
export function loginUser(
  email: string,
  password: string,
): {
  success: boolean;
  user?: any;
  message: string;
} {
  // Check hardcoded test user
  if (email === testUser.email && password === testUser.password) {
    return {
      success: true,
      user: testUser,
      message: "",
    };
  }

  // Check registered users
  const users = loadUsers();
  const found = users.find(
    (u: any) => u.email === email && u.password === password,
  );

  if (!found) {
    return {
      success: false,
      message: "Incorrect email or password.",
    };
  }

  return {
    success: true,
    user: found,
    message: "",
  };
}
