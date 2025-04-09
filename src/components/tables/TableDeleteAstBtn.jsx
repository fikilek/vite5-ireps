// npm libraries
import { IconContext } from "react-icons";
import { MdOutlineDeleteForever, MdBackHand } from "react-icons/md";
import { IoTrashBinOutline } from "react-icons/io5";
import { getFunctions, httpsCallable } from "firebase/functions";
import { toast } from "react-toastify";

// css
import "@/components/tables/TableDeleteAstBtn.css";

// hooks
import useAuthContext from "@/hooks/useAuthContext";

// other
import { irepsDictionary } from "@/utils/utils";

const TableDeleteAstBtn = (props) => {
	// console.log(`props`, props);
	const { data } = props?.data;

	const { astNo, astId } = data?.astData;
	// console.log(`astNo`, astNo);
	// console.log(`astId`, astId);

	const { user } = useAuthContext();
	// console.log(`user`, user);

	const { superuser } = user?.claims;
	// console.log(`superuser`, superuser);

	const { deleteAst } = data;
	// console.log(`deleteAst`, deleteAst);

	const functions = getFunctions();
	const actionDeleteAst = httpsCallable(functions, "actionDeleteAst");

	const handleAstDelete = (e) => {
		// console.log(`e.target.dataset-action`, e.target.dataset.action);
		// console.log(`e.currentTarget`, e.currentTarget);
		// console.log(`e.target.value`, e.target.value);
		// console.log(`e.target.id`, e.target.id);

		const astId = e.target.id;
		// console.log(`astId`, astId);

		const action = e.target.dataset.action;
		console.log(`action`, action);

		actionDeleteAst({
			astId,
			action,
		})
			// TODO: something I dont understand. e.target.value changes after data has been written to the DB. THis is strange. I should NOT change.
			.then((result) => {
				console.log(`result`, result);
				// console.log(`e.target.value`, e.target.value);
				toast.success(
					`Ast [${astNo}] delete status updated to ${irepsDictionary.get(
						action
					)}`,
					{
						position: "bottom-left",
					}
				);
			})
			.catch((error) => {
				console.log(`Error:`, error.message);
			});
	};

	return (
		<div className="table-delete-ast-btn">
			{deleteAst != "deletePending" || deleteAst === "restored" ? (
				<button
					// className={`table-btn ${tableBtnClass}`}
					className={"table-btn init-delete-btn"}
					onClick={handleAstDelete}
					style={{}}
					title={"Delete Ast"}
					disabled={false}
					data-action="initDelete"
					id={astId}
					color="red"
				>
					X
				</button>
			) : (
				<>
					{superuser ? (
						<button
							className={"table-btn final-delete-btn"}
							onClick={handleAstDelete}
							style={{}}
							title={"Final Delete Ast"}
							disabled={false}
							data-action="finalDelete"
							id={astId}
						>
							<p>FD</p>
						</button>
					) : (
						""
					)}

					<button
						className={"table-btn un-delete-btn"}
						onClick={handleAstDelete}
						style={{}}
						title={"Undo Delete Ast"}
						disabled={false}
						data-action="reverseDelete"
						id={astId}
					>
						RD
					</button>
				</>
			)}
		</div>
	);
};

export default TableDeleteAstBtn;
