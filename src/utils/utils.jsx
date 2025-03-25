//  functions

import {
	MdCamera,
	MdOutlineDeleteForever,
	MdOutlinePhotoCameraFront,
	MdOutlineSettingsVoice,
} from "react-icons/md";
import { TbCameraSelfie, TbSum } from "react-icons/tb";
import { ClockLoader } from "react-spinners";
import { AiOutlineAudio, AiOutlinePicture } from "react-icons/ai";
import { IoPlaySkipForwardOutline, IoVideocamOutline } from "react-icons/io5";
import {
	FaCamera,
	FaMapMarkedAlt,
	FaPlay,
	FaRegFileVideo,
} from "react-icons/fa";
import { BsStopCircle, BsTerminalSplit } from "react-icons/bs";
import { GiDoorHandle } from "react-icons/gi";
import { VscDiscard } from "react-icons/vsc";
import { IoIosRecording } from "react-icons/io";
import { BiSolidVideoRecording, BiVideoRecording } from "react-icons/bi";
import { FcPicture } from "react-icons/fc";
import { RiDraftLine } from "react-icons/ri";

export const capitalizeFirstLetter = (string) => {
	if (!string) return;
	return string.charAt(0).toUpperCase() + string.slice(1);
};

// capitalize first letter of surname, name and nickName
export const capitalizeFirstLetters = (obj) => {
	for (const property in obj) {
		if (
			property === "surname" ||
			property === "name" ||
			property === "nickName"
		) {
			const newStr = capitalizeFirstLetter(obj[property]);
			obj = {
				...obj,
				[property]: newStr,
			};
		}
	}
	return obj;
};

export const capitalizeInitialsString = (str) => {
	if (!str) return;
	// split str into an array of substrings
	const arrayOfStr = str.split(" ");

	// Concat the array elements
	let newStr = "";
	arrayOfStr?.forEach((str) => {
		newStr = newStr + str.charAt(0).toUpperCase();
	});
	return newStr;
};

// constants
export const constants = {
	dateFormat0: "yyyy MMM dd",
	dateFormat1: "yyyy MMM dd: HH:mm",
	dateFormat2: "yyyy-MMM-dd_HH:mm:ss",
	dateFormat3: "yy MMM dd",
};

// loaders
export const loader = (
	<div
		style={{
			display: "flex",
			justifyContent: "space-between",
			alignItems: "center",
			width: "100%",
			height: "100%",
		}}
	>
		<ClockLoader
			color="blue"
			loading={true}
			size={150}
			aria-label="Loading Spinner"
			data-testid="loader"
			cssOverride={{
				margin: "auto",
			}}
		/>
	</div>
);

// auth
export const userRoles = [
	{ key: "guest", abbreviation: "GST", name: "Guest" },
	{ key: "fieldworker", abbreviation: "FWR", name: "Field Worker" },
	{ key: "supervisor", abbreviation: "SPV", name: "Supervisor" },
	{ key: "manager", abbreviation: "MNG", name: "Manager" },
	{ key: "superuser", abbreviation: "SPU", name: "Super User" },
];

