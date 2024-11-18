import "@/components/header/HeaderGeneric.css";

import HeaderGeneric1 from "@/components/header/HeaderGeneric1";
import HeaderGeneric2 from "@/components/header/HeaderGeneric2";
import HeaderGeneric3 from "@/components/header/HeaderGeneric3";

const HeaderGeneric = props => {
	const { hl1, hl2, hl3, hr1, hr2, hr3, children } = props;
	return (
		<div className="header-generic">
			<HeaderGeneric1 hl1={hl1} hr1={hr1}>
				{children}
			</HeaderGeneric1>
			<HeaderGeneric2 hl1={hl1} hl2={hl2} hr1={hr1} hr2={hr2}>
				{children}
			</HeaderGeneric2>
			<HeaderGeneric3 hl1={hl1} hl2={hl2} hl3={hl3} hr1={hr1} hr2={hr2} hr3={hr3}>
				{children}
			</HeaderGeneric3>
		</div>
	);
};

export default HeaderGeneric;
