
function certificateUnitSelection(){
    $.ajax({
        type: "POST",
        url: Boostan.ApplicationServer.URL + 'services/lesson_DataService/report_user_unit_lesson_operation',
        accept: "application/json",
        data: "report",
        contentType: "application/json",
        crossDomain: true,
        cache: false,
        serverSide: true,
        tryCount: 0,
        retryLimit: null,
        async: false,
        statusCode: {
            202: function () {
                $("#editItemSuccess-alert").removeClass('hidden').fadeTo(6000, 500).slideUp(500, function () {
                    $("#editItemSuccess-alert").slideUp(500);
                    $("#editItemSuccess-alert").addClass('hidden');
                });
            }
        },
        success: function (json) {
           alert(json);
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
        }
    });
}
// function checkSelectionUnitRules() {
//     $.ajax({
//         type: "GET",
//         serverSide: true,
//         paging: true,
//         processing: true,
//         url: Boostan.ApplicationServer.URL + "login-to-selection-unit-checking",
//         accept: "application/json; charset=utf-8",
//         data: {
//             filter: ""
//         },
//         dataType: "json",
//         crossDomain: true,
//         jsonp: false,
//         cache: false,
//         retryCount: 0,
//         retryLimit: 100,
//         async: false,
//
//         success: function (json) {
//         },
//         error: function (a, b, c) {
//
//         }
//     });
// };
$(document).ready(function () {

});