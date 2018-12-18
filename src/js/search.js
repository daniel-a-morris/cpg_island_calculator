function runSearch( term ) {
    $("#results").hide();
    $("tbody").empty();
    var frmStr = $("form").serialize()
    $.ajax({
        url: "../search.cgi",
        dataType: "json",
        data: frmStr,
        success: function(data, textStatus, jqXHR) {
            processJSON(data);
        },
        error: function(jqXHR, textStatus, errorThrown){
            alert("Failed to perform analysis! textStatus: (" + textStatus +
                  ") and errorThrown: (" + errorThrown + ")");
        }
    });
}

function processJSON( data ) {
    $("#match_count").text( data.match_count );
    var next_row_num = 1;
    $.each( data.matches, function(i, item) {
        var this_row_id = "result_row_" + next_row_num++;
        $("<tr/>", { "id" : this_row_id } ).appendTo("tbody");
        $("<td/>", { "text" : item.start } ).appendTo("#" + this_row_id);
        $("<td/>", { "text" : item.end } ).appendTo("#" + this_row_id);
        $("<td/>", { "text" : item.count } ).appendTo("#" + this_row_id);
        $("<td/>", { "text" : item.percent } ).appendTo("#" + this_row_id);
        $("<td/>", { "text" : item.ratio } ).appendTo("#" + this_row_id);
    })
    $('#results').show();
}

$(document).ready( function() {
    $("#submit").click( function() {
        runSearch();
        return false;
    });
})
