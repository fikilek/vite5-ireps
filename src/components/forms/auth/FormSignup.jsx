import { Formik, Form } from "formik";
import { object, ref, string } from "yup";
import { CiLogin } from "react-icons/ci";
import { useEffect } from "react";
import { toast } from "react-toastify";

// css
import "@/components/forms/Form.css";

// custom hooks
import { useSignup } from "@/hooks/useSignup.jsx";
import useModal from "@/hooks/useModal.jsx";
// import { useServiceProviders } from "@/hooks/useServiceProviders.jsx";
import { useFirebase } from "@/hooks/useFirebase.jsx";

// context
import useAuthContext from "@/hooks/useAuthContext.jsx";

// other components
import FormikControl from "@/components/forms/formik/FormikControl";
import FormFooter from "@/components/forms/formFooter/FormFooter";
import FormMsg from "@/components/forms/formMsg/FormMsg";
import FormError from "@/components/forms/formError/FormError";
import { capitalizeFirstLetters } from "@/utils/utils";
import FormLinkBtn from "@/components/forms/formBtns/FormLinkBtn";
// import HeaderGeneric2 from "@/components/header/HeaderGeneric2";
import FormCloseBtn from "../formBtns/FormCloseBtn";
import HeaderGeneric from "@/components/header/HeaderGeneric";

const Signup = () => {
	const { getCustomError } = useFirebase();

	const { signup, signupState } = useSignup();

	// const {
	// 	serviceProviders,
	// 	getSpClients,
	// 	getSpDetailsFromSpName,
	// 	getSpClientsFromName,
	// } = useServiceProviders();

	const { closeModal } = useModal();

	const { user } = useAuthContext() || {};

	const initialValues = {
		surname: "",
		name: "",
		password: "",
		confirmPassword: "",
		email: "",
		phoneNumber: "+27", //

		// nickName: "type nickname",
		// companyName: "",
		workbase: "workbase",
	};

	const onSubmit = (values) => {
		console.log(`Form values`, values);
		const newValues = capitalizeFirstLetters(values);
		signup(newValues);
	};

	// TODO: bug  - does not show formik error
	const validationSchema = object({
		surname: string().required("required."),
		name: string().required("required."),
		// nickName: string().notRequired(),
		// companyName: string()
		// 	.ensure()
		// 	.required("required.")
		// 	.notOneOf(["choose", ""], "required"),
		email: string().email("Email is NOT valid.").required("required."),
		password: string().min(6, "At least 6 characters").required("required."),
		confirmPassword: string()
			.oneOf([ref("password"), null], "must match")
			.required("required."),
		phoneNumber: string()
			.min(10, "At least 10 characters")
			// .matches(phoneRegExp, "Phone number is not valid")
			.required("required."),
		// workbase: string()
		// 	.required("required")
		// 	.notOneOf(["choose", ""], "required"),
		// spId: string().notRequired(),
	});

	useEffect(() => {
		if (signupState.success) {
			closeModal();
			toast.success(
				`User "${user?.displayName}" successfully signed up with iREPS`,
				{
					position: "bottom-left",
				}
			);
		}
	}, [signupState.success, closeModal, user?.displayName]);

	return (
		<div className="form-wrapper">
			<div className="form-container signup">
				<Formik
					initialValues={initialValues}
					onSubmit={onSubmit}
					validationSchema={validationSchema}
					enableReinitialize={true}
				>
					{(formik) => {
						// console.log(`formik.errors`, formik.errors);
						// console.log(`formik.values`, formik.values);

						// This will use regular ecpresion to search for matching companyName form list of all service providers
						// const sp = getSpDetailsFromSpName(formik.values.companyName);
						// console.log(`sp`, sp);

						// let spClients = getSpClients(sp);

						// const result = spClients.find((client) => {
						// 	const clientStr = client.key.toLowerCase().trim();
						// 	// console.log(`clientStr`, clientStr);

						// 	// user regular expresions to search doe a matching nameStr in spStr
						// 	const re = new RegExp("rste", "gi");
						// 	// console.log(`re`, re);

						// 	return re.test(clientStr);
						// });
						// console.log(`result`, result);

						// if (result) {
						// 	// const sp = getSpDetails("rste");
						// 	spClients = getSpClientsFromName("rste");
						// }
						// console.log(`spClients`, spClients);

						return (
							<>
								<Form>
									<HeaderGeneric hl1="Singup/Register" hr1={<p></p>}>
										<FormCloseBtn />
									</HeaderGeneric>
									<FormMsg msg="Complete the fields below so as to gain access to iREPS." />
									<div className="signup-form">
										<div className="form-row-2col">
											<FormikControl
												control="input"
												type="text"
												label="Surname"
												name={"surname"}
												placeholder=""
												autoFocus={true}
											/>
											<FormikControl
												control="input"
												type="text"
												label="Name"
												name={"name"}
												placeholder=""
											/>

											{/* <FormikControl
													control="select"
													type="text"
													label="Company Name"
													name={"companyName"}
													placeholder=""
													options={serviceProviders.spOptions}
												/> */}
											{/* <FormikControl
													control="select"
													type="text"
													label="Workbase"
													name={"workbase"}
													placeholder=""
													options={spClients}
												/> */}
										</div>
										<div className="form-row-2col">
											<FormikControl
												control="inputPwd"
												type="password"
												label="Pwd"
												name={"password"}
												placeholder=""
												autoComplete="user password"
											/>

											<FormikControl
												control="inputPwd"
												type="password"
												label="Confirm Pwd"
												name={"confirmPassword"}
												placeholder=""
												autoComplete="Confirm password"
											/>
										</div>

										<div className="form-row-1col">
											<FormikControl
												control="input"
												type="email"
												label="Email"
												name={"email"}
												placeholder=""
											/>
										</div>
										<div className="form-row-1col phoneNumber">
											<FormikControl
												control="phoneNumberInput"
												type="text"
												label="Phone No"
												name={"phoneNumber"}
												placeholder=""
											/>
											{/* <FormikControl
													control="input"
													type="text"
													label="Aka"
													name={"nickName"}
													placeholder=""
												/> */}
										</div>
										{/* <div className="form-row"></div> */}
										{/* <div className="form-row-hidden">
											<FormikControl
												control="input"
												type="hidden"
												name={"spId"}
											/>
										</div> */}
									</div>
									{signupState.error && (
										<FormError errorMsg={getCustomError(signupState.error)} />
									)}
									<FormFooter formik={formik} signState={signupState}>
										<FormLinkBtn
											icon={<CiLogin />}
											title="Signin"
											linkName="signin"
										/>
									</FormFooter>
								</Form>
							</>
						);
					}}
				</Formik>
			</div>
		</div>
	);
};

export default Signup;
