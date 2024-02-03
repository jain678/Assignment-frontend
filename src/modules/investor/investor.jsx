import { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import StartupItem from "../../components/StartupItem";

function Investor() {
  const { investorId } = useParams();
  const [error, setError] = useState("");
  const [startupsList, setStartupsList] = useState([]);

  const fetchedInvestorData = useCallback(async () => {
    try {
      const response = await fetch("http://127.0.0.1:8000/api/startups_list/");

      if (!response.ok) {
        throw new Error("fetching startups data list failed!");
      }

      const data = await response.json();

      const list = [{}];
      for (let item in data) {
        const newData = {
          id: data[item].id,
          company_name: data[item].company_name,
          description: data[item].business_description,
          revenue: data[item].revenue,
        };
        list.push(newData);
      }

      setStartupsList(list);
      // console.log("hello");
    } catch (err) {
      setError(err.message || "Something went wrong");
    }
  }, []);

  useEffect(() => {
    fetchedInvestorData();
  }, [fetchedInvestorData]);

  return (
    <>
      <h1>Company's List </h1>
      {startupsList.map((startup) => (
        <StartupItem
          key={startup.id}
          id={startup.id}
          company_name={startup.company_name}
          description={startup.description}
          revenue={startup.revenue}
        />
      ))}
    </>
  );
}

export default Investor;
