require('newrelic');
const express = require('express');
const path = require('path');
const morgan = require('morgan');
const proxy = require('http-proxy-middleware');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(morgan('dev'));
app.use(cors());
const staticPath = `${__dirname}/../public`;
console.log(staticPath);



app.use('/fandangit/:id', express.static(path.join(__dirname, '/../public')));


//video carousel
const videoCarouselOptions = {
  target: 'http://ec2-54-67-84-44.us-west-1.compute.amazonaws.com:3001',
  changeOrigin: true
};
const videoCarouselProxy = proxy(videoCarouselOptions);
app.use('/videos', videoCarouselProxy);

//actors
const actorsOptions = {
  target: 'http://ec2-54-215-226-106.us-west-1.compute.amazonaws.com:2002',
  changeOrigin: true
};
const actorsProxy = proxy(actorsOptions);
app.use('/actors', actorsProxy);

//main info
const infoOptions = {
  target: 'http://ec2-54-91-248-31.compute-1.amazonaws.com:2000',
  changeOrigin: true
};
const infoProxy = proxy(infoOptions);
app.use('/main', infoProxy);


app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});