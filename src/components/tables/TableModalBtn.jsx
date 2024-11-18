import "@/components/tables/TableModalBtn.css";

import useModal from "@/hooks/useModal.jsx";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

const TableModalBtn = (props) => {
	// console.log(`props`, props);

	const [erfError, setErfError] = useState(null);
	// console.log(`erfError`, erfError);

	const {
		modalName,
		data,
		infoName,
		irepsKeyItem,
		width,
		validationSchema,
		displayMode,
		title,
		tableBtnClass,
		columnName,
	} = props.data;
	// console.log(`data`, data);

	const { modalName: modName } = props;
	// console.log(`modalName`, modalName);
	// console.log(`validationSchema`, validationSchema);
	// console.log(`columnName`, columnName);

	const tType = modName?.split("-")?.[1];
	// console.log(`tType`, tType);

	const astCatergory = data?.astData?.astCatergory;
	// console.log(`astCatergory`, astCatergory);

	const state = data?.astData?.astState?.state;
	const tid = data?.astData?.astState?.tid;
	// console.log(`state`, state);

	const disableBtn =
		astCatergory === "meter" && state === "stores" ? true : false;
	// console.log(`disableBtn`, disableBtn)

	let tidDone = false;
	if (tid) {
		if (tid.toLowerCase().replace(/ /g, "") === "krn2") {
			tidDone =
				astCatergory === "meter" && columnName === "tidTrn" ? true : false;
			// console.log(`tidDone`, tidDone);
		}
	}

	useEffect(() => {
		if (erfError) {
			// console.log(`erfError`, erfError.erfError);
			toast.error(`${erfError.erfError}`, {
				position: "top-right",
			});
		}
		return () => setErfError(null);
	}, [erfError]);

	const { openModal } = useModal();
	const handleClick = (e) => {
		// TODO: refactor and move the property type guard and customer adr guard code to useTrns

		// console.log(`data`, data);
		// check if erf property type and erf adr (systemAdr or street) have been completed.

		// retrieve trnType
		const { trnType, trnState } = data?.metadata;
		// console.log(`trnType`, trnType);

		if (
			(trnType === "audit" || trnType === "installation") &&
			trnState === "draft"
		) {
			// extract propertyType.type
			const type = data?.erf?.propertyType?.type;
			// console.log( `type`, type)

			// extract address.systemAdr from data
			const systemAdr = data?.erf?.address?.systemAdr;
			// console.log( `systemAdr`, systemAdr)

			// extract address.street from data
			const street = data?.erf?.address?.street;
			// console.log( `street`, street)

			// check 1: if type is null flag an error,  property type cannot be null
			if (type === "" || type === null || type === undefined) {
				// property type is empty

				// console.log(`erfNo:[${data?.erf?.erfNo}] - Property type:[${type}]`)
				setErfError((prev) => {
					return {
						...prev,
						erfError: `Erf No: ${data?.erf?.erfNo} Error. Please complete Property Type.`,
					};
				});
				// console.log(`Erf No: ${data?.erf?.erfNo} error`, erfError);
				return;
			}

			// check 2: if both systemAdr and street are null, flag an error. they cannot both be null
			if (
				(systemAdr === "" || systemAdr === null || systemAdr === undefined) &&
				(street === "" || street === null || street === undefined)
			) {
				// bot systemAdr and street and empty or null. This is an error.

				// console.log(
				// 	`Erf No: ${data?.erf?.erfNo} Error - systemAdr:[${systemAdr} street:[${street}]]`
				// );
				setErfError((prev) => {
					return {
						...prev,
						erfError: `Erf No: ${data?.erf?.erfNo} Error. Please complete either Google Adr or Street Adr]`,
					};
				});
				// console.log(`Erf No: ${data?.erf?.erfNo} Error`, erfError);
				return;
			}

			// check 3: if systemAdr is 'google adr not available' and street is null, flag an error, if systemAdr is 'google adr not available', street cannot be null.
			if (
				systemAdr === "Google Adr Not Available" &&
				(street === "" || street === null || street === undefined)
			) {
				// bot systemAdr and street and empty or null. This is an error.

				// console.log(
				// 	`Erf No: ${data?.erf?.erf?.erfNo} Error - systemAdr:[${systemAdr} street:[${street}]]`
				// );
				setErfError((prev) => {
					return {
						...prev,
						erfError: `Erf No: ${data?.erf?.erfNo} Error. When Google Adr is not available. Street Adr is required]`,
					};
				});
				// console.log(`Erf No: ${data?.erf?.erfNo} Error`, erfError);
				return;
			}
		}

		openModal({
			modalName: modName ? modName : modalName,
			payload: {
				data,
				infoName,
				irepsKeyItem,
				width,
				validationSchema: validationSchema?.[tType],
				displayMode,
				tableBtnClass,
			},
		});
	};
	return (
		<div className="table-modal-btn">
			<button
				// className={`table-btn ${tableBtnClass}`}
				className={`table-btn ${disableBtn ? "disable-btn" : ""}   ${
					tidDone ? "tidBtn" : ""
				}`}
				onClick={handleClick}
				style={{ width: width }}
				title={title}
				disabled={disableBtn || tidDone}
			>
				{props.children}
			</button>
		</div>
	);
};

export default TableModalBtn;
