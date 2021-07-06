const express = require('express');
const app = express();
const cors = require('cors');
const axios = require('axios');
const port = process.env.PORT || 3000;

app.use(cors());

app.get("/", async (req, res) => {
  try {
    let response = [];
    let repository = {};
    let { data } = await axios(
      "https://api.github.com/users/takenet/repos?&type=public&sort=created&direction=asc&per_page=50"
    );
    let tongue = "C#";
    let result = data.filter((item) => {
      return item.language == tongue;
    });
    for (let i = 0; i < 5; i++) {
      repository = {
        name: result[i].name,
        full_name: result[i].full_name,
        description: result[i].description,
        language: result[i].language,
        created_at: result[i].created_at,
        avatar_url: result[i].owner.avatar_url,
      };
      response.push(repository);
    }
    return res.status(200).json(response);
  } catch (error) {
    res
      .status(404)
      .json({ message: "erro, não foi possível executar esse serviço" });
  }
});

app.listen(port, () => console.log(`Server running at port ${port}`));
