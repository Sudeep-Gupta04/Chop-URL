import { useQuery } from "@tanstack/react-query"; //  Correct import
import api from "../api/api";

export const useFetchMyShortUrls = (token, onError) => {
  return useQuery({
    queryKey: ["my-shorterurls"],
    queryFn: async () => {
      const response = await api.get("/api/urls/myurls", {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${token}`, // ✅ Ensure token is sent
        },
      });

      return response.data; // Response is an object { "2025-03-13": 1 }
    },

    select: (data) => {
      const convertToArray = data.sort(
        (a, b) => new Date(b.createdDate) - new Date(a.createdDate)
      );
      return convertToArray;
    },

    onError,
    staleTime: 1000 * 60 * 5,
  });
};

// usequery takes three arguments (useQuery key, function, options generally used to tranform the response in any particular format , and other fuctions that can be used  )
export const useFetchTotalClicks = (token, onError) => {
  return useQuery({
    queryKey: ["url-totalclick"],
    queryFn: async () => {
      const response = await api.get(
        "/api/urls/totalClicks?startDate=2025-01-01&endDate=2025-10-31",
        {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: `Bearer ${token}`, // ✅ Ensure token is sent
          },
        }
      );

      return response.data; // Response is an object { "2025-03-13": 1 }
    },

    select: (data) => {
      if (!data || Object.keys(data).length === 0) return [];

      return Object.keys(data).map((key) => ({
        clickDate: key, // Convert object keys to "clickDate"
        count: data[key], // Convert values to "count"
      }));
    },

    onError,
    staleTime: 1000 * 60 * 5,
  });
};
