import { useState, useEffect } from "react";
import { Formik, Form } from "formik";
import { useCallback } from "react";
import { toast } from "react-toastify";

// css
import "@/components/forms/formTrn/audit/FormMeterAudit.css";

// custom hooks
import { useFirestore } from "@/hooks/useFirestore.jsx";
import useModal from "@/hooks/useModal.jsx";
// import { useTrns } from "@/hooks/useTrns";

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

const FormMeterInspection = (props) => {
	// console.log(`props`, props);

	const { data, validationSchema } = props?.data;
	// console.log(`data`, data);
	// console.log(`validationSchema`, validationSchema);

	const { erfNo } = data.erf;

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
			console.log(`values`, values);
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
			// deleteItem(key);
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

	return data ? (
		<div className="form-wrapper">
			<div className="form-container trn form-meter-audit">
				<Formik
					initialValues={{
						...data,
						inspectionData: {
							isMeterStillThere: "",
							tempered: "",
							newMeter: "",
						},
					}}
					onSubmit={onSubmit}
					validationSchema={validationSchema}
					validateOnMount={true}
				>
					{(formik) => {
						// const disabled = !(formik.isValid && formik.dirty);
						// console.log(`formik.errors`, formik.errors);
						// console.log(`formik.isValid`, formik.isValid);
						// console.log(`formik`, formik);
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
										hl1={
											<span>
												<span className="text-emphasis2">Inspection</span>
											</span>
										}
										hl2={
											<span>
												Erf:<span className="text-emphasis2">{erfNo}</span>
											</span>
										}
										hl3={
											<span className="text-emphasis2">
												{trnState || "draft"}
											</span>
										}
										hr1={
											<span>
												Mn:
												<span className="text-emphasis2">
													{formik.values.astData.astNo}
												</span>
											</span>
										}
									>
										<FormCloseBtn />
									</HeaderGeneric>

									{/* Existing Meter Data */}

									<FormSection
										sectionData={{
											sectionName: "existingMeter",
											formik: formik,
										}}
										active={active}
										setActive={setActive}
									>
										<div className="existing-meter-data">
											<div className="row-0 form-row">
												<div className="row-50-50">
													<FormikControl
														control="input"
														type="text"
														label="meter phase?"
														name={`astData.meter.phase`}
														readOnly={true}
													/>
													<FormikControl
														control="input"
														type="text"
														label="meter type?"
														name={`astData.meter.type`}
														readOnly={true}
													/>
												</div>
												<div className="row-50-50">
													<FormikControl
														control="input"
														type="text"
														label="manufacturer"
														name={`astData.astManufacturer`}
														readOnly={true}
													/>
													<FormikControl
														control="input"
														type="text"
														label="product name"
														name={`astData.astName`}
														readOnly={true}
													/>
												</div>
											</div>
										</div>
									</FormSection>

									{/* access */}
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
												<div className="row-50-50">
													<FormikControl
														control="selectMeterAccess"
														type="text"
														label="meter access?"
														name={`access.meterAccess`}
														options={formSelectOptions.yesNoOptions}
													/>
													<FormikControl
														control="selectNoAccessReason"
														type="text"
														label="no access reasons"
														name={`access.noAccessReason ${showHide}`}
														options={formSelectOptions.keyPadNoAccessOptions}
													/>
												</div>
												<div className="row-50-50">
													<FormikControl
														control="mediaButton"
														type="button"
														label="no access media"
														name={`astData.media.noAccess`}
														ml1="asts"
														mediaCat="noAccess"
													/>
												</div>
											</div>
										</div>
									</FormSection>

									{/* inspection data */}
									<FormSection
										sectionData={{
											sectionName: "inspectionData",
											formik: formik,
										}}
										active={active}
										setActive={setActive}
									>
										<div className="form-row-wrapper">
											<div className="row-1 form-row">
												<div className="row-50-50">
													<FormikControl
														control="select"
														type="text"
														label="newMeter(s)?"
														name={`inspectionData.newMeter`}
														options={formSelectOptions.yesNoOptions}
													/>
												</div>
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

											<div className="row-3 form-row">
												<div className="row-50-50">
													<FormikControl
														control="select"
														type="text"
														label="premises?"
														name={`location.premises`}
														options={
															formSelectOptions.astLocationPremisesOptions
														}
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
											</div>
										</div>
									</FormSection>

									{/* anomalies */}
									<FormSection
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
									</FormSection>

									{/* service connection */}
									<FormSection
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
													options={
														formSelectOptions.serviceConnectionEntryOptions
													}
												/>
											</div>
										</div>
									</FormSection>

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
													<FormikControl
														control="select"
														type="text"
														label="keypad access?"
														name={`astData.meter.keypad.keypadAccess`}
														options={formSelectOptions.yesNoOptions}
													/>
													<FormikControl
														control="input"
														type="text"
														label="serial no"
														name={`astData.meter.keypad.serialNo`}
													/>
												</div>
												<div>
													<FormikControl
														control="select"
														type="text"
														label="comments / no access reasons"
														name={`astData.meter.keypad.comment`}
														options={formSelectOptions.keyPadNoAccessOptions}
													/>
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
													<FormikControl
														control="select"
														type="text"
														label="is there cb?"
														name={`astData.meter.cb.isThereCb`}
														options={formSelectOptions.yesNoOptions}
													/>
													<FormikControl
														control="input"
														type="number"
														label="size (Amps)"
														name={`astData.meter.cb.size`}
													/>
												</div>
												<FormikControl
													control="select"
													type="text"
													label="cb comment"
													name={`astData.meter.cb.comment`}
													options={formSelectOptions.cbCommentsOptions}
												/>
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
													<FormikControl
														control="select"
														type="text"
														label="meter sealed?"
														name={`astData.meter.seal.meterSealed`}
														options={formSelectOptions.yesNoOptions}
													/>
													<FormikControl
														control="input"
														type="text"
														label="seal no"
														name={`astData.meter.seal.sealNo`}
													/>
												</div>
												<FormikControl
													control="select"
													type="text"
													label="seal comment"
													name={`astData.meter.seal.comment`}
													options={formSelectOptions.sealCommentOptions}
												/>
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
export default FormMeterInspection;
