import React from "react";

const Dashboard = () => {
  const isAllowed =
    localStorage.getItem("token") &&
    JSON.parse(localStorage.getItem("user")).role === "admin";
  if (!isAllowed) {
    return <div>You do not have permission to view this page.</div>;
  }
  return <>
  
  </>;
};

export default Dashboard;
