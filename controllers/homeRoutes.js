const router = require('express').Router();
const { Project, User, Comment } = require('../models');
const withAuth = require('../utils/auth');

router.get('/', async (req, res) => {
  try {
    // Get all projects and JOIN with user data
    const projectData = await Project.findAll({
      include: [
        {
          model: User,
          attributes: ['username'],
        },
      ],
    });

    // Serialize data so the template can read it
    const projects = projectData.map((project) => project.get({ plain: true }));

    // Pass serialized data and session flag into template
    res.render('homepage', {
      projects,
      logged_in: req.session.logged_in
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/project/:id', async (req, res) => {
  console.log('work', req.params.id);
  try {
    const projectData = await Project.findByPk(req.params.id, {
      include: [
        {
          model: User,
          attributes: ['username'],
        },
        {
          model: Comment,
          attributes: ['comment_text', 'date_created'],
        },
      ],
    });

    const project = projectData.get({ plain: true });
    console.log("project - dashboard", project)
    res.render("singlePost", {  //singlepost handlebar
      ...project,
      logged_in: req.session.logged_in
    });
  } catch (err) {
    console.log('error', err);
    res.status(500).json(err);
  }
});

// Use withAuth middleware to prevent access to route
router.get('/dashboard', withAuth, async (req, res) => {
  console.log("Redirect to dashboard")
  try {
    // Find the logged in user based on the session ID
    const userData = await User.findByPk(req.session.user_id, {
      attributes: { exclude: ['password'] },
      include: [{ model: Project }],
    });

    const user = userData.get({ plain: true });

    res.render('dashboard', {
      ...user,
      logged_in: true
    });
  } catch (err) {
    console.log('error', err);
    res.status(500).json(err);
  }
});

router.get("/edit/:id", withAuth, (req, res) => {
  Project.findByPk(req.params.id, {
    attributes: ["id", "name", "description", "date_created",],

    include: [
      {
        model: Comment,
        attributes: ["id", "comment_text", "user_id", "project_id", "date_created"],
        include: {
          model: User,
          attributes: ["username"],
        },
      },

      {
        model: User,
        attributes: ["username"],
      },

    ],
  })
    .then((dbProjectData) => {
      if (dbProjectData) {
        const post = dbProjectData.get({ plain: true });
        console.log('post', post);
        res.render("editPost", {  //pubic js file
          post,
          logged_in: true,
        });
      } else {
        res.status(404).end();
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.get('/login', (req, res) => {
  // If the user is already logged in, redirect the request to another route
  if (req.session.logged_in) {
    res.redirect('/dashboard');
    return;
  }

  res.render('login');
});

module.exports = router;