// erf
export const formSelectOptions = {
	propertyTypeOptions: [
		{ key: "choose", value: "choose" },
		{ key: "Business/Commercial", value: "Business/Commercial" },
		{ key: "Residential (t/ship)", value: "Residential (t/ship)" },
		{ key: "Residential (suburb)", value: "Residential (suburb)" },
		{ key: "Government", value: "Government" },
		{ key: "School", value: "School" },
		{ key: "Hospital", value: "Hospital" },
		{ key: "Flats/Complex/Estate", value: "Flats/Complex/Estate" },
		{ key: "Vacant Stand", value: "Vacant Stand" },
		{ key: "Municipality", value: "Municipality" },
		{ key: "Church", value: "Church" },
		{
			key: "Building Under Construction",
			value: "Building Under Construction",
		},
	],
	sealCommentOptions: [
		{ key: "choose", value: "choose" },
		{ key: "seal has no seal no", value: "seal has no seal no" },
		{ key: "seal hard to read", value: "seal no hard to read" },
		{ key: "seal missing", value: "seal missing" },
		{
			key: "Meter could not be sealed - Seal holes blocked",
			value: "Meter could not be sealed - Seal holes blocked",
		},
	],
	anomaliesOptions: [
		{ key: "choose", value: "choose" },
		{ key: "Meter Ok", value: "Meter Ok" },
		{ key: "Meter Damaged", value: "Meter Damaged" },
		{ key: "Meter Faulty", value: "Meter Faulty" },
		{ key: "Meter Illegally Connected", value: "Meter Illegally Connected" },
		{ key: "Meter Missing", value: "Meter Missing" },
	],
	tariffOptions: [
		{ key: "choose", value: "choose" },
		{ key: "Tariff 1", value: "Tariff 1" },
		{ key: "Tariff 2", value: "Tariff 2" },
	],
	krnOptions: [
		{ key: "choose", value: "choose" },
		{ key: "KRN 1", value: "KRN 1" },
		{ key: "KRN 2", value: "KRN 2" },
	],

	rolloverDoneCommentOptions: [
		{ key: "choose", value: "choose" },
		{ key: "comment1", value: "comment1" },
		{ key: "comment2", value: "comment2" },
		{ key: "comment3", value: "comment3" },
		{ key: "comment4", value: "comment4" },
	],

	keyPadNoAccessOptions: [
		{ key: "choose", value: "choose" },
		{ key: "gate locked", value: "gate locked" },
		{ key: "property locked", value: "property locked" },
		{ key: "occupant refused access", value: "occupant refused access" },
		{ key: "dogs danger", value: "dogs danger" },
		{ key: "resident not available", value: "resident not available" },
		{ key: "meter removed / missing", value: "meter removed / missing" },
	],

	erfStatusOptions: [
		{ key: "choose", value: "choose" },
		{ key: "developed", value: "developed" },
		{ key: "empty", value: "empty" },
		{ key: "vandalised", value: "vandalised" },
	],
	disconnectionLevelOptions: [
		{ key: "choose", value: "choose" },
		{ key: "Level 1", value: "Level 1" },
		{ key: "Level 2", value: "Level 2" },
		{ key: "Level 3", value: "Level 3" },
	],

	countryOptions: [
		{ key: "choose", value: "choose" },
		{ key: "South Africa", value: "South Africa" },
		{ key: "China", value: "China" },
		{ key: "Russia", value: "Russia" },
	],

	provinceOptions: [
		{ key: "choose", value: "choose" },
		{ key: "Eastern Cape", value: "Eastern Cape" },
		{ key: "Gauteng", value: "Gauteng" },
		{ key: "KZN", value: "KZN" },
		{ key: "Limpompo", value: "Limpompo" },
		{ key: "North West", value: "North West" },
		{ key: "Western Cape", value: "Western Cape" },
		{ key: " Cape", value: " Cape" },
	],

	dmOptions: [
		{ key: "choose", value: "choose" },
		{ key: "Chris Hani", value: "Chris Hani" },
		{ key: "O R Tambo", value: "O R Tambo" },
		{ key: "Amathole", value: "Amathole" },
	],

	lmMetroOptions: [
		{ key: "choose", value: "choose" },
		{ key: "Enock Mgijima", value: "Enock Mgijima" },
		{ key: "KSD", value: "KSD" },
		{ key: "eDumbe", value: "eDumbe" },
		{ key: "eMvoti", value: "eMvoti" },
		{ key: "Ekurhuleni", value: "Ekurhuleni Metro" },
		{ key: "CoJ Metro", value: "CoJ Metro" },
		{ key: "Tshwane Metro", value: "Tshwane Metro" },
		{ key: "Mnquma", value: "Mnquma" },
	],

	townOptions: [
		{ key: "choose", value: "choose" },
		{ key: "Gcuwa", value: "Gcuwa" },
		{ key: "Mthatha", value: "Mthatha" },
		{ key: "East London", value: "East London" },
		{ key: "Queenstown", value: "Queenstown" },
		{ key: "Tarkastad", value: "Tarkastad" },
		{ key: "Hofmeyer", value: "Hofmeyer" },
		{ key: "Paulpietersburg", value: "Paulpietersburg" },
		{ key: "", value: "" },
	],

	poletypeOptions: [
		{ key: "choose", value: "choose" },
		{ key: "wood", value: "wood" },
		{ key: "metal", value: "metal" },
		{ key: "pvc", value: "pvc" },
	],

	goodBadOptions: [
		{ key: "choose", value: "choose" },
		{ key: "good", value: "good" },
		{ key: "bad", value: "bad" },
		{ key: "average", value: "average" },
	],

	cbPoleOpprotions: [
		{ key: "choose", value: "choose" },
		{ key: "single pole", value: "single pole" },
		{ key: "double pole", value: "double pole" },
	],

	trnConfirmationOptions: [
		// { key: "choose", value: "choose" },
		{ key: "done", value: "done" },
		{ key: "not done", value: "not done" },
	],

	serviceConnectionEntryOptions: [
		{ key: "choose", value: "choose" },
		{ key: "overhead", value: "overhead" },
		{ key: "underground", value: "underground" },
	],

	serviceConnectionStatusOptions: [
		{ key: "choose", value: "choose" },
		{ key: "Connected", value: "Connected" },
		{
			key: "Disconnected (By Credit Control)",
			value: "Disconnected (By Credit Control)",
		},
		{
			key: "Disconnected (By Municipality)",
			value: "Disconnected (By Municipality)",
		},
		{ key: "Blocked By Municipality", value: "Blocked By Municipality" },
		{ key: "Old Meter (Not In Use)", value: "Old Meter (Not In Use)" },
		{
			key: "Incomplete Service Point",
			value: "Incomplete Service Point",
		},
	],

	yesNoOptions: [
		{ key: "choose", value: "choose" },
		{ key: "yes", value: "yes" },
		{ key: "no", value: "no" },
	],

	yesNoNotSureOptions: [
		{ key: "choose", value: "choose" },
		{ key: "yes", value: "yes" },
		{ key: "no", value: "no" },
		{ key: "no sure", value: "no sure" },
	],

	astLocationPremisesOptions: [
		{ key: "choose", value: "choose" },
		{ key: "inside", value: "inside" },
		{ key: "outside", value: "outside" },
	],

	astLocationPlacementOptions: [
		{ key: "choose", value: "choose" },
		{ key: "Pole Top", value: "Pole Top" },
		{ key: "Pole Bottom", value: "Pole Bottom" },
		{ key: "Kiosk", value: "Kiosk" },
		{ key: "Meter Room", value: "Meter Room" },
		{ key: "Indoors", value: "Indoors" },
		{ key: "House Wall Outside", value: "House Wall Outside" },
		{ key: "Boundary Wall (Outside)", value: "Boundary Wall (Outside)" },
		{ key: "Boundary Wall (Inside)", value: "Boundary Wall (Inside)" },
	],

	meterTypeOptions: [
		{ key: "choose", value: "choose" },
		{ key: "pre-paid", value: "pre-paid" },
		{ key: "conventional", value: "conventional" },
	],

	meterPhaseOptions: [
		{ key: "choose", value: "choose" },
		{ key: "single", value: "single" },
		{ key: "three", value: "three" },
	],

	astExactLocationOptions: [
		{ key: "choose", value: "choose" },
		{ key: "poleBottom", value: "poleBottom" },
		{ key: "poleTop", value: "poleTop" },
		{ key: "standAlone", value: "standAlone" },
		{ key: "building wall", value: "building wall" },
		{ key: "boundary wall", value: "boundary wall" },
	],

	confirmInstallationDataOptions: [
		{ key: "choose", value: "choose" },
		{ key: "confirmed correct", value: "confirmed correct" },
		{ key: "data wrong", value: "data wrong" },
	],

	genderOptions: [
		{ key: "choose", value: "choose" },
		{ key: "male", value: "male" },
		{ key: "female", value: "female" },
		{ key: "none", value: "none" },
	],

	customerCartegoryOptions: [
		{ key: "choose", value: "choose" },
		{ key: "owner", value: "owner" },
		{ key: "occupant", value: "occupant" },
	],

	customerTypeOptions: [
		{ key: "choose", value: "choose" },
		{ key: "warm body", value: "warm body" },
		{ key: "juristic person", value: "juristic person" },
	],

	standUseOptions: [
		{ key: "choose", value: "choose" },
		{ key: "residential suburb", value: "residential suburb" },
		{ key: "residential township", value: "residential township" },
		{ key: "business", value: "business" },
		{ key: "church", value: "church" },
		{ key: "government", value: "government" },
	],

	poleHasLampOptions: [
		{ key: "choose", value: "choose" },
		{ key: "yes", value: "yes" },
		{ key: "no", value: "no" },
	],

	poleTypeOptions: [
		{ key: "choose", value: "choose" },
		{ key: "wood", value: "wood" },
		{ key: "cement", value: "cement" },
		{ key: "metal", value: "metal" },
	],

	poleConditionOptions: [
		{ key: "choose", value: "choose" },
		{ key: "good", value: "good" },
		{ key: "leaning", value: "leaning" },
		{ key: "burned", value: "burned" },
		{ key: "bad", value: "bad" },
	],

	boxTypeOptions: [
		{ key: "choose", value: "choose" },
		{ key: "fiberglass", value: "fiberglass" },
		{ key: "metal", value: "metal" },
		{ key: "pvc", value: "pvc" },
	],

	boxLocationOptions: [
		{ key: "choose", value: "choose" },
		{ key: "pole top", value: "pole top" },
		{ key: "pole bottom", value: "pole bottom" },
		{ key: "stand alone", value: "stand alone" },
	],
	cbCommentsOptions: [
		{ key: "choose", value: "choose" },
		{ key: "cb missing", value: "cb missing" },
		{ key: "cb removed", value: "cb removed" },
		{ key: "cb size not visible", value: "cb size not visible" },
		{ key: "cb maybe on pole top", value: "cb maybe on pole top" },
	],
	tidCommentsOptions: [
		{ key: "choose", value: "choose" },
		{ key: "Unsuccessful", value: "Unsuccessful" },
		{ key: "Successful - On Field", value: "Successful - On Field" },
		{ key: "Successful - From Factory", value: "Successful - From Factory" },
	],
	sgcOptions: [
		{ key: "choose", value: "choose" },
		{ key: "000686", value: "000686" }, //mpofani - mooiriver
		{ key: "008243", value: "008243" }, //vk - delmas
		{ key: "000393", value: "000393" }, //lesedi - heidelburg
	],
	tidStatusCommentOptions: [
		{ key: "choose", value: "choose" },
		{ key: "", value: "" },
	],
};

