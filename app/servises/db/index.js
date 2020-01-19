const mysql = require('mysql');

const createDb = options => {
    return new Promise((rs,rj)=>{
        let db = mysql.createConnection(
            {
                host: options.host,
                user: options.user,
                password: options.password
            });
        db.connect( err=> {
            if (err) throw err;
            try {
                const sql = `CREATE DATABASE IF NOT EXISTS ${options.database}`;
                db.query(sql, (err, result) => {
                    db.end();
                    if (err) return rj(err);
                    if (result) return rs(result);
                    return process.exit(1);
                })
            } catch (e) {
                rj(e)
            }
        })
    })
};
const createTables = (tableName, options, schema) => {
    return new Promise((rs,rj)=>{

        const db = mysql.createConnection(options);
        db.connect(err=>{
            if (err) throw err;
            let sql = `CREATE TABLE IF NOT EXISTS ${tableName} (`;
            for (key in schema) {
                sql += `${key} ${schema[key]}, `
            }
            sql = sql.slice(', ',-2) + ')';
            db.query(sql, (err,result)=>{
                if (err) return rj(err);
                if (result) return rs(result);
                return process.exit(1);
            });
            db.end()
        });
    })
};

module.exports = {createDb, createTables};