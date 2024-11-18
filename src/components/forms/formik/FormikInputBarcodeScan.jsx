// npm libraries
import {useState} from 'react'
import { ErrorMessage, Field } from "formik";

// css
import "@/components/forms/Form.css";
import "@/components/forms/formik/FormikInputBarcodeScan.css";

// components
import FormFieldError from "@/components/forms/formError/FormFieldError";
// import QrReader from "@/components/forms/qrReader/QrReader.jsx"
// import BarcodeReader from "@/components/forms/qrReader/BarcodeReader.jsx"
import ReactBarcodeScanner from "@/components/forms/qrReader/ReactBarcodeScanner.jsx"
// import TonyBarcodeReader from "@/components/forms/qrReader/TonyBarcodeReader.jsx"
// import MyBarcode from "@/components/forms/qrReader/MyBarcode.jsx"
// import ExpoBarcodeScanner from "@/components/forms/qrReader/ExpoBarcodeScanner.jsx"

const FormikInputBarcodeScan = (props) => {
	// console.log(`props`, props);
	const { label, name, ...rest } = props;

	const [openQr, setOpenQr] = useState(false);

	const openScan = e => {
		console.log(`open scan`, e)
		setOpenQr(true)
	}

	return (
		<div className={`form-control ${name} `}>
			<Field name={name} {...rest}>
				{(props) => {
					// console.log(`props`, props);
					const { field, meta } = props;

					// input border must be red if there is an error and its touched
					const error = meta.error && meta.touched ? "error" : "";

					return (
						<input
							{...field}
							{...rest}
							className={`${meta.error ? "error" : ""}`}
						/>
					);
				}}
			</Field>
			<label className={`label`} htmlFor={name}>
				<div className="scan-field">
					<p className="scan-label">{label}</p>
					<button className="scan-btn" onClick={openScan}>scan</button>
					{/* {openQr && <QrReader setOpenQr={setOpenQr} />} */}
					{/* {openQr && <BarcodeReader setOpenQr={setOpenQr} />} */}
					{openQr && <ReactBarcodeScanner setOpenQr={setOpenQr} />}
					{/* {openQr && <TonyBarcodeReader setOpenQr={setOpenQr} />} */}
					{/* {openQr && <MyBarcode setOpenQr={setOpenQr} />} */}
					{/* {openQr && <ExpoBarcodeScanner setOpenQr={setOpenQr} />} */}
				</div>
			</label>
			<ErrorMessage name={name} component={FormFieldError}></ErrorMessage>
		</div>
	);
};

export default FormikInputBarcodeScan;
