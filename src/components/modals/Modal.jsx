import { Suspense, lazy, useContext } from "react";
import { BrowserRouter } from "react-router-dom";

import "@/components/modals/Modal.css";

import { loader } from "@/utils/utils";
import { ModalContext } from "@/contexts/ModalContext";
import FormTid from "@/components/forms/formTrn/tid/FormTid";
import FormMeterInstallation from "@/components/forms/formTrn/installation/FormMeterInstallation";
import FormMeterDecommission from "../forms/formTrn/decommission/FormMeterDecommission";
import FormMeterDisconnection from "../forms/formTrn/disconnection/FormMeterDisconnection";
import FormMeterReconnection from "../forms/formTrn/reconnection/FormMeterReconnection";
import FormMeterInspection from "../forms/formTrn/inspection/FormMeterInspection";
import FormMeterEdit from "../forms/formMeter/FormMeterEdit";

const MediaMobileAsts = lazy(() =>
	import("@/components/media/MediaMobileAsts")
);
const ShowAstOnMap = lazy(() =>
	import("@/components/irepsInfoWindow/ShowAstOnMap")
);
const IwPossibleAstTrnsOnAst = lazy(() =>
	import("@/components/irepsInfoWindow/IwPossibleAstTrnsOnAst")
);
const IwTrnsOnAst = lazy(() =>
	import("@/components/irepsInfoWindow/IwTrnsOnAst")
);
const ShowOnMap = lazy(() => import("@/components/irepsInfoWindow/ShowOnMap"));
const FormMeterAudit = lazy(() =>
	import("@/components/forms/formTrn/audit/FormMeterAudit")
);
const FormCheckin = lazy(() =>
	import("@/components/forms/formTrn/checkin/FormCheckin")
);
const IwPossibleAstTrnsOnErf = lazy(() =>
	import("@/components/irepsInfoWindow/IwPossibleAstTrnsOnErf")
);
const MediaMobileErfs = lazy(() =>
	import("@/components/media/MediaMobileErfs")
);
const Signout = lazy(() => import("@/components/forms/auth/FormSignout"));
const Signup = lazy(() => import("@/components/forms/auth/FormSignup"));
const UpdateUser = lazy(() => import("@/components/forms/auth/FormUpdateUser"));
const EditUserEmail = lazy(() =>
	import("@/components/forms/auth/FormEditUserEmail")
);
const EditUserWorkbase = lazy(() =>
	import("@/components/forms/auth/FormEditUserWorkbase")
);
const FormPhoneNoAuth = lazy(() =>
	import("@/components/forms/auth/FormPhoneNoAuth")
);
const FormPasswordReset = lazy(() =>
	import("@/components/forms/auth/FormPasswordReset")
);
const FormUserRoleUpdate = lazy(() =>
	import("@/components/forms/auth/FormUserRoleUpdate")
);
const FormServiceProvider = lazy(() =>
	import("@/components/forms/formServiceProvider/FormServiceProvider")
);
const ServiceProviderData = lazy(() =>
	import("@/components/irepsInfoWindow/ServiceProviderData")
);

const FormErfsSearch = lazy(() =>
	import("@/components/forms/formErf/FormErfsSearch")
);
const FormErf = lazy(() => import("@/components/forms/formErf/FormErf"));
const IwErfOnMap = lazy(() =>
	import("@/components/irepsInfoWindow/IwErfOnMap")
);
const IwAstsOnErf = lazy(() =>
	import("@/components/irepsInfoWindow/IwAstsOnErf")
);
const IwHistory = lazy(() => import("@/components/irepsInfoWindow/IwHistory"));
const IwMeterReport = lazy(() => import("@/components/irepsInfoWindow/IwMeterReport"));
const Signin = lazy(() => import("@/components/forms/auth/FormSignin"));
const IwMedia = lazy(() => import("@/components/irepsInfoWindow/IwMedia"));
const FormWorkbases = lazy(() =>
	import("@/components/forms/auth/FormWorkbases")
);

