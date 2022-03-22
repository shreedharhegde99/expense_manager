import {
	Box,
	Button,
	Center,
	Input,
	InputGroup,
	InputLeftAddon,
	Stack,
	Text,
	VStack,
	useToast,
  Alert,
  AlertIcon,
} from "@chakra-ui/react";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { Fragment, useContext, useEffect, useState } from "react";
import { BiUserPlus } from "react-icons/bi";
import { RegisterUser } from "../network/networkRequests";
import DataContext from "../store/context";

const Register: React.FunctionComponent = () => {
	const [fName, setFname] = useState("");
	const [lName, setLname] = useState("");
	const [user, setUser] = useState("");
	const [password, setPassword] = useState("");
	const [empty, setEmpty] = useState(false);
	const [success, setSuccess] = useState(false);
	const [loading, setLoading] = useState(false);

	const { data, setData } = useContext(DataContext);
	const { err, id, isRegistered, ...rest } = data;
	const router = useRouter();

	const handleChange = (type: string, value: any) => {
		switch (type) {
			case "fName":
				setFname(value);
				break;
			case "lName":
				setLname(value);
				break;
			case "user":
				setUser(value);
				break;
			case "password":
				setPassword(value);
				break;
			default:
				return;
		}
	};

	const prompt = useToast();
	const handleSubmit = async (e: any) => {
		e.preventDefault();
		if (fName === "" || user === "" || password === "") {
			return prompt({
				title: "Please fill the mandatory fields..!",
				position: "top-right",
				status: "error",
				duration: 3000,
				isClosable: true,
			});
		} else {
			setLoading(true);
			await RegisterUser(fName, user, password)
				.then((res) => {
          const { id, token } = res;
          console.log('registration success',token);
          
					setData(function () {
						return { ...data, id: id, err: false, isRegistered: true,isLogged:true,token };
					});
				})
				.catch((err) =>
					setData(function () {
						return { ...data, err: true, isRegistered: false };
					})
				);
			// console.log("success");
			setLoading(false);
			setEmpty(false);
		}
	};

	useEffect(() => {
	  if (isRegistered) {
	    setTimeout(() => {

	      router.push("/home");
	    }, 1000);
		}
	}, [isRegistered]);

  return (
    <Fragment>
      <Head><title>Moneyfi Register</title></Head>
			<Center
				h="100vh"
				bgImage={"/money-manage.jpg"}
				bgSize="cover"
				bgPos={"center"}
			>
				<Box
					h={["100vh", "90vh", "80vh"]}
					maxW={"700px"}
					backdropFilter={"blur(11px)"}
					p="5"
					borderRadius={"1rem"}
				>
					<VStack w={["100%", "100%", "unset"]}>
						<Box>
							<BiUserPlus size={"4rem"} color="rgb(0 148 255)" />
						</Box>
						<form onSubmit={handleSubmit}>
							<VStack spacing={"6"}>
								<Stack direction={["column", "column", "row"]} spacing={"6"}>
									<InputGroup size={"lg"}>
										<InputLeftAddon>First Name</InputLeftAddon>
										<Input
											type="text"
											color={"pink.600"}
											required={true}
											value={fName}
											onChange={(e) => handleChange("fName", e.target.value)}
										/>
									</InputGroup>
									<InputGroup size={"lg"}>
										<InputLeftAddon>Last Name</InputLeftAddon>
										<Input
											type="text"
											color={"pink.600"}
											value={lName}
											onChange={(e) => handleChange("lName", e.target.value)}
										/>
									</InputGroup>
								</Stack>
								<InputGroup size={"lg"}>
									<InputLeftAddon>Username</InputLeftAddon>

									<Input
										type="test"
										color={"pink.600"}
										textTransform="lowercase"
										minLength={5}
										maxLength={12}
										value={user}
										onChange={(e) =>
											handleChange("user", e.target.value.toLowerCase())
										}
									/>
								</InputGroup>
								<InputGroup size={"lg"}>
									<InputLeftAddon>Password</InputLeftAddon>
									<Input
										type="password"
										color={"pink.600"}
										minLength={5}
										maxLength={12}
										value={password}
										onChange={(e) => handleChange("password", e.target.value)}
									/>
								</InputGroup>

								<Button
									width={"100%"}
									type="submit"
									variant={"solid"}
									colorScheme="messenger"
									isLoading={loading}
									loadingText="Registering..."
									// spinner={<BeatLoader size={8} color="white" />}
								>
									REGISTER
								</Button>
							</VStack>
						</form>
					</VStack>

					<Center p="2rem" pt="1rem">
						<Text fontWeight={"bold"} color={"black.600"}>
							Already registered?
							<Link href="/login">Login here</Link>
						</Text>
					</Center>
					{err && (
						<Alert status="error" variant={"left-accent"}>
							<AlertIcon />
							There was an error processing your request
						</Alert>
					)}
					{success && (
						<Alert status="success">
							<AlertIcon />
							Registration successful.....!
						</Alert>
					)}
				</Box>
			</Center>
		</Fragment>
	);
};


export default Register;
