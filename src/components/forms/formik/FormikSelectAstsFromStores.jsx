import { ErrorMessage, Field } from "formik";
import Select from "react-select";

import "@/components/forms/Form.css";

import FormFieldError from "@/components/forms/formError/FormFieldError";
import { useServiceProviders } from "@/hooks/useServiceProviders.jsx";
import { useState } from "react";
import useGetStoresAstsCollection from "@/hooks/useGetStoresAstsCollection";

const FormikSelectAstsFromStores = (props) => {
	// console.log(`props`, props);
	const { label, name, options, ...rest } = props;
	// console.log(`options`, options);

	return (
		<div className={`form-control ${name} `}>
			<Field id={name} name={name} {...rest}>
				{(props) => {
					// console.log(`props`, props);
					const { field, form, meta } = props;

					const handleChange = (selection) => {
						// console.log(`selection`, selection);
						// console.log(`field.name`, field.name);

						if (!selection) return;

						form.setFieldValue(field.name, selection?.value);

						const { astId, astManufacturer } = selection?.data?.astData;
						// console.log(`astId`, astId)

						const { phase, type } = selection?.data?.astData?.meter;
						// console.log(`phase`, phase)
						// console.log(`type`, type)

						form.setFieldValue("astData.astId", astId);
						form.setFieldValue("astData.meter.phase", phase);
						form.setFieldValue("astData.meter.type", type);
						form.setFieldValue("astData.astManufacturer", astManufacturer);

						form.validateField(field.name);
					};

					const clearValue = (e) => {
						console.log(`clearing selected value`, e);
						return null;
					};

					return (
						<Select
							placeholder=""
							options={options}
							isClearable={true}
							clearValue={clearValue}
							isSearchable={true}
							onChange={handleChange}
							components={{ DropdownIndicator: null }}
							styles={{
								control: (baseStyles, state) => {
									// console.log(`control baseStyles`, baseStyles);
									// console.log(`control state`, state);
									return {
										...baseStyles,
										minHeight: 10,
										maxHeight: 32,
										borderRadius: 10,
										fontSize: 12,
									};
								},
								input: (baseStyles, state) => {
									// console.log(`input baseStyles`, baseStyles);
									// console.log(`input state`, state);
									return {
										...baseStyles,
										fontSize: 10,
									};
								},
								valueContainer: (baseStyles, state) => {
									// console.log(`valueContainer baseStyles`, baseStyles);
									// console.log(`valueContainer state`, state);
									return {
										...baseStyles,
										maxHeight: 32,
										paddingLeft: 5,
									};
								},
								// dropdownIndicator: (baseStyles, state) => {
								// 	// console.log(`dropdownIndicator baseStyles`, baseStyles);
								// 	// console.log(`dropdownIndicator state`, state);

								// 	return {
								// 		...baseStyles,
								// 	};
								// },
								// menu: (baseStyles, state) => {
								// 	// console.log(`menu baseStyles`, baseStyles);
								// 	// console.log(`menu state`, state);

								// 	return {
								// 		...baseStyles,
								// 	};
								// },
								menuList: (baseStyles, state) => {
									// console.log(`menuList baseStyles`, baseStyles);
									// console.log(`menuList state`, state);

									return {
										...baseStyles,
										fontSize: 10,
									};
								},
								indicatorsContainer: (baseStyles, state) => {
									// console.log(`indicatorContainers baseStyles`, baseStyles);
									// console.log(`indicatorContainers state`, state);

									return {
										...baseStyles,
										padding: 0,
									};
								},
							}}
						/>
					);
				}}
			</Field>
			<label className="asts-from-stores-label" htmlFor={name}>
				{label}
			</label>
			<ErrorMessage name={name} component={FormFieldError}></ErrorMessage>
		</div>
	);
};

export default FormikSelectAstsFromStores;
