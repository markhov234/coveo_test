// // src/fetchUsers.js
// import { apiKey, usersUrl } from "./apiConfig.js";
// export async function fetchAllUsers() {
//   try {
//     // Fetch all users
//     const response = await fetch(usersUrl, {
//       method: "GET",
//       headers: {
//         "x-apikey": apiKey,
//         "Content-Type": "application/json",
//       },
//     });

//     if (!response.ok) {
//       throw new Error("Failed to fetch users");
//     }

//     const users = await response.json();
//     console.log("Users:", users); // Log users to the console
//   } catch (error) {
//     console.error("Error fetching users:", error);
//   }
// }
