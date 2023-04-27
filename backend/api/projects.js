module.exports = app => {
    const get = (req, res) => {

        app.db('projects')
            .select('*')
            .where({ status: "active" })
            .then(projects => res.json(projects))
            .catch(err => res.status(500).send(err))
    }

    const getById = (req, res) => {

        app.db('projects')
            .select('*')
            .where({ id: req.params.id })
            .then(project => res.json(project))
            .catch(err => res.status(500).send(err))
    }

    const getByNumber = (req, res) => {

        app.db('projects')
            .select('*')
            .where({ number: req.params.number })
            .then(project => res.json(project))
            .catch(err => res.status(500).send(err))
    }

    const getByLimit = (req, res) => {

        app.db('projects')
            .select('*')
            .where({status: req.params.status})
            .limit(req.params.limit)
            .offset(req.params.offset)
            .then(items => res.json(items))
            .catch(err => res.status(500).send(err))
    }

    const getByStatus = (req, res) => {

        app.db('projects')
            .select('*')
            .where({status: req.params.status})
            .then(items => res.json(items))
            .catch(err => res.status(500).send(err))
    }


    const save = (req, res) => {
        const project = { ...req.body }

        if (req.params.id) {

            app.db('projects')
                .update(project)
                .where({ id: req.params.id })
                .catch(err => res.status(500).send(err))

        } else {

            app.db('projects')
                .insert(project)
                .then(projects => res.json(projects))
                .catch(err => res.status(500).send(err))
        }

    }


    return { get, getByLimit, save, getById, getByStatus, getByNumber}
}