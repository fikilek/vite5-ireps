import "@/components/tabPanel/TabPanel.css";

const TabPanel = (props) => {
	const { tabName, children, activeTab } = props;
	const showHide = tabName === activeTab ? "show" : "hide";
	return (
		<div className={`tab-panel ${showHide}`}>
			{children}
		</div>
	);
};

export default TabPanel;
