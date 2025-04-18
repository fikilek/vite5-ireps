import {
	Route,
	RouterProvider,
	createBrowserRouter,
	createRoutesFromElements,
} from "react-router-dom";
import "@/App.css";

// import pages
import Home from "@/pages/home/Home";
import { ErrorBoundary } from "react-error-boundary";
import * as Sentry from "@sentry/react";

// import Erfs from "@/pages/erfs/Erfs";
// import Trns from "@/pages/trns/Trns";
// import Asts from "@/pages/asts/Asts";

// import tables
import TableTrnStates from "@/components/tables/TableTrnStates";
import TableAstStates from "@/components/tables/TableAstStates";

// Layouts
import RootLayout from "@/components/layouts/RootLayout";

// others
import NoPageFound from "@/pages/error/NoPageFound";
import Modal from "@/components/modals/Modal";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import RequireAuth from "@/components/forms/auth/RequireAuth";
import { loader } from "@/utils/utils";
import { Suspense, lazy } from "react";
import FormSignin from "@/components/forms/auth/FormSignin";

// Context providers
import ModalContextProvider from "@/contexts/ModalContext";
import AuthContextProvider from "@/contexts/AuthContextProvider";
import ClaimsContextProvider from "@/contexts/ClaimsContext";
import NotAuthenticated from "@/components/forms/auth/NotAuthenticated";
import { AreaTreeContextProvider } from "@/contexts/AreaTreeContext";
// import { QueryClient, QueryClientProvider } from "react-query";
import { ErfsContextProvider } from "@/contexts/ErfsContext";
// import PhotoAppContextProvider from "@/contexts/MediaContext";
import ReverseGeocodingContextProvider from "@/contexts/ReverseGeocodingContext";
import MediaContextProvider from "@/contexts/MediaContext";
import { AnomalyContextProvider } from "@/contexts/AnomalyContext";
import { TrnsContextProvider } from "@/contexts/TrnsContext";
import { AstsContextProvider } from "@/contexts/AstsContext";
import GeocodingContextProvider from "@/contexts/GeocodingContext";
// import TrnsLayout from "@/components/layouts/TrnsLayout";
import { ErfsMapContextProvider } from "./contexts/ErfsMapContext";
import { GmrContextProvider } from "./contexts/GmrContext";
import { FiltersContextProvider } from "@/contexts/FiltersContext";
import { TrnsStatsContextProvider } from "@/contexts/TrnsStatsContext";
import { AstsStatsContextProvider } from "@/contexts/AstsStatsContext";

let release = "release-ireps@0.0.1";

export class ValidationError extends Error {
	constructor(message) {
		super(message);
		this.name = `Validation Error: "${message}" from ${release} `;
	}
}

// sentry
Sentry.init({
	dsn: "https://a51c8a26b70b177749fc9ed307b86720@o4509021462003712.ingest.us.sentry.io/4509021470654464",
	integrations: [
		Sentry.browserTracingIntegration(),
		// Sentry.replayIntegration(),
	],
	release: release,
	// debug: true,
	// Set tracesSampleRate to 1.0 to capture 100%
	// of transactions for performance monitoring.
	// Learn more at
	// https://docs.sentry.io/platforms/javascript/configuration/options/#traces-sample-rate
	tracesSampleRate: 1.0,
	// Capture Replay for 10% of all sessions,
	// plus for 100% of sessions with an error
	// Learn more at
	// https://docs.sentry.io/platforms/javascript/session-replay/configuration/#general-integration-configuration
	replaysSessionSampleRate: 0.1,
	replaysOnErrorSampleRate: 1.0,
	// ${<Include name="code-comments/javascript/trace-sample-rate" />}
});

// Lazy loading
const Erfs = lazy(() => import("@/pages/erfs/Erfs.jsx"));
const Trns = lazy(() => import("@/pages/trns/Trns.jsx"));
const Asts = lazy(() => import("@/pages/asts/Asts.jsx"));
const Map = lazy(() => import("@/pages/map/Map.jsx"));
const MapTest = lazy(() => import("@/pages/map/MapTest.jsx"));

const AdminLayout = lazy(() => import("@/components/layouts/AdminLayout"));
const SystemTablesLayout = lazy(() =>
	import("@/components/layouts/SystemTablesLayout")
);
const AdministrativeAreas = lazy(() =>
	import("@/pages/administrativeAreas/AdministrativeAreas")
);
const ServiceProviders = lazy(() =>
	import("@/pages/serviceProviders/ServiceProviders")
);
const UserProfile = lazy(() => import("@/pages/user/UserProfile"));
const Users = lazy(() => import("@/pages/users/Users"));

