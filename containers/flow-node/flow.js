const http = require('http');
const querystring = require('querystring');

exports.input = require('./input.json')
exports.env = require('./env.json')

exports.trigger = function(flow_id, data) {
  var post_data = querystring.stringify(data);

  var post_options = {
    // TODO: read this from the server's domain settings
    host: '3327afe3.ngrok.io',
    port: '80',
    path: '/flows/' + flow_id + '/runs',
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Content-Length': Buffer.byteLength(post_data)
    }
  };

  console.log(post_options)

  var post_req = http.request(post_options, function(res) {
    res.setEncoding('utf8');
    res.on('data', function (chunk) {
      console.log('Response: ' + chunk);
    });
  });

  post_req.write(post_data);
  post_req.end();
}