export const getAstCatMediaCat = (namePath) => {
	// namePath = namePath
	// 	.replaceAll("[", ".")
	// 	.replaceAll("]", ".")
	// 	.replaceAll("..", ".");
	const astCat = namePath
		.replaceAll("[", ".")
		.replaceAll("]", ".")
		.replaceAll("..", ".")
		.split(".");
	// .pop();

	const mediaCatStr = namePath
		.replaceAll("[", ".")
		.replaceAll("]", ".")
		.replaceAll("..", ".")
		.split(".")
		.pop();
	// console.log(`mediaCatStr`, mediaCatStr);
	const mediaCatName = mediaCatStr.substring(0, namePath.lastIndexOf("Media"));
	// console.log(`mediaCatName`, mediaCatName);

	const astCatMediaCat = `${astCat[1]} ${mediaCatName}`;
	// return mediaCatName;
	return { astCat: astCat[1], mediaCatName, astCatMediaCat };
};

export const irepsDictionary = new Map();
irepsDictionary.set("astNo", "Ast No");
irepsDictionary.set("ast", "Ast");
irepsDictionary.set("astNoMedia", "No");
irepsDictionary.set("temperMedia", "Temper");
irepsDictionary.set("meterReadingMedia", "Reading");
irepsDictionary.set("erfs", "Erfs");
irepsDictionary.set("audit", "Audit");
irepsDictionary.set("installation", "Installation");
irepsDictionary.set("inspection", "Inspection");

