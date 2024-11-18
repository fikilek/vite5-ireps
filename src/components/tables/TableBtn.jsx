
const TableBtn = props => {
	console.log(`props`, props);
	const { icon, viewToOpen, label } = props;
	return (
		<div className="table-btn">
			<button>{icon}{label}</button>
		</div>
	);
};

export default TableBtn;