const router = createBrowserRouter(
	createRoutesFromElements(
		<Route path="/" element={<RootLayout />}>
			<Route index element={<Home />} />

			{/* Ers */}
			<Route
				path="erfs"
				element={
					<Suspense fallback={loader}>
						<RequireAuth
							allowedRoles={[
								"guest",
								"fieldworker",
								"supervisor",
								"manager",
								"superuser",
							]}
						>
							<Erfs />
						</RequireAuth>
					</Suspense>
				}
			/>

			{/* Trns */}
			<Route
				path="trns"
				element={
					<Suspense fallback={loader}>
						<RequireAuth
							allowedRoles={[
								"guest",
								"fieldworker",
								"supervisor",
								"manager",
								"superuser",
							]}
						>
							<Trns trnType="all" astCat="meter" />
						</RequireAuth>
					</Suspense>
				}
			>
				<Route
					path="all"
					element={
						<Suspense fallback={loader}>
							<RequireAuth
								allowedRoles={[
									"guest",
									"fieldworker",
									"supervisor",
									"manager",
									"superuser",
								]}
							>
								{/* astCat - 'meter', 'cb', 'seal', etc */}
								{/* trnType = 'audit', 'tid', 'installation', etc  */}
								<Trns astCat={"all"} trnType={"all"} key={"all"} />
							</RequireAuth>
						</Suspense>
					}
				/>

				<Route
					path="audits"
					element={
						<Suspense fallback={loader}>
							<RequireAuth
								allowedRoles={[
									"guest",
									"fieldworker",
									"supervisor",
									"manager",
									"superuser",
								]}
							>
								<Trns astCat={"meter"} trnType={"audit"} key={"audit"} />
							</RequireAuth>
						</Suspense>
					}
				/>
				<Route
					path="tid"
					element={
						<Suspense fallback={loader}>
							<RequireAuth
								allowedRoles={[
									"guest",
									"fieldworker",
									"supervisor",
									"manager",
									"superuser",
								]}
							>
								<Trns astCat={"meter"} trnType={"tid"} key={"tid"} />
							</RequireAuth>
						</Suspense>
					}
				/>
				<Route
					path="installations"
					element={
						<Suspense fallback={loader}>
							<RequireAuth
								allowedRoles={[
									"guest",
									"fieldworker",
									"supervisor",
									"manager",
									"superuser",
								]}
							>
								<Trns
									astCat={"meter"}
									trnType={"installation"}
									key={"installation"}
								/>
							</RequireAuth>
						</Suspense>
					}
				/>
				<Route
					path="inspections"
					element={
						<Suspense fallback={loader}>
							<RequireAuth
								allowedRoles={[
									"guest",
									"fieldworker",
									"supervisor",
									"manager",
									"superuser",
								]}
							>
								<Trns
									astCat={"meter"}
									trnType={"inspection"}
									key={"inspection"}
								/>
							</RequireAuth>
						</Suspense>
					}
				/>
				<Route
					path="decomissionings"
					element={
						<Suspense fallback={loader}>
							<RequireAuth
								allowedRoles={[
									"guest",
									"fieldworker",
									"supervisor",
									"manager",
									"superuser",
								]}
							>
								<Trns astCat={"meter"} trnType={"decomissionings"} />
							</RequireAuth>
						</Suspense>
					}
				/>
				<Route
					path="disconnections"
					element={
						<Suspense fallback={loader}>
							<RequireAuth
								allowedRoles={[
									"guest",
									"fieldworker",
									"supervisor",
									"manager",
									"superuser",
								]}
							>
								<Trns astCat={"meter"} trnType={"disconnections"} />
							</RequireAuth>
						</Suspense>
					}
				/>
				<Route
					path="reconnections"
					element={
						<Suspense fallback={loader}>
							<RequireAuth
								allowedRoles={[
									"guest",
									"fieldworker",
									"supervisor",
									"manager",
									"superuser",
								]}
							>
								<Trns astCat={"meter"} trnType={"reconnections"} />
							</RequireAuth>
						</Suspense>
					}
				/>
			</Route>

			{/* Asts */}
			<Route
				path="asts"
				element={
					<Suspense fallback={loader}>
						<RequireAuth
							allowedRoles={[
								"guest",
								"fieldworker",
								"supervisor",
								"manager",
								"superuser",
							]}
						>
							<Asts />
						</RequireAuth>
					</Suspense>
				}
			/>

			{/* Map */}
			<Route
				path="map"
				element={
					<Suspense fallback={loader}>
						<RequireAuth
							allowedRoles={[
								"guest",
								"fieldworker",
								"supervisor",
								"manager",
								"superuser",
							]}
						>
							<Map />
						</RequireAuth>
					</Suspense>
				}
			/>

			{/* MapTest */}
			{/* <Route
				path="mapTest"
				element={
					<Suspense fallback={loader}>
						<RequireAuth allowedRoles={["superuser"]}>
							<MapTest />
						</RequireAuth>
					</Suspense>
				}
			/> */}

			{/* Admin */}
			<Route
				path="admin"
				element={
					<Suspense fallback={loader}>
						<RequireAuth
							allowedRoles={[
								"guest",
								"fieldworker",
								"supervisor",
								"manager",
								"superuser",
							]}
						>
							<AdminLayout />
						</RequireAuth>
					</Suspense>
				}
			>
				<Route
					path="users"
					element={
						<Suspense fallback={loader}>
							<RequireAuth
								allowedRoles={[
									"guest",
									"fieldworker",
									"supervisor",
									"manager",
									"superuser",
								]}
							>
								<Users />
							</RequireAuth>
						</Suspense>
					}
				/>
				<Route
					path="systemTables"
					element={
						<Suspense fallback={loader}>
							<RequireAuth allowedRoles={["superuser"]}>
								<SystemTablesLayout />
							</RequireAuth>
						</Suspense>
					}
				>
					<Route
						path="astStates"
						element={
							<RequireAuth allowedRoles={["superuser"]}>
								<TableAstStates />
							</RequireAuth>
						}
					/>

					<Route
						path="trnStates"
						element={
							<RequireAuth allowedRoles={["superuser"]}>
								<TableTrnStates />
							</RequireAuth>
						}
					/>
				</Route>
				<Route
					path="administrativeAreas"
					element={
						<Suspense fallback={loader}>
							<RequireAuth
								allowedRoles={[
									"guest",
									"fieldworker",
									"supervisor",
									"manager",
									"superuser",
								]}
							>
								<AdministrativeAreas />
							</RequireAuth>
						</Suspense>
					}
				></Route>{" "}
				<Route
					path="serviceProviders"
					element={
						<Suspense fallback={loader}>
							<RequireAuth
								allowedRoles={["supervisor", "manager", "superuser"]}
							>
								<ServiceProviders />
							</RequireAuth>
						</Suspense>
					}
				></Route>
			</Route>

			{/* User */}
			<Route
				path="user"
				element={
					// TODO: bug: upon signup, the user does not have roles updated until refresh. Roles should update immediately
					// <ErrorBoundary fallback={<div>Something went wrong</div>}>
					<Suspense fallback={loader}>
						<RequireAuth
						// allowedRoles={[
						// 	"guest",
						// 	"fieldworker",
						// 	"supervisor",
						// 	"manager",
						// 	"superuser",
						// ]}
						>
							<UserProfile />
						</RequireAuth>
					</Suspense>
					// </ErrorBoundary>
				}
			/>

			{/* unauthorized section -----------------------------------------------------*/}
			{/* path to unauthorized  */}

			<Route path="/unauthorised" element={<NotAuthenticated />} />

			<Route path="/signin" element={<FormSignin />} />

			<Route path="*" element={<NoPageFound />} />
		</Route>
	)
);

