const express = require('express')
const app = express()
const port = 3000
const exphbs = require('express-handlebars')
const restaurants = require('./restaurant.json')

app.engine('handlebars', exphbs({ defaultlayout: "main" }))
app.set('view engine', 'handlebars')

app.use(express.static('public'))

app.get('/', (req, res) => {
  res.render('index', { restaurants: restaurants.results })
})

app.get('/restaurants/:id', (req, res) => {
  const id = req.params.id
  const restaurant = restaurants.results.find(restaurant => restaurant.id === Number(id))
  //console.log(restaurant)
  res.render('show', { restaurant })
})


app.get('/search', (req, res) => {
  const keyword = req.query.keyword.trim()

  filteredRestaurant = restaurants.results.filter(restaurant => restaurant.name.includes(keyword) || restaurant.category.includes(keyword))

  res.render('index', { restaurants: filteredRestaurant, keyword: keyword })
})

app.listen(port, () => {
  console.log(`This is a restaurant server listening on http:/localhost:${port}`)
})