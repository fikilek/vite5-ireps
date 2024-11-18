import { useState, useEffect } from "react";
import { Formik, Form } from "formik";
import { toast } from "react-toastify";
import { useCallback } from "react";

// css
import "@/components/forms/formTrn/tid/FormTid.css";

// custom hooks
import useModal from "@/hooks/useModal.jsx";
import { useFirestore } from "@/hooks/useFirestore.jsx";

// components
import FormikControl from "@/components/forms/formik/FormikControl";
import FormSection from "@/components/forms/formSection/FormSection";
import { formSelectOptions } from "@/utils/utils";
import FormFooter from "@/components/forms/formFooter/FormFooter";
import HeaderGeneric from "@/components/header/HeaderGeneric";
import MediaMobileWrapper from "@/components/media/MediaMobileWrapper";
import FormCloseBtn from "@/components/forms/formBtns/FormCloseBtn";
import { updateFormState } from "@/utils/utils";

const FormTid = (props) => {
	// console.log(`props`, props);

	const { data, validationSchema } = props?.data;
	// console.log(`data`, data);

	// destructure trn id
	const { trnId } = data.metadata;
	// console.log(`trnId`, trnId);

	const { closeModal } = useModal();

	const [active, setActive] = useState(null);

	const { response, setDocument } = useFirestore("trns");
	// console.log(`response`, response)

	const [trnState, setTrnState] = useState(data?.metadata?.trnState);
	// console.log(`trnState`, trnState)

	const onSubmit = useCallback(
		(values) => {
			// console.log(`values`, values);
			setDocument(
				{
					...values,
					metadata: {
						...values.metadata,
						trnState,
					},
				},
				values.metadata.trnId
			);
		},
		[setDocument, trnState]
	);

	useEffect(() => {
		// console.log(`response`, response);
		if (response.success) {
			closeModal();
			toast(`Transaction UPDATED succesfully!`, {
				position: "bottom-left",
				autoClose: 5000,
				hideProgressBar: false,
				closeOnClick: true,
				pauseOnHover: true,
				draggable: true,
				progress: undefined,
				theme: "light",
			});
		}
	}, [response]);

	return data ? (
		<div className="form-wrapper">
			<div className="form-container trn form-meter-tid">
				<Formik
					initialValues={{
						...data,
					}}
					onSubmit={onSubmit}
					validationSchema={validationSchema}
					validationOnMount={true}
				>
					{(formik) => {
						// const disabled = !(formik.isValid && formik.dirty);
						// console.log(`formik.errors`, formik.errors);
						// console.log(`formik.isValid`, formik.isValid);
						// console.log(`disabled`, disabled);
						// console.log(`formik.values`, formik.values);

						const { meterAccess } = formik.values?.access;
						// console.log(`meterAccess`, meterAccess);

						const showHide = meterAccess === "yes" ? "hide" : "";
						// console.log(`showHide`, showHide);

						updateFormState(formik, setTrnState);

						return (
							<Form>
								<div className="trn-form">
									<HeaderGeneric
										hl1={"Tid Form"}
										hl2={
											<span className="text-emphasis2">
												{trnState}
											</span>
										}
										hr1={
											<span>
												Meter:
												<span className="text-emphasis2">
													{formik.values.astData.astNo}
												</span>
											</span>
										}
									>
										<FormCloseBtn />
									</HeaderGeneric>

									{/* meter access */}
									<FormSection
										sectionData={{
											sectionName: "access",
											formik: formik,
										}}
										active={active}
										setActive={setActive}
									>
										<div className="form-row-wrapper">
											<div className="row-0 form-row">
												<FormikControl
													control="selectMeterAccess"
													type="text"
													label="was there access to the meter?"
													name={`access.meterAccess`}
													options={formSelectOptions.yesNoOptions}
												/>
												
												<FormikControl
													control="selectNoAccessReason"
													type="text"
													label="meter no access reasons"
													name={`access.noAccessReason ${showHide}`}
													options={formSelectOptions.keyPadNoAccessOptions}
												/>
												{/* <FormikControl
													control="select"
													type="text"
													label="meter no access reasons"
													name={`access.noAccessReason`}
													options={formSelectOptions.keyPadNoAccessOptions}
												/> */}
											</div>
											<div className="row-0 form-row">
												<FormikControl
													control="mediaButton"
													type="button"
													label="no access media"
													name={`astData.media.noAccess`}
													ml1="asts"
													mediaCat="noAcces"
												/>
											</div>
										</div>
									</FormSection>

									{/* tid operation */}
									<FormSection
										sectionData={{
											sectionName: "tidOperation",
											formik: formik,
										}}
										active={active}
										setActive={setActive}
									>
										<div className="form-row-wrapper">
											<div className="row-1 form-row">
												<div className="row-50-50">
													<FormikControl
														control="selectTidDone"
														type="text"
														label="tid done?"
														name={`tidOperation.tidDone`}
														options={formSelectOptions.yesNoOptions}
													/>
													<FormikControl
														control="mediaButton"
														type="button"
														label="tid media"
														name={`media.tid`}
														ml1="asts"
													/>
												</div>
												<div>
													<FormikControl
														control="select"
														type="text"
														label="tid comment"
														name={`tidOperation.comment`}
														options={formSelectOptions.tidCommentsOptions}
													/>
												</div>
											</div>
										</div>
									</FormSection>

									{/* tid  before and after */}
									<FormSection
										sectionData={{
											sectionName: "beforeAndAfter",
											formik: formik,
										}}
										active={active}
										setActive={setActive}
									>
										<div className="form-row-wrapper">
											<div className="row-2 form-row">
												{/* tid before */}
												<div className="row-50-50">
													<FormikControl
														control="select"
														type="text"
														label="tariff Before"
														name={`tidBefore.tariff`}
														options={formSelectOptions.tariffOptions}
													/>
													<FormikControl
														control="select"
														type="text"
														label="krn Before"
														name={`tidBefore.krn`}
														options={formSelectOptions.krnOptions}
													/>
												</div>

												{/* tid after */}
												<div className="row-50-50">
													<FormikControl
														control="select"
														type="text"
														label="tariff After"
														name={`tidAfter.tariff`}
														options={formSelectOptions.tariffOptions}
													/>
													<FormikControl
														control="select"
														type="text"
														label="krn After"
														name={`tidAfter.krn`}
														options={formSelectOptions.krnOptions}
													/>
												</div>
											</div>
										</div>
									</FormSection>

									{formik.values.metadata.trnState === "submitted" ? (
										""
									) : (
										<FormFooter formik={formik} signState={response} />
									)}
								</div>
							</Form>
						);
					}}
				</Formik>
				<MediaMobileWrapper
					data={{
						...props.data,
						irepsKeyItem: "trns",
						displayMode: "popup",
						trnId,
					}}
				/>
			</div>
		</div>
	) : (
		<p>wait</p>
	);
};
export default FormTid;
