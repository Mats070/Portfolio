 const getIP = (req) =>{
    let ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
    ip = ip.toString().replace('::ffff:', '');
    return ip
 }

 module.exports = getIP;