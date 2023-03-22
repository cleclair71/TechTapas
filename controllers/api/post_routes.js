const router = require('express').Router();
const { User, Post, Comment } = require('../../models');
const withAuth = require('../../utils/auth');
const sequelize = require('../../config/connection');

// GET all users
router.get('/', (req, res) => {
    User.findAll({
        attributes: { exclude: ['password'] }, // add closing bracket here
        order: [['created_at', 'DESC']],
        include: [
            {
                model: Comment,
                attributes: ['id', 'comment_text', 'created_at', 'post_id', 'user_id'], 
                include: {
                    model: User,
                    attributes: ['username']
                }
            },
            {
                model: User,
                attributes: ['username'],
            },
        ]
    })
        .then(dbUserData => res.json(dbUserData))
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

// GET one user

router.get('/:id', (req, res) => {
    User.findOne({
        attributes: [ 'id',
        'title',
        'created_at',
        'post_content' ],
        where: {
            id: req.params.id
        },
        include: [
            {
                model: User,
                attributes: ['username']
            },

            {
                model: Comment,
                attributes: ['id', 'comment_text', 'created_at', 'post_id', 'user_id'],
                include: {
                    model: User,
                    attributes: ['username']
                }
            }
        ]
    })
        .then(dbUserData => {
            if (!dbUserData) {
                res.status(404).json({ message: 'No user found with this id' });
                return;
            }
            res.json(dbUserData);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
}
);

// POST one user
router