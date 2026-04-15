import React from "react";
import { getScheduleLeads } from "../../../api/routes.js";
const ScheduleLeads = () => {
  const fetchleads= async()=>{
const res= await getScheduleLeads();
console.log("res", res);

  }
  return <div>ScheduleLeads</div>;
};

export default ScheduleLeads;
