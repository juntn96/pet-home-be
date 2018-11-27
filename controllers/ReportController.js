const ReportService = require("../services/ReportService");

const addReport = async (req, res) => {
    res.setHeader("Content-Type", "application/json");
    try {
        const reporterId = req.body.reporterId;
        const reportedId = req.body.reportedId;
        const postId = req.body.postId;
        const description = req.body.description;

        const data = { reporterId, reportedId, postId, description };

        const result = await ReportService.addReport(data);
        return ReS(res, { result }, 200);
    } catch (error) {
        return ReE(res, error, 422);
    }
};

const updateReportStatus = async (req, res) => {
    res.setHeader("Content-Type", "application/json");
    try {
        const reportId = req.body.reportId;
        const updateOptions = req.body.updateOptions;
        const result = await ReportService.updateReportStatus(reportId, updateOptions);
        return ReS(res, { result }, 200);
    } catch (error) {
        return ReE(res, error, 422);
    }
};

module.exports = {
    addReport,
    updateReportStatus,
};