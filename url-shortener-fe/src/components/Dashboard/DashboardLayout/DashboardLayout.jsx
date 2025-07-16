
import Graph from "../Graph/Graph";
import "./DashboardLayout.css";
import { useStoreContext } from "../../../contextApi/ContextApi";
import { useFetchMyShortUrls, useFetchTotalClicks } from "../../../hooks/useQuery";
import ShorternPopUp from "../ShorternPopUP";
import { useState } from "react";
import ShorternUrlList from "../ShorternUrlList";
import { useNavigate } from "react-router-dom";
import Loader from "./Loader";

const DashboardLayout = () => {
  const [refetched, setRefetched] = useState(false); // Made it state if needed
  const [shorternPopUp, setShorternPopup] = useState(false);
  const navigator = useNavigate();
  const { token } = useStoreContext();
  function onError() {
    navigator("/error")
  }

  const { isLoading: loader, data: totalClicks } = useFetchTotalClicks(
    token,
    onError
  );


  const { isLoading: isUrlLoading, data:  myUrls, refetch} = useFetchMyShortUrls(
    token,
    onError
  );

  console.log("My URLs:", myUrls);
  

  const handleRefetch = () => {
    // Refetch data logic
    console.log("Refetching data");
  };
  return (
    <div className="dashboard-container">
      {loader ? (
        <Loader/>
      ) : (
        <div className="dashboard-content">
          <div className="graph-container">
            {totalClicks && Object.keys(totalClicks).length === 0 && (
              <div className="no-data-container">
                <h1 className="no-data-title">No Data For This Time Period</h1>
                <h3 className="no-data-subtitle">
                  Share your short link to view where your engagements are
                  coming from
                </h3>
              </div>
            )}

            <Graph graphData={totalClicks} />
          </div>
          <div className="button-container">
            <button onClick={() => setShorternPopup(true)}>
              Create a New Short URL
            </button>
          </div>
          <div>
              {!isUrlLoading && myUrls && myUrls.length > 0 ? (
                <ShorternUrlList data={myUrls}></ShorternUrlList> 
              ) : (
                <p className="no-shortened-urls">No shortened URLs found.</p>
              )}
          </div>
        </div>
      )}

      <ShorternPopUp
        open={shorternPopUp}
        setOpen={setShorternPopup}
        refetch={refetched}
      />
    </div>
  );
};

export default DashboardLayout; 