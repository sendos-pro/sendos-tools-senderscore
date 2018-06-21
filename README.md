# sendos-tools-senderscore

```
npm i sendos-tools-senderscore
```

## Usage

``` js
var senderscore = require('sendos-tools-senderscore');

var opts = {
  timeout: 10000,
  server: "127.0.0.1",
  port: 10053,
};

senderscore.lookup('77.88.55.70', opts)
.then(result => console.log(result))
.catch(err => console.log(err));

```