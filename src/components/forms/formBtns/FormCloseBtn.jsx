import { useNavigate } from "react-router-dom";

// css
import "@/components/forms/formBtns/FormCloseBtn.css";

// custom hooks
import useModal from "@/hooks/useModal.jsx";

const FormCloseBtn = () => {
	const navigate = useNavigate();
	const { closeModal } = useModal();
	const handleClick = e => {
		navigate("/");
		closeModal();
	};
	return (
		<div className="vc-hc form-close-btn">
			<button onClick={handleClick} className="form-btn btn-close-form">
				X
			</button>
		</div>
	);
};

export default FormCloseBtn;
