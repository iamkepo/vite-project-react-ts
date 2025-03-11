import React from 'react';
import { Outlet } from "react-router-dom";

const DashboardLayout: React.FC = () => {
  return (
    <div className="col-12 p-3">
      <Outlet />
    </div>
  );
};

export default DashboardLayout;