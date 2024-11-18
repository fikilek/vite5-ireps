import { Field } from "formik";
import { useContext } from "react";

import "@/components/forms/formik/FormikReverseGeocodeButton.css";

import { ReverseGeocodingContext } from "@/contexts/ReverseGeocodingContext";

const FormikReverseGeocodeButton = props => {
	// console.log(`FormikReverseGeocodeButton props`, props);
	const { label, name, ...rest } = props;

	// get reverse geocoding context
	const { rgcData, setRgcData } = useContext(ReverseGeocodingContext);
	// console.log(`rgcData`, rgcData)

	const handleClick = (e, pprops) => {
		e.preventDefault();
		// console.log(`e.target`, e.target);
		// console.log(`pprops`, pprops);
		// const { field, meta, form } = props;

		// open geocoding modal
		setRgcData(prev => {
			return {
				...prev,
				isOpened: true,
				data: pprops,
			};
		});
	};
	return (
		<div className={`form-control ${name} `}>
			<Field name={name} {...rest}>
				{props => {
					// console.log(`props`, props);
					const { field, meta, form } = props;
					// console.log(`mediaCat`, mediaCat, field.value.length)
					// console.log(`form.values`, form.values)
					return (
						<button
							className="reverse-geocoding-btn"
							onClick={e => handleClick(e, props)}
						>
							{/* <p className="geocoding-btn-p">{field?.value}</p> */}
							<p className="geocoding-btn-p">
								{meta.value ? meta.value : "Google Address"}{" "}
							</p>
						</button>
					);
				}}
			</Field>
			{/* <label className={`label `} htmlFor={name}>
				{label}
			</label> */}
		</div>
	);
};

export default FormikReverseGeocodeButton;
