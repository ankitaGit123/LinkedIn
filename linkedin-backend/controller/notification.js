const NotificationModel = require("../models/notification");




exports.getNotification = async (req, res) => {
    try {
        const ownId = req.user._id;
        const notifications = await NotificationModel.find({ receiver: ownId })
            .sort({ createdAt: -1 })
            .populate("sender")
            .exec();
        res.status(200).json({
            message: "Fetched notifications successfully",
            notifications: notifications
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error", message: error.message });
    }
}


exports.updateRead = async (req, res) => {
    try {
        const { notificationId } = req.body;
        const ownId = req.user._id;

        const notification = await NotificationModel.findOneAndUpdate(
            { _id: notificationId, receiver: ownId },
            { isRead: true },
            { new: true }
        );

        if (!notification) {
            return res.status(404).json({ message: "Notification not found" });
        }

        res.status(200).json({
            message: "Notification read",
            notification: notification
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error", message: error.message });
    }
}

exports.activeNotify = async (req, res) => {
    try {
        const ownId = req.user._id;
        let notifications = await NotificationModel.find({ receiver: ownId, isRead: false })
            .sort({ createdAt: -1 })
            .populate("sender")
            .exec();
        res.status(200).json({
            message: "Fetched active notifications successfully",
            count: notifications.length
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error", message: error.message });
    }
}
