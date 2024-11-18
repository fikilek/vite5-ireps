import { useState, useEffect } from "react";
import { Formik, Form, useFormikContext } from "formik";
import { useCallback } from "react";
import { toast } from "react-toastify";

// css
import "@/components/forms/formTrn/checkin/FormCheckin.css";

// custom hooks
import { useFirestore } from "@/hooks/useFirestore.jsx";
import useModal from "@/hooks/useModal.jsx";

// components
import FormikControl from "@/components/forms/formik/FormikControl";
import FormSection from "@/components/forms/formSection/FormSection";
import { formSelectOptions } from "@/utils/utils";
import FormFooter from "@/components/forms/formFooter/FormFooter";
import HeaderGeneric from "@/components/header/HeaderGeneric";
import MapReverseGeocodingApp from "@/components/maps/MapReverseGeocodingApp";
import MediaMobileWrapper from "@/components/media/MediaMobileWrapper";
import FormCloseBtn from "@/components/forms/formBtns/FormCloseBtn";
import { updateFormState } from "@/utils/utils";

const FormCheckin = (props) => {
	// console.log(`props`, props);

	const { data, validationSchema } = props?.data;
	// console.log(`data`, data);

	// const { erfNo, erfId, address } = data.erf;

	// destructure trn id
	const { trnId } = data.metadata;
	// console.log(`trnId`, trnId);

	const { closeModal } = useModal();

	const [active, setActive] = useState(null);

	const { response, setDocument } = useFirestore("trns");
	// console.log(`response`, response)

	const [trnState, setTrnState] = useState(data?.metadata?.trnState)
	// console.log(`trnState`, trnState)

	const onSubmit = useCallback(
		(values) => {
			console.log(`values`, values);
			setDocument({
			...values,
				metadata: {
					...values.metadata,
					trnState
				}
			}
			, values.metadata.trnId);
		},
		[setDocument, trnState]
	);

	useEffect(() => {
		// console.log(`response`, response);
		if (response.success) {
			// deleteItem(key);
			closeModal();
			toast(`Transaction UPDATED successfully!`, {
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
			<div className="form-container trn form-meter-audit">
				<Formik
					initialValues={data}
					onSubmit={onSubmit}
					validationSchema={validationSchema}
					validateOnMount={true}
				>
					{(formik) => {
						// const disabled = !(formik.isValid && formik.dirty);
						// console.log(`formik.errors`, formik.errors);
						// console.log(`formik.isValid`, formik.isValid);
						// console.log(`disabled`, disabled);
						// console.log(`formik.values`, formik.values);

						updateFormState(formik, setTrnState)

						return (
							<Form>
								<div className="trn-form">
									<HeaderGeneric
										hl1={
											<span>
												Meter <span className="text-emphasis2">Audit</span> Form
											</span>
										}
										// hl2={
										// 	<span className="text-emphasis2">
										// 		{trnState}
										// 	</span>
										// }
										// hr1={
										// 	<span>
										// 		Erf:<span className="text-emphasis2">{erfNo}</span>
										// 	</span>
										// }
										hr2={
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

									{/* meter description */}
									<FormSection
										sectionData={{
											sectionName: "meterDescription",
											formik: formik,
										}}
										active={active}
										setActive={setActive}
									>
										<div className="form-row-wrapper">
											<div className="row-1 form-row">
												<div className="">
													<FormikControl
														control="inputBarcodeScan"
														type="text"
														label="Meter No"
														name={`astData.astNo`}
													/>
												</div>
												<div className="">
													<FormikControl
														control="mediaButton"
														type="button"
														label="meter no media"
														name={`astData.media.astNo`}
														ml1="asts"
													/>
												</div>
												<div className="row-50-50">
													<FormikControl
														control="select"
														type="text"
														label="meter phase?"
														name={`astData.meter.phase`}
														options={formSelectOptions.meterPhaseOptions}
													/>
													<FormikControl
														control="select"
														type="text"
														label="meter type?"
														name={`astData.meter.type`}
														options={formSelectOptions.meterTypeOptions}
													/>
												</div>
												<FormikControl
													control="input"
													type="text"
													label="manufacturer"
													name={`astData.astManufacturer`}
												/>
											</div>
											<div className="row-5 form-row">
											
												<FormikControl
													control="input"
													type="text"
													label="product name"
													name={`astData.astName`}
												/>
											</div>
										</div>
									</FormSection>

									{/* meter location */}
									<FormSection
										sectionData={{
											sectionName: "meterLocation",
											formik: formik,
										}}
										active={active}
										setActive={setActive}
									>
										<div className="form-row-wrapper">
											<div className="row-2 form-row">
												<div>
													<FormikControl
														control="rgcButton"
														type="button"
														label="click for meter address"
														name={`location.address`}
														placeholder="Meter Address"
													/>
												</div>

												<div className="row-50-50">
													<FormikControl
														readOnly={true}
														control="input"
														type="text"
														label="gps(lat)"
														name={`location.gps.lat`}
													/>
													<FormikControl
														readOnly={true}
														control="input"
														type="text"
														label="gps(lng)"
														name={`location.gps.lng`}
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
				<MapReverseGeocodingApp geocoding={"ast"} />
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
export default FormCheckin;
