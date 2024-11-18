// css
import "@/components/asts/astsActivity/AstsActivityMedia.css";

// components
import MediaMobileAsts from "@/components/media/MediaMobileAsts";

const AstsActivityMedia = (props) => {
	console.log(`props`, props);

	const { ast } = props;
	return (
		<div className="ast-activity-trns">
			<MediaMobileAsts
				data={{
					data: ast,
					displayMode: "modal",
					infoName: undefined,
					irepsKeyItem: "asts",
					tableBtnClass: undefined,
					validationSchema: undefined,
					width: "4rem",
				}}
			/>
		</div>
	);
};

export default AstsActivityMedia;
