# OverHelp
Give some help guide when faced Run-time, syntax, compile error.

Use StackOverFlow helper


# Use API
* https://api.stackexchange.com/docs

# OUR API DOCS
## OVERHELP
This is response error help guide message when user send programmatic errors.

Example
* curl -d '{"platform":"python", "error": "out of range"}' -H "Content-Type: application/json" http://127.0.0.1:3000/overhelp

``` javascript
[POST]
URL: /overhelp
You sould add this on HTTP/S header
[HEADER]
Content-type: applicaion/json
[BODY PARAMETERS]
{
  "platform": "[any kind of our supporting platform]",
  "error": "[syntax, compile, run-time error message or any key word message]"
}
```

