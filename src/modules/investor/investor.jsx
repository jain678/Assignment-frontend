import { useParams } from "react-router-dom";

function Investor() {
  const { investorId } = useParams();
  console.log("investorId", investorId);

  return <div>Investor </div>;
}

export default Investor;
