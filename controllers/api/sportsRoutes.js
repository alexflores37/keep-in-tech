const router = require('express').Router();
const {Comments, User, Sports } = require('../../models');
const withAuth = require('../../utilities/auth');

router.post('/comments', withAuth, async (req, res) => {
    try {
        const newComment = await Comments.create({
            ...req.body,
            user_id: req.session.user_id,
        });

        res.status(200).json(newComment);
    } catch (err) {
        res.status(400).json(err);
    }
});

router.get('/comments', async (req, res) => {
    try {
        const commentData = await Comments.findAll({
            include: [
                {
                    model: User,
                    attributes: ['name'],
                },
            ],
        });

        res.status(200).json(commentData);
    } catch (err) {
        res.status(500).json(err);
    }
});

router.get('/comments/:id', async (req, res) => {
    try {
        const commentData = await Comments.findByPk(req.params.id, {
            include: [
                {
                    model: User,
                    attributes: ['name'],
                },
            ],
        });

        if (!commentData) {
            res.status(404).json({ message: 'No comment found with this id!' });
            return;
        }

        res.status(200).json(commentData);
    } catch (err) {
        res.status(500).json(err);
    }
});

router.delete('/comments/:id', withAuth, async (req, res) => {
    try {
        const commentData = await Comments.destroy({
            where: {
                id: req.params.id,
                user_id: req.session.user_id,
            },
        });

        if (!commentData) {
            res.status(404).json({ message: 'No comment found with this id!' });
            return;
        }

        res.status(200).json(commentData);
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;
