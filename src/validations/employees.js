import Joi from 'joi';

const validateEmployees = (req, res, next) => {
  const employeeValidation = Joi.object({
    name: Joi.string().min(3).max(50).required(),
    last_name: Joi.string().min(3).max(50).required(),
    phone: Joi.string().min(8).max(15).pattern(/[0-9]/)
      .required(),
    email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }),
    password: Joi.string().pattern(/^[a-zA-Z0-9]{3,30}$/).required(),
    dni: Joi.string().min(6).max(12).pattern(/[0-9]/)
      .required(),
  });

  const validation = employeeValidation.validate(req.body);

  if (validation.error) {
    return res.status(400).json({
      message: `there was an error: ${validation.error.details[0].message}`,
      data: undefined,
      error: true,
    });
  }
  return next();
};

export default validateEmployees;
