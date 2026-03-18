import React, {useEffect} from "react";
import { getAllLeads } from "../../api/routes.js";
const Leads = () => {
  const api = async () => {
    const res = await getAllLeads();
    console.log(res);
  };

  useEffect(() => {
    api();
  }, []);

  return <div>Leads</div>;
};

export default Leads;
