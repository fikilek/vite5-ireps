import cloneDeep from "lodash";
import { useContext, useEffect, useState, useCallback, useMemo } from "react";
import { IconContext } from "react-icons";
import { FaMapMarkedAlt } from "react-icons/fa";
import { Timestamp, where } from "firebase/firestore";
import { format } from "date-fns";

// ustome hooks
import { useFirestore } from "@/hooks/useFirestore.jsx";
import useAuthContext from "@/hooks/useAuthContext";
import useGetCollection from "@/hooks/useGetCollection";

// contexts
import { ErfsContext } from "@/contexts/ErfsContext.jsx";

// components
import TableDate from "@/components/tables/TableDate";
import TableModalBtn from "@/components/tables/TableModalBtn";
import TableBtnsPossibleTrnsOnErf from "@/components/tables/TableBtnsPossibleTrnsOnErf";

export const useErfs = () => {
	const { erfsContext, setErfsContext } = useContext(ErfsContext);
	// console.log(`erfsContext`, erfsContext);

	const { addDocument } = useFirestore("erfs");

	// get user details from firestore on snapshot
	const { getDocument, response } = useFirestore("users");
	// console.log(`response`, response);

	const [workbase, setWorkbase] = useState(null);
	// console.log(`workbase`, workbase);

	const [constraints, setConstraints] = useState([]);
	// console.log(`constraints`, constraints);

	const { user } = useAuthContext();
	// console.log(`user`, user);

	const { state, getCollection } = useGetCollection("erfs");
	// console.log(`state`, state);

	// useCallback(() => {
	// 	getCollection(constraints);
	// }, [getCollection, constraints]);

	try {
		getCollection(constraints);
	} catch (error) {
		console.log(`Error in useErfs : `, error.message);
	}

	useEffect(() => {
		setErfsContext({
			...erfsContext,
			erfs: state.data,
			erfsTableFields,
		});
	}, [state]);

	useEffect(() => {
		// console.log(`workbase changed:`, workbase)
		if (workbase) {
			setConstraints((prev) => {
				return [...prev, where("address.lmMetro", "==", workbase?.trim())];
			});
		}
	}, [workbase]);

	useEffect(() => {
		if (response.success) {
			// console.log(`response`, response);
			const { workbase } = response?.document;
			// console.log(`workbase`, workbase)
			setWorkbase(workbase);
		}
	}, [response.success]);

	useEffect(() => {
		if (user?.uid) {
			getDocument(user?.uid);
		}
	}, [user?.uid]);

	// duplicate erf. When duplicating an erf, strip the erf object of the following
	// 1. property type unit no
	// 2. all attached asts
	// TODO: check what else to strip when  duplicating an erf

	const createExportRowData = (rowData) => {
		// console.log(`rowData`, rowData);
		if (rowData?.length < 1) return;

		const newRowData = [];
		rowData &&
			rowData?.forEach((row) => {
				// return if there is no property type
				if (row?.propertyType) {
					// const media = row?.media;
					// console.log(`media`, media);
					// console.log(`row`, row);

					// get all meters on arf
					const { asts } = row;

					let metersOnErf = "";
					asts?.forEach((ast) => {
						const mn = ast.astNo;
						// console.log(`mn`, mn);
						metersOnErf = metersOnErf.concat(mn, " ; ");
					});
					metersOnErf = metersOnErf.slice(0, -3);
					// console.log(`metersOnErf`, metersOnErf);

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

						"Parcel Key": row?.prclKey,
						"Erf No": row?.erfNo,
						"Ward No": row?.address?.ward,
						"Meters On Erf": row?.asts?.length, //Number of meters on erf.
						Meters: metersOnErf, //Number of meters on erf.
						"No Access": row?.trns?.length, // Number of No Accesses on erf.
						"Property Type": row?.propertyType?.type,
						"Unit Name": row?.propertyType?.unitName,
						"Unit No": row?.propertyType?.unitNo,
					};

					// console.log(`newRow`, newRow);
					newRowData.push(newRow);
				}
			});
		return newRowData;
	};

	const duplicateErf = (erfData) => {
		// console.log(`duplicating erfData`, formData);

		// clone the erf data
		const erf = cloneDeep(erfData);

		// remove id
		delete erf.id;
		// console.log(`clonedErf without id`, erf);

		// remove unit no
		const newErf = {
			...erf,
			propertyType: {
				...erf.propertyType,
				unitNo: "",
			},
		};
		// console.log(`newClonedErfData`, newClonedErfData);

		// add clonedErf to erfs
		addDocument(newErf);

		// TODO: use toast to confirm duplicated erf.

		// TODO: Handle error if duplication failed.
	};

	const erfsTableFields = useMemo(
		() => [
			{
				field: "id",
				headerName: "System Id",
				width: 200,
				hide: true,
			},
			{
				headerName: "Created",
				children: [
					{
						field: "metadata.createdByUser",
						columnGroupShow: "open",
						headerName: "Created By",
						width: 150,
						hide: false,
						// filterParams: {
						// 	buttons: ["apply", "clear", "cancel", "reset"],
						// },
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
						width: 150,
						cellRenderer: (params) => {
							// console.log(`params`, params)
							const timestamp = new Timestamp(
								params?.value?.seconds,
								params?.value?.nanoseconds
							);
							const newDate = timestamp.toDate();
							return (
								<TableDate date={newDate} dateFormat={"yyyy-MMM-dd HH:mm"} />
							);
						},
						valueGetter: (params) => {
							return params.data.metadata.createdAtDatetime;
						},
						hide: false,
					},
				],
			},
			{
				headerName: "Last Updated",
				children: [
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
						field: "metadata.updatedByUser",
						columnGroupShow: "open",
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
						headerName: "Last Updated",
						width: 150,
						cellRenderer: (params) => {
							const timestamp = new Timestamp(
								params?.value?.seconds,
								params?.value?.nanoseconds
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

			{
				headerName: "Erf (Stand)",
				children: [
					{
						field: "erfNo",
						headerName: "Erf No",
						width: 130,
						cellRenderer: (params) => {
							// console.log(`params`, params);
							return (
								<TableModalBtn data={params}>{params.value}</TableModalBtn>
							);
						},
						cellRendererParams: {
							modalName: "erf",
							width: "4rem",
							irepsKeyItem: "erfs",
							displayMode: "modal",
						},
						hide: false,
						// filterParams: {
						// 	buttons: ["apply", "clear", "cancel", "reset"],
						// },
					},
					{
						field: "prclKey",
						headerName: "Erf Key",
						width: 240,
						columnGroupShow: "open",
					},
				],
			},

			{
				field: "address.ward",
				headerName: "Ward",
				width: 130,
				columnGroupShow: "closed",
			},
			// Erf History
			// {
			// 	field: "erf.erfHistory",
			// 	headerName: "Erf History",
			// 	width: 120,
			// 	cellRenderer: (params) => {
			// 		// console.log(`params`, params);
			// 		const erfHistory = params.data?.erfHistory?.length
			// 			? params.data?.erfHistory?.length
			// 			: 0;
			// 		return <TableModalBtn data={params}>{erfHistory}</TableModalBtn>;
			// 	},
			// 	cellRendererParams: {
			// 		modalName: "iwHistory",
			// 		width: "3rem",
			// 		infoName: {
			// 			irepsKeyItem: 'erfs',
			// 		},
			// 	},
			// },
			{
				field: "",
				headerName: "Erf on Map",
				width: 120,
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
					modalName: "erfOnMap",
					width: "3rem",
				},
				valueGetter: (params) => {
					const lat = params.data?.address?.gps?.latitude;
					const lng = params.data?.address?.gps?.longitude;
					return `${Number(lat).toFixed(4)} | ${Number(lng).toFixed(4)}`;
				},
				hide: false,
				filter: false,
			},

			// asts on erf
			{
				field: "asts.length",
				headerName: "Meters",
				width: 100,
				valueGetter: (params) => {
					return params.data?.asts?.length ? params.data?.asts?.length : 0;
				},
				// tooltipField: "asts",
				cellRenderer: (params) => {
					// console.log(`ast on erf params`, params);
					return <TableModalBtn data={params}>{params.value}</TableModalBtn>;
				},
				cellRendererParams: {
					modalName: "astsOnErf",
					width: "3rem",
				},
				hide: false,
				// tooltipComponent: TableTrnsForAstsTooltip,
				// filterParams: {
				// 	buttons: ["apply", "clear", "cancel", "reset"],
				// },
			},

			// media on erf
			{
				field: "",
				headerName: "Erf Media",
				width: 130,
				cellRenderer: (params) => {
					// console.log(`params`, params);
					return <TableModalBtn data={params}>{params.value}</TableModalBtn>;
				},
				cellRendererParams: {
					modalName: "mediaMobileErfs",
					width: "4rem",
					irepsKeyItem: "erfs",
					displayMode: "modal",
				},
				valueGetter: (params) => {
					// console.log(`params`, params);
					const media = params?.data?.media?.length
						? params?.data?.media?.length
						: 0;
					return media;
				},
				// filterParams: {
				// 	buttons: ["apply", "clear", "cancel", "reset"],
				// },
			},

			// possible trns
			{
				field: "trns",
				headerName: "Trns On Erf",
				width: 120,
				// valueGetter: params => {
				// 	return params.data?.trns?.length ? params.data?.trns?.length : 0;
				// },
				// tooltipField: "asts",
				cellRenderer: TableBtnsPossibleTrnsOnErf,
				cellRendererParams: {
					width: "4rem",
				},
				hide: false,
				// tooltipComponent: TableTrnsForAstsTooltip,
				filter: false,
			},

			// No Access
			{
				field: "trns",
				headerName: "No Access",
				width: 150,
				cellRenderer: (params) => {
					// console.log(`params`, params);
					const noAccess = params?.data?.trns?.length
						? params?.data?.trns?.length
						: 0;
					return <TableModalBtn data={params}>{noAccess}</TableModalBtn>;
				},
				cellRendererParams: {
					modalName: "noAccess",
					width: "4rem",
					irepsKeyItem: "erfs",
					displayMode: "modal",
				},
				valueGetter: (params) => {
					// console.log(`params`, params);
					const noAccess = params?.data?.trns?.length
						? params?.data?.trns?.length
						: 0;
					return noAccess;
				},
			},

			{
				headerName: "Property Type",
				children: [
					{
						field: "propertyType.type",
						headerName: "Type",
						width: 150,
					},
					{
						field: "propertyType.unitName",
						headerName: "Unit Name",
						width: 130,
					},
					{
						field: "propertyType.unitNo",
						headerName: "Unit No",
						width: 100,
					},
				],
			},

			// // erf status
			// {
			// 	field: "erfStatus",
			// 	headerName: "Status",
			// 	width: 150,
			// },

			// customer address
			{
				headerName: "Customer Address",
				children: [
					{
						field: "address.country",
						headerName: "Country",
						width: 120,
						columnGroupShow: "open",
					},
					{
						field: "address.province",
						headerName: "Province",
						width: 120,
						columnGroupShow: "open",
					},
					{
						field: "address.dm",
						headerName: "DM",
						width: 120,
						columnGroupShow: "open",
					},
					{
						field: "address.lmMetro",
						headerName: "LM or Metro",
						width: 120,
						columnGroupShow: "closed",
					},
					{
						field: "address.town",
						headerName: "Towm",
						width: 120,
					},
					{
						field: "address.suburbTownship",
						headerName: "Suburb/Township",
						width: 200,
						columnGroupShow: "open",
					},
					{
						field: "address.street",
						headerName: "Street",
						width: 170,
						columnGroupShow: "closed",
					},
				],
			},
			{
				field: "address.systemAdr",
				headerName: "Google Address",
				width: 300,
			},

			// Customer cartegory
			{
				field: "customer.cartegory",
				headerName: "Customer Category",
				width: 180,
			},

			// Customer Type
			{
				field: "customer.type",
				headerName: "Customer Type",
				width: 180,
			},

			{
				headerName: "Customer Warm Body",
				width: 120,
				children: [
					{
						field: "customer.warmBody.surname",
						// columnGroupShow: "closed",
						headerName: "Surname",
						width: 120,
					},
					{
						field: "customer.warmBody.name",
						// columnGroupShow: "closed",
						headerName: "Name",
						width: 120,
						cellRendererParams: {
							breakpoint: "xs",
						},
					},
					{
						field: "customer.warmBody.idNo",
						columnGroupShow: "open",
						headerName: "Id No",
						width: 120,
					},
					{
						field: "customer.warmBody.gender",
						columnGroupShow: "open",
						headerName: "Gender",
						width: 120,
					},
				],
			},
			{
				headerName: "Customer Juristic Person",
				width: 120,
				children: [
					{
						field: "customer.juristicPerson.tradingName",
						columnGroupShow: "open",
						headerName: "Trading Name",
						width: 160,
					},
					{
						field: "customer.juristicPerson.registeredName",
						columnGroupShow: "closed",
						headerName: "Registered Name",
						width: 160,
					},
					{
						field: "customer.juristicPerson.registeredNo",
						columnGroupShow: "closed",
						headerName: "Registered No",
						width: 160,
					},
				],
			},
			{
				headerName: "Customer Contact Person",
				width: 120,
				children: [
					{
						field: "customer.contactPerson.surname",
						columnGroupShow: "closed",
						headerName: "Surname",
						width: 120,
					},
					{
						field: "customer.contactPerson.name",
						columnGroupShow: "closed",
						headerName: "Name",
						width: 120,
					},
					{
						field: "customer.contactPerson.landLine",
						columnGroupShow: "open",
						headerName: "Land Line",
						width: 120,
					},
					{
						field: "customer.contactPerson.emailAdr",
						columnGroupShow: "open",
						headerName: "Email Adr",
						width: 150,
					},
					{
						field: "customer.contactPerson.whatsApp",
						columnGroupShow: "open",
						headerName: "WhatssApp No",
						width: 120,
					},
					{
						field: "customer.contactPerson.cellNo",
						columnGroupShow: "open",
						headerName: "Cell No",
						width: 120,
					},
				],
			},
			{
				headerName: "Billing",
				children: [
					{
						field: "billing.accountNo.length",
						columnGroupShow: "open",
						headerName: "Account No",
						width: 150,
					},
					{
						field: "billing.indigent",
						columnGroupShow: "open",
						headerName: "Indigent",
						width: 120,
					},
					{
						field: "billing.tariff",
						columnGroupShow: "open",
						headerName: "Tariff",
						width: 120,
					},
					{
						field: "billing.standUse",
						columnGroupShow: "open",
						headerName: "Stand Use",
						width: 120,
					},
				],
			},
		],
		[]
	);

	return { duplicateErf, createExportRowData };
};
