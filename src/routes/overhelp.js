var axios = require('axios');
var mysql = require('mysql');

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

      if (response.data.items.length !== 0){
        let accpetedAnswerBody;
        let resultTitle = response.data.items[0].title;
        let resultTags = response.data.items[0].tags;
        let resultLink = response.data.items[0].link;


        const acceptedAnswer = response.data.items[0].answers.find((answer) => {
          return answer.is_accepted;
        });

        if (acceptedAnswer) {
          accpetedAnswerBody = acceptedAnswer.body;
        } else {
          // If all questions are not answered, here is the solution
        }

        //DB login when data exists

        var connection = mysql.createConnection({
          host : '127.0.0.1',
          user : 'root',
          password : '1q2w3e4r',
          database: 'overhelpDB'
        });

        connection.connect((err) => {
          if(err) {
            throw err;
          } else {
            console.log("DB Connection done");
          }
        });

        let stringifiedTags = resultTags.join(",");

        const data = { title : resultTitle, tag : stringifiedTags, link : resultLink, body : accpetedAnswerBody};

        connection.query('INSERT INTO answerInfo SET ?', data, (err) => {
          if (err){
            console.log(err);
          }
        });

        //unconnect
        connection.end();

        res.status(200);
        res.json(data);

        // TODO: 키워드화
        // const resultTitle = response.data.items.title;
        // axios.get('http://api.datamixi.com/datamixiApi/keywordextract?request=post&request_id=0&text=${resultTitle}')
        // .then((responseT) => {
        //   //Receive and process data
        //   //need key value
        //  })
      }

      if (response.data.items.length === 0) {
        // TODO: should call real user matching funciton.
        res.json({ call: "open QnA channel" });
        return;
      }

    })
    .catch((err) => {
      console.log("axios error", err);
      res.json(err);
    });
  });
}


function errorStackParse(errors) {
  const C_REGEX_PATTERN_01 = /(Error|error) \w+/;
  const C_REGEX_PATTERN_RUNTIME = /^Run-Time Check Failure/;

  // FIRST CHECK RUN-TIME error
  if(errors.match(C_REGEX_PATTERN_RUNTIME)) {
    return [errors];
  }
  const error = errors.replace(":\\", "");
  const splitedError = error.split(":");
  return splitedError.filter((message) => {
    return message.trim().match(C_REGEX_PATTERN_01);
  });
}
