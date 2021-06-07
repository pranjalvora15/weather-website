const path = require('path');
//always put core module first then npm module
const express = require('express');
const hbs = require('hbs');

const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');

console.log(__dirname);
// console.log(__filename);
console.log(path.join(__dirname, '../public'));
const app = express();
const port=process.env.PORT || 3000
const publicDirectoryPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');
app.set('view engine', 'hbs');
app.set('views', viewsPath);

hbs.registerPartials(partialsPath);

app.use(express.static(publicDirectoryPath));

app.get('', (req, res) => {
  res.render('index', {
    title: 'Weather App',
    name: 'Pranjal Vora',
  });
});

//app.com
//app.com/help
//app.com/about

//contains two argument req which contains information about incoming request to server
//other argument is res which allows us to customize to send back to the requester

//Start the server
// app.get('',(req,res)=>{
// res.send('<h1>Hello Express!</h1>')
// })

/*app.get('/help',(req,res)=>{
    res.send('Help Page');
})
app.get('/about',(req,res)=>{
    // res.send({
    //     name:'Pranjal',
    //     age:23
    // });
    res.send([{
        name:'Krishna'
    },{
        name:'Radhe'
    }])
})*/

app.get('/about', (req, res) => {
  res.render('about', {
    title: 'About me',
    name: 'Pranjal Vora',
  });
});

app.get('/help', (req, res) => {
  res.render('help', {
    message: 'Help is On the Way',
    title: 'Help',
    name: 'Pranjal Vora',
  });
});

app.get('/weather', (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: 'You must provide the address',
    });
  }

  geocode(
    req.query.address,
    (error, { latitude, longitude, location } = {}) => {
      if (error) {
        return res.send({ error });
      }
      forecast(latitude, longitude, (error, forecastData) => {
        if (error) {
          return res.send({ error });
        }
        res.send({
          location,
          forecast: forecastData,
          address: req.query.address,
        });
      });
    }
  );
  // res.send({
  //   forecast:'Clear',
  //   loaction:'Gujarat',
  //   address:req.query.address
  // });
});

app.get('/products', (req, res) => {
  if (!req.query.search) {
    return res.send({
      error: 'You must provide search term',
    });
  }
  console.log(req.query);
  res.send({
    products: [],
  });
});

app.get('/help/*', (req, res) => {
  res.send({
    message: 'Help article not found',
  });
});

app.get('*', (req, res) => {
  res.send({
    message: 'Page not found',
  });
});

app.listen(port, () => {
  console.log('Server is up at port '+port+'.');
});