function App() {
	return (
		// <ErrorBoundary fallback={<div>Something went wrong</div>}>
		<TrnsStatsContextProvider>
			<AstsStatsContextProvider>
				<FiltersContextProvider>
					<GmrContextProvider>
						<ErfsMapContextProvider>
							<ReverseGeocodingContextProvider>
								<GeocodingContextProvider>
									<AstsContextProvider>
										<TrnsContextProvider>
											<AnomalyContextProvider>
												<MediaContextProvider>
													<ReverseGeocodingContextProvider>
														<ErfsContextProvider>
															{/* <QueryClientProvider client={queryClient}> */}
															<AreaTreeContextProvider>
																<ClaimsContextProvider>
																	<AuthContextProvider>
																		<ModalContextProvider>
																			<div className="App">
																				<RouterProvider router={router} />
																				<ToastContainer />
																			</div>
																			<Modal />
																		</ModalContextProvider>
																	</AuthContextProvider>
																</ClaimsContextProvider>
															</AreaTreeContextProvider>
															{/* </QueryClientProvider> */}
														</ErfsContextProvider>
													</ReverseGeocodingContextProvider>
												</MediaContextProvider>
											</AnomalyContextProvider>
										</TrnsContextProvider>
									</AstsContextProvider>
								</GeocodingContextProvider>
							</ReverseGeocodingContextProvider>
						</ErfsMapContextProvider>
					</GmrContextProvider>
				</FiltersContextProvider>
			</AstsStatsContextProvider>
		</TrnsStatsContextProvider>
		// </ErrorBoundary>
	);
}

export default App;
