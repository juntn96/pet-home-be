const Report = require("../models/Report");

const addReport = async data => {
    try {
        const report = new Report(data);
        const result = await report.save();
        return result;
    } catch (error) {
        throw error;
    }
};

const updateReportStatus = async (reportId, updateOptions) => {
    try {
        const options = {};
        for (const opt of updateOptions) {
            options[opt.propName] = opt.value;
        }
        const result = await Pet.findByIdAndUpdate(
            reportId,
            {
                $set: options,
            },
            {
                new: true,
            }
        );
        return result;
    } catch (error) {
        throw error;
    }
}

module.exports = {
    addReport,
    updateReportStatus,
}
