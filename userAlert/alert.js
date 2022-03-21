import { toast, useToast } from "@chakra-ui/react";

function AlertUser({ title }) {
	const prompt = useToast();
	return prompt({
		title: title,
		description: "We've created your account for you.",
		status: "success",
		duration: 3000,
		isClosable: true,
	});
}

export default AlertUser;
