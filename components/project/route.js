const router = require('express').Router()
const { getUserProjects , newProject , editProject ,deleteProject,excelFile } = require('./controller')

router.route('/project/new').post(newProject)
router.route('/project/update').post(editProject)
router.route('/project/delete').post(deleteProject)
router.route('/projects/data/get').get(getUserProjects)
router.route('/projects/excel/get').get(excelFile)


module.exports = router