import "../styles/globals.css";
import { ChakraProvider } from "@chakra-ui/react";
import { Store } from "../store/context";

function App({ pageProps, Component }) {
	return (
		<Store>
			<ChakraProvider>
				<Component {...pageProps} />
			</ChakraProvider>
		</Store>
	);
}

function MyApp({ Component, pageProps }) {
	return <App {...pageProps} Component={Component} />;
}

export default MyApp;
