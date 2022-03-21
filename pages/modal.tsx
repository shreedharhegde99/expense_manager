import { Fragment, useContext, useEffect, useState } from "react";
import {
	Modal,
	ModalOverlay,
	ModalContent,
	ModalHeader,
	ModalFooter,
	ModalBody,
	ModalCloseButton,
	FormControl,
	FormLabel,
	FormErrorMessage,
	FormHelperText,
	Radio,
	RadioGroup,
	Stack,
	Input,
	NumberInput,
	NumberInputField,
	NumberInputStepper,
	NumberIncrementStepper,
	NumberDecrementStepper,
	Button,
  Text,
} from "@chakra-ui/react";
import { AddData } from "../network/networkRequests";
import DataContext from "../store/context";

function Modals({ isOpen, onClose, onOpen }) {
	let reasons = [
		"Food",
		"Travel",
		"Salary",
		"Grocery",
		"HealthCare",
		"Electricity",
		"Water",
		"Phone",
		"Internet",
		"Personal Loans",
		"Insurance",
		"Emergency Fund",
	];

	let randomReason = () => {
		let number = Math.floor(Math.random() * 12);
		return reasons[number] || "Credit/Debit";
	};

	useEffect(() => {
		setDetail(randomReason());
  }, []);
  
  const date = new Date().toLocaleDateString()?.split("/").reverse().join("-");

	const [type, setType] = useState("credit");
	const [amount, setAmount] = useState<any>(100);
  const [detail, setDetail] = useState<any>('');
  const [err, setErr] = useState({empty:false,error:false})
  const [loading, setLoading] = useState(false)
  const [day, setDay] = useState(date)
  const { data,setData } = useContext(DataContext)
  const{token,userData}=data

  const onSubmit = async (e: any) => {
    e.preventDefault()
    console.log(amount,detail);
    if (amount === '' || detail === '') {
      setErr({...err,empty:true})
    } else {
      setLoading(true)
      console.log('submitting')
      await AddData(type,day, amount, detail,token)
        .then( async function(res) {
        // setData({...data})
          console.log(res.data);
          setData({...data,userData:res.data})
          setTimeout(() => {
            setLoading(false);
            onClose()
          }, 1000);
            
          
        }).catch(err => {
          setErr({ ...err, error: true })
          setTimeout(() => {
            setLoading(false)
          }, 100);
          
      })
      
    }
  }
  

	return (
		<Fragment>
			<Modal isOpen={isOpen} onClose={onClose} size={"md"} isCentered>
				<ModalOverlay bg="blackAlpha.300" backdropFilter="blur(12px) ">
					<ModalContent>
						<ModalHeader>Add Expenses</ModalHeader>
						<ModalCloseButton />
						<ModalBody>
							<FormControl isInvalid={err.empty}>
								<Stack direction={"column"} gap="2">
									<FormLabel htmlFor="type">Type</FormLabel>
									<RadioGroup value={type} onChange={setType}>
										<Stack direction={"row"} gap="2">
											<Radio colorScheme={"green"} value={"credit"}>
												Income
											</Radio>
											<Radio colorScheme={"red"} value={"debit"}>
												Expense
											</Radio>
										</Stack>
									</RadioGroup>
									<FormLabel htmlFor="date">Select Date</FormLabel>
                  <Input
                    type={'date'}
                    value={day}
                    onChange={(e)=>setDay(e.target.value)}
									
									/>
									<FormLabel htmlFor="amount">Amount</FormLabel>
									<NumberInput min={1} value={amount} onChange={setAmount}>
										<NumberInputField id="amount" />
										<NumberInputStepper>
											<NumberIncrementStepper />
											<NumberDecrementStepper />
										</NumberInputStepper>
									</NumberInput>
									<FormLabel htmlFor="description">Description</FormLabel>
									<Input
										value={detail}
										onChange={(e) => setDetail(e.target.value)}
									/>
									{err.empty && (
										<FormErrorMessage>
											All fields are mandatory..
										</FormErrorMessage>
                  )}
                  	{err.error && (
										<FormErrorMessage>
											Something went wrong..Please try again.!
										</FormErrorMessage>
									)}
								</Stack>
							</FormControl>
						</ModalBody>
						<ModalFooter>
							<Button colorScheme="blue" mr={3} onClick={onClose}>
								Close
							</Button>
							<Button
								isLoading={loading}
								variant="outline"
								colorScheme={"purple"}
								onClick={onSubmit}
							>
								ADD
							</Button>
						</ModalFooter>
					</ModalContent>
				</ModalOverlay>
			</Modal>
		</Fragment>
	);
}

export default Modals ;
