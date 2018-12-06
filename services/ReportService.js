const Report = require("../models/Report");
const Post = require("../models/Post");

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
        const result = await Report.findByIdAndUpdate(
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
};

const getAllReports = async () => {
	try {
    let res  = Report.aggregate().group({_id: '$postId' , count: { $sum: 1 }})
    .exec((err, res) => {
      return res;
    })
	}
	catch (e) {
		return TE(res, 'Get report failed', 503);
	}
};

// const getTotalReports = async () => {
// 	try {
//     let res  = await Report.aggregate().group({_id: '$postId' , count: { $sum: 1 }})
//     return res;
// 	}
// 	catch (e) {
// 		return TE(res, 'Get report failed', 503);
// 	}
// };

module.exports = {
    addReport,
    updateReportStatus,
    getAllReports
}
