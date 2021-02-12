/**
 * @Boostan  {Boostan System}
 * @author {M.Khandan}
 * @copyright {Boostan 2019}
 * @file {}
 */


var selectedDataLesson;
var selectedUserLesson;
var allLesson = {};
var allUserLesson = {};
var allCourseData = [];
function salamSelectedLesenRemove() {
        $.ajax({
            type: "POST",
            url: Boostan.ApplicationServer.URL + LessonManager.services.removeUserLesson,
            accept: "application/json",
            data: JSON.stringify(selectedUserLesson),
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
                refreshDataTableUserLesson();
                alert(json);
            },
            error: function (XMLHttpRequest, textStatus, errorThrown) {
            }
        });
}
function byeFinalizeSelection() {
    $.ajax({
        type: "POST",
        url: Boostan.ApplicationServer.URL + LessonManager.services.finalizeSelection,
        accept: "application/json",
        data: JSON.stringify(selectedUserLesson),
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

$(document).ready(function () {


    loadLesson();
    loadLessonUserUnits();
    disableDTButtonLesson(true);


});


$('#LessonList').on('click', 'tr', function () {
    if ($(this).hasClass('selected')) {
        disableDTButtonLesson(true);
        selectedDataLesson = null;
        $(this).removeClass('selected');

    } else {
        disableDTButtonLesson(true);
        selectedDataLesson = null;
        $('tr.selected').removeClass('selected');
        $(this).addClass('selected');
        selectedDataLesson = allLesson.row(this).data();
        if (selectedDataLesson) {
            disableDTButtonLesson(false);
        }
    }
});

$('#LessonListUserUnits').on('click', 'tr', function () {
    if ($(this).hasClass('selected')) {
        disableDTButtonLesson(true);
        selectedUserLesson = null;
        $(this).removeClass('selected');

    } else {
        disableDTButtonLesson(true);
        selectedUserLesson = null;
        $('tr.selected').removeClass('selected');
        $(this).addClass('selected');
        selectedUserLesson = allUserLesson.row(this).data();
        if (selectedUserLesson) {
            disableDTButtonLesson(false);
        }
    }
});

$(".modal-wide").on("show.bs.modal", function () {
    var height = $(window).height() - 100;
    $(this).find(".modal-body").css("min-height", height);
});

function refreshDataTableLesson() {
    allLesson.clear();
    allLesson.destroy();
    disableDTButtonLesson(true);
    loadLesson();
}

function refreshDataTableUserLesson() {
    allUserLesson.clear();
    allUserLesson.destroy();
    disableDTButtonLesson(true);
    loadLessonUserUnits();
}

function disableDTButtonLesson(input) {
    // $('#updateBtn').prop('disabled', input);
    // $("#deleteBtn").prop('disabled', input);
}

function loadLesson() {
    actualFilter = "";
    $.ajax({
        type: "GET",
        serverSide: true,
        paging: true,
        processing: true,
        url: Boostan.ApplicationServer.URL + LessonManager.services.select,
        accept: "application/json; charset=utf-8",
        data: {
            filter: actualFilter
        },
        dataType: "json",
        crossDomain: true,
        jsonp: false,
        cache: false,
        retryCount: 0,
        retryLimit: 100,
        async: false,

        success: function (json) {
            var allLessonData = [];
            if ($.isArray(json)) {
                allLessonData = json;
            } else if (json) {
                allLessonData.push(json)
            } else {
                allLessonData = [];
            }

            // $.each(allLessonData, function (index, value) {
            //     value.id["@nil"] == "true" ? allLessonData[index].id = "" : value.id;
            //     value.uuid["@nil"] == "true" ? allLessonData[index].uuid = "" : value.uuid;
            //     value.name["@nil"] == "true" ? allLessonData[index].name = "" : value.name;
            //     value.description["@nil"] == "true" ? allLessonData[index].description = "" : value.description;
            //     value.course_id["@nil"] == "true" ? allLessonData[index].course_id = "" : value.course_id;
            //     value.year_lesson["@nil"] == "true" ? allLessonData[index].year_lesson = "" : value.year_lesson;
            //     value.term["@nil"] == "true" ? allLessonData[index].term = "" : value.term;
            //     value.final_date["@nil"] == "true" ? allLessonData[index].final_date = "" : value.final_date;
            //     value.fee["@nil"] == "true" ? allLessonData[index].fee = "" : value.fee;
            //     value.level_lesson["@nil"] == "true" ? allLessonData[index].level_lesson = "" : value.level_lesson;
            //     value.prof_id["@nil"] == "true" ? allLessonData[index].prof_id = "" : value.prof_id;
            //
            //
            // });

            allLesson = $('#LessonList').DataTable({

                "language": {
                    "paginate": {
                        "previous": window.lang.translate('Previous page'),
                        "next": window.lang.translate('Next page'),
                        "last": window.lang.translate('Last page'),
                        "first": window.lang.translate('First page')
                    },
                    buttons: {
                        colvis: window.lang.translate('Change columns'),
                        copy: window.lang.translate('copy'),
                        csv: window.lang.translate('csv')
                    },
                    "lengthMenu": window.lang.translate('Show _MENU_ entries'),
                    "loadingRecords": window.lang.translate('Please wait - loading...'),
                    "processing": window.lang.translate('DataTables is currently busy'),
                    "info": window.lang.translate('Showing page _PAGE_ of _PAGES_'),
                    "infoEmpty": window.lang.translate('Showing 0 to 0 of 0 entries'),
                    "search": window.lang.translate('Search:'),
                    "zeroRecords": window.lang.translate('No records to display'),
                    "infoFiltered": window.lang.translate('(filtered from _MAX_ total entries)'),
                    "emptyTable": window.lang.translate('No data available in table')
                },

                "data": allLessonData,
                "columns": [
                    {"order": "#"},
                    {"data": "course.name"},
                    {"data": "year"},
                    {"data": "term"},
                    {"data": "final_date"},
                    {"data": "fee"},
                    {"data": "level_lesson"},
                    {"data": "profId"}

                ],
                dom: 'Blfrtip',
                stateSave: true,
                buttons: [
                    {
                        extend: 'collection',
                        text: window.lang.translate('Print/Export'),
                        buttons: ['copy', 'csv', {
                            extend: 'print',
                            text: window.lang.translate('Print'),
                            autoPrint: false,
                            exportOptions: {
                                columns: ':visible'
                            },
                            customize: function (printable) {
                                $(printable.document.body)
                                    .css('direction', 'rtl')
                                    .css('background-color', 'white')
                                    .prepend(
                                        '<img src="images/logo.png" style="width:110px; height:120px; float: left; margin-right:11px;" />'
                                    );

                                $(printable.document.body).find('tr:nth-child(odd) td').each(function (index) {
                                    $(this).css('background-color', '#3c8dbc');
                                    $(this).css('color', 'white');

                                });
                                $(printable.document.body).find('h1').css('color', 'black').css('margin-right', '25px');
                                $(printable.document.body).find('th').css('text-align', 'center');
                                $(printable.document.body).find('th').css('color', 'white');

                                $(printable.document.body).find('table')
                                    .addClass('compact')
                                    .css('font-size', 'inherit')
                                    .css('background-color', '#e08e0b')
                                    .css('font-family', 'B Nazanin')
                                    .css('margin-left', '25px')
                                    .css('margin-right', '25px')
                                    .css('width', '98%');
                            }
                        }, {
                            extend: 'print',
                            text: window.lang.translate('Export PDF'),
                            autoPrint: true,
                            exportOptions: {
                                columns: ':visible'
                            },

                            /**
                             * customize - checks classification status of output docs
                             *
                             * @param  {object} printable
                             */
                            customize: function (printable) {
                                $(printable.document.body)
                                    .css('direction', 'rtl')
                                    .css('background-color', 'white')
                                    .prepend(
                                        '<img src="images/logo.png" style="width:110px; height:120px; float: left; margin-right:11px;" />'
                                    );

                                $(printable.document.body).find('tr:nth-child(odd) td').each(function (index) {
                                    $(this).css('background-color', '#3c8dbc');
                                    $(this).css('color', 'white');

                                });
                                $(printable.document.body).find('h1').css('color', 'black').css('margin-right', '25px');
                                $(printable.document.body).find('th').css('text-align', 'center');
                                $(printable.document.body).find('th').css('color', 'white');

                                $(printable.document.body).find('table')
                                    .addClass('compact')
                                    .css('font-size', 'inherit')
                                    .css('background-color', '#e08e0b')
                                    .css('font-family', 'B Nazanin')
                                    .css('margin-left', '25px')
                                    .css('margin-right', '25px')
                                    .css('width', '98%');
                            }
                        }]
                    },
                    'colvis', 'excel'
                ],
                "order": [
                    [1, 'asc']
                ],

                "autoWidth": false,
                "createdRow": function (row, data, index) {

                    var rowId = data['id'];
                    var rfc_status = data['status'];


                }
            });

            allLesson.buttons().container()
                .appendTo('allRfcs_wrapper .col-sm-6:eq(0)');

            allLesson.on('order.dt search.dt', function () {
                allLesson.column(0, {
                    order: 'applied',
                    search: 'applied'

                }).nodes().each(function (cell, i) {
                    cell.innerHTML = i + 1;
                });
            }).draw(false);
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {

            if (XMLHttpRequest.status == 504 || XMLHttpRequest.status == 408) {
                this.tryCount++;
                if (this.tryCount <= this.retryLimit) {
                    //try again
                    $.ajax(this);
                    return;
                } else {
                    $("#sessionTimedOut-alert").toggleClass('hidden');
                    $("#sessionTimedOut-alert").fadeTo(15000, 500).slideUp(500, function () {
                        $("#sessionTimedOut-alert").slideUp(500);
                    });
                    return;
                }
            } else if (XMLHttpRequest.status == 400) {
                $("#badRequest-alert").toggleClass('hidden');
                $("#badRequest-alert").fadeTo(10000, 500).slideUp(500, function () {
                    $("#badRequest-alert").slideUp(500);
                });
            } else if (XMLHttpRequest.status == 401) {
                $("#unauthorized-alert").toggleClass('hidden');
                $("#unauthorized-alert").fadeTo(15000, 500).slideUp(500, function () {
                    $("#unauthorized-alert").slideUp(500);
                });
            } else if (XMLHttpRequest.status == 403) {
                $("#forbidden-alert").toggleClass('hidden');
                $("#forbidden-alert").fadeTo(15000, 500).slideUp(500, function () {
                    $("#forbidden-alert").slideUp(500);
                });
            } else if (XMLHttpRequest.status == 404) {
                $("#notFound-alert").toggleClass('hidden');
                $("#notFound-alert").fadeTo(15000, 500).slideUp(500, function () {
                    $("#notFound-alert").slideUp(500);
                });
            } else if (XMLHttpRequest.status == 500) {
                $("#internalServerError-alert").toggleClass('hidden');
                $("#internalServerError-alert").fadeTo(15000, 500).slideUp(500, function () {
                    $("#internalServerError-alert").slideUp(500);
                });
            } else if (XMLHttpRequest.status == 501) {
                $("#notImplemented-alert").toggleClass('hidden');
                $("#notImplemented-alert").fadeTo(15000, 500).slideUp(500, function () {
                    $("#notImplemented-alert").slideUp(500);
                });
            } else if (XMLHttpRequest.status == 503) {
                $("#serviceUnavailable-alert").toggleClass('hidden');
                $("#serviceUnavailable-alert").fadeTo(15000, 500).slideUp(500, function () {
                    $("#serviceUnavailable-alert").slideUp(500);
                });
            }

        }
    });
}


function loadLessonUserUnits() {
    actualFilter = "";
    $.ajax({
        type: "GET",
        serverSide: true,
        paging: true,
        processing: true,
        url: Boostan.ApplicationServer.URL + LessonManager.services.selectUserUnit,
        accept: "application/json; charset=utf-8",
        data: {
            filter: actualFilter
        },
        dataType: "json",
        crossDomain: true,
        jsonp: false,
        cache: false,
        retryCount: 0,
        retryLimit: 100,
        async: false,

        success: function (json) {
            var allLessonData = [];
            if ($.isArray(json)) {
                allLessonData = json;
            } else if (json) {
                allLessonData.push(json)
            } else {
                allLessonData = [];
            }

            // $.each(allLessonData, function (index, value) {
            //     value.id["@nil"] == "true" ? allLessonData[index].id = "" : value.id;
            //     value.uuid["@nil"] == "true" ? allLessonData[index].uuid = "" : value.uuid;
            //     value.name["@nil"] == "true" ? allLessonData[index].name = "" : value.name;
            //     value.description["@nil"] == "true" ? allLessonData[index].description = "" : value.description;
            //     value.course_id["@nil"] == "true" ? allLessonData[index].course_id = "" : value.course_id;
            //     value.year_lesson["@nil"] == "true" ? allLessonData[index].year_lesson = "" : value.year_lesson;
            //     value.term["@nil"] == "true" ? allLessonData[index].term = "" : value.term;
            //     value.final_date["@nil"] == "true" ? allLessonData[index].final_date = "" : value.final_date;
            //     value.fee["@nil"] == "true" ? allLessonData[index].fee = "" : value.fee;
            //     value.level_lesson["@nil"] == "true" ? allLessonData[index].level_lesson = "" : value.level_lesson;
            //     value.prof_id["@nil"] == "true" ? allLessonData[index].prof_id = "" : value.prof_id;
            //
            //
            // });

            allUserLesson = $('#LessonListUserUnits').DataTable({

                "language": {
                    "paginate": {
                        "previous": window.lang.translate('Previous page'),
                        "next": window.lang.translate('Next page'),
                        "last": window.lang.translate('Last page'),
                        "first": window.lang.translate('First page')
                    },
                    buttons: {
                        colvis: window.lang.translate('Change columns'),
                        copy: window.lang.translate('copy'),
                        csv: window.lang.translate('csv')
                    },
                    "lengthMenu": window.lang.translate('Show _MENU_ entries'),
                    "loadingRecords": window.lang.translate('Please wait - loading...'),
                    "processing": window.lang.translate('DataTables is currently busy'),
                    "info": window.lang.translate('Showing page _PAGE_ of _PAGES_'),
                    "infoEmpty": window.lang.translate('Showing 0 to 0 of 0 entries'),
                    "search": window.lang.translate('Search:'),
                    "zeroRecords": window.lang.translate('No records to display'),
                    "infoFiltered": window.lang.translate('(filtered from _MAX_ total entries)'),
                    "emptyTable": window.lang.translate('No data available in table')
                },

                "data": allLessonData,
                "columns": [
                    {"order": "#"},
                    {"data": "course.name"},
                    {"data": "year"},
                    {"data": "term"},
                    {"data": "final_date"},
                    {"data": "fee"},
                    {"data": "level_lesson"},
                    {"data": "profId"}

                ],
                dom: 'Blfrtip',
                stateSave: true,
                buttons: [
                    {
                        extend: 'collection',
                        text: window.lang.translate('Print/Export'),
                        buttons: ['copy', 'csv', {
                            extend: 'print',
                            text: window.lang.translate('Print'),
                            autoPrint: false,
                            exportOptions: {
                                columns: ':visible'
                            },
                            customize: function (printable) {
                                $(printable.document.body)
                                    .css('direction', 'rtl')
                                    .css('background-color', 'white')
                                    .prepend(
                                        '<img src="images/logo.png" style="width:110px; height:120px; float: left; margin-right:11px;" />'
                                    );

                                $(printable.document.body).find('tr:nth-child(odd) td').each(function (index) {
                                    $(this).css('background-color', '#3c8dbc');
                                    $(this).css('color', 'white');

                                });
                                $(printable.document.body).find('h1').css('color', 'black').css('margin-right', '25px');
                                $(printable.document.body).find('th').css('text-align', 'center');
                                $(printable.document.body).find('th').css('color', 'white');

                                $(printable.document.body).find('table')
                                    .addClass('compact')
                                    .css('font-size', 'inherit')
                                    .css('background-color', '#e08e0b')
                                    .css('font-family', 'B Nazanin')
                                    .css('margin-left', '25px')
                                    .css('margin-right', '25px')
                                    .css('width', '98%');
                            }
                        }, {
                            extend: 'print',
                            text: window.lang.translate('Export PDF'),
                            autoPrint: true,
                            exportOptions: {
                                columns: ':visible'
                            },

                            /**
                             * customize - checks classification status of output docs
                             *
                             * @param  {object} printable
                             */
                            customize: function (printable) {
                                $(printable.document.body)
                                    .css('direction', 'rtl')
                                    .css('background-color', 'white')
                                    .prepend(
                                        '<img src="images/logo.png" style="width:110px; height:120px; float: left; margin-right:11px;" />'
                                    );

                                $(printable.document.body).find('tr:nth-child(odd) td').each(function (index) {
                                    $(this).css('background-color', '#3c8dbc');
                                    $(this).css('color', 'white');

                                });
                                $(printable.document.body).find('h1').css('color', 'black').css('margin-right', '25px');
                                $(printable.document.body).find('th').css('text-align', 'center');
                                $(printable.document.body).find('th').css('color', 'white');

                                $(printable.document.body).find('table')
                                    .addClass('compact')
                                    .css('font-size', 'inherit')
                                    .css('background-color', '#e08e0b')
                                    .css('font-family', 'B Nazanin')
                                    .css('margin-left', '25px')
                                    .css('margin-right', '25px')
                                    .css('width', '98%');
                            }
                        }]
                    },
                    'colvis', 'excel'
                ],
                "order": [
                    [1, 'asc']
                ],

                "autoWidth": false,
                "createdRow": function (row, data, index) {

                    var rowId = data['id'];
                    var rfc_status = data['status'];


                }
            });

            allUserLesson.buttons().container()
                .appendTo('allRfcs_wrapper .col-sm-6:eq(0)');

            allUserLesson.on('order.dt search.dt', function () {
                allUserLesson.column(0, {
                    order: 'applied',
                    search: 'applied'

                }).nodes().each(function (cell, i) {
                    cell.innerHTML = i + 1;
                });
            }).draw(false);
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {

            if (XMLHttpRequest.status == 504 || XMLHttpRequest.status == 408) {
                this.tryCount++;
                if (this.tryCount <= this.retryLimit) {
                    //try again
                    $.ajax(this);
                    return;
                } else {
                    $("#sessionTimedOut-alert").toggleClass('hidden');
                    $("#sessionTimedOut-alert").fadeTo(15000, 500).slideUp(500, function () {
                        $("#sessionTimedOut-alert").slideUp(500);
                    });
                    return;
                }
            } else if (XMLHttpRequest.status == 400) {
                $("#badRequest-alert").toggleClass('hidden');
                $("#badRequest-alert").fadeTo(10000, 500).slideUp(500, function () {
                    $("#badRequest-alert").slideUp(500);
                });
            } else if (XMLHttpRequest.status == 401) {
                $("#unauthorized-alert").toggleClass('hidden');
                $("#unauthorized-alert").fadeTo(15000, 500).slideUp(500, function () {
                    $("#unauthorized-alert").slideUp(500);
                });
            } else if (XMLHttpRequest.status == 403) {
                $("#forbidden-alert").toggleClass('hidden');
                $("#forbidden-alert").fadeTo(15000, 500).slideUp(500, function () {
                    $("#forbidden-alert").slideUp(500);
                });
            } else if (XMLHttpRequest.status == 404) {
                $("#notFound-alert").toggleClass('hidden');
                $("#notFound-alert").fadeTo(15000, 500).slideUp(500, function () {
                    $("#notFound-alert").slideUp(500);
                });
            } else if (XMLHttpRequest.status == 500) {
                $("#internalServerError-alert").toggleClass('hidden');
                $("#internalServerError-alert").fadeTo(15000, 500).slideUp(500, function () {
                    $("#internalServerError-alert").slideUp(500);
                });
            } else if (XMLHttpRequest.status == 501) {
                $("#notImplemented-alert").toggleClass('hidden');
                $("#notImplemented-alert").fadeTo(15000, 500).slideUp(500, function () {
                    $("#notImplemented-alert").slideUp(500);
                });
            } else if (XMLHttpRequest.status == 503) {
                $("#serviceUnavailable-alert").toggleClass('hidden');
                $("#serviceUnavailable-alert").fadeTo(15000, 500).slideUp(500, function () {
                    $("#serviceUnavailable-alert").slideUp(500);
                });
            }

        }
    });
}


function addSelectedLesson() {
    $.ajax({
        type: "POST",
        url: Boostan.ApplicationServer.URL + LessonManager.services.addUserLesson,
        accept: "application/json",
        data: JSON.stringify(selectedDataLesson),
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
            refreshDataTableUserLesson();
            alert(json);
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
        }
    });
}

function removeSelectedLesson() {

}

