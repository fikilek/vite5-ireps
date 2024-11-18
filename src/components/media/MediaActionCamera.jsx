import { useCallback, useContext, useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";
import Webcam from "react-webcam";
import { ClipLoader } from "react-spinners";
import { format } from "date-fns";
import { BsSend } from "react-icons/bs";

// css
import "@/components/media/MediaActionCamera.css";

// custom hooks
import useGeoLocation from "@/hooks/useGeolocation.jsx";
import useStorage from "@/hooks/useStorage.jsx";
import useImage from "@/hooks/useImage.jsx";

// contexts
import useAuthContext from "@/hooks/useAuthContext.jsx";
import { MediaContext } from "@/contexts/MediaContext.jsx";

// components
import { constants, irepsDictionary, irepsIcons } from "@/utils/utils";
import MediaActionBtn from "@/components/media/MediaActionBtn";
import WindowCloseBtn from "@/components/irepsInfoWindow/WindowCloseBtn";

const videoConstraints = {
	facingMode: "user",
};

const MediaActionCamera = props => {
	// console.log(`props`, props);
	const { data } = props;
	// console.log(`data`, data);

	const { irepsKeyItem } = data;

	let keyItem;
	let id;
	if (irepsKeyItem === "trns") {
		keyItem = "asts";
		id = data.data.astData.astId;
	}
	if (irepsKeyItem === "erfs") {
		keyItem = "erfs";
		id = data.data.id;
	}
	// console.log(`keyItem`, keyItem);
	// console.log(`id`, id);

	const webcamRef = useRef(null);

	const { uploadFile, url, error: storageError } = useStorage(data);
	// console.log(`progress`, progress);
	// console.log(`url`, url);
	// console.log(`storageError`, storageError);
	// const [selectedDevice, setSelectedDevice] = useState(null);
	// console.log(`selectedDevice`, selectedDevice);

	// const [file, setFile] = useState(null);
	const [imgFile, setImgFile] = useState(null);
	// console.log(`imgFile`, imgFile);

	const [resizedBase64URL, setResizedBase64URL] = useState(null);
	// console.log(`resizedBase64URL`, resizedBase64URL);

	const [isPending, setIsPending] = useState(null);
	// console.log(`isPending`, isPending);

	const [mediaMetadata, setMediaMetadata] = useState({});
	// console.log(`mediaMetadata`, mediaMetadata);

	// video constraints
	const [vc, setVc] = useState(videoConstraints);

	const { user } = useAuthContext();

	const { resizeImg, getBase64URL } = useImage();

	const { mediaData, setMediaData } = useContext(MediaContext);
	// console.log(`mediaData`, mediaData);

	const { mediaCat, trnId } = mediaData;
	// console.log(`mediaCat`, mediaCat);

	const { userLocation } = useGeoLocation();

	const captureImage = useCallback(
		e => {
			const imageSrc = webcamRef.current.getScreenshot();
			setImgFile(prev => imageSrc);

			const metaData = {
				// erfId: data.data.id,
				// erfNo: data.data.erfNo,
				// contentType: file?.type,
				// TODO: revisit - mediaType should not be hardcoded
				mediaType: "image/jpeg",
				// TODO: revisit - mediaCategory should not be hardcoded
				mediaCategory: mediaCat, // eg meter no photo, meter serail no photo , etc
				createdByUser: user.displayName,
				createdByUid: user.uid,
				createdAtDatetime: format(new Date(), constants.dateFormat2),
				createdAtLocation: {
					lat: userLocation?.coordinates?.lat,
					lng: userLocation?.coordinates?.lng,
				},
			};

			// erf case
			if (irepsKeyItem === "erfs") {
				setMediaMetadata({
					...metaData,
					erfId: data.data.id,
					erfNo: data.data.erfNo,
				});
			}
			// ast case from trn
			else if (irepsKeyItem === "trns") {
				setMediaMetadata({
					...metaData,
					astId: data.data.astData.astId,
					astNo: data.data.astData.astNo,
					trnId,
				});
			} else {
				console.log(`throw error`);
			}
		},
		[
			data.erfNo,
			data.id,
			user.displayName,
			user.uid,
			userLocation?.coordinates?.lat,
			userLocation?.coordinates?.lng,
		]
	);

	const closeMediaAction = e => {
		setMediaData({
			...mediaData,
			activeMediaAction: null,
		});
	};

	useEffect(() => {
		resizeImg(imgFile, 1200, true, mediaMetadata).then(blob => {
			// console.log(`blob`, blob);
			if (imgFile) {
				getBase64URL(blob).then(resizedFile => {
					// console.log(`resizedFile`, resizedFile);
					setResizedBase64URL(resizedFile);
				});
			}
		});
	}, [imgFile, mediaData, getBase64URL, mediaMetadata, resizeImg]);

	const uploadMedia = e => {
		// Check id data is ready for upload.
		// console.log(`uploading camera`, e);

		if (!mediaMetadata.createdAtLocation.lat) {
			toast.error(`Cannot upload without user Gps coordinates.`, {
				position: "top-right",
			});
			return null;
		}
		setIsPending(true);
		uploadFile(resizedBase64URL, keyItem, id, mediaMetadata, "image");
	};

	useEffect(() => {
		// console.log(`url`, url);
		if (Boolean(url) || storageError) {
			setIsPending(false);
			// remove file - this will remove image from MediaActionCamera window
			setImgFile(null);
			// hide MediaActionCamera window
			setMediaData({
				...mediaData,
				activeMediaAction: null,
			});
		}
		if (storageError) {
			toast.error(`Storage Error : ${storageError}`, {
				position: "top-right",
			});
		} // free memory when ever this component is unmounted
		return () => {
			setResizedBase64URL(null);
			// setBase64URL(null);
		};
	}, [url, storageError, mediaData, setMediaData]);

	const discard = e => {
		// console.log(`discard`);
		setImgFile("");
		setResizedBase64URL("");
	};

	const chooseDevice = e => {
		// console.log(`e.currentTarget.id`, e.currentTarget.id);
		setVc({
			...vc,
			facingMode:
				e.currentTarget.id === "front" ? "user" : { exact: "environment" },
		});
	};

	return (
		<div className="media-action-camera">
			<div className="media-catergory">
				<p className="media-cat">
					Take {irepsDictionary.get(mediaData.mediaCat)} Photo
				</p>
			</div>
			{resizedBase64URL ? (
				<div className="macpp resized">
					{resizedBase64URL && (
						<>
							<img
								className="img-preview"
								width={150}
								height={150}
								src={resizedBase64URL}
								alt="resizedBase64URL"
							/>
						</>
					)}
				</div>
			) : (
				<div className="macpp original">
					<Webcam
						className="webcam"
						width={400}
						height={400}
						ref={webcamRef}
						videoConstraints={vc}
						screenshotFormat="image/jpeg"
					/>
				</div>
			)}

			<div className="mac mac-control-bar">
				<div className="maccb maccb-left">
					{!imgFile && (
						<MediaActionBtn
							id={""}
							actionClassname={""}
							title={"click to take a photo"}
							clickHanderFunction={captureImage}
							actionIcon={irepsIcons.ICON_CAMERA_SHOOT}
							color={"blue"}
						/>
					)}

					{/* discard the photo taken taken if not desired */}
					{imgFile && (
						<MediaActionBtn
							id={""}
							actionClassname={""}
							title={"click to discard"}
							clickHanderFunction={discard}
							actionIcon={irepsIcons.ICON_DELETE}
							color={"brown"}
						/>
					)}

					<>
						<MediaActionBtn
							id={"selfie"}
							actionClassname={""}
							title={"SELFIE photo"}
							clickHanderFunction={chooseDevice}
							actionIcon={irepsIcons.ICON_CAMERA_SELFIE}
							color={"green"}
						/>

						{/* Choose selfie camera */}
						<MediaActionBtn
							id={"front"}
							actionClassname={""}
							title={"FRONT photo"}
							clickHanderFunction={chooseDevice}
							actionIcon={irepsIcons.ICON_CAMERA_FRONT2}
							color={"purple"}
						/>
					</>
				</div>

				<div className="maccb maccb-right">
					{resizedBase64URL && (
						<>
							<button
								disabled={!Boolean(imgFile)}
								// title={title}
								className="mab btn-submit-form"
								type="button"
								onClick={uploadMedia}
							>
								{isPending ? (
									<ClipLoader
										color={"#F86F03"}
										loading={isPending < 100}
										size={20}
										aria-label="Loading Spinner"
										data-testid="loader"
									/>
								) : (
									<BsSend />
								)}
							</button>
						</>
					)}
					<WindowCloseBtn handleClose={closeMediaAction} />
				</div>
			</div>
		</div>
	);
};

export default MediaActionCamera;

{
	/* <button onClick={chooseDevice} className={`device${index}`} id={index}>
	<span className="label">{`Camera_${index}`}</span>
	<IconContext.Provider value={{ color: "yellow" }}>
		<TbCameraSelfie />
	</IconContext.Provider>
</button>; */
}

// <div className="mac mac-control-bar">
// 	<div className="maccb maccb-left">
// 		{!imgFile && (
// 			<button onClick={captureImage}>
// 				<IconContext.Provider value={{ color: "blue" }}>
// 					<MdCamera />
// 				</IconContext.Provider>
// 			</button>
// 		)}

// 		{/* discard the photo taken taken if not desired */}
// 		{imgFile && (
// 			<button onClick={discard}>
// 				<IconContext.Provider value={{ color: "brown" }}>
// 					<VscDiscard />
// 				</IconContext.Provider>
// 			</button>
// 		)}

// 		{devices?.length > 1 &&
// 			devices?.map((device, index) => {
// 				return (
// 					<button onClick={chooseDevice} className={`device${index}`} id={index}>
// 						<span className="label">{`Camera_${index}`}</span>
// 						<IconContext.Provider value={{ color: "yellow" }}>
// 							{/* {iconSelection[index]} */}
// 							<TbCameraSelfie />
// 						</IconContext.Provider>
// 					</button>
// 				);
// 			})}
// 	</div>

// 	<div className="maccb maccb-right">
// 		{resizedBase64URL && (
// 			<>
// 				<button
// 					disabled={!Boolean(imgFile)}
// 					// title={title}
// 					className="form-btn btn-submit-form"
// 					type="button"
// 					onClick={uploadMedia}
// 				>
// 					{isPending ? (
// 						<ClipLoader
// 							color={"#F86F03"}
// 							loading={isPending < 100}
// 							size={20}
// 							aria-label="Loading Spinner"
// 							data-testid="loader"
// 						/>
// 					) : (
// 						<BsSend />
// 					)}
// 				</button>
// 			</>
// 		)}

// 		<button type="button" className="mac-btn" onClick={closeMediaAction}>
// 			X
// 		</button>
// 	</div>
// </div>;
