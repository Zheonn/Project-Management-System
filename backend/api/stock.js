module.exports = app => {
    const get = (req, res) => {

        app.db('stock')
            .select('id', 'code', 'name', 'brand', 'price', 'type', 'amount')
            .where({ status: "active"})
            .then(items => res.json(items))
            .catch(err => res.status(500).send(err))
    }

    const getSorted = (req, res) => {

        app.db('stock')
            .select('id', 'code', 'name', 'brand', 'price', 'type', 'amount')
            .where({ type: req.params.type, status: "active" })
            .orderBy(req.params.column, req.params.direction)
            .limit(req.params.limit)
            .offset(req.params.offset)
            .then(items => res.json(items))
            .catch(err => res.status(500).send(err))
    }

    const getByType = (req, res) => {

        app.db('stock')
            .select('id', 'code', 'name', 'brand', 'price', 'type', 'amount')
            .where({ type: req.params.type, status: "active" })
            .then(items => res.json(items))
            .catch(err => res.status(500).send(err))
    }

    const getByTypeLimit = (req, res) => {

        app.db('stock')
            .select('id', 'code', 'name', 'brand', 'price', 'type', 'amount')
            .where({ type: req.params.type, status: "active" })
            .limit(req.params.limit)
            .offset(req.params.offset)
            .then(items => res.json(items))
            .catch(err => res.status(500).send(err))
    }

   
    const getByName = (req, res) => {

        app.db('stock')
            .select('id', 'code', 'name', 'brand', 'price', 'type', 'amount')
            .where({ name: req.params.name })
            .then(items => res.json(items))
            .catch(err => res.status(500).send(err))
    }


    const getBySearch = (req, res) => {

        app.db('stock')
            .select('id', 'code', 'name', 'brand', 'price', 'type', 'amount')
            .where({ type: req.params.type, status: "active" })
            .like({ name })
            .then(items => res.json(items))
            .catch(err => res.status(500).send(err))
    }

    const getBySearchLimit = (req, res) => {

        app.db('stock')
            .select('id', 'code', 'name', 'brand', 'price', 'type', 'amount')
            .where({
                type: req.params.type,
                name: req.params.value,
                status: "active"
            })
            .limit(req.params.limit)
            .offset(req.params.offset)
            .then(items => res.json(items))
            .catch(err => res.status(500).send(err))
    }

    const getById = (req, res) => {

        app.db('stock')
            .select('id', 'code', 'name', 'brand', 'price', 'type', 'amount')
            .where({ id: req.params.id })
            .first()
            .then(items => res.json(items))
            .catch(err => res.status(500).send(err))
    }

    const getByCode = (req, res) => {

        app.db('stock')
            .select('*')
            .where({ code: req.params.code })
            .first()
            .then(item => res.json(item))
            .catch(err => res.status(500).send(err))
    }

    

    const save = (req, res) => {
        const item = { ...req.body }

        if (req.params.id) {

            app.db('stock')
                .update(item)
                .where({ id: req.params.id })
                .catch(err => res.status(500).send(err))

        } else {

            app.db('stock')
                .insert(item)
                .then(_ => res.status(204).send())
                .catch(err => res.status(500).send(err))

        }

    }

    return { 
        get, 
        save, 
        getById, 
        getByType, 
        getByTypeLimit, 
        getBySearch, 
        getBySearchLimit, 
        getSorted, 
        getByCode, 
        getByName
    }
}
