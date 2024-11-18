import "@/components/meterChats/MeterChat.css";

import MeterChatHeader from "@/components/meterChats/MeterChatHeader";
import MeterChats from "@/components/meterChats/MeterChats";
import MeterChatForm from "@/components/meterChats/MeterChatForm";
import IwNoDataToShow from '@/components/irepsInfoWindow/IwNoDataToShow'

const MeterChat = (props) => {
	// console.log(`props`, props);

	const { ast, setAst } = props;
	// console.log(`assets`, assets);

	const {chats} = ast
	// console.log(`chats`, chats);

	if (!chats) {
		return (
			<div className="meter-chat">
				<IwNoDataToShow title='Oops' msg='No chats available'/>
				<MeterChatForm ast={ast} setAst={setAst} />
			</div>
		);
	} else {
		return (
			<div className="meter-chat">
				<MeterChatHeader />
				<MeterChats chats={chats} ast={ast} />
				<MeterChatForm ast={ast} setAst={setAst} />
			</div>
		);
	}
};

export default MeterChat;
