import "@/components/meterChats/MeterChats.css";

import MeterChatCard from "@/components/meterChats/MeterChatCard";

const MeterChats = (props) => {
	const { chats, ast } = props;
	// console.log(`chats`, chats)
	// console.log(`ast`, ast)

	return (
		<div className="meter-chats" >
			<div className="chats">
				{chats?.map((chat) => {
					return <MeterChatCard key={chat?.chatId} chat={chat} ast={ast}   />;
				})}
			</div>
		</div>
	);
};

export default MeterChats;