irepsDictionary.set("sizeMedia", "Size");
irepsDictionary.set("insideBox", "Inside Box");
irepsDictionary.set("insideBoxMedia", "Inside Box");
irepsDictionary.set("keyPadMedia", "Key Pad");
irepsDictionary.set("keyPad", "Key Pad");
irepsDictionary.set("asts", "Assets");
irepsDictionary.set("trns", "Transactions");
irepsDictionary.set("admin", "Admin");
irepsDictionary.set("meter", "Meter");
irepsDictionary.set("seal", "Seal");
irepsDictionary.set("cb", "Circuit Breaker");
irepsDictionary.set("users", "User");
irepsDictionary.set("systt", "System");
irepsDictionary.set("user-roles", "User Role");
irepsDictionary.set("tidKctTokens", "Tid Kct Token");

irepsDictionary.set("erfPhoto", "Erf Photo");
irepsDictionary.set("erfVideo", "Erf Video");
irepsDictionary.set("erfAudio", "Erf Audio");

irepsDictionary.set("voiceClips", "Voice Clips");
irepsDictionary.set("videoClips", "Video Clips");

irepsDictionary.set("meterDetail", "Meter Detail");
irepsDictionary.set("meterLocation", "Meter Location");
irepsDictionary.set("anomalies", "Anomalies");
irepsDictionary.set("keypad", "Keypad");
irepsDictionary.set("access", "Access");
irepsDictionary.set("meterDescription", "Meter Description");
irepsDictionary.set("serviceConnection", "Service Connection");

