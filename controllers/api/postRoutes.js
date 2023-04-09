const router = require('express').Router();
const { Project } = require('../../models');
const withAuth = require('../../utils/auth');
router.post('/', async (req, res) => {
  console.log(req.body);
  try {
    const newProject = await Project.create({
      ...req.body,
      user_id: req.session.user_id,
    });

    res.status(200).json(newProject);
  } catch (err) {
    res.status(400).json(err);
  }
});

// /edit/:id
router.put('/:id', async (req, res) => {
  Project.update(
    {
      name: req.body.title,
      description: req.body.description,

    },
    {
      where: {
        id: req.params.id,
      },
    }
  )
    .then((dbProjectData) => {
      if (!dbProjectData) {
        res.status(404).json({ message: "No Post found with this id" });
        return;
      }
      res.json(dbProjectData);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });

})

router.delete('/:id', async (req, res) => {
  try {
    const projectData = await Project.destroy({
      where: {
        id: req.params.id,
        user_id: req.session.user_id,
      },
    });

    if (!projectData) {
      res.status(404).json({ message: 'No post found with this id!' });
      return;
    }

    res.status(200).json(projectData);
  } catch (err) {
    console.log('err', err)
    res.status(500).json(err);
  }
});

module.exports = router;
