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

const TableDeleteAstBtn = (props) => {
	// console.log(`props`, props);
	const { data } = props?.data;

	const { astNo } = data?.astData?.astNo;

	const { user } = useAuthContext();
	// console.log(`user`, user);

	const { superuser } = user?.claims;
	// console.log(`superuser`, superuser);

	// const { value } = data;
	// console.log(`value`, value);
	const value = "pendingDelete";

	const functions = getFunctions();
	const actionDeleteAst = httpsCallable(functions, "actionDeleteAst");

	const handleAstDelete = (e) => {
		console.log(`e.target.value`, e.target.value);

		actionDeleteAst({
			id: props.data.uid,
			action: e.target.id,
		})
			// TODO: something I dont understand. e.target.value changes after data has been written to the DB. THis is strange. I should NOT change.
			.then((result) => {
				// console.log(`result`, result);
				// console.log(`e.target.value`, e.target.value);
				toast.success(`Ast [${astNo}] set on pending delete`, {
					position: "bottom-left",
				});
			})
			.catch((error) => {
				console.log(`Error:`, error.message);
			});
	};

	return (
		<div className="table-delete-ast-btn">
			{!value ? (
				<button
					// className={`table-btn ${tableBtnClass}`}
					className={"table-btn init-delete-btn"}
					onClick={handleAstDelete}
					style={{}}
					title={"Initial Delete Ast"}
					disabled={false}
					data="initDelete"
				>
					<IconContext.Provider value={{ color: "blue", size: "1rem" }}>
						<MdOutlineDeleteForever />
					</IconContext.Provider>
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
							data="finalDelete"
						>
							<IconContext.Provider value={{ color: "blue", size: "1rem" }}>
								<IoTrashBinOutline />
							</IconContext.Provider>
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
						data="reverseDelete"
					>
						<IconContext.Provider value={{ color: "blue", size: "1rem" }}>
							<MdBackHand />
						</IconContext.Provider>
					</button>
				</>
			)}
		</div>
	);
};

export default TableDeleteAstBtn;
