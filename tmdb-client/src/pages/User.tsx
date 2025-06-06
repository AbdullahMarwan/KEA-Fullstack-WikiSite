import React, { useState, useEffect } from "react";
import { Box, HStack } from "@chakra-ui/react";
import { MAX_WIDTH } from "../../src/utils/constants";
import background from "../../public/user-background.svg";
import FavoriteList from "../components/User/favoriteList";
import { useNavigate, useParams } from "react-router-dom";

function User() {
  const [user, setUser] = useState({ first_name: "", last_name: "" });
  const navigate = useNavigate();
  const { firstName } = useParams(); // Get firstName from URL

  useEffect(() => {
    // Get user data from localStorage
    const userData = localStorage.getItem("user");

    if (userData) {
      try {
        const parsedUser = JSON.parse(userData);
        setUser(parsedUser);

        // Check if URL firstName matches the logged-in user
        if (
          firstName &&
          firstName.toLowerCase() !== parsedUser.first_name.toLowerCase()
        ) {
          // Redirect to the correct user URL if there's a mismatch
          navigate(`/user/${parsedUser.first_name.toLowerCase()}`);
        }
      } catch (error) {
        console.error("Error parsing user data", error);
        navigate("/login");
      }
    } else {
      // No user data found, redirect to login
      navigate("/login");
    }
  }, [firstName, navigate]);

  // Get display name
  const displayName = user.first_name
    ? `${user.first_name} ${user.last_name || ""}`.trim()
    : "User";

  return (
    <>
      <Box
        as="section"
        width="100%"
        height="35vh"
        position="relative"
        display="flex"
        alignItems="center"
        flexDirection="column"
        backgroundSize="cover"
        backgroundImage="radial-gradient(at 30% top, #341a38 0%, rgba(3, 37, 65, 1) 70%)"
        backgroundPosition="center"
      >
        <HStack
          backgroundImage={`url(${background})`}
          maxWidth={MAX_WIDTH}
          height="100%"
          width="100%"
          position="relative"
          gap={"5rem"}
          zIndex={2}
        >
          <HStack
            display="flex"
            flexDirection="column"
            alignItems="flex-start"
            w="100%"
          >
            <h2
              style={{
                fontSize: "3em",
                color: "white",
                fontWeight: "700",
                textAlign: "left",
              }}
            >
              Welcome {displayName}
            </h2>
            <h3
              style={{
                fontSize: "2em",
                color: "white",
                fontWeight: "500",
                lineHeight: "1",
              }}
            >
              You can find your favorite Tv-shows and movies here.
            </h3>
          </HStack>
        </HStack>
      </Box>

      <FavoriteList />
    </>
  );
}

export default User;
