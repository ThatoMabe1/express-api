import express from 'express';

const app = express();
app.use(express.json());

app.use(express.static('public'));


app.use(express.json())

const greetings = {
  'english': 'Hello'
}

app.get('/api/greet', function (req, res) {

  const username = req.query.username;
  const language = req.query.language;
  console.log(greetings)
  console.log(req.query)
  if (!greetings[language]) {
    return res.json({
      error: 'Invalid language'
    })
  }

  const greeting = greetings[language]
  res.json({
    message: `${greeting}, ${username}`
  })
});

app.post('/api/greet', function (req, res) {

  const language = req.body.language;
  const greeting = req.body.greeting;

  console.log(req.body);
  console.log(greetings)

  greetings[language] = greeting

  res.json({
    status: 'success',
    message: `added a greeting for ${language}!`
  })
});


app.get('/api/greet/:username', function (req, res) {
  console.log(req.query);
  const username = req.params.username;
  res.json({
    message: `Hello, ${username}!`
  })
});

const PORT = process.env.PORT || 4009;

app.listen(PORT, function () {
  console.log(`app started on port ${PORT}`);
});