import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaExternalLinkAlt, FaRegCalendarAlt } from "react-icons/fa";
import { MdAnalytics, MdOutlineAdsClick } from "react-icons/md";
import { IoCopy } from "react-icons/io5";
import { LiaCheckSolid } from "react-icons/lia";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { Hourglass } from "react-loader-spinner";
import dayjs from "dayjs";
import "./ShortenItem.css";
import api from "../../api/api";
import { useStoreContext } from "../../contextApi/ContextApi";
import Graph from "./Graph/Graph";

function ShortenItem({ originalurl, shorturl, clickCount, createdDate }) {
  const { token } = useStoreContext();
  const navigate = useNavigate();
  const [isCopied, setIsCopied] = useState(false);
  const [analyticToggle, setAnalyticToggle] = useState(false);
  const [loader, setLoader] = useState(false);
  const [selectedUrl, setSelectedUrl] = useState("");
  const [analyticsData, setAnalyticsData] = useState([]);
  const subDomain = import.meta.env.VITE_REACT_SUBDOMAIN;

  originalurl = originalurl.replace(/\/$/, "")

  const analyticsHandler = (shorturl) => {
    if (!analyticToggle) {
      setSelectedUrl(shorturl);
    }
    setAnalyticToggle(!analyticToggle);
  };

  const fetchMyShortUrl = async () => {
    setLoader(true);
    try {
      const { data } = await api.get(
        `/api/urls/analytics/${selectedUrl}?startDate=2024-12-01&endDate=2025-12-31`,
        {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: "Bearer " + token,
          },
        }
      );
      setAnalyticsData(data);
      setSelectedUrl("");
    } catch (error) {
      navigate("/error");
    } finally {
      setLoader(false);
    }
  };

  useEffect(() => {
    if (selectedUrl) {
      fetchMyShortUrl();
    }
  }, [selectedUrl]);

  return (
    <div className="shorten-item-container">
      <div className="flex-container">
        <div className="text-section">
          <div className="short-url">
            <a
              href={`${subDomain}/${shorturl}`}
              target="_blank"
              rel="noopener noreferrer"
              className="short-link"
            >
              {subDomain + shorturl}
            </a>
            <FaExternalLinkAlt className="external-link-icon" />
          </div>

          <div className="original-url">
            <h3>{originalurl}</h3>
          </div>

          <div className="info-section">
            <div className="click-info">
              <MdOutlineAdsClick className="info-icon" />
              <span>{clickCount}</span>
              <span>
                {clickCount === 0 || clickCount === 1 ? "Click" : "Clicks"}
              </span>
            </div>

            <div className="date-info">
              <FaRegCalendarAlt className="info-icon" />
              <span>{dayjs(createdDate).format("MMM DD, YYYY")}</span>
            </div>
          </div>
        </div>

        <div className="button-section">
          <CopyToClipboard
            onCopy={() => setIsCopied(true)}
            text={`${
              import.meta.env.VITE_REACT_FRONT_END_URL + "/s/" + shorturl
            }`}
          >
            <div className="copy-button">
              <button>{isCopied ? "Copied" : "Copy"}</button>
              {isCopied ? <LiaCheckSolid /> : <IoCopy />}
            </div>
          </CopyToClipboard>

          <div
            onClick={() => analyticsHandler(shorturl)}
            className="analytics-button"
          >
            <button>Analytics</button>
            <MdAnalytics />
          </div>
        </div>
      </div>

      <div className={`analytics-section ${analyticToggle ? "show" : "hide"}`}>
        {loader ? (
          <div className="loader-wrapper">
            <Hourglass height="50" width="50" colors={["#306cce", "#72a1ed"]} />
            <p>Please Wait...</p>
          </div>
        ) : (
          <>
            {analyticsData.length === 0 && (
              <div className="absolute flex flex-col  justify-center sm:items-center items-end  w-full left-0 top-0 bottom-0 right-0 m-auto">
                <h1 className=" text-slate-800 font-serif sm:text-2xl text-[15px] font-bold mb-1">
                  No Data For This Time Period
                </h1>
                <h3 className="sm:w-96 w-[90%] sm:ml-0 pl-6 text-center sm:text-lg text-[12px] text-slate-600 ">
                  Share your short link to view where your engagements are
                  coming from
                </h3>
              </div>
            )}
            <Graph graphData={analyticsData} />
          </>
        )}
      </div>
    </div>
  );
}

export default ShortenItem;
