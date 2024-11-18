import { useEffect } from "react";
import { Formik, Form } from "formik";
import { object, string } from "yup";
import { MdOutlinePassword } from "react-icons/md";
import { toast } from "react-toastify";
import { IoIosPersonAdd } from "react-icons/io";
import { useLocation, useNavigate } from "react-router-dom";

// css
import "@/components/forms/Form.css";

// custom hooks
import { useSignin } from "@/hooks/useSignin.jsx";
import { useFirebase } from "@/hooks/useFirebase.jsx";
import useModal from "@/hooks/useModal.jsx";

// contaxt
import useAuthContext from "@/hooks/useAuthContext.jsx";

// other components
import FormikControl from "@/components/forms/formik/FormikControl";
import FormFooter from "@/components/forms/formFooter/FormFooter";
import FormMsg from "@/components/forms/formMsg/FormMsg";
import FormError from "@/components/forms/formError/FormError";
import FormLinkBtn from "@/components/forms/formBtns/FormLinkBtn";
import HeaderGeneric from "@/components/header/HeaderGeneric";
import FormCloseBtn from "../formBtns/FormCloseBtn";

const Signin = () => {
	const location = useLocation();

	const navigate = useNavigate();

	const navigateTo = location?.state?.from?.pathname || "/";

	const { getCustomError } = useFirebase();

	const { signin, signinState } = useSignin();

	const { closeModal } = useModal();

	const { user } = useAuthContext();

	const initialValues = {
		email: "fikilekentane@gmail.co",
		password: "fkpass123",
	};

	const onSubmit = values => {
		signin(values).then(result => {});
	};

	const validationSchema = object({
		email: string().email("Email is NOT valid.").required("Email is required."),
		password: string().required("Password is required."),
	});

	useEffect(() => {
		if (user) {
			closeModal();
			toast.success(
				`User "${user?.displayName}" succesfully signedin with iREPS`,
				{
					position: "bottom-left",
				}
			);
			navigate(navigateTo);
		}
	}, [user]);

	return (
		<div className="form-wrapper">
			<div className="form-container signin">
				<Formik
					initialValues={initialValues}
					onSubmit={onSubmit}
					validationSchema={validationSchema}
				>
					{formik => {
						// console.log(`formik`, formik);
						return (
							<>
								<Form>
									<HeaderGeneric hl1="Singin/Login" hr1={<p></p>} > <FormCloseBtn /> </HeaderGeneric>
									<FormMsg msg="Type in the email and password to signin/logon to iREPS." />
									<div className="signin-form">
										<FormikControl
											control="input"
											type="email"
											label="Email"
											name={"email"}
											placeholder=""
											autoFocus={true}
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
									{signinState.error && (
										<FormError errorMsg={getCustomError(signinState.error)} />
									)}

									<FormFooter formik={formik} signState={signinState}>
										<FormLinkBtn
											icon={<IoIosPersonAdd />}
											title="Signun"
											linkName="signup"
										/>
										<FormLinkBtn
											icon={<MdOutlinePassword />}
											title="Password Reset"
											linkName="passwordReset"
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

export default Signin;
