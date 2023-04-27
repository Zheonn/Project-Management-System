module.exports = app => {
    const get = (req, res) => {
        app.db('stock_actions')
            .select("*")
            .then(items => res.json(items))
            .catch(err => res.status(500).send(err))
    }

    const getByType = (req, res) => {

        app.db('stock_actions')
            .select('*')
            .where({type: req.params.type})
            .then(items => res.json(items))
            .catch(err => res.status(500).send(err))
    }

    const getByTypeLimit = (req, res) => {

        app.db('stock_actions')
            .select('*')
            .where({type: req.params.type})
            .limit(req.params.limit)
            .offset(req.params.offset)
            .then(items => res.json(items))
            .catch(err => res.status(500).send(err))
    }

    const getByAction = (req, res) => {

        app.db('stock_actions')
            .select('*')
            .where({action: req.params.action})
            .then(items => res.json(items))
            .catch(err => res.status(500).send(err))
    }

    const save = (req, res) => {
        const item = {...req.body}

        app.db('stock_actions')
            .insert(item)
            .then(_ => res.status(204).send())
            .catch(err => res.status(500).send(err))
    }

    return { get, getByType, getByTypeLimit, getByAction, save }
}