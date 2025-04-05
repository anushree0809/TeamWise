import { createContext, useContext, useEffect, useState } from "react";
import { auth } from "../firebase/firebase.config";
import { 
  createUserWithEmailAndPassword, 
  GoogleAuthProvider, 
  onAuthStateChanged, 
  signInWithEmailAndPassword, 
  signInWithPopup, 
  signOut 
} from "firebase/auth";

// Create the authentication context
const AuthContext = createContext();

// Custom hook to use authentication context
export const useAuth = () => {
  return useContext(AuthContext);
}

const googleProvider = new GoogleAuthProvider();

// AuthProvider component to provide auth context to the app
export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Register a user with email and password
  const registerUser = async (email, password) => {
    try {
      return await createUserWithEmailAndPassword(auth, email, password);
    } catch (error) {
      console.error("Error registering user:", error);
      throw error;
    }
  };

  // Login the user with email and password
  const loginUser = async (email, password) => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      
      // Store user ID in localStorage
      localStorage.setItem("userId", user.uid);

      return user;   
     } catch (error) {
      console.error("Error logging in user:", error);
      throw error;
    }
  };

  // Login the user with Google
  const signInWithGoogle = async () => {
    try {
      return await signInWithPopup(auth, googleProvider);
    } catch (error) {
      console.error("Error signing in with Google:", error);
      throw error;
    }
  };

  // Logout the user
  const logout = () => {
    return signOut(auth);
  };

  // Listen for authentication state changes
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      setLoading(false);

      if (user) {
        localStorage.setItem("userId", user.uid);
    } else {
        localStorage.removeItem("userId");
    }
    });

    return () => unsubscribe();
  }, []);

  // Provide context values
  const value = {
    currentUser,
    loading,
    registerUser,
    loginUser,
    signInWithGoogle,
    logout,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};


// import { createContext, useContext, useEffect, useState } from "react";
// import axios from "axios";  // To make HTTP requests to your backend API
// import { GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth";
// import { auth } from "../firebase/firebase.config";
// import {jwtDecode} from "jwt-decode";

// const AuthContext = createContext();

// // Custom Hook for using auth
// export const useAuth = () => {
//   return useContext(AuthContext);
// };

// const googleProvider = new GoogleAuthProvider();

// // AuthProvider Component
// export const AuthProvider = ({ children }) => {
//   const [currentUser, setCurrentUser] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [token, setToken] = useState(localStorage.getItem("token") || null);

//   // Register a user (Backend API call)
//   const registerUser = async (email, name, password) => {
//     try {
//       const response = await axios.post("/api/users/register", {
//         email,
//         name,
//         password,
//       });
//       const { token } = response.data;

//       // Save token to localStorage
//       localStorage.setItem("token", token);
//       setToken(token);

//       // Decode JWT and store user info
//       const decodedToken = jwtDecode(token);
//       setCurrentUser(decodedToken);

//       return response;
//     } catch (error) {
//       console.error("Registration error:", error);
//       throw new Error("User registration failed");
//     }
//   };

//   // Login user (Backend API call)
//   const loginUser = async (email, password) => {
//     try {
//       const response = await axios.post(
//         "http://localhost:3000/api/users/login",
//         { email, password },
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       );

//       const { token } = response.data;

//       // Save token to localStorage
//       localStorage.setItem("token", token);
//       setToken(token);

//       // Decode JWT and store user info
//       const decodedToken = jwtDecode(token);
//       setCurrentUser(decodedToken);

//       return response;
//     } catch (error) {
//       console.error("Login error:", error);

//       // Handle different error types
//       if (error.response && error.response.status === 401) {
//         throw new Error("Invalid email or password");
//       } else {
//         throw new Error("Failed to login. Please try again later.");
//       }
//     }
//   };

//   // Google Sign-in
//   const signInWithGoogle = async () => {
//     try {
//       const result = await signInWithPopup(auth, googleProvider);
//       const user = result.user;

//       // If user is logged in with Google, authenticate or register them
//       const response = await axios.post("/api/users/login", {
//         email: user.email,
//         password: "", // Google login doesn't require a password
//       });

//       const { token } = response.data;

//       // Save token to localStorage
//       localStorage.setItem("token", token);
//       setToken(token);

//       // Decode JWT and store user info
//       const decodedToken = jwtDecode(token);
//       setCurrentUser(decodedToken);

//       return result;
//     } catch (error) {
//       console.error("Google Sign-In error:", error);
//       throw new Error("Google Sign-In failed");
//     }
//   };

//   // Logout user
//   const logout = async () => {
//     setCurrentUser(null);
//     setToken(null);
//     localStorage.removeItem("token");
//     signOut(auth); // Firebase logout

//     // Optionally, you can add a backend API call here to log out the user on the server-side if necessary
//   };

//   // Check token expiration on page load and update user state
//   useEffect(() => {
//     if (token) {
//       try {
//         const decodedToken = jwtDecode(token);
//         setCurrentUser(decodedToken);

//         // Check if token is expired
//         const currentTime = Date.now() / 1000; // Get current time in seconds
//         if (decodedToken.exp < currentTime) {
//           logout(); // Log out if token expired
//           alert("Session expired. Please log in again.");
//         }
//       } catch (error) {
//         console.error("Invalid token:", error);
//         logout(); // Log out if token is invalid
//       }
//     }
//     setLoading(false);
//   }, [token]);

//   const value = {
//     currentUser,
//     loading,
//     registerUser,
//     loginUser,
//     signInWithGoogle,
//     logout,
//   };

//   console.log("Current User State:", currentUser);

//   return (
//     <AuthContext.Provider value={value}>
//       {loading ? <p>Loading...</p> : children}
//     </AuthContext.Provider>
//   );
// };
