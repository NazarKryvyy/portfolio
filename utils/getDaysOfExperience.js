import moment from "moment";

export const getDaysOfExperience = (startDate, endDate) => {
  let now = moment().unix();

  if (endDate) {
    now = endDate / 1000;
  }

  return moment.unix(now).diff(moment.unix(startDate / 1000), "days");
};
