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
    let sendingError;

    if(!reqTargetPlatform || !reqError) {
      res.status(400);
      res.json({ error: "Bad parameters" });
      return;
    }

    const parsedError = errorStackParse(reqError);

    if (!parsedError || parsedError.length === 0) {
      res.status(400);
      res.json({ error: "Error message parse failed" });
      return;
    }

    sendingError = parsedError[0].trim();

    axios.get(`https://api.stackexchange.com/2.2/search?tagged=${reqTargetPlatform}&order=desc&sort=activity&intitle=${sendingError}&site=stackoverflow&filter=!b05-dkWi.xMT(m`)
    .then((response) => {
      console.log("axios done");
      if (response.data.items.length === 0) {
        // TODO: should call real user matching funciton.
        res.json({ call: "open QnA channel" });
        return;
      }
      res.json({
        data: response.data
      });
    })
    .catch((err) => {
      console.log("axios error", err);
      res.json(err);
    });
  });
}


function errorStackParse(errors) {
  const C_REGEX_PATTERN_01 = /error \w+/;
  const C_REGEX_PATTERN_RUNTIME = /^Run-Time Check Failure/;

  // FIRST CHECK RUN-TIME error
  if(errors.match(C_REGEX_PATTERN_RUNTIME)) {
    return errors;
  }

  const error = errors.replace(":\\", "");
  const splitedError = error.split(":");
  return splitedError.filter((message) => {
    return message.trim().match(C_REGEX_PATTERN_01);
  });
}
