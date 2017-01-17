http = require('http')
flow = require('./flow.js')
input = require('./input.json')

// We need this to build our post string
var querystring = require('querystring');
var http = require('http');

// Build the post string from an object
console.log(input)
data = {
  message: input.text,
  user: flow.env.pushover_user_id,
  token: flow.env.pushover_key
}
var post_data = querystring.stringify(data);

// An object of options to indicate where to post to
var post_options = {
  host: 'api.pushover.net',
  port: '80',
  path: '/1/messages.json',
  method: 'POST',
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded',
    'Content-Length': Buffer.byteLength(post_data)
  }
};

// Set up the request
var post_req = http.request(post_options, function(res) {
  res.setEncoding('utf8');
  res.on('data', function (chunk) {
    console.log('Response: ' + chunk);
  });
});

// post the data
post_req.write(post_data);
post_req.end();
