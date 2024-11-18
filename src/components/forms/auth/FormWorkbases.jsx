import { Formik, Form, FieldArray, Field } from "formik";
import { object } from "yup";
import { useEffect } from "react";
import { toast } from "react-toastify";
import { useSignup } from "@/hooks/useSignup";
import Select from "react-select";
import { IconContext } from "react-icons";
import { MdOutlineDeleteForever } from "react-icons/md";

// css
import "@/components/forms/Form.css";
import "@/components/forms/auth/FormWorkbases.css";

// custom hooks
import useModal from "@/hooks/useModal.jsx";
import { useFirestore } from "@/hooks/useFirestore";

// context
import useAuthContext from "@/hooks/useAuthContext.jsx";

// components
// import FormikControl from "@/components/forms/formik/FormikControl";
import FormFooter from "@/components/forms/formFooter/FormFooter";
import FormMsg from "@/components/forms/formMsg/FormMsg";
import FormError from "@/components/forms/formError/FormError";
import HeaderGeneric from "@/components/header/HeaderGeneric";
import FormCloseBtn from "@/components/forms/formBtns/FormCloseBtn";
import { useState } from "react";

// other
import za_lmsMetros from "@/maps/za/za_lmsMetros.json";
// console.log(`za_lmsMetros`, za_lmsMetros)

const FormWorkbases = (props) => {
	// console.log(`props`, props);

	const { response, getDocument } = useFirestore("users");
	// console.log(`response`, response);
	// console.log(`getDocument`, getDocument);

	const { user } = useAuthContext();
	// console.log(`user`, user);

	// get user uid from userContext
	const { uid } = props?.data?.data;
	// console.log(`uid`, uid);

	const [userInfo, setUserInfo] = useState({});
	// console.log(`userInfo`, userInfo);

	const { closeModal } = useModal();

	const { updateUserObject, signupState } = useSignup();

	const options = [];
	za_lmsMetros &&
		za_lmsMetros.forEach((sp) => {
			options.push({
				label: sp.lm,
				value: sp.lm,
				data: sp,
			});
		});

	const initialValues = { workbases: userInfo?.workbases };

	const onSubmit = (values) => {
		// console.log(`Form values`, values);
		updateUserObject(values, uid);
	};

	const validationSchema = object({
		// workbases: array().required("Workbase is required."),
	});

	useEffect(() => {
		if (signupState.success) {
			closeModal();
			toast.success(
				`User workbases for "${userInfo.surname} ${userInfo.name}", succesfully updated.`,
				{
					position: "bottom-left",
				}
			);
		}
	}, [signupState.success, closeModal]);

	useEffect(() => {
		if (response.success) {
			// console.log(`response`, response);
			setUserInfo(response.document);
		}
	}, [response]);

	useEffect(() => {
		getDocument(uid);
	}, [uid]);

	const clearValue = (e) => {
		console.log(`clearing selected value`, e);
		return null;
	};

	const customStyles = {
		control: (provided) => ({
			...provided,
			backgroundColor: "lightgray",
			padding: "0.11rem",
			// border: "1px solid black",
			// boxShadow: "0 2px 4px rgba(0,0,0,.2)",
		}),
		option: (provided, state) => ({
			...provided,
			borderBottom: "1px dotted pink",
			color: state.isSelected ? "white" : "black",
			backgroundColor: state.isSelected ? "hotpink" : "white",
		}),
	};

	return (
		<div className="form-wrapper">
			<div className="form-container form-workbases">
				<Formik
					initialValues={initialValues}
					onSubmit={onSubmit}
					enableReinitialize={true}
					// validationSchema={validationSchema}
				>
					{(formik) => {
						// console.log(`formik`, formik);
						return (
							<>
								<Form>
									<HeaderGeneric
										hl1={`${userInfo.surname} ${userInfo.name} workbases`}
										hr1={<p>{userInfo.workbase}</p>}
									>
										<FormCloseBtn />
									</HeaderGeneric>

									<FormMsg
										msg={`Update user workbases allowed for the user: ${userInfo.surname} ${userInfo.name}`}
									/>

									<div className="possible-workbases">
										{/* workbases */}
										<FieldArray
											name="workbases"
											render={(arrayHelpers) => (
												<div className="workbase-wrapper">
													<Select
														defaultValue={"workbase"}
														options={options}
														// isClearable={true}
														onChange={(selection) => {
															console.log(`selection`, selection);
															arrayHelpers.push(selection.value);
														}}
														clearValue={clearValue}
														styles={customStyles}
													/>
													{formik.values?.workbases &&
														formik.values?.workbases.map((friend, index) => (
															<div key={index} className="workbase-field">
																<Field name={`workbases.${index}`} />
																<button
																	type="button"
																	onClick={() => arrayHelpers.remove(index)} // remove a friend from the list
																>
																	<IconContext.Provider
																		value={{
																			color: "blue",
																			// className: "global-class-name",
																			fontSize: "2rem",
																		}}
																	>
																		<MdOutlineDeleteForever />
																	</IconContext.Provider>
																</button>
															</div>
														))}
												</div>
											)}
										/>
									</div>

									{signupState.error && (
										<FormError errorMsg={signupState.error} />
									)}

									<FormFooter formik={formik} signState={signupState} />
								</Form>
							</>
						);
					}}
				</Formik>
			</div>
		</div>
	);
};

export default FormWorkbases;
