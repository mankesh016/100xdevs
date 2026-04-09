import MainContent from "../components/MainContent";
import { Sidebar } from "../components/Sidebar";

export const Dashboard = () => {
  return (
    <div className="bg-gray-100 h-screen flex">
      <Sidebar />
      <MainContent />
    </div>
  );
};
