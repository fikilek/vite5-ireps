import { useMemo, useState, useEffect } from "react";
import { where, Timestamp } from "firebase/firestore";
import { onSnapshot, doc } from "firebase/firestore";
import { v4 as uuidv4 } from "uuid";


import "@/components/irepsInfoWindow/IwMeterReport.css";

// hooks
import useCollection from "@/hooks/useCollection.jsx";
import useAuthContext from "@/hooks/useAuthContext.jsx";

// components
import IrepsInfoWindow from "@/components/irepsInfoWindow/IrepsInfoWindow";
import TableTrnsOnAst from "@/components/tables/TableTrnsOnAst";
import TableDate from "@/components/tables/TableDate";
import TabPanel from "@/components/tabPanel/TabPanel";
import { irepsConstants } from "@/utils/utils";
import MediaAlbum from "@/components/media/MediaAlbum";
import MapIrepsMap from "@/components/maps/MapIrepsMap";
import BtnTab from "@/components/btns/BtnTab";
import MeterChat from "@/components/meterChats/MeterChat";
import MeterTimeline from "@/components/meterTimeline/MeterTimeline";
import MapMeterOnMap from "@/components/maps/MapMeterOnMap";
import MapWardErfsBoundaries from "@/components/maps/MapWardErfsBoundaries";
import MeterVending from "@/components/meterVending/MeterVending";
import { db } from "@/firebaseConfig/fbConfig";

import { faker } from "@faker-js/faker";

let dates = faker.date.betweens({
	from: "2023-01-01T00:00:00.000Z",
	to: "2024-09-01T00:00:00.000Z",
	count: 19,
});

const meterOwner = faker.person.fullName()

dates = dates.map((date) => Timestamp?.fromDate(date));
// console.log(`dates`, dates);

