import moment from "moment";

export const dayFormatter = (date: moment.Moment): string => {
  return date.format('MMM. D')
};
