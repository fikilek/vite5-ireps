// css
import "@/components/forms/formTrn/decommission/FormMeterDecommission.css";

// components
import HeaderGeneric from "@/components/header/HeaderGeneric";
import FormCloseBtn from "@/components/forms/formBtns/FormCloseBtn";

const FormMeterDecommission = () => {
  return (
			<div className="form-wrapper">
				<div className="form-container trn form-meter-decommission">
					<HeaderGeneric
						hl1={"Meter Decommission Form"}
          hl2={<span className="text-emphasis2"></span>}
          hr1={<p></p>}
					>
						<FormCloseBtn />
        </HeaderGeneric>
        <div className="form-body-temp">
          <p>Coming Soon</p>
        </div>
					
				</div>
			</div>
		);
};

export default FormMeterDecommission