const IwMeterReport = (props) => {
	// console.log(`props`, props);
	// const { data } = props;

	const { user } = useAuthContext();
	// console.log(`user`, user);

	const vendingData = dates?.map((vd) => {
		return {
			timelineType: "vending",
			updatedAtDatetime: vd,
			meterOwner: meterOwner,
			updatedByUid: user.uid,
			amount: Math.random() * 500,
			id: uuidv4()
		};
	});

	// const vendingData = [
	// 	{
	// 		timelineType: 'vending',
	// 		updatedAtDatetime: Timestamp.now(),
	// 		meterOwner: faker.person.fullName() ,
	// 		updatedByUid:  user.uid,
	// 		amount: Math.random() * 2000
	// 	},
	// 	{
	// 		timelineType: 'vending',
	// 		updatedAtDatetime: Timestamp.now(),
	// 		meterOwner: faker.person.fullName() ,
	// 		updatedByUid:  user.uid,
	// 		amount: Math.random() * 2000
	// 	},
	// 	{
	// 		timelineType: 'vending',
	// 		updatedAtDatetime: Timestamp.now(),
	// 		meterOwner: faker.person.fullName() ,
	// 		updatedByUid:  user.uid,
	// 		amount: Math.random() * 2000
	// 	},
	// 	{
	// 		timelineType: 'vending',
	// 		updatedAtDatetime: Timestamp.now(),
	// 		meterOwner: faker.person.fullName() ,
	// 		updatedByUid:  user.uid,
	// 		amount: Math.random() * 2000
	// 	},
	// 	{
	// 		timelineType: 'vending',
	// 		updatedAtDatetime: Timestamp.now(),
	// 		meterOwner: faker.person.fullName() ,
	// 		updatedByUid:  user.uid,
	// 		amount: Math.random() * 2000
	// 	},
	// 	{
	// 		timelineType: 'vending',
	// 		updatedAtDatetime: Timestamp.now(),
	// 		meterOwner: faker.person.fullName() ,
	// 		updatedByUid:  user.uid,
	// 		amount: Math.random() * 2000
	// 	},
	// 	{
	// 		timelineType: 'vending',
	// 		updatedAtDatetime: Timestamp.now(),
	// 		meterOwner: faker.person.fullName() ,
	// 		updatedByUid:  user.uid,
	// 		amount: Math.random() * 2000
	// 	},
	// 	{
	// 		timelineType: 'vending',
	// 		updatedAtDatetime: Timestamp.now(),
	// 		meterOwner: faker.person.fullName() ,
	// 		updatedByUid:  user.uid,
	// 		amount: Math.random() * 2000
	// 	},
	// 	{
	// 		timelineType: 'vending',
	// 		updatedAtDatetime: Timestamp.now(),
	// 		meterOwner: faker.person.fullName() ,
	// 		updatedByUid:  user.uid,
	// 		amount: Math.random() * 2000
	// 	},
	// 	{
	// 		timelineType: 'vending',
	// 		updatedAtDatetime: Timestamp.now(),
	// 		meterOwner: faker.person.fullName() ,
	// 		updatedByUid:  user.uid,
	// 		amount: Math.random() * 2000
	// 	},
	// 	{
	// 		timelineType: 'vending',
	// 		updatedAtDatetime: Timestamp.now(),
	// 		meterOwner: faker.person.fullName() ,
	// 		updatedByUid:  user.uid,
	// 		amount: Math.random() * 2000
	// 	},
	// 	{
	// 		timelineType: 'vending',
	// 		updatedAtDatetime: Timestamp.now(),
	// 		meterOwner: faker.person.fullName() ,
	// 		updatedByUid:  user.uid,
	// 		amount: Math.random() * 2000
	// 	},
	// 	{
	// 		timelineType: 'vending',
	// 		updatedAtDatetime: Timestamp.now(),
	// 		meterOwner: faker.person.fullName() ,
	// 		updatedByUid:  user.uid,
	// 		amount: Math.random() * 2000
	// 	},
	// 	{
	// 		timelineType: 'vending',
	// 		updatedAtDatetime: Timestamp.now(),
	// 		meterOwner: faker.person.fullName() ,
	// 		updatedByUid:  user.uid,
	// 		amount: Math.random() * 2000
	// 	},
	// ]
	// console.log(`vendingData`, vendingData);

	const [ast, setAst] = useState(props?.data?.data);
	// console.log(`ast`, ast);

	const { astData, erf, trns } = ast;
	// console.log(`trns`, trns);

	// const ast = props?.data?.data;
	// console.log(`ast`, ast);

	const { lmMetro, ward } = erf?.address;

	const { astId } = astData;
	// console.log(`astId`, astId)

	const constraints = useMemo(
		() => where("metadata.astId", "==", astId),
		[astId]
	);
	// console.log(`constraints`, constraints);

	const { data: astMediaInfo } = useCollection("mediaAsts", [constraints]);
	// console.log(`astMediaInfo`, astMediaInfo);

	const trnsOnAstTableFields = [
		{
			field: "trnType",
			headerName: "Trn Type",
			// width: 150,
			flex: 0.2,
		},
		{
			field: "updatedByUser",
			headerName: "Updated By",
			// width: 150,
			flex: 0.3,
		},
		{
			field: "updatedAtDatetime",
			headerName: "Updated At Datetime",
			cellRenderer: (params) => {
				// console.log(`params`, params);
				const newDate = params.value.toDate();
				return (
					<TableDate
						date={newDate}
						dateFormat={irepsConstants.IC_DATE_FORMAT1}
					/>
				);
			},
			valueGetter: (params) => {
				// console.log(`params`, params);
				return params.data.updatedAtDatetime;
			},
			// width: 190,
			flex: 0.4,
		},
	];

	const hl1 = (
		<span>
			Mn: <span className="text-emphasis2">{astData?.astNo}</span>
		</span>
	);
	const hl2 = (
		<span>
			Erf: <span className="text-emphasis2">{erf?.erfNo}</span>
		</span>
	);
	const hr1 = (
		<span>
			State: <span className="text-emphasis2">{astData?.astState?.state}</span>
		</span>
	);
	const hr2 = <button>Export</button>;

	const [activeTab, setActiveTab] = useState("trns");

	// const { astId } = assets?.astData;
	// console.log(`astId`, astId);

	useEffect(() => {
		onSnapshot(doc(db, "asts", astId), (doc) => {
			// console.log("Current data: ", doc.data());
			setAst(doc.data());
		});
	}, []);

	// sort chats by chat datetime
	const chats = ast?.chats;
	// console.log(`chats`, chats);

	chats?.sort(
		(a, b) =>
			b?.updatedAtDatetime?.toMillis() - a?.updatedAtDatetime?.toMillis()
	);

	return (
		<div className="iw-meter-report">
			<IrepsInfoWindow hl1={hl1} hl2={hl2} hr1={hr1} hr2={hr2}>
				<div className="tab-btns">
					<BtnTab
						setActiveTab={setActiveTab}
						activeTab={activeTab}
						tabName="trns"
					/>
					<BtnTab
						setActiveTab={setActiveTab}
						activeTab={activeTab}
						tabName="media"
					/>
					<BtnTab
						setActiveTab={setActiveTab}
						activeTab={activeTab}
						tabName="map"
					/>
					<BtnTab
						setActiveTab={setActiveTab}
						activeTab={activeTab}
						tabName="chat"
					/>
					<BtnTab
						setActiveTab={setActiveTab}
						activeTab={activeTab}
						tabName="vending"
					/>
					<BtnTab
						setActiveTab={setActiveTab}
						activeTab={activeTab}
						tabName="timeline"
					/>
				</div>

				<TabPanel title="Ast Transactions" activeTab={activeTab} tabName="trns">
					<TableTrnsOnAst rowData={trns} colDefs={trnsOnAstTableFields} />
				</TabPanel>

				<TabPanel title="Ast Media" activeTab={activeTab} tabName="media">
					<MediaAlbum media={astMediaInfo} />
				</TabPanel>

				<TabPanel title="Ast on Map" activeTab={activeTab} tabName="map">
					<div className="map-wrapper">
						<MapIrepsMap>
							<MapWardErfsBoundaries lmMetro={lmMetro} ward={ward} />
							<MapMeterOnMap ast={ast} />
						</MapIrepsMap>
					</div>
				</TabPanel>

				<TabPanel title="Chat" activeTab={activeTab} tabName="chat">
					<MeterChat ast={ast} setAst={setAst} />
				</TabPanel>

				<TabPanel title="Timeline" activeTab={activeTab} tabName="timeline">
					<MeterTimeline
						trns={trns}
						astMediaInfo={astMediaInfo}
						chats={chats}
						vendingData={vendingData}
					/>
				</TabPanel>

				<TabPanel title="Vending" activeTab={activeTab} tabName="vending">
					<MeterVending vendingData={vendingData} />
				</TabPanel>
			</IrepsInfoWindow>
		</div>
	);
};

export default IwMeterReport;
