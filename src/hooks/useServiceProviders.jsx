import { Timestamp } from "firebase/firestore";
import { useEffect, useState } from "react";

// hooks
import useAuthContext from "@/hooks/useAuthContext";

// components
import TableDate from "@/components/tables/TableDate";
import TableModalBtn from "@/components/tables/TableModalBtn";
import useCollection from "@/hooks/useCollection.jsx";

export const useServiceProviders = () => {
	const { user } = useAuthContext();

	const [serviceProviders, setServiceProviders] = useState({});
	// console.log(`serviceProviders`, serviceProviders);

	const { data, error, isPending, success } = useCollection(
		"serviceProviders",
		null
	);
	// console.log(`data`, data)
	// console.log(`error`, error);
	// console.log(`isPending`, isPending);
	// console.log(`success`, success);

	useEffect(() => {
		const spOptions = [{ key: "choose", value: "choose" }];
		data &&
			data.forEach((sp) => {
				spOptions.push({
					label: sp.registeredName,
					value: sp.registeredName,
					spId: sp.id,
					spData: sp,
				});
			});

		setServiceProviders({
			sps: data,
			spOptions,
		});
	}, [data]);

	const getSpDetails = (spName) => {
		return (
			serviceProviders.sps &&
			serviceProviders.sps.find((sp) => sp.registeredName === spName)
		);
	};

	// Get sp details from given the sp name. Use reguar expresions to look for a matching name on the avaialbe list of service providers
	const getSpDetailsFromSpName = (name) => {
		return (
			serviceProviders.sps &&
			serviceProviders.sps.find((sp) => {
				if (!(sp.registeredName && name)) return false;
				const spStr = sp.registeredName.toLowerCase().trim();
				// console.log(`spStr`, spStr);
				const nameStr = name.toLowerCase().trim();
				// console.log(`nameStr`, nameStr);
				// user regular expresions to search doe a matching nameStr in spStr
				const re = new RegExp(nameStr, "gi");
				return re.test(spStr);
			})
		);
	};

	const getSpClientsFromName = (name) => {
		// console.log(`name`, name)
		if (!name) return;
		const sp = getSpDetailsFromSpName(name);
		// console.log(`sp`, sp)
		if (!sp) return;
		return getSpClients(sp);
	};

	const getSpClients = (sp) => {
		const { clients } = sp || {};
		// const clnts = [{ key: "choose", value: "choose" }];
		const clnts = [];
		clients &&
			clients?.forEach((client) => {
				clnts.push({ key: client.name, value: client.name });
			});
		return clnts;
	};

	const getSpFromId = (id) => {
		if (!id) return null;
		return (
			serviceProviders.sps && serviceProviders.sps.find((sp) => sp.id === id)
		);
	};

	const getSpClientsFromId = (id) => {
		// console.log(`id`, id);
		if (!id) return null;
		return serviceProviders.sps.filter((sp) => sp.id.trim() === id.trim())
			.clients;
	};

	const newFormData = {
		disabled: false,
		metadata: {
			createdByUser: user?.displayName,
			createdByUid: user?.uid,
			createdAtDatetime: Timestamp?.now(),
			updatedByUser: user?.displayName,
			updatedByUid: user?.uid,
			updatedAtDatetime: Timestamp?.now(),
		},
		contactPerson: {
			surnameAndName: "",
			cellNo: "",
			email: "",
		},
		registeredName: "",
		tradingName: "",
		mainOffice: {
			address: "",
			email: "",
			phone: "",
		},
		clients: [],
		otherOffices: [],
		stores: [],
		users: [],
	};

	const tableFields = [
		// id
		{
			field: "uid",
			headerName: "serviceProviders Id",
			width: 250,
			hide: true,
		},

		// disabled
		// {
		// 	field: "disabled",
		// 	headerName: "Status",
		// 	width: 100,
		// 	// cellRenderer: TableUserAccDisableSelect,
		// 	editable: true,
		// 	cellEditor: TableSelect,
		// 	cellEditorParams: {
		// 		options: ["enabled", "disabled"],
		// 	},
		// 	valueGetter: (params) => {
		// 		// console.log(`params.data.disabled`, params.data.disabled);
		// 		return params.data.disabled ? "disabled" : "enabled";
		// 	},
		// 	valueSetter: (params) => {
		// 		// console.log(`params.newValue`, params.newValue);
		// 		params.data.disabled = params.newValue === "disabled" ? true : false;
		// 		return true;
		// 	},
		// 	// cellStyle: params => {
		// 	// console.log(params);
		// 	// const { uid } = params.data;
		// 	// const selectDisabled = uid === user.uid ? true : false;
		// 	// return selectDisabled ? {
		// 	// 			color: "grey",
		// 	// 			fontWeight: "700",
		// 	// 			pointerEvents: "none",
		// 	// 			cursor: "none",
		// 	// 			borderLeft: "0.3rem solid grey",
		// 	// 	  }
		// 	// 	: "";
		// 	// },
		// },

		// created by
		{
			headerName: "Created",
			children: [
				{
					field: "metadata.createdByUser",
					headerName: "Created By User",
					columnGroupShow: "closed",
					width: 150,
				},
				{
					field: "metadata.createdByUid",
					headerName: "Created By Uid",
					columnGroupShow: "closed",
					width: 130,
					hide: true,
				},
				{
					field: "metadata.createdAtDatetime",
					headerName: "Date Created",
					columnGroupShow: "open",
					width: 180,
					cellRenderer: (params) => {
						const newDate = new Date(
							params.data.metadata.createdAtDatetime.toDate()
						);
						return (
							<TableDate date={newDate} dateFormat={"yyyy-MMM-dd HH:mm"} />
						);
					},
					valueGetter: (params) => {
						// console.log(`params.data.disabled`, params.data.disabled);
						return params.data.metadata.createdAtDatetime;
					},
				},
			],
		},

		// updated by
		{
			headerName: "Updated",
			children: [
				{
					field: "metadata.updatedByUser",
					headerName: "Updated By User",
					columnGroupShow: "closed",
					width: 160,
				},
				{
					field: "metadata.updatedByUid",
					headerName: "Updated By Uid",
					columnGroupShow: "closed",
					width: 130,
					hide: true,
				},
				{
					field: "metadata.updatedAtDatetime",
					headerName: "Updated At Datetime",
					columnGroupShow: "open",
					width: 190,
					cellRenderer: (params) => {
						const newDate = params.data.metadata.updatedAtDatetime.toDate();
						return (
							<TableDate date={newDate} dateFormat={"yyyy-MMM-dd HH:mm"} />
						);
					},
					valueGetter: (params) => {
						// console.log(`params.data.disabled`, params.data.disabled);
						return params.data.metadata.updatedAtDatetime;
					},
				},
			],
		},

		// cipro registered entity name
		{
			field: "registeredName",
			headerName: "Registered Name",
			width: 190,
			cellRenderer: (params) => {
				// console.log(`params`, params);
				return <TableModalBtn data={params}>{params.value}</TableModalBtn>;
			},
			cellRendererParams: {
				modalName: "serviceProvider",
				width: "8rem",
			},
		},

		// trading name
		{
			field: "tradingName",
			headerName: "Trading Name",
			width: 150,
		},

		// main trading office
		{
			headerName: "Main Office",
			children: [
				{
					field: "mainOffice.address",
					headerName: "Address",
					width: 170,
					columnGroupShow: "closed",
				},
				{
					field: "mainOffice.email",
					headerName: "Email",
					width: 170,
					columnGroupShow: "open",
				},
				{
					field: "mainOffice.phone",
					headerName: "Phone",
					width: 170,
					columnGroupShow: "open",
				},
			],
		},

		// main trading contact person
		// {
		// 	headerName: "Main Office",
		// 	children: [
		// 		{
		// 			field: "mainOffice.address",
		// 			headerName: "Address",
		// 			width: 170,
		// 		},
		// 		{
		// 			field: "mainOffice.email",
		// 			headerName: "Email",
		// 			width: 170,
		// 		},
		// 		{
		// 			field: "mainOffice.phone",
		// 			headerName: "Phone",
		// 			width: 170,
		// 		},
		// 	],
		// },

		// field workers - number on a button that when clicked pops up a table of FWs
		// {
		// 	field: "fieldworkers",
		// 	headerName: "Fieldworkers",
		// 	width: 140,
		// 	cellRenderer: (props) => {
		// 		// console.log(`props`, props);
		// 		return (
		// 			<TableModalBtn data={props}>
		// 				{props.data?.users?.length}
		// 			</TableModalBtn>
		// 		);
		// 	},
		// 	cellRendererParams: {
		// 		modalName: "serviceProviderData",
		// 		infoName: "users",
		// 	},
		// 	valueGetter: (params) => {
		// 		// console.log(`params.data.disabled`, params.data.disabled);
		// 		return params;
		// 	},
		// 	valueSetter: (params) => {
		// 		// console.log(`params.newValue`, params.newValue);
		// 		return params;
		// 	},
		// },

		// clients - number of entities the service peovider offeres services to.
		// On click, the list pops up in IrepsInfoWindow
		{
			field: "clients",
			headerName: "Clients",
			width: 140,
			cellRenderer: (props) => {
				return (
					<TableModalBtn data={props}>
						{props.data?.clients?.length}
					</TableModalBtn>
				);
			},
			cellRendererParams: {
				modalName: "serviceProviderData",
				infoName: "clients",
			},
			valueGetter: (params) => {
				// console.log(`params.data.disabled`, params.data.disabled);
				return params;
			},
			valueSetter: (params) => {
				// console.log(`params.newValue`, params.newValue);
				return params;
			},
		},

		// other offices - service provider other offices in case there is more than one.
		// On click, the list pops up in IrepsInfoWindow
		{
			field: "otherOffices",
			headerName: "Other Offices",
			width: 140,
			cellRenderer: (props) => {
				return (
					// <TableModalBtn props={props}>{props.data.fws.length}</TableModalBtn>
					<TableModalBtn data={props}>
						{props.data?.otherOffices?.length}
					</TableModalBtn>
				);
			},
			cellRendererParams: {
				modalName: "serviceProviderData",
				infoName: "otherOffices",
			},
			valueGetter: (params) => {
				// console.log(`params.data.disabled`, params.data.disabled);
				return params;
			},
			valueSetter: (params) => {
				// console.log(`params.newValue`, params.newValue);
				return params;
			},
		},

		//stores
		// {
		// 	field: "stores",
		// 	headerName: "Stores",
		// 	width: 150,
		// 	cellRenderer: TableSpStoresModalBtn,
		// 	cellRendererParams: {
		// 		modalName: "ServiceProviderStores",
		// 		infoName: "stores",
		// 	},
		// },
	];

	return {
		tableFields,
		newFormData,
		serviceProviders,
		getSpDetails,
		getSpClients,
		getSpFromId,
		getSpClientsFromId,
		getSpDetailsFromSpName,
		getSpClientsFromName,
	};
};
