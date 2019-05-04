require('newrelic');
const express = require('express');
const path = require('path');
const morgan = require('morgan');
const proxy = require('http-proxy-middleware');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 3006;

app.use(morgan('dev'));
app.use(cors());
const staticPath = `${__dirname}/../public`;
console.log(staticPath);



app.use('/fandangit/:id', express.static(path.join(__dirname, '/../public')));


app.get('/loaderio-fa5c50a3c85242e75a3bc38ee6b02c8e', (req, res) => {
  const filePath = path.join(__dirname, '../loaderio-fa5c50a3c85242e75a3bc38ee6b02c8e.txt');
  res.sendFile(filePath);
});

//video carousel
const videoCarouselOptions = {
  target: 'http://ec2-13-57-213-223.us-west-1.compute.amazonaws.com:8000',
  changeOrigin: true
};
const videoCarouselProxy = proxy(videoCarouselOptions);
app.use('/videos', videoCarouselProxy);

//actors
const actorsOptions = {
  target: 'http://ec2-13-57-198-90.us-west-1.compute.amazonaws.com:8000',
  changeOrigin: true
};
const actorsProxy = proxy(actorsOptions);
app.use('/actors', actorsProxy);

//main info
const infoOptions = {
  target: 'http://ec2-54-161-202-111.compute-1.amazonaws.com:8000',
  changeOrigin: true
};
const infoProxy = proxy(infoOptions);
app.use('/main', infoProxy);


app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});