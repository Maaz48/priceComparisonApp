export const callAPI = async (route, token, body, method = "POST") => {
  var url = "https://server-nu-gules.vercel.app" + route;
  // var url = "http://localhost:8080/" + route;
  if (body != null) {
    body = JSON.stringify(body);
  }

  //console.log("Calling endpoint: " + url + " with data: " + body);

  var config = {
    method: method,
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
    body: "",
  };

  if (body != null) {
    config.body = body;
  }

  var Data = await fetch(url, config)
    .then(async (response) => {
      if (response.ok) return Promise.resolve(response.json());

      return Promise.resolve(response.json()).then((responseInJson) => {
        // This will end up in ERROR part
        return Promise.reject(responseInJson.Message);
      });
    })
    .then(function (result) {
      console.log("AA GYA RESULT AA GYA...", result);
      //console.log("API response ==>" + JSON.stringify(result));
      return result;
    })
    .catch(function (error) {
      console.log("error:" + JSON.stringify(error));
      throw error;
    });

  return Data;
};
