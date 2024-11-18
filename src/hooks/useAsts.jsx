import { Timestamp } from "firebase/firestore";
import { IconContext } from "react-icons";
import { FaMapMarkedAlt } from "react-icons/fa";

// hooks
import useGetAstsCollection from "./useGetAstsCollection";
// import useGetAstsReports from "./useGetAstsReports";

// components
import TableDate from "@/components/tables/TableDate";
import TableModalBtn from "@/components/tables/TableModalBtn";
import TableBtnsPossibleTrnsOnAst from "@/components/tables/TableBtnsPossibleTrnsOnAst";

export const useAsts = () => {
	const { error } = useGetAstsCollection("asts");
	// console.log(`asts`, asts);
	// console.log(`error`, error);

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
				// {
				// 	field: "metadata.createdByUser",
				// 	columnGroupShow: "closed",
				// 	headerName: "Created By",
				// 	width: 150,
				// 	hide: false,
				// },
				{
					field: "metadata.createdByUser",
					// columnGroupShow: "open",
					headerName: "Created By",
					width: 150,
					hide: false,
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
			headerName: "Updated",
			children: [
				// {
				// 	field: "metadata.updatedByUser",
				// 	columnGroupShow: "closed",
				// 	headerName: "Updated By",
				// 	width: 150,
				// 	hide: false,
				// },
				{
					field: "metadata.updatedByUser",
					// columnGroupShow: "open",
					headerName: "Updated By",
					width: 150,
					hide: false,
				},
				{
					field: "metadata.updatedAtDatetime",
					columnGroupShow: "open",
					headerName: "Date Updated",
					width: 160,
					cellRenderer: (params) => {
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
			],
		},
		// Erf ast belongs to
		{
			field: "erf.erfNo",
			headerName: "Erf No",
			width: 100,
			tooltipField: "Erf the ast belong to",
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
				},
				{
					field: "astData.astCatergory",
					headerName: "Catergory",
					columnGroupShow: "open",
					width: 150,
					hide: true,
				},
				{
					field: "astData.astManufacturer",
					headerName: "Manufacturer (Brand)",
					columnGroupShow: "open",
					width: 200,
					hide: false,
				},
				{
					field: "astData.astName",
					headerName: "Ast Technical Name",
					columnGroupShow: "open",
					width: 150,
					hide: false,
				},
				{
					field: "astData.astState",
					headerName: "State",
					columnGroupShow: "open",
					width: 150,
					hide: false,
				},
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

		// trn history
		{
			field: "astData.astState.state",
			headerName: "Meter State",
			width: 250,
			valueGetter: (params) => {
				let astState = "";
				if (params.data?.astData.astState.state === "stores") {
					astState = `${params.data?.astData?.astState?.state} : ${params.data?.astData?.astState?.locationName}`;
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

		// possible trns
		{
			field: "trns",
			headerName: "Trns On Meter",
			width: 320,
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
		},

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
					field: "location.premises",
					columnGroupShow: "closed",
					headerName: "Premises",
					width: 120,
				},
				{
					field: "location.insideBox",
					columnGroupShow: "closed",
					headerName: "InsideBox",
					width: 120,
				},
			],
		},

		// Meter Keypad
		{
			headerName: "Keypad",
			children: [
				{
					field: "astData.meter.keypad.keypadAccess",
					columnGroupShow: "open",
					headerName: "Keypad Access?",
					width: 150,
				},
				{
					field: "astData.meter.keypad.serialNo",
					columnGroupShow: "open",
					headerName: "Keypad Serial No",
					width: 160,
				},
				{
					field: "astData.meter.keypad.comment",
					columnGroupShow: "open",
					headerName: "Keypad Comment",
					width: 300,
				},
			],
		},

		// Meter CB
		{
			headerName: "Circuit Breaker (CB)",
			children: [
				{
					field: "astData.meter.cb.isThereCb",
					columnGroupShow: "open",
					headerName: "CB There?",
					width: 150,
				},
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
					field: "astData.meter.seal.meterSealed",
					columnGroupShow: "open",
					headerName: "Meter Sealed?",
					width: 150,
				},
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
			columnGroupShow: "open",
			headerName: "Service Connection",
			width: 300,
		},
	];

	return { astsTableFields, error };
};
