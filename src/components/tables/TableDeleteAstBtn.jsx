import "@/components/tables/TableDeleteAstBtn.css";

const TableDeleteAstBtn = (props) => {
	// console.log(`props`, props);

	// const {} = props.data;
	// console.log(`data`, data);

	const handleClick = (e) => {
		console.log(`e`, e);
		// TODO: Call a cloud function to flag ast record as deleted.
	};
	return (
		<div className="table-delete-ast-btn">
			<button
				// className={`table-btn ${tableBtnClass}`}
				className={"tdab-btn"}
				onClick={handleClick}
				style={{}}
				title={"Delete Ast"}
				disabled={false}
			>
				<p>X</p>
			</button>
		</div>
	);
};

export default TableDeleteAstBtn;
