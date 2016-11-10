console.log(process.env.DATABASE_URL);
exports.DATABASE_URL = process.env.DATABASE_URL || 'mongodb://localhost/comic-collector';

// process.env.DATABASE_URL ||
//                        global.DATABASE_URL ||
//                        (process.env.NODE_ENV === 'production' ?
//                             'mongodb://localhost/comic-collector' :
//                             'mongodb://localhost/comic-collector-test');
