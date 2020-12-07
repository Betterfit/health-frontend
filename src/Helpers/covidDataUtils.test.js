import { addWeeklyUptick, createDateArray } from "./covidDataUtils";

import moment from "moment";

describe("Covid Data Utils", () => {
    it("Can compute uptick", () => {
        const caseData = {
            Alberta: {
                "Calgary Zone": {
                    activeCases: [0, 5, 10, 15, 20, 25, 30, 35, 100],
                },
            },
        };

        addWeeklyUptick(caseData);
        expect(caseData.Alberta["Calgary Zone"]).toHaveProperty("uptick");
        const uptick = caseData.Alberta["Calgary Zone"].uptick;
        expect(uptick).toEqual([0, 0, 0, 0, 0, 0, 0, 35, 95]);
    });

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
