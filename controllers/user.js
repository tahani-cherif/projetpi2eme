import usermodel from "../models/user.js";
import asyncHandler from "express-async-handler";
import ApiError from "../utils/apiError.js";
import bcrypt from "bcryptjs";

// @desc    Get all users
// @route   GET api/users/
// @access  Private
const getusers = asyncHandler(async (req, res) => {
  const users = await usermodel.find({});
  res.status(200).json({ results: users.length, data: users });
});

// @desc    Get specific user by id
// @route   GET api/users/:id
// @access  Private
const getuser = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const user = await usermodel.findById(id);
  if (!user) {
    return next(new ApiError(`User not found for this id ${id}`, 404));
  }
  res.status(200).json({ data: user });
});

// @desc    Create a new user
// @route   POST api/users/
// @access  Private
const createuser = asyncHandler(async (req, res) => {
  const body = req.body;
  const user = await usermodel.create(body);
  res.status(201).json({ data: user });
});

// @desc    Update specified user
// @route   PUT api/users/:id
// @access  Private
const updateuser = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const user = await usermodel.findOneAndUpdate({ _id: id }, req.body, {
    new: true,
  });
  if (!user) {
    return next(new ApiError(`User not found for this id ${id}`, 404));
  }
  res.status(200).json({ data: user });
});

// @desc    Delete specified user
// @route   DELETE api/users/:id
// @access  Private
const deleteuser = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const user = await usermodel.findByIdAndDelete(id);
  if (!user) {
    return next(new ApiError(`User not found for this id ${id}`, 404));
  }
  res.status(204).send();
});
// @desc    count  user
// @route   Get api/users/count
// @access  Private
const countuser = asyncHandler(async (req, res, next) => {
  const user = await usermodel.find();
  const userycity = await usermodel
    .aggregate([
      {
        $group: {
          _id: "$city",
          count: { $sum: 1 },
        },
      },
      { $sort: { count: -1 } },
    ])
    .then((results) => {
      console.log("User count by city:", results);
      return results;
    });
  console.log(userycity);
  res.status(200).send({
    count: user.length,
    userApproved: user.filter((user) => user.status).length,
    userNotApproved: user.filter((user) => !user.status).length,
    userycity: userycity,
    useradmin: user.filter((user) => user.role === "admin").length,
    usersimple: user.filter((user) => user.role === "user").length,
  });
});

// @desc    Update password
// @route   PUT api/users/:id
// @access  Private
const changeuserpassword = asyncHandler(async (req, res, next) => {
  const user = await usermodel.findOneAndUpdate(
    { _id: req.params.id },
    { password: await bcrypt.hash(req.body.password, 12) },
    { new: true }
  );
  if (!user) {
    return next(new ApiError(`User not found for this id ${id}`, 404));
  }
  res.status(200).json({ data: user });
});
// @desc    getByCity
// @route   PUT api/getByCity/
// @access  Private
const getByCity = asyncHandler(async (req, res, next) => {
  const user = usermodel.aggregate([
    {
      $group: {
        _id: "$city",
        count: { $sum: 1 },
      },
    },
    { $sort: { count: -1 } },
  ]);
  res.status(200).json({ data: user });
});

// Export all functions
export {
  getusers,
  getuser,
  createuser,
  updateuser,
  deleteuser,
  changeuserpassword,
  countuser,
  getByCity,
};
