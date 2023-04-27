module.exports = app => {
    app.route('/stock')
        .get(app.api.stock.get)
        .post(app.api.stock.save)
    
    app.route('/stock/id/:id')
        .get(app.api.stock.getById)
        .post(app.api.stock.save)

    app.route('/stock/code/:code')
        .get(app.api.stock.getByCode)

    app.route('/stock/name/:name')
        .get(app.api.stock.getByName)

    app.route('/stock/sorted/:type/:column/:direction/:limit/:offset')
        .get(app.api.stock.getSorted)

    app.route('/stock/:offset/:limit')
        .get(app.api.stock.get)

    app.route('/stock/:type')
        .get(app.api.stock.getByType)

    app.route('/stock/:type/:offset/:limit')
        .get(app.api.stock.getByTypeLimit)

    app.route('/stock/:type/:value')
        .get(app.api.stock.getBySearch)

    app.route('/stock/:type/:value/:offset/:limit')
        .get(app.api.stock.getBySearchLimit)

    app.route('/stock-actions')
        .get(app.api.stockActions.get)
        .post(app.api.stockActions.save)

    app.route('/stock-actions/:type')
        .get(app.api.stockActions.getByType)

    app.route('/stock-actions/:type/:offset/:limit')
        .get(app.api.stockActions.getByTypeLimit)

    app.route('/stock-actions/action/:action')
        .get(app.api.stockActions.getByAction)

    app.route('/employees')
        .get(app.api.employees.get)
        .post(app.api.employees.save)

    app.route('/employees/status/:status')
        .get(app.api.employees.getByStatus)

    app.route('/employees/id/:id')
        .get(app.api.employees.getById)
        .post(app.api.employees.save)

    app.route('/employees/card/:cardNumber')
        .get(app.api.employees.getByCardNumber)

    app.route('/employees/cpf/:cpf')
        .get(app.api.employees.getByCPF)

    app.route('/projects')
        .get(app.api.projects.get)
        .post(app.api.projects.save)

    app.route('/projects/id/:id')
        .get(app.api.projects.getById)
        .post(app.api.projects.save)

    app.route('/projects/number/:number')
        .get(app.api.projects.getByNumber)
        
        
    app.route('/projects/status/:status')
        .get(app.api.projects.getByStatus)

    app.route('/projects/limit/:status/:offset/:limit')
        .get(app.api.projects.getByLimit)
    
    app.route('/send-mail')
        .post(app.api.email.send)

    app.route('/users/name/:name')
        .get(app.api.users.getByName)
}