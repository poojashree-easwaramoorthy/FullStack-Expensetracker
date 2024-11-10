import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Segregator } from "../utilities/Categorysegregator";
import DoughnutChart from "./DoughnutChart";
import Investment from "../assets/Investment.svg";

let total = 0;

export default function Daily() {
  const navigate = useNavigate();
  const [haveSpent, setHaveSpent] = useState(true);
  const [expenseData, SetExpenseData] = useState({
    datasets: [
      {
        label: "Expense",
        data: [],
        backgroundColor: [
          "rgba(255, 99, 132, 0.4)",
          "rgba(255, 159, 64, 0.4)",
          "rgba(255, 205, 86, 0.4)",
          "rgba(75, 192, 192, 0.4)",
          "rgba(54, 162, 235, 0.4)",
          "rgba(153, 102, 255, 0.4)",
          "rgba(201, 203, 207, 0.4)",
        ],
        borderWidth: 1,
      },
    ],
    labels: [],
  });

  useEffect(() => {
    async function fetchDailyData() {
      try {
        const res = await fetch("/expense/getdailyexpense");
        const data = await res.json();
        console.log("Fetched Data:", data);

        // If there's an error in the response, redirect to the home page
        if (data.error) {
          navigate("/");
          return;
        }

        // Segregate the expense data by category
        const Segregated = Segregator(data.filterData);
        console.log("Segregated Data:", Segregated);

        // Check if any expenses are available
        if (Segregated[1] === 0) {
          setHaveSpent(false);
        } else {
          setHaveSpent(true);
        }

        total = Segregated[1]; // Set the total spending amount
        console.log("Total Spending:", total);

        // Update the chart data
        SetExpenseData({
          datasets: [
            {
              label: "Expense",
              data: Object.values(Segregated[0]), // Categories' expense amounts
              backgroundColor: [
                "rgba(255, 99, 132, 0.4)",
                "rgba(255, 159, 64, 0.4)",
                "rgba(255, 205, 86, 0.4)",
                "rgba(75, 192, 192, 0.4)",
                "rgba(54, 162, 235, 0.4)",
                "rgba(153, 102, 255, 0.4)",
                "rgba(201, 203, 207, 0.4)",
              ],
              borderWidth: 1,
            },
          ],
          labels: Object.keys(Segregated[0]), // Set the category labels
        });
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }

    fetchDailyData();
  }, [navigate]); // Added `navigate` as a dependency

  return (
    <div className="pt-2 lg:pt-0 pb-10 lg:pb-0">
      <div className="bg-rp-black lg:w-3/4 w-[86%] p-5 flex lg:m-auto ml-5 lg:mt-28 rounded-md justify-center">
        <h1 className="font-bold text-xl font-lexand text-slate-300 mr-3 mt-3">
          Today's Spending
        </h1>
        <span className="font-bold text-2xl font-lexend text-mj-black bg-rp-yellow p-3 rounded-md">
          {total} {/* Display the total spending */}
        </span>
      </div>
      <div className="lg:w-3/4 w-[86%] mx-5 lg:mt-3 mt-4 p-5 lg:m-auto bg-rp-black rounded-lg ">
        {haveSpent ? (
          <>
            <DoughnutChart chartData={expenseData} />
            {/* Show chart if there's spending */}
          </>
        ) : (
          <>
            <img className="p-5 h-5/6 m-6" src={Investment} alt="join now" />
            {/* Show image if no spending */}
          </>
        )}
      </div>
    </div>
  );
}
