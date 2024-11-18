import FormikCheckboxGroup from "@/components/forms/formik/FormikCheckboxGroup";
import FormikGeocodeButton from "@/components/forms/formik/FormikGeocodeButton";
import FormikInput from "@/components/forms/formik/FormikInput";
import FormikInputBarcodeScan from "@/components/forms/formik/FormikInputBarcodeScan";
import FormikInputPwd from "@/components/forms/formik/FormikInputPwd";
import FormikMediaButton from "@/components/forms/formik/FormikMediaButton";
import FormikPhoneNumberInput from "@/components/forms/formik/FormikPhoneNumberInput";
import FormikReactSelect from "@/components/forms/formik/FormikReactSelect";
import FormikReverseGeocodeButton from "@/components/forms/formik/FormikReverseGeocodeButton";
import FormikSelect from "@/components/forms/formik/FormikSelect";
import FormikSelectSetAnomalyDetail from "@/components/forms/formik/FormikSelectSetAnomalyDetail";
import FormikSelectSetAnomaly from "@/components/forms/formik/FormikSelectSetAnomaly";
import FormikSelectMeterAccess from "@/components/forms/formik/FormikSelectMeterAccess";
import FormikSelectNoAccessReason from "@/components/forms/formik/FormikSelectNoAccessReason";
import FormikSelectTidDone from "@/components/forms/formik/FormikSelectTidDone";
import FormikDatePicker from "@/components/forms/formik/FormikDatePicker";
import FormikSelectAstsFromStores from "@/components/forms/formik/FormikSelectAstsFromStores";

const FormikControl = (props) => {
	// console.log(`props`, props);

	const { control, ...rest } = props;

	switch (control) {
		case "input":
			return <FormikInput {...rest} />;
		case "inputBarcodeScan":
			return <FormikInputBarcodeScan {...rest} />;
		case "phoneNumberInput":
			return <FormikPhoneNumberInput {...rest} />;
		case "inputPwd":
			return <FormikInputPwd {...rest} />;

		case "select":
			return <FormikSelect {...rest} />;

		case "selectAstsFromStores":
			return <FormikSelectAstsFromStores {...rest} />;

		case "selectMeterAccess":
			return <FormikSelectMeterAccess {...rest} />;

		case "selectNoAccessReason":
			return <FormikSelectNoAccessReason {...rest} />;

		case "selectTidDone":
			return <FormikSelectTidDone {...rest} />;
		case "selectSetAnomalyDetail":
			return <FormikSelectSetAnomalyDetail {...rest} />;
		case "selectSetAnomaly":
			return <FormikSelectSetAnomaly {...rest} />;
		case "reactSelect":
			return <FormikReactSelect {...rest} />;
		case "checkbox":
			return <FormikCheckboxGroup {...rest} />;
		case "mediaButton":
			return <FormikMediaButton {...rest} />;
		case "rgcButton":
			return <FormikReverseGeocodeButton {...rest} />;
		case "gcButton":
			return <FormikGeocodeButton {...rest} />;
		case "date":
			return <FormikDatePicker {...rest} />;
		default:
			return null;
	}
};

export default FormikControl;
