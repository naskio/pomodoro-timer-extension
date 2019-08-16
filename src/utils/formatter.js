export const toMMSS = (seconds) => {
    let mns = Math.floor(seconds / 60);
    let sds = seconds % 60;
    if (mns < 10) {
        mns = "0" + mns;
    }
    if (sds < 10) {
        sds = "0" + sds;
    }
    return mns + ':' + sds;
};
