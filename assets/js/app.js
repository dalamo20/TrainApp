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

            var div = $("<div>");
            var button = $("<button>");
            button.addClass("remove-schedule");
            //giving button id one of the arrays folder names from database
            button.attr("data-task-id", keys[i]);
            button.text("Remove");
            var span = $("<span>");
            span.text(trainComes.train + "" + trainComes.place + "" + trainComes.time + "" + trainComes.minutes);
            div.append(button);
            div.append(span);
            //add elements to Current Train Schedule
            $("#train-schedule").append(div);

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
            minutes: trainFreq,
            createdDate: firebase.database.ServerValue.TIMESTAMP//use for dates&times
        });
        //clearing text box when done
        $("#train-name").val("");
        $("#destination").val("");
        $("#train-time").val("");
        $("#train-frequency").val("");

    });

});