irepsDictionary.set("property-type", "Property Type");
irepsDictionary.set("customer-adr", "Customer Adr");
irepsDictionary.set("customer", "Customer");
irepsDictionary.set("customer-contact-person", "Contact Person");
irepsDictionary.set("billing", "Billing");
irepsDictionary.set("noAccess", "No Access");
irepsDictionary.set("anomaly", "Anomaly");
irepsDictionary.set("propertyType", "Property Type");
irepsDictionary.set("customerAdr", "Customer Adr");
irepsDictionary.set("billingAccounts", "Billing Accounts");
irepsDictionary.set("beforeAndAfter", "Tid Before and After");
irepsDictionary.set("tidOperation", "Tid Operation");
irepsDictionary.set("tid", "Tid");
irepsDictionary.set("installationData", "Installation Data");
irepsDictionary.set("activeArea", "Active Area");
irepsDictionary.set("reportStats", "Report Stats");
irepsDictionary.set("reportFilters", "Report Filters");
irepsDictionary.set("existingMeter", "Existing Meter");
irepsDictionary.set("inspectionData", "Inspection Data");
irepsDictionary.set("isMeterStillThere", "Existing Meter");
irepsDictionary.set("tempered", "Temper");
irepsDictionary.set("offGridPhoto", "Off Grid Supply");
irepsDictionary.set("tidStatus", "Tid Status");

