/**
 * @Boostan  {Boostan System}
 * @author {M.Khandan}
 * @copyright {Boostan 2019}
 * @file {}
 */

var selectedDataCourse;
var allCourse = {};


$(document).ready(function () {
    loadCourse();
  //  refreshDataTableCourse();
    disableDTButtonCourse(true);
    



});

$('#CourseList').on('click', 'tr', function () {
    if ($(this).hasClass('selected')) {
        disableDTButtonCourse(true);
        selectedDataCourse = null;
        $(this).removeClass('selected');

    } else {
        disableDTButtonCourse(true);
        selectedDataCourse = null;
        $('tr.selected').removeClass('selected');
        $(this).addClass('selected');
        selectedDataCourse = allCourse.row(this).data();
        if (selectedDataCourse) {
            disableDTButtonCourse(false);
        }
    }
});

$(".modal-wide").on("show.bs.modal", function () {
    var height = $(window).height() - 100;
    $(this).find(".modal-body").css("min-height", height);
});

function refreshDataTableCourse() {
    allCourse.clear();
    allCourse.destroy();
    disableDTButtonCourse(true);
    loadCourse();
}

function disableDTButtonCourse(input) {
    $('#updateBtn').prop('disabled', input);
    $("#deleteBtn").prop('disabled', input);
}

function loadCourse() {
    actualFilter = "";
    $.ajax({
        type: "GET",
        serverSide: true,
        paging: true,
        processing: true,
        url: Boostan.ApplicationServer.URL + CourseManager.services.select,
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
        async:false,

        success: function (json) {
            var allCourseData = [];
            if ($.isArray(json)) {
                allCourseData = json;
            } else if (json) {
                allCourseData.push(json)
            } else {
                allCourseData = [];
            }

//             $.each(allCourseData, function (index, value) {
//                value.id["@nil"]=="true"?allCourseData[index].id="":value.id;
// value.uuid["@nil"]=="true"?allCourseData[index].uuid="":value.uuid;
// value.name["@nil"]=="true"?allCourseData[index].name="":value.name;
// value.description["@nil"]=="true"?allCourseData[index].description="":value.description;
// value.is_final["@nil"]=="true"?allCourseData[index].is_final="":value.is_final;
// value.unit["@nil"]=="true"?allCourseData[index].unit="":value.unit;
// value.prerequisite["@nil"]=="true"?allCourseData[index].prerequisite="":value.prerequisite;
//
//
//             });

            allCourse = $('#CourseList').DataTable({

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

                "data": allCourseData,
                "columns": [
                    {"order": "#"},
{"data": "name"},
{"data": "description"},
{"data": "unit"},
{"data": "prerequisite"}

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
                                        '<img src="../images/logo.png" style="width:110px; height:120px; float: left; margin-right:11px;" />'
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

            allCourse.buttons().container()
                .appendTo('allRfcs_wrapper .col-sm-6:eq(0)');

            allCourse.on('order.dt search.dt', function () {
                allCourse.column(0, {
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

function getCourseModalInfo() {

    var rowSelectedId;
    if (selectedDataCourse == undefined || selectedDataCourse.id == undefined) {
        rowSelectedId = undefined;
    } else {
        rowSelectedId = selectedDataCourse.id;
    }
    var FormData = {
        "name": ($("#name").val() == "") ? undefined : $("#name").val(),
        "description": ($("#description").val() == "") ? undefined : $("#description").val(),
        "unit": ($("#unit").val() == "") ? undefined : $("#unit").val(),
        "finalCourse": true,
        "prerequisite": ($("#prerequisite").val() == "") ? undefined : $("#prerequisite").val()
        


    };

    return FormData;
}

function createCourse(data) {
    $.ajax({
        type: "POST",
        url: Boostan.ApplicationServer.URL + CourseManager.services.create,
        dataType: 'json',
        data:  JSON.stringify(data),
         contentType: "application/json",
        crossDomain: true,
        cache: false,
        serverSide: true,
        tryCount: 0,
        retryLimit: null,
        async:false,
        statusCode: {
            202: function () {
                $("#editItemSuccess-alert").removeClass('hidden').fadeTo(6000, 500).slideUp(500, function () {
                    $("#editItemSuccess-alert").slideUp(500);
                    $("#editItemSuccess-alert").addClass('hidden');
                });
            }
        },

        success: function (res) {
        //    refreshDataTableCourse();
        },

        error: function (XMLHttpRequest, textStatus, errorThrown) {

            creation_is_done_create = false;
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

function CourseEdit(data) {

    $.ajax({

        url: Boostan.ApplicationServer.URL + CourseManager.services.update,

        data:  JSON.stringify(data),
        type: "POST",
        dataType: 'json',

        contentType: "application/json",
        crossDomain: true,
        cache: false,
        serverSide: true,
        tryCount: 0,
        retryLimit: null,
        async:false,

        /**
         * success - Success method of updateINSStatus function's $.ajax
         *
         * @method
         */
        success: function (res) {
            console.log(res);
            // refreshDataTableCourse();
        },

        /**
         * error - error method of updateINSStatus function's $.ajax
         *
         * @method
         * @param  {object} XMLHttpRequest
         * @param  {string} textStatus
         * @param  {object} errorThrown
         * @return {object}
         */
        error: function (XMLHttpRequest, textStatus, errorThrown) {

            creation_is_done_create = false;
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
    })
}

function saveOrUpdateCourse() {

    var formData = getCourseModalInfo();
    if (isCreationCourse == true) {
        createCourse(formData);
    } else {
        rowSelectedId = selectedDataCourse.id;
        formData.id = rowSelectedId;
        CourseEdit(formData)
    }

      refreshDataTableCourse();
    clearDataModalCourse();
    isCreationCourse = true;
}

function deleteRowCourse() {
   var data = {
        id: selectedDataCourse.id
    };
    $.ajax({
        type: "POST",
        url: Boostan.ApplicationServer.URL + CourseManager.services.delete,
        accept: "application/json",
         data:  JSON.stringify(selectedDataCourse) ,
        contentType: "application/json",
        crossDomain: true,
        cache: false,
        serverSide: true,
        tryCount: 0,
        retryLimit: null,
        async:false,

        statusCode: {
            202: function () {
                $("#editItemSuccess-alert").removeClass('hidden').fadeTo(6000, 500).slideUp(500, function () {
                    $("#editItemSuccess-alert").slideUp(500);
                    $("#editItemSuccess-alert").addClass('hidden');
                });
            }
        },
        success: function () {
            refreshDataTableCourse();
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
        }
    });

}

function fillDataToModalCourse() {
    isCreationCourse = false;
    selectedDataCourse.name["@nil"]=="true"?"":$("#name").val(selectedDataCourse.name);
selectedDataCourse.description["@nil"]=="true"?"":$("#description").val(selectedDataCourse.description);
selectedDataCourse.unit["@nil"]=="true"?"":$("#unit").val(selectedDataCourse.unit);
selectedDataCourse.prerequisite["@nil"]=="true"?"":$("#prerequisite").val(selectedDataCourse.prerequisite);



}

function clearDataModalCourse() {
    $("#name").val('');
    $("#description").val('');
    $("#unit").val('');
    $("#prerequisite").val('');


}

