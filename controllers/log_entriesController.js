const runSql = require('../db/db');



function create(req, res) {
    runSql('INSERT INTO log_entries(report_id, content) VALUES($1, $2)', [req.params.id, req.body.content], dbres => {
        
        res.json({ message: 'success' })
    
    })
    console.log( { content: req.params.id } )
}


// 
function read(req, res) {
    // SELECT * FROM log_entries join reports ON (log_entries.report_id = reports.id) WHERE report_id = $1 order by timestamp asc;
    runSql('SELECT * FROM log_entries join reports ON (log_entries.report_id = reports.id) WHERE report_id = $1 order by timestamp asc;', [req.params.id], dbres => {
        
        res.json(dbres.rows)
        
    }) 
}

module.exports = {
    create,
    read
}