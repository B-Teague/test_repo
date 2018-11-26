exports.HOMEPAGE = async function(req, res, next) {
    res.sendFile('/app/views/index.html');  
};