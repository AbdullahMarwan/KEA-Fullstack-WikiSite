import { Flex, Box } from "@chakra-ui/react";
import LoginForm from "../components/LoginForm";

const Login = () => {
  return (
    <Box padding="20px">
      <Flex
        width="100%"
        maxWidth="1300px"
        margin="0 auto" // Center the container horizontally
        justifyContent="flex-start" // Changed from center to match content alignment
        alignItems="flex-start"
        flexDirection="column"
      >
        <LoginForm />
      </Flex>
    </Box>
  );
};

export default Login;
