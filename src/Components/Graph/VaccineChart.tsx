import { roundToNDecimals } from "Helpers/mathUtils";
import React from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  Tooltip,
  XAxis,
  YAxis
} from "recharts";

const data = [
  {
    healthRegion: "Edmonton",
    population: 1320,
    totalRecovered: 20.3,
    needVaccine: 670,
    sickAfterHerdImmunity: 12.3,
  },
  {
    healthRegion: "Calgary",
    population: 1551,
    totalRecovered: 23.3,
    needVaccine: 840,
    sickAfterHerdImmunity: 17.5,
  },
];

const VaccineChart = () => {
  const displayData = data.map((region) => ({
    ...region,
    freebies: roundToNDecimals(
      region.population -
        region.totalRecovered -
        region.needVaccine -
        region.sickAfterHerdImmunity,
      1
    ),
  }));
  return (
    <div>
      <BarChart width={600} height={600} data={displayData} margin={{left: 30}}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="healthRegion" />
        <Tooltip />
        <Legend />
        <YAxis
          dataKey="population"
          type="number"
          label={{
            value: "Residents - 1000s",
            position: "left",
            angle: -90,
            style:{"text-anchor": "middle"}
          }}
        />
        <Bar
          dataKey="needVaccine"
          stackId="a"
          name="Require Vaccination"
          fill="#EE6677"
        />
        <Bar dataKey="freebies" stackId="a" fill="#66CCEE" name="Freebies" />
        <Bar
          dataKey="totalRecovered"
          stackId="a"
          name="Already Immune"
          fill="#228833"
        />
        <Bar
          dataKey="sickAfterHerdImmunity"
          stackId="a"
          name="Sick After H.I."
          fill="#CCBB44"
        />
      </BarChart>
    </div>
  );
};

export default VaccineChart;
