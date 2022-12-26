const mysql = require('mysql');

const connection = mysql.createConnection({
    host : 'localhost',
    database : 'register',
    user : 'root' ,
    password : ''
});

connection.connect(function(err){
    if(err)
    {
        //sendResponse({ success: true });
        throw err;
    }
    else
    {
       // sendResponse({ success: true });
        console.log('Database connected Successfully');
    }
});

module.exports=connection;