import "@/components/irepsInfoWindow/IwNoDataToShow.css";

const IwNoDataToShow = (props) => {
	const { msg } = props;
	return (
		<div className="iw-no-data-to-show">
			<div className='iw-no-data-to-show-wrapper'>
				<h3 className="msg">{msg}</h3>
			</div>
		</div>
	);
};

export default IwNoDataToShow;
