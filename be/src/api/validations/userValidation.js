const Joi = require("joi");

const userValidation = {
  createUser: (data) => {
    const schema = Joi.object({
      name: Joi.string().required(),
      email: Joi.string().email().required(),
      // Thêm các trường khác nếu cần
    });
    return schema.validate(data);
  },
  // Thêm các phương thức khác nếu cần
};

module.exports = userValidation;
