import {FormCarYarProps} from "@typings/form-types";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import {useState, forwardRef, HTMLProps, Ref, useEffect} from "react";
import {Button, FormControl, FormLabel, Text, Box} from "@chakra-ui/react";

type carYearProps = FormCarYarProps;

export const CarYear = ({setValue, errors}: carYearProps) => {
	const [date, setDate] = useState<Date | null>(null);

	const CustomButton = forwardRef(
		(
			{value, onClick}: HTMLProps<HTMLButtonElement>,
			ref: Ref<HTMLButtonElement>
		) => (
			<Button
				color="gray.800"
				fontWeight="medium"
				w="13.75rem"
				h="2.5rem"
				fontSize="0.97rem"
				rounded="2"
				onClick={onClick}
				ref={ref}>
				{value ? value : "Selecionar Ano"}
			</Button>
		)
	);

	useEffect(() => {
		if (date) {
			const onlyTheYear = date?.getFullYear();

			setValue("year", onlyTheYear);
		}
	}, [date]);

	return (
		<Box w="200px" pb="28px">
			<FormControl isRequired pos="relative">
				<FormLabel>Ano</FormLabel>
				<DatePicker
					selected={date}
					onChange={date => setDate(date)}
					dateFormat="yyy"
					showYearPicker
					minDate={new Date("1970")}
					yearItemNumber={7}
					customInput={<CustomButton />}
				/>
				<Text
					pos="absolute"
					pl="1"
					pt="0.7rem"
					color="my.error"
					fontSize="0.8rem">
					{errors.year && errors.year.message}
				</Text>
			</FormControl>
		</Box>
	);
};
