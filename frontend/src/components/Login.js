import { Button } from "@chakra-ui/button";
import { FormControl, FormLabel } from "@chakra-ui/form-control";
import { Input, InputGroup, InputRightElement } from "@chakra-ui/input";
import { VStack } from "@chakra-ui/layout";
import { useState } from "react";
import axios from "axios";
import { useToast } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { ChatState } from "../Context/Chatprovider";

const Login = () => {
  const [show, setShow] = useState(false);
  const handleClick = () => setShow(!show);
  const toast = useToast();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [loading, setLoading] = useState(false);

  const history = useNavigate();
  const { setUser, user } = ChatState();
  const submitHandler = async () => {
    setLoading(true);

    if (!email || !password) {
      toast({
        title: "Please Fill all the Feilds",
        status: "warning",
        duration: 2000,
        isClosable: true,
        position: "bottom",
      });
      setLoading(false);
      return;
    } 
    
    try {
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };

      const { data } = await axios.post(
        "/api/user/login",
        { email, password },
        config
      );
      const x = JSON.stringify(data);
      // console.log(x);
      // console.log(user);
      toast({
        title: "Login Successful",
        status: "success",
        duration: 2000,
        isClosable: true,
        position: "bottom",
      });

      setUser(data);
      // console.log(user);
      // console.log(data);
      localStorage.setItem("userInfo", JSON.stringify(data));
      setLoading(false);
      history("/chats");
    } catch (error) {
      toast({
        title: "Error Occured!",
        description: error.response.data.message,
        status: "error",
        duration: 2000,
        isClosable: true,
        position: "bottom",
      });
      setLoading(false);
    }
  };

  return (
    <VStack spacing="10px">
      <FormControl id="email" isRequired>
        <FormLabel color={"#F9FBE7"}>Email Address</FormLabel>
        <Input
          height={"50px"}
          textColor={"white"}
          fontSize={"xl"}
          borderColor={"#0D0D0D"}
          borderWidth="2px"
          value={email}
          type="email"
          placeholder="Enter Your Email Address"
          onChange={(e) => setEmail(e.target.value)}
        />
      </FormControl>
      <FormControl id="password" isRequired>
        <FormLabel color={"#F9FBE7"}>Password</FormLabel>
        <InputGroup size="md">
          <Input
            color={"#F9FBE7"}
            fontSize={"xl"}
            height={"50px"}
            borderColor={"#0D0D0D"}
            borderWidth="2px"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type={show ? "text" : "password"}
            placeholder="Enter password"
          />
          <InputRightElement width="4.5rem">
            <Button
              h="1.80rem"
              size="lg"
              marginTop={"25%"}
              marginRight={"10%"}
              marginBottom={"1%"}
              marg
              onClick={handleClick}
              bg="#268B81"
            >
              {show ? "Hide" : "Show"}
            </Button>
          </InputRightElement>
        </InputGroup>
      </FormControl>
      <Button
        bg="#268B81"
        width="100%"
        fontSize={"xl"}
        style={{ marginTop: 15 }}
        onClick={submitHandler}
        isLoading={loading}
        boxShadow={"3px 3px 3px"}
      >
        Login
      </Button>
    </VStack>
  );
};

export default Login;
