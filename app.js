net = require('net');

server = net.createServer(function (socket) {

    console.log("Connection from: " + socket.remoteAddress);

    var testIndex = 0;

    var tests = ["1 + 1", "2 + 2", "3 - 4", "4 * 4", "9 / 0", "1000 / 2", "2 / 2", "432749865987634387946482736147362498712634 / 2"];
    var results = ["2" , "4", "-1" , "16", "ERROR", "500", "1", "ERROR"];

    var client_md5 = "";

    socket.on('data', function (data) {
       if(data.toString().startsWith("HELLO"))
       {
            var message = data.toString().substring(0, data.toString().indexOf("\n") + 1);
            console.log("HELLO message: "+ message);
            client_md5 = message.substring(5, data.toString().indexOf("\n"));
            console.log("Client MD5: " + client_md5);
            sendTest(socket, testIndex);

       }
       else if(data.toString().startsWith("RESULT"))
       {
            if(client_md5.length == 0)
            {
                socket.end();
                return;
            }
	    console.log("------------------------------");
            var message = data.toString().substring(0, data.toString().indexOf("\n") + 1);
            console.log("RESULT message: " + message);
            var result = message.substring(7, data.toString().indexOf("\n"));
            console.log("Result of test: " + tests[testIndex]);
            console.log("Expected: " + results[testIndex]);
            console.log("Obtained: " + result);
            if(result == results[testIndex]) {
                console.log("Correct result");
            } else {
                console.error("Incorrect result");
                socket.end();
                return;
            }
            if(++testIndex < tests.length)
            {
                sendTest(socket, testIndex);
            }
            else
            {
                sendBye(socket);
            }
       }
       else
       {
           socket.end();
       }
    });

    function sendTest(client, index) {
        console.log("Sending test number: " + index);
        client.write("SOLVE " + tests[index] + "\n");
    }

    function sendBye(client) {
        client.write("BYE 33e87c9cfc6fbb5a57effa090404dd19\n");
        client.end();
    }
});

process.on('uncaughtException', function (err) {
  console.error(err.stack);
  console.log("Node NOT Exiting...");
});

server.listen(55555);
