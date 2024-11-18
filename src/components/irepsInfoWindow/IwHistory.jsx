// css
import "@/components/irepsInfoWindow/IwHistory.css";

// components
import IrepsInfoWindow from "@/components/irepsInfoWindow/IrepsInfoWindow";
import HistoryErfs from "@/components/history/HistoryErfs";
import HistoryAsts from "@/components/history/HistoryAsts";
import HistoryTrns from "@/components/history/HistoryTrns";

// other
import {irepsDictionary} from '@/utils/utils'

const IwHistory = props => {
	// console.log(`IwHistory props`, props);

	const {irepsKeyItem} = props?.data?.infoName
	// console.log(`irepsKeyItem`, irepsKeyItem)
	
	const {trnType} = props?.data?.infoName
	// console.log(`trnType`, trnType)
	
	return (
		<div className="iw-history">
			<IrepsInfoWindow
				hl1={`${ irepsDictionary.get(irepsKeyItem) } History`}
				hr1={`${ irepsDictionary.get(trnType) ?  irepsDictionary.get(trnType) : '' } `}
				windowWidth="50rem"
				windowHeight="35rem"
				headerType="headerType3"
			>
				{irepsKeyItem === 'erfs' && <HistoryErfs erf={props?.data?.data} />}
				{irepsKeyItem === 'trns' && <HistoryTrns trn={props?.data?.data} trnType={trnType} />}
				{irepsKeyItem === 'asts' && <HistoryAsts ast={props?.data?.data} />}

			</IrepsInfoWindow>
		</div>
	);
};

export default IwHistory;
