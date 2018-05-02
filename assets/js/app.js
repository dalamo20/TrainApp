//Get starting point from time assignment
$(document).ready(function () {
    var database = firebase.database();

    database.ref().on("value", function (snapshot) {
        var data = snapshot.val() || {}; //{} replaces "if" statement
        console.log(data);
        $("#train-schedule").empty();

        var keys = Object.keys(data); //returns an array of strings

        for (var i = 0; i < keys.length; i++) {
            var trainComes = data[keys[i]];
            //creating button to delete something from list
            var div = $("<div>");
            var button = $("<button>");
            button.addClass("remove-schedule");
            //giving button id one of the arrays folder names from database
            button.attr("data-schedule-id", keys[i]);
            var span = $("<span>");
            button.text("Remove");
            span.text(trainComes.task)
            div.append(button);
            div.append(span);
            //add elements to Current Train Schedule
            $("#train-schedule").append(div);

        }
    });
    //the funciton that executes removal of a schedule
    $(document).on("click", "remove-schedule", function () {
        var scheduleId = $(this).attr("data-schedule-id");
        database.ref().child(scheduleId).remove();
    });

    $("#submitInput").on("click", function () {
        var userInput = $("#exampleFormControlInput1").val().trim();
        database.ref().push({
            task: userInput,
            createdDate: firebase.database.ServerValue.TIMESTAMP//use for dates&times
        });
        $("#exampleFormControlInput1").val("");
    });

});