import { prismaClient } from "../app/database.js";
import { ResponseError } from "../error/response-error.js";
import {
    createTaskValidation,
    getTaskValidation,
    updateTaskStatusValidation,
    updateTaskValidation,
} from "../validation/task-validation.js";
import { getUserValidation } from "../validation/user-validation.js";
import { validate } from "../validation/validation.js";

const index = async (username) => {
    username = validate(getUserValidation, username);
    return prismaClient.task.findMany({
        where: {
            username: username,
        },
        select: {
            id: true,
            title: true,
            description: true,
            completed: true,
            createdAt: true,
            updatedAt: true,
        },
    });
};

const create = async (user, request) => {
    const task = validate(createTaskValidation, request);
    task.username = user.username;

    return prismaClient.task.create({
        data: task,
        select: {
            id: true,
            title: true,
            description: true,
            completed: true,
            createdAt: true,
            updatedAt: true,
        },
    });
};

const update = async (user, request) => {
    const task = validate(updateTaskValidation, request);

    const totalTaskInDatabase = await prismaClient.task.count({
        where: {
            username: user.username,
            id: task.id,
        },
    });

    if (totalTaskInDatabase !== 1) {
        throw new ResponseError(404, "task is not found");
    }

    return prismaClient.task.update({
        where: {
            id: task.id,
        },
        data: {
            title: task.title,
            description: task.description,
        },
        select: {
            id: true,
            title: true,
            description: true,
            completed: true,
            createdAt: true,
            updatedAt: true,
        },
    });
};

const updateStatus = async (user, request) => {
    const task = validate(updateTaskStatusValidation, request);

    const totalTaskInDatabase = await prismaClient.task.count({
        where: {
            username: user.username,
            id: task.id,
        },
    });

    if (totalTaskInDatabase !== 1) {
        throw new ResponseError(404, "task is not found");
    }

    return prismaClient.task.update({
        where: {
            id: task.id,
        },
        data: {
            completed: task.completed,
        },
        select: {
            id: true,
            title: true,
            description: true,
            completed: true,
            createdAt: true,
            updatedAt: true,
        },
    });
};

const destroy = async (user, taskId) => {
    taskId = validate(getTaskValidation, taskId);

    const totalTaskInDatabase = await prismaClient.task.count({
        where: {
            username: user.username,
            id: taskId,
        },
    });

    if (totalTaskInDatabase !== 1) {
        throw new ResponseError(404, "task is not found");
    }

    return prismaClient.task.delete({
        where: {
            id: taskId,
        },
    });
};

export default {
    index,
    create,
    update,
    updateStatus,
    destroy,
};
