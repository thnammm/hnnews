var multer = require('multer');

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './public/img/post/')
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname)
    }
})

var upload = multer({ storage });

module.exports = function (app) {
    app.post('/upload', (req, res, next) => {
        upload.single('avapost')(req, res, err => {
            if (!req.file) {
                console.log("No file received");
                return res.send({
                    success: false
                });

            } else {
                console.log(req.file.path);
                return res.send({
                    success: true
                })
            }
        })
    })
}