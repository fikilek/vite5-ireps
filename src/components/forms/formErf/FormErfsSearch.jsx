import { Formik, Form } from "formik";
import { object, string } from "yup";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

import "@/components/forms/Form.css";

import FormikControl from "@/components/forms/formik/FormikControl";
import FormFooter from "@/components/forms/formFooter/FormFooter";
import FormMsg from "@/components/forms/formMsg/FormMsg";
import FormError from "@/components/forms/formError/FormError";
import useModal from "@/hooks/useModal";
import useGetCollection from "@/hooks/useGetCollectionInfo";
import HeaderGeneric from "@/components/header/HeaderGeneric";

const ErfsSearch = () => {
	const { closeModal } = useModal();

	const [erfNo, setErfNo] = useState(null);
	console.log(`erfNo`, erfNo);

	const { state, getCollection } = useGetCollection("erfs");
	// console.log(`state`);

	const onSubmit = values => {
		getCollection(["erfNo", "==", values.erfNo.trim()]);
	};

	const validationSchema = object({
		erfNo: string().required("Ast No is required."),
	});

	useEffect(() => {
		if (state.success && state.data.length > 0) {
			closeModal();
			toast.success(`Erf No "${erfNo}", succesfully found`, {
				position: "bottom-left",
			});
		}
		if (state.success && state.data.length === 0) {
			closeModal();
			toast.warn(`Erf No "${erfNo}", NOT found`, {
				position: "top-left",
			});
			getCollection();
		}
	}, [state.success, closeModal]);

	useEffect(() => {
		if (state.error) {
			console.log(`state.error`, state.error);
		}
	}, [state.error]);

	return (
		<div className="form-wrapper">
			<div className="form-container erfs-search">
				<Formik
					initialValues={{
						erfNo: "",
					}}
					onSubmit={onSubmit}
					validationSchema={validationSchema}
				>
					{formik => {
						// console.log(`formik`, formik);
						setErfNo(formik.values.erfNo);
						return (
							<>
								<Form>
									<HeaderGeneric hl1="Erfs Search" />
									<FormMsg msg="Enter the Erf No to search for." />
									<div className="search-erfs-form">
										<FormikControl
											control="input"
											type="text"
											label="Erf NO"
											name={"erfNo"}
											placeholder=""
											autoFocus={true}
										/>
									</div>
									{state.error && <FormError errorMsg={state.error} />}
									<FormFooter formik={formik} signState={state} />
								</Form>
							</>
						);
					}}
				</Formik>
			</div>
		</div>
	);
};

export default ErfsSearch;
