net = require('net');

server = net.createServer(function (socket) {

    console.log("Connection from: " + socket.remoteAddress);

    var testIndex = 0;

    var tests = ["1 + 1", 
		 "2 + 2",
		 "3 - 4",
		 "4 * 4",
		 "9 / 0", 
		 "1000 / 2",
		 "2 / 2",
		 "5 / 2",
		 "10 / 3",
		 "1258 / 1000"];
    var results = ["2.00", 
		   "4.00", 
		   "-1.00", 
  		   "16.00",
		   "ERROR",
		   "500.00",
		   "1.00",
		   "2.50",
		   "3.33",
		   "1.25"];

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
        client.write("BYE 9b892d304b239d1a654b9064448f97c1\n");
        client.end();
    }
});

process.on('uncaughtException', function (err) {
  console.error(err.stack);
  console.log("Node NOT Exiting...");
});

server.listen(55555);
