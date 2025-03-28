import { Flex } from "@chakra-ui/react";
import LoginForm from "../components/LoginForm";

const Login = () => {
  return (
    <Flex
      width="100%"
      maxWidth="1300px"
      margin="0 auto" // Center the container horizontally
      justifyContent="center"
      alignItems="flex-start"
      flexDirection={"column"}
      padding={"30px 40px"}
    >
      <LoginForm />
    </Flex>
  );
};

export default Login;
