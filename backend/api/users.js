module.exports = app => {
    const getByName = (req, res) => {

        app.db('users')
            .select('*')
            .where({ name: req.params.name})
            .first()
            .then(user => res.json(user))
            .catch(err => res.status(500).send(err))
    }

    return { getByName }

}