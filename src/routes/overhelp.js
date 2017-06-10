var axios = require('axios');

module.exports = (express) => {
  /**
  * reqeust params:
    {
      platform: string;
      error: string;
    }
  */
  express.post("/overhelp", (req, res) => {
    const reqTargetPlatform = req.body.platform;
    const reqError = req.body.error;

    if (!reqTargetPlatform || !reqError) {
      res.status(403);
      res.json({ error: "Wrong parameters" });
      return;
    }

    try{
      axios.get(`https://api.stackexchange.com/2.2/search?order=desc&sort=activity&intitle=${reqError}&site=stackoverflow&filter=!b0OfNFICOao(Ho`)
      .then((response) => {
        console.log("axios done");
        res.json({
          data: response.data
        })
      })
      .catch((err) => {
        console.log("axios error");
        res.json(err);
      });
    } catch(err) {
      console.log("catch fires!!");
      res.json(err);
    }
  });
}