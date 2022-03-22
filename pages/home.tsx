import Head from "next/head";
import {
	Box,
	Center,
	Container,
	SimpleGrid,
	Button,
	Flex,
	Text,
	useDisclosure,
	HStack,
  IconButton,
  
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import  "../styles/homepage.module.css";
import { Fragment, useEffect, useState, useContext } from "react";
import { BiBorderRadius } from "react-icons/bi";
import { IoMdAdd } from "react-icons/io";
import { MdDelete, MdEdit } from "react-icons/md";
import { Header } from ".";
import Modals from "./modal";
import DataContext from "../store/context";
import { FetchUserData } from "../network/networkRequests";

let transaction = [
	{ name: "Add Expense", type: "expense" },
	{ name: "View All ", type: "income" },
];

export default function Home() {

	const [user, setUser] = useState('');
	const { isOpen, onOpen, onClose } = useDisclosure();
	const { data, setData } = useContext(DataContext);
	const { isLogged, token, userData, ...rest } = data;
  const router = useRouter();
  

	useEffect(() => {
		if (!isLogged) {
			router.push("/login");
		}
	}, []);

	useEffect(function () {
		FetchUserData(token)
			.then((res) => {
        console.table(res);
        setUser(res.name)
				setData({ ...data, userData: res.data });
			})
			.catch((err) => console.log(err));
  }, []);
  
  function handleDelete(id: any) {
    console.log('id');
    
    
    // RemoveItem(id, token)
    // .then(res=>setData({...data,userData:res.data}))
	}


	return (
		<Fragment>
			<Head>
			<title>Moneyfi Expense Manager </title>
			</Head>
			<Box position={"sticky"} top="0" zIndex={100}>
				<Header />

				<Box
					display="flex"
					justifyContent={"center"}
					alignItems="center"
					position={"absolute"}
					zIndex="5"
					top="calc(90vh - 50px)"
					bottom={"0"}
					left="calc(90% - 50px)"
					height={"50px"}
					w="50px"
					border={"none"}
					borderRadius="2.5rem"
					bg="telegram.500"
					background={"linear-gradient(#e66465, #9198e5)"}
					cursor={"pointer"}
					transition="all 0.35s ease-in-out"
					_hover={{
						boxShadow: "0px 0px 25px blue",
						width: "70px",
						height: "70px",
						BiBorderRadius: "35px",
					}}
					onClick={onOpen}
				>
					<IoMdAdd size="2rem" color="white" />
				</Box>
			</Box>
			<Box>
				<HStack p={"1.5rem"} ml={['0','2rem']} >
					<Text
						fontSize={"3xl"}
						fontFamily={"Playfair Disply, serif"}
						fontWeight={"hairline"}
					>
						Welcome
					</Text>
					<Text
						fontSize={"3xl"}
						fontFamily={"Playfair Disply, serif"}
						fontWeight={"400"}
						fontStyle="italic"
					>
						{user},
					</Text>
        </HStack>
        <Box>
          <Text>Your Expenses</Text>
        </Box>
				{!userData.length && (
					<Center
						minH="calc(100vh - 10rem)"
						bgImage={"/no-data.png"}
						bgPos={["center", "center", "center"]}
						bgSize={["90%", "cover", "65%"]}
						bgRepeat={"no-repeat"}
					></Center>
				)}

				{userData.length > 0 &&
          userData.map((item: any, id: any) => {
            
						return (
							<HStack
								spacing="0.5rem"
								key={id}
								p="0.3rem"
								pl="2rem"
								w={["100%", "50%"]}
							>
								<Box
									w="50%"
									maxW="300px"
									h="40px"
									_hover={{ background: "#caf3ff73" }}
								>
									{item.details}
								</Box>
								<Box w="40px" h="40px" _hover={{ background: "#caf3ff73" }}>
									{item.type === "credit" ? "Cr" : "Dr"}
								</Box>
								<Box
									w="40px"
									h="40px"
									color={item.type === "credit" ? "green.600" : "red.600"}
									_hover={{ background: "#caf3ff73" }}
								>
									{item.type === "credit" ? "+" : "-"}
									{item.amount}
								</Box>
								<IconButton
									// onClick={}
									variant="outline"
									colorScheme="teal"
									aria-label="Edit"
									icon={<MdEdit />}
								/>
                <IconButton
                  onClick={()=>handleDelete(item.id)}
									variant="outline"
									colorScheme="teal"
									aria-label="Delete"
									icon={<MdDelete />}
								/>
							</HStack>
						);
					})}
			</Box>
			{isOpen && <Modals isOpen={isOpen} onOpen={onOpen} onClose={onClose} />}
		</Fragment>
	);
}
