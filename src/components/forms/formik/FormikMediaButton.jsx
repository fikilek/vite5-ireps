import { useContext, useEffect } from "react";
import { Field } from "formik";

import "@/components/forms/formik/FormikMediaButton.css";

import { MediaContext } from "@/contexts/MediaContext";

const FormikMediaButton = props => {

	const { label, name, ml1, ...rest } = props;

	const { mediaData, setMediaData } = useContext(MediaContext);

	useEffect(() => {
		return () => {
			setMediaData({
				data: [], //media data (erf media or ast media)
				isMediaOpened: false,
				ml1: "",
				activeMediaAction: null,
				erfData: [],
				ast: [],
				trn: [],
				displayPosition: 0,
			});
		};
	}, [setMediaData]);

	const handleClick = (e, trn) => {
		e.preventDefault();

		const mediaCat = name.split(".")[name.split(".").length - 1];
		// console.log(`mediaCat`, mediaCat);

		setMediaData({
			...mediaData,
			trn: trn,
			isMediaOpened: true,
			ml1,
			mediaCat,
		});
	};
	return (
		<div className={`form-control ${name} formik-media-btn`}>
			<Field name={name} {...rest}>
				{formik => {
					return (
						<button className="media-cat-btn" onClick={e => handleClick(e, formik.form.values)}>
							<p className="media-cat-name">{label}</p>
						</button>
					);
				}}
			</Field>
		</div>
	);
};

export default FormikMediaButton;
