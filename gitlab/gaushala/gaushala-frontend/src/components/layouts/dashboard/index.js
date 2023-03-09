import DashboardView from "./view";

const Dashboard = ({ listItems = [], children = <></> }) => {
  return <DashboardView children={children} listItems={listItems} />;
};

export default Dashboard;
