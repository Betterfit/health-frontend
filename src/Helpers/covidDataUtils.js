/**
 * Creates an array containing all the days between startDate-1 and endDate-1 formatted as YYYY-MM-DD.
 * The start and end dates should be moment objects.
 */
export const createDateArray = (startDate, endDate) => {
    // we set the dates back to the start of the day
    const reportedDates = [];
    endDate.set({ hour: 0, minute: 0, second: 0, millisecond: 0 });
    while (
        startDate.set({ hour: 0, minute: 0, second: 0, millisecond: 0 }) <=
        endDate
    ) {
        reportedDates.push(startDate.format("YYYY-MM-DD"));
        startDate = startDate.clone().add(1, "d");
    }
    return reportedDates;
};

/**
 * Adds a field to all the health regions that contains an array with the change in active cases from 1 week ago
 */
export const addWeeklyUptick = (casesData) => {
    for (const province of Object.values(casesData)) {
        for (const healthRegion of Object.values(province)) {
            healthRegion.uptick = healthRegion.activeCases.map(
                (activeCasesToday, day_idx) =>
                    day_idx < 7
                        ? null
                        : activeCasesToday -
                          healthRegion.activeCases[day_idx - 7]
            );
        }
    }
};
