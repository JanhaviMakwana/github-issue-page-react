const getMillSecDiff = (date) => (new Date() - new Date(date));

const getMinDiff = (date) => Math.floor(getMillSecDiff(date) / 1000 / 60);

const getHrDiff = (date) => Math.floor(getMinDiff(date) / 60);

const getDayDiff = (date) => Math.floor(getHrDiff(date) / 24);

export const getDateDiff = (date) => {
    if (getMinDiff(date) < 60) {
        return `${getMinDiff(date)} minutes`;
    } else if (getHrDiff(date) < 24) {
        if (getHrDiff(date) >= 2) {
            return `${getHrDiff(date)} hours`;
        } else {
            return `an hour`;
        }
    } else {
        if (getDayDiff(date) >= 2) {
            return `${getDayDiff(date)} days`;
        } else if (getDayDiff(date) > 30) {
            return `a while`;
        } else {
            return `a day`
        }
    }
}
