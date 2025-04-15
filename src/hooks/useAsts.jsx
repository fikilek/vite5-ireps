import { useContext } from "react";
import { Timestamp } from "firebase/firestore";
import { IconContext } from "react-icons";
import { FaMapMarkedAlt } from "react-icons/fa";
import { format } from "date-fns";

// hooks
import useGetAstsCollection from "@/hooks/useGetAstsCollection";
// import useGetAstsReports from "./useGetAstsReports";

// contexts
import { AstsContext } from "@/contexts/AstsContext.jsx";

// components
import TableDate from "@/components/tables/TableDate";
import TableModalBtn from "@/components/tables/TableModalBtn";
import TableDeleteAstBtn from "@/components/tables/TableDeleteAstBtn";
import TableBtnsPossibleTrnsOnAst from "@/components/tables/TableBtnsPossibleTrnsOnAst";

const getUrl = (mediaArray, astCat) => {
	// console.log(`mediaArray`, mediaArray);

	const mediaCat = mediaArray?.find((media) => media?.mediaCategory === astCat);
	// console.log(`mediaCat`, mediaCat);
	// console.log(`astCat`, astCat);

	const url = mediaCat?.url;
	// console.log(`url`, url);
	return url;
};

export const useAsts = () => {
	const { astsContext, setAstsContext } = useContext(AstsContext);

	const { error } = useGetAstsCollection("asts");
	// console.log(`asts`, asts);
	// console.log(`error`, error);

	const createExportRowData = (rowData) => {
		// console.log(`rowData`, rowData);
		if (rowData?.length < 1) return;

		const newRowData =
			rowData &&
			rowData?.map((row) => {
				const media = row?.media;
				// console.log(`media`, media);

				const createdAt = row.metadata.createdAtDatetime;
				// console.log(`createdAt`, createdAt);
				const cTimestamp = new Timestamp(
					createdAt?.seconds,
					createdAt?.nanoseconds
				);
				const newCreatedAt = cTimestamp?.toDate();

				const updatedAt = row.metadata.updatedAtDatetime;
				const uTimestamp = new Timestamp(
					updatedAt?.seconds,
					updatedAt?.nanoseconds
				);
				const newUpdatedAt = uTimestamp?.toDate();

				const newRow = {
					id: row.id,
					// metadata
					"Created By": row.metadata.createdByUser,
					"Created At": format(newCreatedAt, "yy-MM-dd HH:mm"),
					"Last Updated By": row.metadata.updatedByUser,
					"Last Updated At Datetime": format(newUpdatedAt, "yy-MM-dd HH:mm"),

					"Meter No": row?.astData?.astNo,
					"Meter No picture": getUrl(media, "astNo"),

					"Meter Manufacturer": row?.astData?.astManufacturer,
					"Meter Name": row?.astData?.astName,
					"Meter Type": row?.astData?.meter?.type,
					"Meter Phase": row?.astData?.meter?.phase,

					"CB Size": row?.astData?.meter?.cb?.size,
					"CB picture": getUrl(media, "cb"),
					"CB Comment": row?.astData?.meter?.cb?.comment,

					"Seal Number": row?.astData?.meter?.seal?.sealNo,
					"Seal Number picture": getUrl(media, "seal"),
					"Seal Comment": row?.astData?.meter?.seal?.comment,

					Anomaly: row?.anomalies?.anomaly,
					"Anomaly picture": getUrl(media, "anomaly"),
					"Anomaly Detail": row?.anomalies?.anomalyDetail,

					"Ward No": row?.erf?.address?.ward,
					"Erf No": row?.erf?.erfNo,
					"Street Adr": row?.erf?.street,

					"Meter Location lat": row?.erf?.address?.gps?.latitude,
					"Meter Location lng": row?.erf?.address?.gps?.longitude,

					"Property Type": row?.erf?.propertyType?.type,
					"Unit Name": row?.erf?.propertyType?.unitName,
					"Unit No": row?.erf?.propertyType?.unitNo,

					"Meter Placement": row?.location?.placement,
					"Meter Placement picture": getUrl(media, "insideBox"),

					"Meter Address": row?.location?.address,
					"Service Connection Status": row?.serviceConnection?.configuration,

					"Off Grid Supply": row?.serviceConnection?.offGridSupply,
					"Off Grid picture": getUrl(media, "offGridPhoto"),

					"TID Status": row?.tidStatus?.status,
					"TID Status picture": getUrl(media, "tidStatus"),
				};

				// console.log(`newRow`, newRow);
				return newRow;
			});
		return newRowData;
	};

	const astsTableFields = [
		// ast id
		{
			field: "id",
			headerName: "System Id",
			width: 200,
			hide: true,
		},

		// ast created
		{
			headerName: "Created",
			children: [
				{
					field: "metadata.createdByUser",
					columnGroupShow: "open",
					headerName: "Created By",
					width: 150,
					hide: false,
				},
				{
					field: "metadata.createdByUser",
					columnGroupShow: "closed",
					headerName: "Created By",
					width: 150,
					hide: false,
					// filterParams: {
					// 	buttons: ["apply", "clear", "cancel", "reset"],
					// },
				},
				{
					field: "metadata.createdAtDatetime",
					columnGroupShow: "open",
					headerName: "Date Created",
					width: 160,
					cellRenderer: (params) => {
						const timestamp = new Timestamp(
							params?.value?.seconds,
							params?.value?.nanoseconds
						);
						const newDate = timestamp?.toDate();
						return (
							<TableDate date={newDate} dateFormat={"yyyy-MMM-dd HH:mm"} />
						);
					},
					valueGetter: (params) => {
						return params.data?.metadata?.createdAtDatetime;
					},
					hide: false,
				},
			],
		},
		// ast updated
		{
			headerName: "Last Updated",
			children: [
				{
					field: "metadata.updatedByUser",
					columnGroupShow: "open",
					headerName: "Updated By",
					width: 150,
					hide: false,
				},
				{
					field: "metadata.updatedByUser",
					columnGroupShow: "closed",
					headerName: "Updated By",
					width: 150,
					hide: false,
					// filterParams: {
					// 	buttons: ["apply", "clear", "cancel", "reset"],
					// },
				},
				{
					field: "metadata.updatedAtDatetime",
					columnGroupShow: "open",
					headerName: "Date Updated",
					width: 160,
					cellRenderer: (params) => {
						// console.log(`params`, params);
						const timestamp = new Timestamp(
							params.value.seconds,
							params.value.nanoseconds
						);
						const newDate = timestamp.toDate();
						return (
							<TableDate date={newDate} dateFormat={"yyyy-MMM-dd HH:mm"} />
						);
					},
					valueGetter: (params) => {
						return params.data.metadata.updatedAtDatetime;
					},
					hide: false,
				},

				{
					field: "delete", //['null, 'pendingDelete']
					columnGroupShow: "open",
					headerName: "Delete",
					width: 100,
					editable: true,
					cellRenderer: (params) => {
						// console.log(`params`, params);
						return <TableDeleteAstBtn data={params} />;
					},
					valueGetter: (params) => {
						// console.log(`params.data.disabled`, params.data.disabled);
						return params.data.delete;
					},
					// valueSetter: (params) => {
					// 	// console.log(`params.newValue`, params.newValue);
					// 	params.data.disabled =
					// 		params.newValue === "disabled" ? true : false;
					// 	return true;
					// },
					hide: false,
				},
			],
		},

		// Erf ast belongs to
		{
			field: "erf.erfNo",
			headerName: "Erf No",
			width: 100,
			tooltipField: "Erf the ast belong to",
			// filterParams: {
			// 	buttons: ["apply", "clear", "cancel", "reset"],
			// },
			hide: false,
		},
		// Ward
		{
			field: "erf.address.ward",
			headerName: "Ward",
			width: 100,
			// filterParams: {
			// 	buttons: ["apply", "clear", "cancel", "reset"],
			// },
		},
		// Ast History
		// {
		// 	field: "ast.astHistory",
		// 	headerName: "Meter History",
		// 	width: 150,
		// 	cellRenderer: (params) => {
		// 		// console.log(`params`, params);
		// 		const astHistory = params.data?.astHistory?.length
		// 			? params.data?.astHistory?.length
		// 			: 0;
		// 		return <TableModalBtn data={params}>{astHistory}</TableModalBtn>;
		// 	},
		// 	cellRendererParams: {
		// 		modalName: "iwHistory",
		// 		width: "3rem",
		// 		infoName: {
		// 			irepsKeyItem: "asts",
		// 		},
		// 	},
		// },
		// Ast description
		{
			headerName: "Meter Description",
			children: [
				{
					field: "astData.astNo",
					headerName: "Meter No",
					width: 170,
					columnGroupShow: "closed",
					cellRenderer: (params) => {
						// console.log(`params`, params);
						return <TableModalBtn data={params}>{params.value}</TableModalBtn>;
					},
					cellRendererParams: {
						modalName: "meterReport",
						width: "8rem",
						irepsKeyItem: "asts",
						displayMode: "modal",
					},
					hide: false,
					// filterParams: {
					// 	buttons: ["apply", "clear", "cancel", "reset"],
					// },
				},
				{
					field: "astData.astCatergory",
					headerName: "Category",
					columnGroupShow: "closed",
					width: 150,
					hide: true,
					// filterParams: {
					// 	buttons: ["apply", "clear", "cancel", "reset"],
					// },
				},
				{
					field: "astData.astManufacturer",
					headerName: "Manufacturer (Brand)",
					columnGroupShow: "closed",
					width: 200,
					hide: false,
					// filterParams: {
					// 	buttons: ["apply", "clear", "cancel", "reset"],
					// },
				},
				{
					field: "astData.astName",
					headerName: "Model Name",
					columnGroupShow: "closed",
					width: 150,
					hide: false,
					// filterParams: {
					// 	buttons: ["apply", "clear", "cancel", "reset"],
					// },
				},
				// {
				// 	field: "astData.astState",
				// 	headerName: "State",
				// 	columnGroupShow: "closed",
				// 	width: 150,
				// 	hide: false,
				// 	// filterParams: {
				// 	// 	buttons: ["apply", "clear", "cancel", "reset"],
				// 	// },
				// },
			],
		},
		// trn history
		// {
		// 	field: "metadata.trnHistory",
		// 	headerName: "History",
		// 	width: 100,
		// },

		// ast media - all phots, voice clips and videos of the ast.
		{
			field: "",
			headerName: "Meter Media",
			width: 150,
			cellRenderer: (params) => {
				// console.log(`props`, props);
				return <TableModalBtn data={params}>{params.value}</TableModalBtn>;
			},

			cellRendererParams: {
				modalName: "mediaMobileAsts",
				width: "4rem",
				irepsKeyItem: "asts",
				displayMode: "modal",
			},
			valueGetter: (params) => {
				// console.log(`params`, params);
				const media = params?.data?.media?.length
					? params?.data?.media?.length
					: 0;
				return media;
			},
		},

		// possible trns
		{
			field: "trns",
			headerName: "Trns On Meter",
			width: 130,
			// valueGetter: params => {
			// 	return params.data?.trns?.length ? params.data?.trns?.length : 0;
			// },
			// tooltipField: "asts",
			cellRenderer: TableBtnsPossibleTrnsOnAst,
			cellRendererParams: {
				// modalName: "iwTrnsOnAst",
				// width: "4rem",
				columnName: "tidTrn",
			},
			hide: false,
			// tooltipComponent: TableTrnsForAstsTooltip,
			valueGetter: (params) => {
				// console.log(`params.data`, params.data);
				return params.data;
			},
			filter: false,
		},

		{
			field: "location.gps",
			columnGroupShow: "closed",
			headerName: "Meter on Map",

			cellRenderer: (params) => {
				// console.log(`params`, params)
				return (
					<TableModalBtn data={params}>
						<IconContext.Provider value={{ color: "blue", fontSize: "1rem" }}>
							<FaMapMarkedAlt />
						</IconContext.Provider>
					</TableModalBtn>
				);
			},
			cellRendererParams: {
				modalName: "showAstOnMap",
				width: "3rem",
			},
			valueGetter: (params) => {
				const lat = Number(params.data?.location?.gps?.lat);
				const lng = Number(params.data?.location?.gps?.lng);
				return `${lat.toFixed(3)} / ${lng.toFixed(3)}`;
			},
			width: 140,
			filter: false,
		},

		// trn history
		{
			field: "astData.astState.state",
			headerName: "Meter State",
			width: 250,
			valueGetter: (params) => {
				let astState = "";
				if (params.data?.astData.astState.state === "stores") {
					astState = `${params.data?.astData?.astState?.state} : ${params.data?.astData?.astState?.location}`;
				}

				if (params.data?.astData.astState.state === "service") {
					astState = `service : ${params.data?.erf?.address?.lmMetro} - ${params.data?.erf.erfNo}`;
				}

				if (params.data?.astData?.astState?.state === "temper") {
					astState = `temper : ${params.data?.erf.address.lmMetro} - ${params.data?.erf.erfNo}`;
				}

				if (
					params.data?.astData?.astState?.state == "" ||
					params.data?.astData?.astState?.state == null ||
					params.data?.astData?.astState?.state == undefined
				) {
					astState = `service : ${params.data?.erf?.address?.lmMetro} - ${params.data?.erf.erfNo}`;
				}

				// else {
				// 	astState = `service - ${params.data?.erf?.erfNo}`
				// }
				return astState;
			},
		},

		// ast creator
		{
			field: "metadata.createdThrough.creatorTrnName",
			headerName: "Meter Creator",
			width: 140,
		},

		// // trns - all trns on the ast
		// {
		// 	field: "trns",
		// 	headerName: "Trns On Ast",
		// 	width: 130,
		// 	valueGetter: params => {
		// 		return params.data?.trns?.length ? params.data?.trns?.length : 0;
		// 	},
		// 	// tooltipField: "asts",
		// 	cellRenderer: params => {
		// 		// console.log(`params`, params);
		// 		return <TableModalBtn data={params}>{params.value}</TableModalBtn>;
		// 	},
		// 	cellRendererParams: {
		// 		modalName: "iwTrnsOnAst",
		// 		width: "4rem",
		// 	},
		// 	hide: false,
		// 	// tooltipComponent: TableTrnsForAstsTooltip,
		// },

		// Ast Specific data
		{
			headerName: "Meter Specific Data",
			children: [
				// astCat
				{
					field: "astData.meter.type",
					// columnGroupShow: "closed",
					headerName: "Meter Type",
					width: 150,
					hide: false,
				},
				{
					field: "astData.meter.phase",
					// columnGroupShow: "open",
					headerName: "Meter Phase",
					width: 150,
					hide: false,
				},
			],
		},
		// Ast Anomalies
		{
			headerName: "Anomalies",
			children: [
				{
					field: "anomalies.anomaly",
					// columnGroupShow: "closed",
					headerName: "Anomaly",
					width: 200,
				},
				{
					field: "anomalies.anomalyDetail",
					columnGroupShow: "open",
					headerName: "Anomaly Detail",
					width: 300,
				},
			],
		},

		// Ast Location
		{
			headerName: "Meter Location",
			children: [
				{
					field: "location.address",
					columnGroupShow: "closed",
					headerName: "Ast Address",
					width: 450,
				},
				{
					field: "location.placement",
					columnGroupShow: "closed",
					headerName: "Placement",
					width: 190,
				},
				// {
				// 	field: "location.premises",
				// 	columnGroupShow: "closed",
				// 	headerName: "Premises",
				// 	width: 120,
				// },
				// {
				// 	field: "location.insideBox",
				// 	columnGroupShow: "closed",
				// 	headerName: "InsideBox",
				// 	width: 120,
				// },
			],
		},

		// Meter Keypad
		// {
		// 	headerName: "Keypad",
		// 	children: [

		// 		{
		// 			field: "astData.meter.keypad.serialNo",
		// 			columnGroupShow: "open",
		// 			headerName: "Keypad Serial No",
		// 			width: 160,
		// 		},
		// 		{
		// 			field: "astData.meter.keypad.comment",
		// 			columnGroupShow: "open",
		// 			headerName: "Keypad Comment",
		// 			width: 300,
		// 		},
		// 	],
		// },

		// Meter CB
		{
			headerName: "Circuit Breaker (CB)",
			children: [
				{
					field: "astData.meter.cb.size",
					columnGroupShow: "open",
					headerName: "CB (Amps)",
					width: 150,
				},
				{
					field: "astData.meter.cb.comment",
					columnGroupShow: "open",
					headerName: "CB Comment",
					width: 300,
				},
			],
		},

		// Meter Seal
		{
			headerName: "Seal",
			children: [
				{
					field: "astData.meter.seal.sealNo",
					columnGroupShow: "open",
					headerName: "Seal No",
					width: 150,
				},
				{
					field: "astData.meter.seal.comment",
					columnGroupShow: "open",
					headerName: "Seal Comment",
					width: 300,
				},
			],
		},

		// Service connection
		{
			field: "serviceConnection.configuration",
			headerName: "Service Connection",
			width: 300,
		},
		{
			field: "serviceConnection.offGridSupply",
			headerName: "Off Grid Supply",
			width: 300,
		},

		// Tid status
		{
			field: "tid.status",
			headerName: "Tid Status",
			width: 300,
		},
		{
			field: "tid.statusComment",
			headerName: "Tid Status Comment",
			width: 300,
		},
	];

	return { astsTableFields, createExportRowData, error };
};
