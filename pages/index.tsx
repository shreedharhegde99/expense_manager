import Link from "next/link";
import Head from "next/head";
import { Box, Button, Center, Flex, HStack, Spacer } from "@chakra-ui/react";
import { RiMoneyDollarCircleFill } from "react-icons/ri";
import { BsLinkedin, BsTwitter, BsYoutube } from "react-icons/bs";
import { FaRegCopyright } from "react-icons/fa";
import { Fragment } from "react";

let icons = [
	<BsLinkedin size="1.5rem" key={'a'} />,
	<BsTwitter size="1.5rem" key={'b'} />,
	<BsYoutube size="1.5rem" key={'c'} />,
];

export default function GeneralHome() {
  return (
    <Fragment>
      <Head>
        <title>Moneyfi</title>
      </Head>
			<Box>
				<Header />
				<Box
					bgImage={"/money.jpg"}
					bgSize="cover"
					w="full"
					h="calc(100vh - 10rem)"
				>
					<Center h="100%">
						<Link href={"/login"}>
							<Button
								size="md"
								height="48px"
								width={["200px", "300px"]}
								border="2px"
								borderColor="telegram.500"
								colorScheme={"telegram"}
								_hover={{ boxShadow: "0px 0px  10px  2px white" }}
							>
								START HERE
							</Button>
						</Link>
					</Center>
				</Box>

				<Flex>
					<HStack p={["1", "4"]} spacing={["4", "8"]}>
						{icons.map((icon, i) => (
							<Box cursor="pointer" key={i}>
								{icon}
							</Box>
						))}
					</HStack>

					<Spacer />

					<HStack spacing={[3, 6]} p={["2", "4"]}>
						<Box cursor={"pointer"}>About</Box>
						<Box cursor={"pointer"}>Contact</Box>
						<Flex cursor={"pointer"}>
							<Center>
								<FaRegCopyright />
							</Center>

							<Box p="1" m="0 1">
								{new Date().getFullYear()}
							</Box>
						</Flex>
					</HStack>
				</Flex>
			</Box>
		</Fragment>
	);
}



export function Header() {
  return (
		<Center
			bg={"linear-gradient(0.25turn, #3f87a6, #ebf8e1, #f69d3c)"}
      h={"6rem"}
      zIndex={100}
      position='sticky'
      top='0'
      left='0'

		>
			<Box p={"1"}>
				<RiMoneyDollarCircleFill size={"2rem"} color={"blue.50"} />
			</Box>
			<Box p="1" fontSize={"2xl"}>
				MONEY MANAGER
			</Box>
		</Center>
	);
}