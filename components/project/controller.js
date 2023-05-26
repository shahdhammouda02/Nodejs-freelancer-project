const mongoose = require("mongoose");
const ErrorHandler = require("../../utils/errorHandler");
const catchAsyncErrors = require("../../middlewares/catchAsyncErrors");
const Project = require("../../models/Project");
const _ = require("lodash");
const ExcelJS = require('exceljs');

exports.newProject = catchAsyncErrors(async (req, res , next) => {
  const { title, projectDescription , priority , expectedHours ,  status} = req.body;
  const user = req.user;

  if (!title || !projectDescription || !priority || !expectedHours || !status) {
    return next(new ErrorHandler("الرجاء ادخال الاسم وعدد الساعات", 400));
  }
  const newProject = new Project({
    title,
    projectDescription,
    priority,
    expectedHours,
    status,
    user: user._id,
  });
  await newProject.validate();
  await newProject.save();
  res.send(newProject);
});

exports.editProject = catchAsyncErrors(async (req, res) => {
    const projectId = req.body.projectId;

    if (!mongoose.isValidObjectId(projectId)) return next(new ErrorHandler("", 404));
    let project = await Project.findById(projectId);

    let data = req.body;
    _.assign(project, data);
    await project.save();
    res.send(project);

});

exports.deleteProject = catchAsyncErrors(async (req, res) => {
    const projectId = req.body.projectId;
    if (!mongoose.isValidObjectId(projectId)) return next(new ErrorHandler("", 404));
    await Project.findByIdAndDelete(projectId);
    res.send({
      success: true,
    });

});

exports.getUserProjects = catchAsyncErrors(async (req, res) => {

  const user = req.user;

  let projects = await Project.find(
    {
      user : user._id
    }
  ).lean()
  projects = projects.map(project => {
    project.expectedCost = project.expectedHours * user.hourCost;
    console.log(project);
    return project;
  });

  res.send(projects);


});
exports.excelFile = catchAsyncErrors(async (req, res) => {
  const workbook = new ExcelJS.Workbook();
  const worksheet = workbook.addWorksheet('My Sheet');
  const user =req.user;
  worksheet.columns = [
    { header: 'title', key: 'title', width: 10 },
    { header: 'expectedHours', key: 'expectedHours', width: 32 },
    { header: 'status', key: 'status', width: 10, outlineLevel: 1 }

  ];
 
  let projects = await Project.find(
    {
      user : user._id
    }
  )
  projects.map(project => {
    worksheet.addRow({title: project.title, expectedHours: project.expectedHours, status:project.status});
   
  });
  res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
 res.setHeader('Content-Disposition', 'attachment; filename=' + 'data.xlsx');



 await workbook.xlsx.write(res);

});