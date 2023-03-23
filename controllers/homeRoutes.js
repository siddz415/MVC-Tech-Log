const router = require('express').Router();
const { Project, User } = require('../models');

router.get('/',async (req, res)=>{
const projectData = await Project.findAll({
include:[{model: User}]
})
const projects = projectData.map(project => project.get({plain: true}))
  res.render('homepage',{projects})
})
router.get('/login', (req, res)=> {
  res.render('login')
})
module.exports = router;
