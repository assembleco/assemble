# See:
# https://docs.python.org/2/library/json.html
# https://docs.python.org/2/library/httplib.html

import json
import httplib, urllib

class Flow(object):
  @staticmethod
  def input():
    f = open("./input.json")
    return json.load(f)

  @staticmethod
  def env():
    f = open("./env.json")
    return json.load(f)

  @staticmethod
  def config():
    f = open("./config.json")
    return json.load(f)

  @staticmethod
  def trigger(flow_id, data):
    params = urllib.urlencode(data)
    headers = {"Content-type": "application/x-www-form-urlencoded",
            "Accept": "text/plain"}
    conn = httplib.HTTPConnection(Flow.config()['host'])
    conn.request("POST",  "/flows/" + str(flow_id) + "/runs", params, headers)
    response = conn.getresponse()
    print response.status, response.reason
    data = response.read()
    conn.close()
    return data
