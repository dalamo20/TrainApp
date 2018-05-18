$(document).ready(function () {
    var database = firebase.database();
    var arr = [];

    database.ref().on("value", function (snapshot) {
        var data = snapshot.val() || {}; //{} replaces "if" statement
        $("#train-schedule").empty();

        var keys = Object.keys(data); //returns an array of strings


        for (var i = 0; i < keys.length; i++) {
            var trainComes = data[keys[i]];
            var trainName = "";
            var destination = "";
            var trainTime = "";
            var trainFreq = "";

            //creating button to delete something from list

            var row = $("<tr>");
            var button = $("<button>");
            button.addClass("remove-schedule");
            //giving button id one of the arrays folder names from database
            button.attr("data-task-id", keys[i]);
            button.text("Remove");
            //created variables for tdata to go in tbody
            var tName = $("<td>");
            var tDest = $("<td>");
            var tFreq = $("<td>");
            var tArrive = $("<td>");
            var tAway = $("<td>");
            
            //converting time
            var tArriveConvert = moment(trainComes.time, "HH:mm").subtract(1, "years");
            // console.log("this is tArrive" + tArriveConvert);
            var currentTime = moment();
            // console.log("current time is" + currentTime);
            var diffTime = moment().diff(moment(tArriveConvert), "minutes");
            // console.log("this is the diffTime " + diffTime);
            var tRemain = diffTime % trainComes.minutes;
            // console.log("remainder: " + tRemain);
            var nextArrival = moment().add(minutesAway, "minutes");
            // console.log("this is next arrival "+ nextArrival);
            
            var minutesAway = trainComes.minutes - tRemain;
            console.log("this is minutes away " + minutesAway);
            var trainArrives = moment(nextArrival).format("LT");
            console.log("this is train arrives " + trainArrives);

            //get user input to display in seperate columns
            tName.text(trainComes.train);
            console.log(trainComes)
            tDest.text(trainComes.place);
            tFreq.text(trainComes.minutes);
            tArrive.text(trainArrives);
            console.log("trainArrives = ", trainArrives);

            tAway.text(minutesAway);
            console.log("minutes away = ", minutesAway)
            
            //but append each text to the same row
            row.append(button);
            row.append(tName);
            row.append(tDest);
            row.append(tFreq);
            row.append(tArrive);
            row.append(tAway);
            //add elements to Current Train Schedule's tbody
            $("#train-schedule").append(row);

            // var minutesAway = trainComes.minutes - tRemain;
            // console.log("this is minutes away " + minutesAway);
            // var trainArrives = moment(nextArrival).format("LT");
            // console.log("this is train arrives " + trainArrives);
        
        }
    });
    //the funciton that executes removal of a schedule
    $(document).on("click", ".remove-schedule", function () {
        var scheduleId = $(this).attr("data-task-id");
        database.ref().child(scheduleId).remove();

    });
    //create 3 more new variables and change html id's to match variables
    //must place new variables in submit function
    $("#submitInput").on("click", function (event) {
        //keep page from refreshing
        event.preventDefault();

        var trainName = $("#train-name").val().trim();
        var destination = $("#destination").val().trim();
        var trainTime = $("#train-time").val().trim();
        var trainFreq = $("#train-frequency").val().trim();
        database.ref().push({
            train: trainName,
            place: destination,
            time: trainTime,
            minutes: trainFreq
        });
        //clearing text box when done
        $("#train-name").val("");
        $("#destination").val("");
        $("#train-time").val("");
        $("#train-frequency").val("");

    });

});