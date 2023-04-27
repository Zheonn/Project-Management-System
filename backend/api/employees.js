module.exports = app => {
    const get = (req, res) => {
        app.db('employees')
            .select("*")
            .then(employees => res.json(employees))
            .catch(err => res.status(500).send(err))
    }

    const getById = (req, res) => {

        app.db('employees')
            .select('*')
            .where({ id: req.params.id })
            .then(employee => res.json(employee))
            .catch(err => res.status(500).send(err))
    }

    const getByStatus = (req, res) => {

        app.db('employees')
            .select('*')
            .where({ status: req.params.status })
            .then(employees => res.json(employees))
            .catch(err => res.status(500).send(err))
    }

    const getByCardNumber = (req, res) => {

        app.db('employees')
            .select('*')
            .where({ cardNumber: req.params.cardNumber })
            .first()
            .then(employee => res.json(employee))
            .catch(err => res.status(500).send(err))
    }

    const getByCPF = (req, res) => {

        app.db('employees')
            .select('*')
            .where({ cpf: req.params.cpf })
            .first()
            .then(employee => res.json(employee))
            .catch(err => res.status(500).send(err))
    }

    const save = (req, res) => {
        const employee = { ...req.body }

        if(req.params.id) {

            app.db('employees')
                .update(employee)
                .where({ id: req.params.id })
                .catch(err => res.status(500).send(err))

        } else {

            app.db('employees')
                .insert(employee)
                .then(_ => res.status(204).send())
                .catch(err => res.status(500).send(err))

        }
        
    }

    return { get, getById, getByStatus, getByCardNumber, getByCPF, save }
}