const Modal = () => {
	const { toOpen, modalOpened } = useContext(ModalContext);
	// console.log(`modalOpened`, modalOpened);
	// console.log(`toOpen`, toOpen);

	const { modalName, payload } = toOpen;
	// console.log(`modalName`, modalName);
	// console.log(`payload`, payload);

	return (
		<BrowserRouter>
			<div className={`modal-container ${modalOpened ? "show" : "hide"}`}>
				<div className="modal-background" id="modal-background">
					<div className="modal-payload">
						{/* auth forms */}
						{modalName === "signin" && (
							<>
								<Suspense fallback={loader}>
									<Signin />
								</Suspense>
							</>
						)}
						{modalName === "signout" && (
							<>
								<Suspense fallback={loader}>
									<Signout />
								</Suspense>
							</>
						)}
						{modalName === "signup" && (
							<>
								<Suspense fallback={loader}>
									<Signup />
								</Suspense>
							</>
						)}
						{modalName === "passwordReset" && (
							<>
								<Suspense fallback={loader}>
									<FormPasswordReset />
								</Suspense>
							</>
						)}
						{modalName === "updateUser" && (
							<>
								<Suspense fallback={loader}>
									<UpdateUser formData={payload} />
								</Suspense>
							</>
						)}
						{modalName === "editUserEmail" && (
							<>
								<Suspense fallback={loader}>
									<EditUserEmail formData={payload} />
								</Suspense>
							</>
						)}
						{modalName === "editUserWorkbase" && (
							<>
								<Suspense fallback={loader}>
									<EditUserWorkbase formData={payload} />
								</Suspense>
							</>
						)}
						{modalName === "editUserRoles" && (
							<>
								<Suspense fallback={loader}>
									<FormUserRoleUpdate formData={payload} />
								</Suspense>
							</>
						)}
						{modalName === "editUserPhoneNumber" && (
							<>
								<Suspense fallback={loader}>
									<FormPhoneNoAuth formData={payload} />
								</Suspense>
							</>
						)}

						{modalName === "serviceProvider" && (
							<>
								<Suspense fallback={loader}>
									<FormServiceProvider formData={payload} />
								</Suspense>
							</>
						)}
						{modalName === "serviceProviderData" && (
							<>
								<Suspense fallback={loader}>
									<ServiceProviderData data={payload} />
								</Suspense>
							</>
						)}

						{modalName === "erf" && (
							<>
								<Suspense fallback={loader}>
									<FormErf data={payload} />
								</Suspense>
							</>
						)}
						{modalName === "erfOnMap" && (
							<>
								<Suspense fallback={loader}>
									<IwErfOnMap data={payload} />
								</Suspense>
							</>
						)}
						{modalName === "astsOnErf" && (
							<>
								<Suspense fallback={loader}>
									<IwAstsOnErf data={payload} />
								</Suspense>
							</>
						)}
						{modalName === "media" && (
							<>
								<Suspense fallback={loader}>
									<IwMedia data={payload} />
								</Suspense>
							</>
						)}
						{modalName === "mediaMobileErfs" && (
							<>
								<Suspense fallback={loader}>
									<MediaMobileErfs data={payload} />
								</Suspense>
							</>
						)}
						{modalName === "mediaMobileAsts" && (
							<>
								<Suspense fallback={loader}>
									<MediaMobileAsts data={payload} />
								</Suspense>
							</>
						)}
						{modalName === "erfsSearch" && (
							<>
								<Suspense fallback={loader}>
									<FormErfsSearch />
								</Suspense>
							</>
						)}
						{modalName === "possibleAstTrnsOnErf" && (
							<>
								<Suspense fallback={loader}>
									<IwPossibleAstTrnsOnErf data={payload} />
								</Suspense>
							</>
						)}
						{modalName === "iwPossibleAstTrnsOnAst" && (
							<>
								<Suspense fallback={loader}>
									<IwPossibleAstTrnsOnAst data={payload} />
								</Suspense>
							</>
						)}
						{modalName === "iwShowOnMap" && (
							<>
								<Suspense fallback={loader}>
									<ShowOnMap data={payload} />
								</Suspense>
							</>
						)}
						{modalName === "showAstOnMap" && (
							<>
								<Suspense fallback={loader}>
									<ShowAstOnMap data={payload} />
								</Suspense>
							</>
						)}
						{modalName === "iwTrnsOnAst" && (
							<>
								<Suspense fallback={loader}>
									<IwTrnsOnAst data={payload} />
								</Suspense>
							</>
						)}
						{modalName === "iwHistory" && (
							<>
								<Suspense fallback={loader}>
									<IwHistory data={payload} />
								</Suspense>
							</>
						)}
						{/* trns */}
						{modalName === "meter-audit" && (
							<>
								<Suspense fallback={loader}>
									<FormMeterAudit data={payload} />
								</Suspense>
							</>
						)}
						{modalName === "meter-tid" && (
							<>
								<Suspense fallback={loader}>
									<FormTid data={payload} />
								</Suspense>
							</>
						)}
						{modalName === "meter-installation" && (
							<>
								<Suspense fallback={loader}>
									<FormMeterInstallation data={payload} />
								</Suspense>
							</>
						)}
						{modalName === "meter-decommission" && (
							<>
								<Suspense fallback={loader}>
									<FormMeterDecommission data={payload} />
								</Suspense>
							</>
						)}
						{modalName === "meter-disconnection" && (
							<>
								<Suspense fallback={loader}>
									<FormMeterDisconnection data={payload} />
								</Suspense>
							</>
						)}
						{modalName === "meter-reconnection" && (
							<>
								<Suspense fallback={loader}>
									<FormMeterReconnection data={payload} />
								</Suspense>
							</>
						)}
						{modalName === "meter-inspection" && (
							<>
								<Suspense fallback={loader}>
									<FormMeterInspection data={payload} />
								</Suspense>
							</>
						)}
						{/* edits */}
						{modalName === "meterEdit" && (
							<>
								<Suspense fallback={loader}>
									<FormMeterEdit data={payload} />
								</Suspense>
							</>
						)}
						{/* edits */}
						{modalName === "checkin" && (
							<>
								<Suspense fallback={loader}>
									<FormCheckin data={payload} />
								</Suspense>
							</>
						)}
						{/* workbases */}
						{modalName === "workbases" && (
							<>
								<Suspense fallback={loader}>
									<FormWorkbases data={payload} />
								</Suspense>
							</>
						)}
						{/* meterReport */}
						{modalName === "meterReport" && (
							<>
								<Suspense fallback={loader}>
									<IwMeterReport data={payload} />
								</Suspense>
							</>
						)}
					</div>
				</div>
			</div>
		</BrowserRouter>
	);
};

export default Modal;
