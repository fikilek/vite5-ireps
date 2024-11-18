import { Formik, Form } from "formik";
import { object, string } from "yup";
import { toast } from "react-toastify";
import { useEffect } from "react";

// css
import "@/components/forms/Form.css";

// custom hooks
import useModal from "@/hooks/useModal.jsx";
import { useFirebase } from "@/hooks/useFirebase.jsx";
import { useSignup } from "@/hooks/useSignup.jsx";
import { useServiceProviders } from "@/hooks/useServiceProviders.jsx";

import FormikControl from "@/components/forms/formik/FormikControl";
import FormFooter from "@/components/forms/formFooter/FormFooter";
import FormMsg from "@/components/forms/formMsg/FormMsg";
import FormError from "@/components/forms/formError/FormError";
import { capitalizeFirstLetters } from "@/utils/utils";
import FormCloseBtn from "../formBtns/FormCloseBtn";
import HeaderGeneric from "@/components/header/HeaderGeneric";

const UpdateUser = (props) => {
	// console.log(`props`, props)
	const { surname, name, nickName, companyName, workbase } = props.formData;

	const {
		serviceProviders,
		getSpClients,
		getSpDetailsFromSpName,
		getSpClientsFromName,
	} = useServiceProviders();

	const { getCustomError } = useFirebase();

	const { updateUser, signupState } = useSignup();

	const { closeModal } = useModal();

	const onSubmit = (values) => {
		// console.log(`Form values`, values);
		const newValues = capitalizeFirstLetters(values);
		// console.log(`Form newValues`, newValues);
		updateUser(newValues);
	};

	const validationSchema = object({
		surname: string().required("Surname is required."),
		name: string().required("required."),
		nickName: string().required("required."),
		companyName: string().ensure().required("Company name is required."),
		workbase: string().required("Workbase is required"),
	});

	useEffect(() => {
		if (signupState.success) {
			closeModal();
			toast.success(`User "${surname} ${name}" succesfully updated on iREPS`, {
				position: "bottom-left",
			});
		}
	}, [signupState.success, closeModal, surname, name]);

	return (
		<div className="form-wrapper">
			<div className="form-container update-user">
				<Formik
					initialValues={{
						surname,
						name,
						nickName,
						companyName,
						workbase,
					}}
					onSubmit={onSubmit}
					validationSchema={validationSchema}
				>
					{(formik) => {
						// console.log(`formik`, formik);

						// This will use regular ecpresion to search for matching companyName form list of all service providers
						const sp = getSpDetailsFromSpName(formik.values.companyName);
						// console.log(`sp`, sp);

						let spClients = getSpClients(sp);

						const result = spClients.find((client) => {
							const clientStr = client.key.toLowerCase().trim();
							// console.log(`clientStr`, clientStr);

							// user regular expresions to search doe a matching nameStr in spStr
							const re = new RegExp("rste", "gi");
							// console.log(`re`, re);

							return re.test(clientStr);
						});
						// console.log(`result`, result);

						if (result) {
							// const sp = getSpDetails("rste");
							spClients = getSpClientsFromName("rste");
						}
						// console.log(`spClients`, spClients);

						return (
							<>
								<Form>
									<HeaderGeneric hl1="Update User Info" hr1={<p></p>}>
										<FormCloseBtn />
									</HeaderGeneric>
									<FormMsg msg="Complete the fields below and submit to update user info on iREPS." />
									<div className="updateuser-form">
										<div className="form-row">
											<div className="row-50-50">
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
											</div>
											<div className="row-50-50">
												<FormikControl
													control="input"
													type="text"
													label="Aka"
													name={"nickName"}
													placeholder=""
												/>
												<FormikControl
													control="select"
													type="text"
													label="Company Name"
													name={"companyName"}
													placeholder=""
													options={serviceProviders.spOptions}
												/>
											</div>
										</div>
									</div>
									{signupState.error && (
										<FormError errorMsg={getCustomError(signupState.error)} />
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

export default UpdateUser;
