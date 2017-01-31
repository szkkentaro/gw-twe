# gw-twe
Gateway for TWE-Lite

## Usage
Set up your firebase settings.
Put `config/firebase.js` file for firebase.

Just like bellow.
```
'use strict'

module.exports = {
  apiKey: "***************************************",
  authDomain: "yourproject-74fdc.firebaseapp.com",
  databaseURL: "https://yourproject-74fdc.firebaseio.com",
  storageBucket: "yourproject-74fdc.appspot.com",
  messagingSenderId: "744088660468"
}
```

Then, Run command bellow.
Please set your parent reciver device to TTY env.

```
cd /path/to/your-repo
NODE_DEBUG=index,gateway TTY=/dev/tty.usbserial-MWHLBXU node index.js
```

