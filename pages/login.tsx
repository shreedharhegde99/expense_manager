import {
	Box,
	Button,
	Center,
	Input,
	InputGroup,
	InputLeftAddon,
	Text,
	useToast,
	VStack,
} from "@chakra-ui/react";
import Link from "next/link";
import { useRouter } from "next/router";
import { Fragment, useEffect, useState } from "react";
import { BsFillPersonFill } from "react-icons/bs";
import { LoginUser } from "../network/networkRequests";
import { useContext } from "react";
import DataContext from "../store/context";
import Head from "next/head";

export default function Login() {
	const [userName, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [err, setErr] = useState(false);
	const [inputErr, setInputErr] = useState(false);
	const [loading, setLoading] = useState(false);

	const { data, setData } = useContext(DataContext);
	const { isLogged, token } = data;
  const router = useRouter();
	const prompt = useToast();
  

	const handleChange = (type: String, value: any) => {
		switch (type) {
			case "user":
				setUsername(value);
				break;
			case "password":
				setPassword(value);
				break;

			default:
				return;
		}
	};

	const handleLogin = async (e: any) => {
		e.preventDefault();
		if (userName === "" || password === "") {
			// setInputErr(true);
       prompt({
					title: "Error",
         description: "Username or password is empty..!",
          position:'top-right',
					status: "warning",
					duration: 3000,
					isClosable: true,
				});
			setErr(false);
		} else {
			setLoading(true);
			setInputErr(false);

			await LoginUser(userName, password)
				.then((res) => {
					setData({ ...data, isLogged: true, token: res.token });
					setLoading(false);
				})
        .catch((err) => {
					setLoading(false);
				  prompt({
						title: "Error",
						description: "Something is wrong..!",
						position: "top-right",
						status: "error",
						duration: 3000,
						isClosable: true,
					});
					setData({ ...data, isLogged: false });
				});
      }
      
	};

	useEffect(() => {
		if (isLogged) {
			router.push("/home");
		}
	}, [isLogged]);

  return (
    <Fragment>
      <Head><title> Moneyfi Login</title></Head>
			<Box>
				<Center
					h="100vh"
					bgImage={"/loginbg.jpg"}
					bgSize={["cover", "cover", ""]}
					bgPosition={["center", "center", "top"]}
				>
					<Box
						border={["none", "solid 1px gray.100"]}
						borderRadius="1.8rem"
						p="5"
						pt="8"
						pb="8"
						w={["100vw", "100vw", "600px"]}
						// bg='cyan.500'
						opacity={"0.9"}
						backdropFilter="blur(10px)"
					>
						<form onSubmit={handleLogin}>
							<VStack spacing={"8"}>
								<Box>
									<BsFillPersonFill size={"5rem"} />
								</Box>

								<InputGroup>
									<InputLeftAddon>Username</InputLeftAddon>
									<Input
										type="text"
										size={"md"}
										color={"white"}
										textTransform="lowercase"
										value={userName}
										onChange={(e) =>
											handleChange("user", e.target.value.toLowerCase())
										}
									/>
								</InputGroup>
								<InputGroup>
									<InputLeftAddon>Password</InputLeftAddon>
									<Input
										type="password"
										size={"md"}
										color={"white"}
										value={password}
										onChange={(e) => handleChange("password", e.target.value)}
									/>
								</InputGroup>

								{err && PropmptUser("something is wrong.!")}
								<Box w="100%">
									<Button
										colorScheme={"linkedin"}
										variant={"solid"}
										size="md"
										width="inherit"
										type="submit"
										isLoading={loading}
									>
										LOGIN
									</Button>
								</Box>
							</VStack>
						</form>
						<Center p="2" fontWeight={"bold"} color="white.800">
							<Text>Not Registered?</Text>

							<Link passHref href="/register">
								<Text cursor={"pointer"}>Register here</Text>
							</Link>
						</Center>
					</Box>
				</Center>
			</Box>
		</Fragment>
	);
}

function PropmptUser(text: String) {
	return (
		<Box pl="5" pr="5">
			<Text fontSize={["sm", "md"]} color="red">
				{text}
			</Text>
		</Box>
	);
}
