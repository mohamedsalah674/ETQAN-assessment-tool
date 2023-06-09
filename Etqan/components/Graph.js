import { Bar } from "react-chartjs-2";
import Chart from "chart.js/auto";

const VulnChart = ({ data1, data2 }) => {
  const labels = data1.map((_, index) => `Program ${index + 1}`);

  return (
    <>
      {/* <InstructorNavbar />
      <SectionHeading text="CLO TIME/GRADE graph" /> */}
      <div className="xl:mx-80 lg:mx-60 md:mx-40 sm:mx-20 mx-auto my-32">
        <Bar
          data={{
            labels: labels,
            datasets: [
              {
                label: "Result",
                data: data1,
                backgroundColor: "yellow",
                borderColor: "black",
                borderWidth: 2,
                barPercentage: 0.6,
                categoryPercentage: 0.5,
              },
              {
                label: "Target",
                data: data2,
                backgroundColor: "blue",
                borderColor: "black",
                borderWidth: 2,
                barPercentage: 0.6,
                categoryPercentage: 0.5,
              },
            ],
          }}
          height={300}
          width={100}
          options={{
            maintainAspectRatio: false,
          }}
        />
      </div>
    </>
  );
};

export default VulnChart;
