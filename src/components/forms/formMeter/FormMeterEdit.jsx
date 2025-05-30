import { useState, useEffect } from "react";
import { Formik, Form } from "formik";
import { useCallback } from "react";
import { toast } from "react-toastify";

// css
import "@/components/forms/formMeter/FormMeterEdit.css";

// custom hooks
import { useFirestore } from "@/hooks/useFirestore.jsx";
import { useLocalStorage } from "@/hooks/useLocalStorage.jsx";
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

const FormMeterEdit = props => {
	console.log(`props`, props);

	const { data, validationSchema } = props?.data;
	// console.log(`data`, data);

	const { erfNo, erfId, address } = data.erf;

	// destructure trn id
	const { trnId } = data.metadata;
	// console.log(`trnId`, trnId);

	const [formState, setFormState] = useState(null);
	// console.log(`formState`, formState);

	const [formData, setFormData] = useState(null);
	// console.log(`formData`, formData);

	const key = `${erfId}_${erfNo}`;
	const { setItem, getItem, deleteItem } = useLocalStorage(`${erfId}_${erfNo}`);

	useEffect(() => {
		const existingTrn = getItem(key);
		// console.log(`existingTrn`, existingTrn);
		if (existingTrn) {
			setFormData(existingTrn);
		} else {
			setFormData(data);
		}
		return () => setFormData(null);
	}, []);

	useState(() => {
		setFormState(data.metadata.trnState);
		return () => setFormState(null);
	}, []);

	const { closeModal } = useModal();

	const [active, setActive] = useState(null);

	const { response, setDocument } = useFirestore("trns");
	// console.log(`response`, response)

	const onSubmit = useCallback(
		values => {
			// console.log(`values`, values);
			setDocument(
				{
					...values,
					metadata: {
						...values.metadata,
						trnState: formState,
					},
				},
				values.metadata.trnId
			);
		},
		[setDocument]
	);

	useEffect(() => {
		// console.log(`response`, response);
		if (response.success) {
			deleteItem(key);
			closeModal();
			toast(`Transaction UPDATED succeesfully!`, {
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

	const handleChange = formik => {
		let state = formik.values.metadata.trnState;
		if (formik.values?.access?.meterAccess === "no") {
			state = "N/A";
		}
		if (
			formik.isValid &&
			formik.dirty &&
			formik.values?.access?.meterAccess === "yes"
		) {
			state = "valid";
		}

		// setFormState(state);
		// submitted form must not be saved to useLocalStorage
		if (formik.values?.metadata?.trnState !== "submitted") {
			setItem(formik.values);
		}
	};

	return formData ? (
		<div className="form-wrapper">
			<div className="form-container trn form-meter-audit">
				<Formik
					initialValues={{
						...formData,
						erf: {
							...formData?.erf,
							erfNo,
							erfId,
							address,
						},
					}}
					onSubmit={onSubmit}
					validationSchema={validationSchema}
				>
					{formik => {
						// const disabled = !(formik.isValid && formik.dirty);
						// console.log(`formik.values`, formik.values);
						// console.log(`formik.isValid`, formik.isValid);
						// console.log(`disabled`, disabled);
						// console.log(`formik.values`, formik.values);

						return (
							<Form onChange={handleChange(formik)}>
								<div className="trn-form">
									<HeaderGeneric
										hl1={
											<span>
												Meter <span className="text-emphasis2">Edit</span> Form
											</span>
										}
										hl2={<span className="text-emphasis2">{formState}</span>}
										hr1={
											<span>
												Erf:<span className="text-emphasis2">{erfNo}</span>
											</span>
										}
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

									{/* access */}
									{/* <FormSection
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
													control="select"
													type="text"
													label="was there access to the meter?"
													name={`access.meterAccess`}
													options={formSelectOptions.yesNoOptions}
												/>
												<FormikControl
													control="select"
													type="text"
													label="meter no accss reasons"
													name={`access.noAccessReason`}
													options={formSelectOptions.keyPadNoAccessOptions}
												/>
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
									</FormSection> */}

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
												<div className="row-50-50">
													<FormikControl
														control="input"
														type="text"
														label="Meter No"
														name={`astData.astNo`}
														readOnly={true}
													/>
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
											</div>
											{/* <div className="row-5 form-row">
												<FormikControl
													control="input"
													type="text"
													label="manufacturer"
													name={`astData.astManufacturer`}
												/>
												<FormikControl
													control="input"
													type="text"
													label="product name"
													name={`astData.astName`}
												/>
											</div> */}
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

											{/* <div className="row-3 form-row">
												<div className="row-50-50">
													<FormikControl
														control="select"
														type="text"
														label="premises?"
														name={`location.premises`}
														options={formSelectOptions.astLocationPremisesOptions}
													/>
													<FormikControl
														control="select"
														type="text"
														label="inside box?"
														name={`location.insideBox`}
														options={formSelectOptions.yesNoOptions}
													/>
												</div>
												<div>
													<FormikControl
														control="mediaButton"
														type="button"
														label="inside box media"
														name={`astData.media.insideBox`}
														ml1="asts"
													/>
												</div>
											</div> */}
										</div>
									</FormSection>

									{/* anomalies */}
									{/* <FormSection
										sectionData={{
											sectionName: "anomalies",
											formik: formik,
										}}
										active={active}
										setActive={setActive}
									>
										<div className="form-row-wrapper">
											<div className="row-4 form-row">
												<FormikControl
													control="selectSetAnomaly"
													type="text"
													label="anomaly"
													name={`anomalies.anomaly`}
													options={formSelectOptions.anomaliesOptions}
												/>
												<FormikControl
													control="selectSetAnomalyDetail"
													type="text"
													label="anomaly detail"
													name={`anomalies.anomalyDetail`}
												/>
											</div>
											<div className="row-5 form-row">
												<FormikControl
													control="mediaButton"
													type="button"
													label="anomaly media"
													name={`astData.media.anomaly`}
												/>
											</div>
										</div>
									</FormSection> */}

									{/* service connection */}
									{/* <FormSection
										sectionData={{
											sectionName: "serviceConnection",
											formik: formik,
										}}
										active={active}
										setActive={setActive}
									>
										<div className="form-row-wrapper">
											<div className="row-4 form-row">
												<FormikControl
													control="select"
													type="text"
													label="service connection"
													name={`serviceConnection.configuration`}
													options={formSelectOptions.serviceConnectionEntryOptions}
												/>
											</div>
										</div>
									</FormSection> */}

									{/* keypad */}
									<FormSection
										sectionData={{
											sectionName: "keypad",
											formik: formik,
										}}
										active={active}
										setActive={setActive}
									>
										<div className="form-row-wrapper">
											<div className="row-5 form-row">
												<div className="row-50-50">
													{/* <FormikControl
														control="select"
														type="text"
														label="keypad access?"
														name={`astData.meter.keypad.keypadAccess`}
														options={formSelectOptions.yesNoOptions}
													/> */}
													<FormikControl
														control="input"
														type="text"
														label="serial no"
														name={`astData.meter.keypad.serialNo`}
													/>
												</div>
												<div>
													{/* <FormikControl
														control="select"
														type="text"
														label="comments / no access reasons"
														name={`astData.meter.keypad.comment`}
														options={formSelectOptions.keyPadNoAccessOptions}
													/> */}
												</div>
											</div>
											<div className="row-5 form-row">
												<FormikControl
													control="mediaButton"
													type="button"
													label="keypad media"
													name={`astData.media.keypad`}
												/>
											</div>
										</div>
									</FormSection>

									{/* cb */}
									<FormSection
										sectionData={{
											sectionName: "cb",
											formik: formik,
										}}
										active={active}
										setActive={setActive}
									>
										<div className="form-row-wrapper">
											<div className="row-6 form-row">
												<div className="row-50-50">
													{/* <FormikControl
														control="select"
														type="text"
														label="is there a cb?"
														name={`astData.meter.cb.isThereCb`}
														options={formSelectOptions.yesNoOptions}
													/> */}
													<FormikControl
														control="input"
														type="number"
														label="size (Amps)"
														name={`astData.meter.cb.size`}
													/>
												</div>
												{/* <FormikControl
													control="select"
													type="text"
													label="cb comment"
													name={`astData.meter.cb.comment`}
													options={formSelectOptions.cbCommentsOptions}
												/> */}
											</div>
											<div className="row-7 form-row">
												<div>
													<FormikControl
														control="mediaButton"
														type="button"
														label="cb media"
														name={`astData.media.cb`}
													/>
												</div>
											</div>
										</div>
									</FormSection>

									{/* seal */}
									<FormSection
										sectionData={{
											sectionName: "seal",
											formik: formik,
										}}
										active={active}
										setActive={setActive}
									>
										<div className="form-row-wrapper">
											<div className="row-8 form-row">
												<div className="row-50-50">
													{/* <FormikControl
														control="select"
														type="text"
														label="meter sealed?"
														name={`astData.meter.seal.meterSealed`}
														options={formSelectOptions.yesNoOptions}
													/> */}
													<FormikControl
														control="input"
														type="text"
														label="seal no"
														name={`astData.meter.seal.sealNo`}
													/>
												</div>
												{/* <FormikControl
													control="select"
													type="text"
													label="seal comment"
													name={`astData.meter.seal.comment`}
													options={formSelectOptions.sealCommentOptions}
												/> */}
											</div>
											<div className="row-9 form-row">
												<div>
													<FormikControl
														control="mediaButton"
														type="button"
														label="seal media"
														name={`astData.media.seal`}
														ml1="asts"
													/>
												</div>
											</div>
										</div>
									</FormSection>

									{/* erf */}
									<FormSection
										sectionData={{
											sectionName: "erf",
											formik: formik,
										}}
										active={active}
										setActive={setActive}
										hideShow="hide"
									>
										<div className="form-row-wrapper">
											<div className="row-8 form-row">
												<FormikControl
													control="input"
													type="text"
													label="erf no"
													name={`erf.erfNo`}
													readOnly={true}
												/>
												<FormikControl
													control="input"
													type="text"
													label="erf id"
													name={`erf.erfId`}
													readOnly={true}
												/>
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
export default FormMeterEdit;
