import "@/components/header/HeaderGeneric1.css";

const HeaderGeneric1 = props => {
	const { hl1, hr1, opacity, position, children } = props;

	return (
		<div
			className="header-generic1"
			style={{ opacity: opacity, position: position }}
		>
			<div className="hl">
				{hl1 && <div className="hf hl1">{hl1}</div>}
			</div>
			<div className="hr">
				{hr1 && <div className="hf hr1">{hr1}</div>}
				{children}
			</div>
		</div>
	);
};

export default HeaderGeneric1;
