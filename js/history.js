$(function() {
    $('#side-menu').metisMenu();
});

$(document).ready(function() {

    if(!PassportPipeline.hasValidSession()){ 
        location.href = "login.html";
    } else {
        sessionStorage.setItem("fromLogin", false);
        ModelViewController.fillHistory();
    };
    $('#transaction-history').DataTable({
        responsive: true,
        "order": [[ 3, 'desc' ]]
    });
});
