import { addWeeklyUptick, createDateArray } from "./covidDataUtils";

import moment from "moment";

describe("Covid Data Utils", () => {
    it("Can can create a date array", () => {
        const dateArray = createDateArray(
            moment(new Date("2020-12-31")),
            moment(new Date("2021-01-03"))
        );

        expect(dateArray).toEqual([
            "2020-12-30",
            "2020-12-31",
            "2021-01-01",
            "2021-01-02",
        ]);
    });
});
