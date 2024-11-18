import { Formik, Form } from "formik";
import { object, string } from "yup";
import { useEffect } from "react";
import { toast } from "react-toastify";
import { useSignup } from "@/hooks/useSignup";

// css
import "@/components/forms/Form.css";

// custom hooks
import useModal from "@/hooks/useModal.jsx";
import { useFirestore } from "@/hooks/useFirestore";

// context
import useAuthContext from "@/hooks/useAuthContext.jsx";

// components
import FormikControl from "@/components/forms/formik/FormikControl";
import FormFooter from "@/components/forms/formFooter/FormFooter";
import FormMsg from "@/components/forms/formMsg/FormMsg";
import FormError from "@/components/forms/formError/FormError";
import HeaderGeneric from "@/components/header/HeaderGeneric";
import FormCloseBtn from "@/components/forms/formBtns/FormCloseBtn";
// import { useServiceProviders } from "@/hooks/useServiceProviders";
import { useState } from "react";

const EditUserWorkbase = (props) => {
	// console.log(`props`, props);

	const { response, getDocument } = useFirestore("users");
	// console.log(`response`, response);
	// console.log(`getDocument`, getDocument);

	const { user } = useAuthContext();
	// console.log(`user`, user);

	// get user uid from userContext
	const { uid } = user;
	// console.log(`uid`, uid);

	const [userInfo, setUserInfo] = useState(null);
	// console.log(`userInfo`, userInfo);

	let workbases = [{ key: "choose", value: "choose" }];
	userInfo?.workbases &&
		userInfo?.workbases?.map((workbase) => {
			workbases.push({
				key: workbase,
				value: workbase,
			});
		});

	// console.log(`workbases`, workbases);

	const { closeModal } = useModal();

	const { formData: workbase } = props;

	const { updateUserWorkbase, signupState } = useSignup();

	const initialValues = {
		newWorkbase: workbase,
		workbase, //old workbase
		password: "",
	};

	const onSubmit = (values) => {
		// console.log(`Form values`, values);
		updateUserWorkbase(values);
	};

	const validationSchema = object({
		newWorkbase: string().required("Workbase is required."),
		workbase: string().required("Workbase is required."),
		password: string().required("Password is required."),
	});

	useEffect(() => {
		if (signupState.success) {
			closeModal();
			toast.success(
				`User workbase for "${user.displayName}", succesfully updated.`,
				{
					position: "bottom-left",
				}
			);
		}
	}, [signupState.success, closeModal]);

	useEffect(() => {
		if (response.success) {
			// console.log(`response`, response);
			const { companyName } = response?.document;
			// console.log(`companyName`, companyName)
			// setCompanyName(companyName);
			setUserInfo(response?.document);
		}
	}, [response.success]);

	useEffect(() => {
		getDocument(uid);
	}, [uid]);

	return (
		<div className="form-wrapper">
			<div className="form-container edit-user-workbase">
				<Formik
					initialValues={initialValues}
					onSubmit={onSubmit}
					validationSchema={validationSchema}
				>
					{(formik) => {
						// console.log(`formik`, formik);
						return (
							<>
								<Form>
									<HeaderGeneric hl1="Edit User Workbase" hr1={<p></p>}>
										<FormCloseBtn />
									</HeaderGeneric>
									<FormMsg msg="Enter the new workbase on the 'workbase' field below and submit." />
									<div className="edit-workbase-form">
										<FormikControl
											control="input"
											type="text"
											label="Old Workbase"
											name={"workbase"}
											placeholder=""
											readOnly
										/>
										<FormikControl
											control="select"
											type="text"
											label="New Workbase"
											name={"newWorkbase"}
											placeholder=""
											options={workbases}
										/>
										<FormikControl
											control="inputPwd"
											type="password"
											label="Password"
											name={"password"}
											placeholder=""
											autoComplete="user password"
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

export default EditUserWorkbase;
