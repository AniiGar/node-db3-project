const knex = require('knex');

const knexConfig = require('../knexfile.js');

const db = knex(knexConfig.development);

module.exports = {
    find,
    findById,
    findSteps,
    add,
    addSteps,
    update,
    remove
}

function find() {
    return db('schemes');
}

function findById(id) {
    return db('schemes').where({ id: Number(id) });
}

function findSteps(id) {
    return db('steps')
        .join('schemes', 'schemes.id', 'scheme_id')
        .select('steps.id', 'scheme_name', 'step_number', 'instructions')
        .where('schemes.id', id)
        .orderBy('step_number')

}

// SELECT steps.id, scheme_name, step_number, instructions
// FROM steps
// JOIN schemes
// ON steps.scheme_id = schemes.id
// WHERE schemes.id = 5
// ORDER BY step_number

function add(scheme) {
    return db('schemes')
        .insert(scheme, 'id')
        .then(ids => ({ id: ids[0] }));
}

function update(changes, id) {
    return db('schemes')
        .where('id', Number(id))
        .update(changes)
        .then(ids => {
            return db('schemes').where({ id: Number(id) });
        })
}

// -   `addStep(step, scheme_id)`: This method expects a step object and a scheme id. It inserts the new step into the database, correctly linking it to the intended scheme.
// -   You may use `POST /api/schemes/:id/addStep` to test this method.

function addSteps(step, scheme_id) {
    return db('steps')
        .insert(step)
        .where('scheme_id', Number(id))
}

// INSERT INTO steps (step_number, instructions, scheme_id)
// VALUES ('1', 'Find new job', '8');

function remove(id) {
    return db('schemes')
        .where('id', Number(id))
        .del()
}