import Joi from "joi";

const createTaskValidation = Joi.object({
    title: Joi.string().max(100).required(),
    description: Joi.string().max(255).required(),
});

const updateTaskValidation = Joi.object({
    id: Joi.number().positive().required(),
    title: Joi.string().max(100).required(),
    description: Joi.string().max(255).required(),
});

const updateTaskStatusValidation = Joi.object({
    id: Joi.number().positive().required(),
    completed: Joi.boolean().required(),
});

const getTaskValidation = Joi.number().positive().required();

export {
    createTaskValidation,
    updateTaskValidation,
    updateTaskStatusValidation,
    getTaskValidation,
};
