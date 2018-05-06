//Captains Log: Not quite sure how military time using moments.js supposed to work if
//user inputs the number alone. I could have made the Current Train Schedule look better formatted with
//labels above each user input so that users can know what each field means. 
//I wanted to do something about the spacing between each item so I tried ""
//between each property on line 35.

//Get starting point from time assignment
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
            //get user input to display in seperate columns
            tName.text(trainComes.train);
            tDest.text(trainComes.place);
            tFreq.text(trainComes.time);
            tArrive.text(trainComes.minutes);
            tAway.text(trainComes.place);
            //but append each text to the same row
            row.append(button);
            row.append(tName);
            row.append(tDest);
            row.append(tFreq);
            row.append(tArrive);
            row.append(tAway);
            //add elements to Current Train Schedule's tbody
            $("#train-schedule").append(row);

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