import {
	VerticalTimeline,
	VerticalTimelineElement,
} from "react-vertical-timeline-component";
import "react-vertical-timeline-component/style.min.css";
import { FaAdjust } from "react-icons/fa";
import { format } from "date-fns";
import { constants } from "@/utils/utils";

import "@/components/meterTimeline/MeterTimeline.css";

import MeterTimelineTrn from "@/components/meterTimeline/MeterTimelineTrn";
import MeterTimelineVending from "@/components/meterTimeline/MeterTimelineVending";
import MeterTimelineChat from "@/components/meterTimeline/MeterTimelineChat";
import MeterTimelineMedia from "@/components/meterTimeline/MeterTimelineMedia";

const MeterTimeline = (props) => {
	// console.log(`props`, props);
	const {
		trns: transactions,
		astMediaInfo,
		chats: chats_,
		vendingData,
	} = props;

	const chats = chats_?.map((trn) => {
		return { timelineType: "chat", ...trn };
	});

	const trns = transactions?.map((trn) => {
		return { timelineType: "trn", ...trn };
	});

	const ami = astMediaInfo?.map((ami) => {
		return { timelineType: "media", ...ami.metadata, url: ami.url, id: ami.id };
	});
	// console.log(`ami`, ami);

	let timeline = null;

	if (trns && trns?.length > 0) {
		timeline = [...trns];
	}
	if (ami && ami?.length > 0) {
		timeline = [...timeline, ...ami];
	}
	if (chats && chats?.length > 0) {
		timeline = [...timeline, ...chats];
	}
	if (vendingData && vendingData?.length > 0) {
		timeline = [...timeline, ...vendingData];
	}

	// [...trns, ...ami, ...chats, ...vendingData];
	// console.log(`timeline BEFORE`, timeline);

	if (timeline) {
		timeline?.sort(
			(a, b) =>
				b?.updatedAtDatetime?.toMillis() - a?.updatedAtDatetime?.toMillis()
		);
	}

	// console.log(`timeline AFTER`, timeline);

	return (
		<div className="meter-timeline">
			<VerticalTimeline>
				{timeline?.map((item, index) => {
					if (item.timelineType === "chat") {
						// console.log(`chat item`, item)
						return (
							<VerticalTimelineElement
								key={index}
								className="vertical-timeline-element--work"
								contentStyle={{
									background: "#FC4100",
									color: "#00215E",
								}}
								contentArrowStyle={{
									borderRight: "7px solid  rgb(33, 150, 243)",
								}}
								date={item.updatedAtDatetime && format(
									item.updatedAtDatetime?.toDate(),
									constants?.dateFormat2
								)}
								// date={item.updatedAtDatetime.toString()}
								iconStyle={{
									background: "rgb(33, 150, 243)",
									color: "#D2E0FB",
								}}
								icon={<FaAdjust />}
							>
								<MeterTimelineChat chat={item} />
							</VerticalTimelineElement>
						);
					}

					if (item.timelineType === "trn") {
						// console.log(`trn item`, item)
						return (
							<VerticalTimelineElement
								key={index}
								className="vertical-timeline-element--work"
								contentStyle={{
									background: "#DAEAF1",
									color: "#180161",
								}}
								contentArrowStyle={{
									borderRight: "7px solid  rgb(33, 150, 243)",
								}}
								date={format(
									item.updatedAtDatetime?.toDate(),
									constants?.dateFormat2
								)}
								// date={item.updatedAtDatetime.toString()}
								iconStyle={{
									background: "rgb(33, 150, 243)",
									color: "#DAEAF1",
								}}
								icon={<FaAdjust />}
							>
								<MeterTimelineTrn trn={item} />
							</VerticalTimelineElement>
						);
					}
					if (item.timelineType === "media") {
						// console.log(`media item`, item)
						return (
							<VerticalTimelineElement
								key={index}
								className="vertical-timeline-element--work"
								contentStyle={{
									background: "rgb(33, 150, 243)",
									color: "#fff",
								}}
								contentArrowStyle={{
									borderRight: "7px solid  rgb(33, 150, 243)",
								}}
								date={format(
									item.updatedAtDatetime?.toDate(),
									constants?.dateFormat2
								)}
								// date={item.updatedAtDatetime.toString()}
								iconStyle={{ background: "rgb(33, 150, 243)", color: "#fff" }}
								icon={<FaAdjust />}
							>
								<MeterTimelineMedia media={item} />
							</VerticalTimelineElement>
						);
					}
					if (item.timelineType === "vending") {
						// console.log(`media item`, item)
						return (
							<VerticalTimelineElement
								key={index}
								className="vertical-timeline-element--work"
								contentStyle={{
									background: "#C6DE41",
									color: "#153B44",
								}}
								contentArrowStyle={{
									borderRight: "7px solid  rgb(33, 150, 243)",
								}}
								date={format(
									item.updatedAtDatetime?.toDate(),
									constants?.dateFormat2
								)}
								// date={item.updatedAtDatetime.toString()}
								iconStyle={{ background: "rgb(33, 150, 243)", color: "#fff" }}
								icon={<FaAdjust />}
							>
								<MeterTimelineVending vendingData={item} />
							</VerticalTimelineElement>
						);
					}
				})}
			</VerticalTimeline>
		</div>
	);
};

export default MeterTimeline;
