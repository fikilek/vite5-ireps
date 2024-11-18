import { ErrorMessage, Field } from "formik";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import FormFieldError from "@/components/forms/formError/FormFieldError";
import { Timestamp } from "firebase/firestore";
import { useEffect, useState } from "react";
import { format } from "date-fns";

const FormikDatePicker = props => {
	// console.log(`props`, props)
	const { name, label, ...rest } = props;

	const [date, setDate] = useState("");
	// console.log(`date`, date);

	useEffect(() => {
		setDate(format(Date(), "yyyy-MM-dd"));
	}, []);

	return (
		<div className="form-control">
			<Field name={name}>
				{props => {
					// console.log(`props`, props);
					const { field, meta, form } = props;

					
					const handleChange = e => {
						// console.log(`e.target.value`, e.target.value);
						setDate(e.target.value);
						// console.log(`typeof val`, typeof val);
						// const newDate = new Timestamp();
						// console.log(`newDate`, newDate);
						// console.log(`typeof newDate`, typeof newDate);
						// form.setFieldValue(name, date);
					};

					return (
						<input
							type="date"
							name={name}
							id="datetime"
							onChange={handleChange}
							value={date}
						/>
					);
				}}
			</Field>
			<label className="label" htmlFor={name}>
				{label}
			</label>
			<ErrorMessage name={name} component={FormFieldError}></ErrorMessage>
		</div>
	);
};

export default FormikDatePicker;
