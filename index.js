const dns = require("dns-socket");
const async = require("async");
const ptr = require("ip-ptr");

const defaults = {
  timeout: 10000,
  server: "208.67.222.222",
  port: 53,
};

function queryFactory(ip, socket, opts) {
  return function query() {
    return new Promise(function(resolve, reject) {
      socket.on("error", e => {
        reject(e);
      });
      socket.query({
        questions: [{
          type: "A",
          name: ptr(ip, {suffix: false}) + "." + "score.senderscore.com",
        }]
      }, opts.port, opts.server, function(err, res) {
        if (err) return reject(err);
        if(res.answers.length === 0) return resolve(false);

        let scrore = parseInt(res.answers[0].data.split(".")[3]);
        resolve(scrore);
        
        return resolve(false);

      });
    });
  };
}

module.exports.lookup = (addr, opts) => {
  opts = Object.assign({}, defaults, opts);
  const socket = dns({timeout: opts.timeout});
  return queryFactory(addr, socket, opts)().then(result => {
    socket.destroy();
    return JSON.stringify(result);
  });
};