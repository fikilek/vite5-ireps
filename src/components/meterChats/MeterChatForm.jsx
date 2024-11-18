import { useRef, useState } from "react";
import { Timestamp, arrayUnion } from "firebase/firestore";
import { v4 as uuidv4 } from "uuid";

// css
import "@/components/meterChats/MeterChatForm.css";

// custom hooks
import useAutosizeTextArea from "@/hooks/useAutosizeTextArea.jsx";
import useAuthContext from "@/hooks/useAuthContext.jsx";
import { useFirestore_ } from "@/hooks/useFirestore_.jsx";

// context

// components

const MeterChatForm = (props) => {
	// console.log(`props`, props);
	const { ast } = props;
	// console.log(`ast`, ast);

	const astId = ast?.astData?.astId;
	// console.log(`astId`, astId)

	const { user } = useAuthContext();
	// console.log(`user`, user);

	const [value, setValue] = useState("");
	// console.log(`value`, value);

	const textAreaRef = useRef(null);

	useAutosizeTextArea(textAreaRef.current, value);

	const { updateDocument, getDocument } = useFirestore_("asts");

	const handleChange = (e) => {
		const val = e.target?.value;
		// console.log(`val`, val);
		setValue(val);
	};

	const disabled = value ? false : true;

	const onSubmit = () => {
		const chatContent = {
			chatId: uuidv4(),
			updatedAtDatetime: Timestamp.now(),
			updatedByUser:user.displayName,
			updatedByUid:  user.uid,
			chatContent: value,
			astId: astId,
		};
		// console.log(`chatContent`, chatContent);

		const docToUpdate = {
			chats: arrayUnion(chatContent),
		};

		updateDocument(docToUpdate, astId).then(async (result) => {
			// console.log(`update result`, result);
			if (result.success) {
				// console.log(`chat uploaded to the server`);
				setValue("");
			}
			if (!result.success) {
				console.log(`chat upload failed`, result.msg);
			}
		});
	};

	return (
		<div className="meter-chat-form">
			<button
				onClick={() => setValue("")}
				className={disabled ? "disabled" : ""}
				disabled={disabled}
			>
				Clear
			</button>
			<textarea
				className="textarea"
				onChange={handleChange}
				placeholder="type message"
				ref={textAreaRef}
				rows={1}
				value={value}
			/>
			<button
				onClick={onSubmit}
				className={disabled ? "disabled" : ""}
				disabled={disabled}
			>
				Submit
			</button>
		</div>
	);
};

export default MeterChatForm;
