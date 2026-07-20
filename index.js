const express = require('express');
const app = express();
const port = 3000;
const db = require('./models');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

db.sequelize.sync()
  .then(() => {
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  })
  .catch((err) => {
    console.log(err);
  });

app.post('/komik', async (req, res) => {
  try {
    const data = req.body;
    try {
      const komik = await db.Komik.create(data);
      res.send(komik);
    } catch (err) {
        res.send(err);
    }
  } catch (err) {
    res.send(err);
  }
});

app.get('/komik', async (req, res) => {
    try {
        const komik = await db.Komik.findAll();
        res.send(komik);
    } catch (err) {
        res.send(err);
    }
});

