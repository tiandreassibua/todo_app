import taskService from "../service/task-service.js";

const index = async (req, res, next) => {
    try {
        const username = req.user.username;
        const result = await taskService.index(username);

        res.status(200).json({
            tasks: result,
        });
    } catch (e) {
        next(e);
    }
};

const create = async (req, res, next) => {
    try {
        const user = req.user;
        const request = req.body;
        const result = await taskService.create(user, request);

        res.status(200).json(result);
    } catch (e) {
        next(e);
    }
};

const update = async (req, res, next) => {
    try {
        const user = req.user;
        const request = req.body;
        const taskId = req.params.taskId;
        request.id = taskId;

        const result = await taskService.update(user, request);

        res.status(200).json(result);
    } catch (e) {
        next(e);
    }
};

const updateStatus = async (req, res, next) => {
    try {
        const user = req.user;
        const request = req.body;
        const taskId = req.params.taskId;
        request.id = taskId;

        const result = await taskService.updateStatus(user, request);

        res.status(200).json(result);
    } catch (e) {
        next(e);
    }
};

const destroy = async (req, res, next) => {
    try {
        const user = req.user;
        const taskId = req.params.taskId;

        await taskService.destroy(user, taskId);

        res.status(200).json({
            data: "Task deleted",
        });
    } catch (e) {
        next(e);
    }
};

export default {
    index,
    create,
    update,
    updateStatus,
    destroy,
};