export const irepsIcons = {
	ICON_TOTAL: <TbSum />,
	ICON_IMAGE1: <AiOutlinePicture />,
	ICON_IMAGE2: <FcPicture />,
	ICON_VOICE_CLIP: <MdOutlineSettingsVoice />,
	ICON_VIDEO_CLIP: <IoVideocamOutline />,
	ICON_DELETE: <MdOutlineDeleteForever />,
	ICON_MAP: <FaMapMarkedAlt />,
	ICON_SPLIT: <BsTerminalSplit />,
	ICON_PERMISSION: <GiDoorHandle />,
	ICON_START_RECORDING: <IoIosRecording />,
	ICON_STOP: <BsStopCircle />,
	ICON_DISCARD: <VscDiscard />,
	ICON_CAMERA_SELFIE: <TbCameraSelfie />,
	ICON_CAMERA_FRONT: <FaCamera />,
	ICON_CAMERA_FRONT2: <MdOutlinePhotoCameraFront />,
	ICON_START_VIDEO_RECORDING: <BiSolidVideoRecording />,
	ICON_VIDEO_RECORDING1: <BiSolidVideoRecording />,
	ICON_VIDEO_RECORDING2: <BiVideoRecording />,
	ICON_VIDEO_PLAYBACK1: <FaRegFileVideo />,
	ICON_CAMERA_SHOOT: <MdCamera />,
	ICON_AUDIO_PLAYBACK1: <AiOutlineAudio />,
	ICON_SAVE_DRAFT: <RiDraftLine />,
};

// IC - Ireps Contants
export const irepsConstants = {
	IC_DATE_FORMAT1: "yyyy-MMM-dd HH:mm",
	IC_DATE_FORMAT2: "yyyy-MMM-dd HH:mm:ss",
};

export const getAstCat = (fieldNameStr) => {
	// if (!gcData) return null;
	// let fieldNameStr = gcData?.data?.field?.name;
	if (!fieldNameStr) return null;
	// console.log(`fieldNameStr`, fieldNameStr);
	fieldNameStr = fieldNameStr?.replaceAll("[", ".");
	fieldNameStr = fieldNameStr?.replaceAll("]", ".");
	fieldNameStr = fieldNameStr?.replaceAll("..", ".");
	const fieldNameArray = fieldNameStr?.split(".");
	const astCategory = fieldNameArray[1];
	// console.log(`astCategory`, astCategory);
	return astCategory;
};

const choices = {
	"Meter Faulty": [
		"Not Accepting SGC Tokens",
		"Negative Credit Units",
		"Zero Readings Conventional Meter",
		"Meter Wheel Not Moving",
		"Meter Wheel Running In Reverse Mode",
	],
	"Meter Ok": ["Operationally Ok"],
	"Meter Damaged": [
		"Meter Number Unclear",
		"Meter Burnt",
		"Buttons Not Working",
		"Meter Broken",
		"Meter Display Blank",
		"Cable Stolen",
	],
	"Meter Illegally Connected": [
		"Straight Connection (Meter Bypassed)",
		"Bridge Wire on Meter",
	],
	"Meter Missing": [
		"Property Has Power (Illegal Connection)",
		"No Power Supply To Property",
		"Access Refused",
	],
	"Meter Disconneted": [
		"Property Has Power (Illegal Conection)",
		"No Power Supply To Property",
	],
};

export const updateFormState = async (formik, setFormState) => {
	// console.log(`formik`, formik);
	const { trnState } = formik?.values?.metadata;

	const { meterAccess } = await formik?.values?.access;
	// console.log(`meterAccess` , meterAccess)

	const { dirty, isValid } = formik;
	// console.log(`dirty` , dirty)
	// console.log(`isValid` , isValid)

	const newState =
		isValid && dirty && meterAccess === "yes" ? "valid" : trnState;
	// console.log(`newState` , newState)

	setFormState(newState);

	return { state: newState };
};

export const getRandomColor = () => {
	var letters = "0123456789ABCDEF";
	var color = "#";
	for (var i = 0; i < 6; i++) {
		color += letters[Math.floor(Math.random() * 16)];
	}
	return color;
};
