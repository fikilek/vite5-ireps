import { object, string } from "yup";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { Formik, Form, FieldArray } from "formik";

// css
import "@/components/forms/Form.css";
import "@/components/forms/formServiceProvider/FormServiceProvider.css";

// custom hooks
import useModal from "@/hooks/useModal.jsx";
import { useFirestore } from "@/hooks/useFirestore.jsx";
import { useServiceProviders } from "@/hooks/useServiceProviders.jsx";

// component
import FormikControl from "@/components/forms/formik/FormikControl";
import FormFooter from "@/components/forms/formFooter/FormFooter";
import FormError from "@/components/forms/formError/FormError";
import HeaderGeneric from "@/components/header/HeaderGeneric";
import FormCloseBtn from "@/components/forms/formBtns/FormCloseBtn";

const FormServiceProvider = (props) => {
	// console.log(`props`, props);

	const [selectedTab, setSelectedTab] = useState("main");

	const { serviceProviders, getSpDetails, getSpClients } =
		useServiceProviders();

	const { formData } = props;

	const { addDocument, updateDocument, response } =
		useFirestore("serviceProviders");
	// console.log(`response`, response);

	const { closeModal } = useModal();

	const onSubmit = (values) => {
		// console.log(`Form values`, values);
		const { id } = values;
		if (id) {
			updateDocument(values, id);
		} else {
			addDocument(values);
		}
	};

	const validationSchema = object({
		// disabled: string().required("required."),
		registeredName: string().required("required."),
		// mainOffice: object({
		// 	address: string().required("required"),
		// 	email: string().required("required"),
		// 	phone: string().required("required"),
		// }),
		// contactPerson: object({
		// 	surnameAndName: string().required("required"),
		// 	cellNo: string().required("required"),
		// }),
	});

	useEffect(() => {
		if (response.success) {
			closeModal();
			toast.success(`document succesfully added/updated`, {
				position: "bottom-left",
			});
		}
	}, [response.success, closeModal]);

	const selectTab = (e) => {
		setSelectedTab(e.target.id);
	};

	return (
		<div className="form-wrapper">
			<div className="form-container service-provider">
				<Formik
					initialValues={formData.data}
					onSubmit={onSubmit}
					validationSchema={validationSchema}
					enableReinitialize
				>
					{(formik) => {
						// console.log(`formik.values.clients`, formik?.values?.clients);						
						const sp = getSpDetails(formik?.values?.companyName);
						let spClients = getSpClients(sp);

						const result = spClients?.find(
							(client) => client.key?.trim().toLowerCase() === "rste"
						);
						if (result) {
							const sp = getSpDetails("RSTE");
							spClients = getSpClients(sp);
						}

						return (
							<Form>
								<HeaderGeneric hl1="Service Provider" hr1={<p></p>}>
									<FormCloseBtn />
								</HeaderGeneric>
								<div className="form-body">
									<div className="tabs">
										<div className="tabs-header">
											<div className="tabs-header-left">
												<button
													className={`tabs-btn ${
														selectedTab === "main" ? "active" : ""
													}`}
													id="main"
													onClick={selectTab}
													type={"button"}
												>
													Main
												</button>
												<button
													className={`tabs-btn ${
														selectedTab === "clients" ? "active" : ""
													}`}
													id="clients"
													onClick={selectTab}
													type={"button"}
												>
													Clients
												</button>
											</div>

											<div className="tabs-header-right">
												<button
													className={`tabs-btn ${
														selectedTab === "otherOffices" ? "active" : ""
													}`}
													id="otherOffices"
													onClick={selectTab}
													type={"button"}
												>
													Other Offices
												</button>
												<button
													className={`tabs-btn ${
														selectedTab === "stores" ? "active" : ""
													}`}
													id="stores"
													onClick={selectTab}
													type={"button"}
												>
													Stores
												</button>
											</div>
										</div>
										<div className="tabs-body">
											{selectedTab === "main" && (
												<div className="main body-display">
													{/* comapny details */}
													<div className="form-row">
														<div className="row-50-50">
															{/* Company Name */}
															<FormikControl
																control="input"
																type="text"
																label="Registered Name"
																name={"registeredName"}
															/>
															{/* Company Name */}
															<FormikControl
																control="input"
																type="text"
																label="Trading Name"
																name={"tradingName"}
															/>
														</div>
														<div>
															{/* Company Address */}
															<FormikControl
																control="input"
																type="text"
																label="Address"
																name={"mainOffice.address"}
															/>
														</div>
													</div>

													{/* office contact details */}
													<div className="form-row">
														<div className="row-50-50">
															{/* Company Email address */}
															<FormikControl
																control="input"
																type="text"
																label="Email Adr"
																name={"mainOffice.email"}
																options={serviceProviders.spOptions}
															/>
															{/* Company Contact No */}
															<FormikControl
																control="input"
																type="text"
																label="Office Landline No"
																name={"mainOffice.phone"}
																options={spClients || "none"}
															/>
														</div>
													</div>

													{/* contact person details */}
													<div className="form-row">
														<div className="row-50-50">
															{/* Company Contact Person Surname */}
															<FormikControl
																control="input"
																type="text"
																label="Contact Person Surname"
																name={"contactPerson.surname"}
															/>
															{/* Company Contact Person Name */}
															<FormikControl
																control="input"
																type="text"
																label="Contact Person Name"
																name={"contactPerson.name"}
															/>
														</div>
														{/* Company Contact Person email adr */}
														<div className="row-50-50">
															{/* Company Contact Person Cell No */}
															<FormikControl
																control="input"
																type="text"
																label="Person Person Cell"
																name={"contactPerson.cellNo"}
															/>
															<FormikControl
																control="input"
																type="text"
																label="Person Person Email"
																name={"contactPerson.emailAdr"}
															/>
														</div>
													</div>

													<div className="form-row"></div>
												</div>
											)}
											{selectedTab === "clients" && (
												<div className="clients body-display">
													{/* Clients */}
													<FieldArray
														name="clients"
														render={({ insert, remove, push }) => {
															// console.log(`arrayHelpers`, arrayHelpers);
															// console.log(`formData?.clients`, formData?.clients);
															return (
																<>
																	<div className="body-display-header">
																		<button
																			className="row-add-btn"
																			type="button"
																			onClick={() =>
																				push({
																					name: "",
																					address: "",
																					email: "",
																					phone: "",
																				})
																			}
																		>
																			Add Client
																		</button>
																	</div>

																	{formik.values.clients.map(
																		(client, index, array) => {
																			// console.log(`client`, client);
																			// console.log(`index`, index);
																			// console.log(`array`, array);

																			return (
																				<div
																					key={index}
																					className="row-wrapper"
																				>
																					<div className="form-row">
																						<div className="row-10-45-45">
																							<button
																								className="row-remove-btn"
																								type="button"
																								onClick={() => {
																									console.log(`index`, index);
																									return remove(index);
																								}}
																							>
																								-
																							</button>
																							<FormikControl
																								control="reactSelect"
																								type="text"
																								label="Name"
																								name={`clients.${index}.name`}
																							/>
																							<FormikControl
																								control="input"
																								type="text"
																								label="Address"
																								name={`clients.${index}.address`}
																							/>
																						</div>
																						<div className="row-50-50">
																							<FormikControl
																								control="input"
																								type="text"
																								label="Email"
																								name={`clients.${index}.email`}
																							/>
																							<FormikControl
																								control="input"
																								type="text"
																								label="Phone"
																								name={`clients.${index}.phone`}
																							/>{" "}
																						</div>{" "}
																					</div>
																				</div>
																			);
																		}
																	)}
																</>
															);
														}}
													/>
												</div>
											)}

											{selectedTab === "otherOffices" && (
												<div className="other-offices body-display">
													{/* Other Offices */}
													<FieldArray
														name="otherOffices"
														render={(arrayHelpers) => {
															return (
																<>
																	<div className="body-display-header">
																		<button
																			className="row-add-btn"
																			type="button"
																			onClick={() =>
																				arrayHelpers.unshift({
																					name: "",
																					address: "",
																					email: "",
																					phone: "",
																				})
																			}
																		>
																			Add Other Office
																		</button>
																	</div>

																	{arrayHelpers.form.values.otherOffices.map(
																		(client, index) => (
																			<div key={index} className="row-wrapper">
																				<div className="form-row">
																					<div className="row-10-45-45">
																						<button
																							className="row-remove-btn"
																							type="button"
																							onClick={() =>
																								arrayHelpers.remove(index)
																							}
																						>
																							-
																						</button>
																						<FormikControl
																							control="input"
																							type="text"
																							label="Name"
																							name={`otherOffices.[${index}].name`}
																						/>
																						<FormikControl
																							control="input"
																							type="text"
																							label="Address"
																							name={`otherOffices.[${index}].address`}
																						/>
																					</div>
																					<div className="row-50-50">
																						<FormikControl
																							control="input"
																							type="text"
																							label="Email"
																							name={`otherOffices.[${index}].email`}
																						/>

																						<FormikControl
																							control="input"
																							type="text"
																							label="Phone"
																							name={`otherOffices.[${index}].phone`}
																						/>
																					</div>
																				</div>
																			</div>
																		)
																	)}
																</>
															);
														}}
													/>
												</div>
											)}

											{selectedTab === "stores" && (
												<div className="stores body-display">
													{/* stores */}
													<FieldArray
														name="stores"
														render={(arrayHelpers) => {
															return (
																<>
																	<div className="body-display-header">
																		<button
																			className="row-add-btn"
																			type="button"
																			onClick={() =>
																				arrayHelpers.unshift({
																					name: "",
																					address: "",
																					email: "",
																					phone: "",
																				})
																			}
																		>
																			Add stores
																		</button>
																	</div>

																	{arrayHelpers.form.values.stores.map(
																		(client, index) => (
																			<div key={index} className="row-wrapper">
																				<div className="form-row">
																					<div className="row-10-45-45">
																						<button
																							className="row-remove-btn"
																							type="button"
																							onClick={() =>
																								arrayHelpers.remove(index)
																							}
																						>
																							-
																						</button>
																						<FormikControl
																							control="input"
																							type="text"
																							label="Name"
																							name={`stores.[${index}].name`}
																							placeholder=""
																						/>
																						<FormikControl
																							control="input"
																							type="text"
																							label="Address"
																							name={`stores.[${index}].address`}
																							placeholder=""
																						/>
																					</div>
																					<div className="row-50-50">
																						<FormikControl
																							control="input"
																							type="text"
																							label="Email"
																							name={`stores.[${index}].email`}
																							placeholder=""
																						/>

																						<FormikControl
																							control="input"
																							type="text"
																							label="Phone"
																							name={`stores.[${index}].phone`}
																							placeholder=""
																						/>
																					</div>
																				</div>
																			</div>
																		)
																	)}
																</>
															);
														}}
													/>
												</div>
											)}
										</div>
									</div>
								</div>
								{response.error && <FormError errorMsg={response.error} />}
								<FormFooter formik={formik} signState={response}></FormFooter>
							</Form>
						);
					}}
				</Formik>
			</div>
		</div>
	);
};

export default FormServiceProvider;
