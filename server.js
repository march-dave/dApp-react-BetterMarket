const express = require('express');
const path = require('path');
const port = process.env.PORT || 8080;
const app = express();

// the __dirname is the current directory from where the script is running
app.use(express.static(__dirname));

// send the user to index html page inspite of the url
app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'src', 'index.html'));
});

app.listen(port, () => {
    console.info(`Express Listening on Port: ${port}`);
});

// const express = require('express');
// const path = require('path');

// module.exports = {
//     app: function() {
//         const app = express()

//         // app.use(morgan('dev'))
//             // app.use(bodyParser.json())
//             // app.use(bodyParser.urlencoded({ extended: false }))

//         // const indexPath = path.join(__dirname, 'index.html')
//         const publicPath = express.static(path.join(__dirname, 'dist'))

//         app.use('/dist', publicPath)
//         //     // app.use('/', require(./routes/index))
//         // app.get('/', function(_, res) { res.sendFile(indexPath) })

//         return app
//     }
// }