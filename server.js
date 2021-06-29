const express = require("express");
const app = express();
const cors = require("cors");
const axios = require("axios");
const port = process.env.PORT || 3000;

app.use(cors());

app.get("/", async (req, res) => {
  try {
    let { data } = await axios(
      "https://api.github.com/users/takenet/repos?&type=public&sort=created&direction=asc&per_page=50"
    );
    let tongue = "C#";
    let result = data.filter((item) => {
      return item.language == tongue;
    });
    result.sort(function (a, b) {
      return a.created_at - b.created_at;
    });
    return res.status(200).json(result);
  } catch (error) {
    res
      .status(404)
      .json({ message: "erro, não foi possível executar esse serviço" });
  }
});

app.listen(port, () => console.log(`Server running at port ${port}`));
