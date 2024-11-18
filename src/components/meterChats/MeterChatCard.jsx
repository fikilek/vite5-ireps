import { format } from "date-fns";
import { constants } from "@/utils/utils";

import "@/components/meterChats/MeterChatCard.css";

// hooks
import useAuthContext from "@/hooks/useAuthContext.jsx";

const MeterChatCard = (props) => {
	// console.log(`ast`, ast);
	const { chat } = props;
	// console.log(`props`, props);
	const { updatedByUser, chatContent, updatedAtDatetime, updatedByUid: userUid } = chat;
	// console.log(`userUid`, userUid)

	const { user } = useAuthContext();
	// console.log(`user`, user);

	const {uid} = user
	// console.log(`uid`, uid)

	const chatter = userUid === uid ? 'self' : 'other'
	
	return (
		<div className={`meter-chat-card ${chatter}`}>
			<p className="user">{updatedByUser}</p>
			<p className="content">{chatContent}</p>
			<p className="datetime">
				{updatedAtDatetime && format(updatedAtDatetime?.toDate(), constants?.dateFormat2)}
			</p>
		</div>
	);
};

export default MeterChatCard;
