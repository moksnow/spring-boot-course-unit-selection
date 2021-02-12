/**
 * @Boostan  {Boostan System}
 * @author {M.Khandan}
 * @copyright {Boostan 2019}
 * @file {}
 */

var selectedDataConfigTerm;
var allConfigTerm = {};
var terms = [
    {name: 1, value:1},
    {name: 2, value:2}
];
var years = [
    {name: 96, value:96},
    {name: 97, value:97},
    {name: 98, value:98}
];

function LoadOnSelect2Madule(InputData,HtmlSelect2DivId,inputvalue,inputhtml,inputhtml2){
    clearSelect2Madule(HtmlSelect2DivId);
    HtmlSelect2DivId = "#"+HtmlSelect2DivId;
    $.each(InputData,function (index,value) {
        $(HtmlSelect2DivId).append($("<option>")
            .val(value[inputvalue])
            .html(value[inputhtml]+" "+(value[inputhtml2]===undefined?"":value[inputhtml2]))
        );
    })
}
function clearSelect2Madule(HtmlSelect2DivId) {
    $("#"+HtmlSelect2DivId)
        .find('option')
        .remove()
        .end();
}

$(document).ready(function () {
    $("#year").select2();
    LoadOnSelect2Madule(years,"year","value","value");
    $("#term").select2();
    LoadOnSelect2Madule(terms,"term","value","value");
    loadConfigTerm();
  //  refreshDataTableConfigTerm();
    disableDTButtonConfigTerm(true);
    



});

$('#ConfigTermList').on('click', 'tr', function () {
    if ($(this).hasClass('selected')) {
        disableDTButtonConfigTerm(true);
        selectedDataConfigTerm = null;
        $(this).removeClass('selected');

    } else {
        disableDTButtonConfigTerm(true);
        selectedDataConfigTerm = null;
        $('tr.selected').removeClass('selected');
        $(this).addClass('selected');
        selectedDataConfigTerm = allConfigTerm.row(this).data();
        if (selectedDataConfigTerm) {
            disableDTButtonConfigTerm(false);
        }
    }
});

//multiselect
//$('#ConfigTermList').on('click', 'tr', function () {
//     if (allConfigTerm.row(this).data() !== undefined && allConfigTerm.row(this).data() !== null) {
//
//         if ($(this).hasClass('selected')) {
//             var mustUnselect = allConfigTerm.row(this).data();
//             selectedDataConfigTerm.splice(selectedDataConfigTerm.findIndex(v => parseInt(v.id) == parseInt(mustUnselect.id)));
//             if (selectedDataConfigTerm.length == 0) {
//                 disableDTButtonConfigTerm(true);
//             }
//             $(this).removeClass('selected');
//
//         } else {
//             selectedDataConfigTerm.push(allConfigTerm.row(this).data());
//             $(this).addClass('selected');
//             if (selectedDataConfigTerm.length > 0) {
//                 disableDTButtonConfigTerm(false);
//             }
//         }
//     }
//     console.log("//////////////////////////////////////////////////")
//             console.log(JSON.stringify(selectedDataConfigTerm));
//
// });

$(".modal-wide").on("show.bs.modal", function () {
    var height = $(window).height() - 100;
    $(this).find(".modal-body").css("min-height", height);
});

function refreshDataTableConfigTerm() {
    allConfigTerm.clear();
    allConfigTerm.destroy();
    disableDTButtonConfigTerm(true);
    loadConfigTerm();
}

function disableDTButtonConfigTerm(input) {
    $('#updateBtn').prop('disabled', input);
    $("#deleteBtn").prop('disabled', input);
}

function loadConfigTerm() {
    actualFilter = "";
    $.ajax({
        type: "GET",
        serverSide: true,
        paging: true,
        processing: true,
        url: Boostan.ApplicationServer.URL + ConfigTermManager.services.select,
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
            var allConfigTermData = [];
            if ($.isArray(json)) {
                allConfigTermData = json;
            } else if (json) {
                allConfigTermData.push(json)
            } else {
                allConfigTermData = [];
            }

            $.each(allConfigTermData, function (index, value) {

               allConfigTermData[index].startDate=toJAlaliOnlyDate(value.startDate);
               allConfigTermData[index].endDate=toJAlaliOnlyDate(value.endDate);


            });

            allConfigTerm = $('#ConfigTermList').DataTable({

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

                "data": allConfigTermData,
                "columns": [
                    {"order": "#"},
                    {"data": "term"},
                    {"data": "year"},
                    {"data": "minUnit"},
                    {"data": "maxUnit"},
                    {"data": "startDate"},
                    {"data": "endDate"},
                    {"data": "active"}

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

            allConfigTerm.buttons().container()
                .appendTo('allRfcs_wrapper .col-sm-6:eq(0)');

            allConfigTerm.on('order.dt search.dt', function () {
                allConfigTerm.column(0, {
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

function getConfigTermModalInfo() {

    var rowSelectedId;
    if (selectedDataConfigTerm == undefined || selectedDataConfigTerm.id == undefined) {
        rowSelectedId = undefined;
    } else {
        rowSelectedId = selectedDataConfigTerm.id;
    }
    var FormData = {
        // id: rowSelectedId,
        term: ($("#term").val() == "") ? undefined : $("#term").val(),
        year: ($("#year").val() == "") ? undefined : $("#year").val(),
        minUnit: ($("#min_unit").val() == "") ? undefined : $("#min_unit").val(),
        maxUnit: ($("#max_unit").val() == "") ? undefined : $("#max_unit").val(),
        startDate: ($("#start_date").val() == "") ? undefined : toMiladiOnlyDate($("#start_date").val()),
        endDate: ($("#end_date").val() == "") ? undefined : toMiladiOnlyDate($("#end_date").val()),
        active: $("#is_active").prop('checked').toString()

    };

    return FormData;
}

function createConfigTerm(data) {
    $.ajax({
        type: "POST",
        url: Boostan.ApplicationServer.URL + ConfigTermManager.services.create,
        accept: "application/json",
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
            refreshDataTableConfigTerm();
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

function ConfigTermEdit(data) {

    $.ajax({

        url: Boostan.ApplicationServer.URL + ConfigTermManager.services.update,
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
            // refreshDataTableConfigTerm();
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

function saveOrUpdateConfigTerm() {

    var formData = getConfigTermModalInfo();
    if (isCreationConfigTerm == true) {
        createConfigTerm(formData);
    } else {
        rowSelectedId = selectedDataConfigTerm.id;
        formData.id = rowSelectedId;
        ConfigTermEdit(formData)
    }

    refreshDataTableConfigTerm();
    clearDataModalConfigTerm();
    isCreationConfigTerm = true;
}

function deleteRowConfigTerm() {
    if(selectedDataConfigTerm.id) {
        selectedDataConfigTerm.startDate = toMiladiOnlyDate(selectedDataConfigTerm.startDate);
        selectedDataConfigTerm.endDate = toMiladiOnlyDate(selectedDataConfigTerm.endDate);
    }
    $.ajax({
        type: "POST",
        url: Boostan.ApplicationServer.URL + ConfigTermManager.services.delete,
        accept: "application/json",
        data:  JSON.stringify(selectedDataConfigTerm) ,
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
            refreshDataTableConfigTerm();
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
        }
    });

}

function fillDataToModalConfigTerm() {
    isCreationConfigTerm = false;
    selectedDataConfigTerm.term["@nil"]=="true"?"":$("#term").val(selectedDataConfigTerm.term).select2().trigger("change");
    selectedDataConfigTerm.year["@nil"]=="true"?"":$("#year").val(selectedDataConfigTerm.year).select2().trigger("change");
    selectedDataConfigTerm.minUnit["@nil"]=="true"?"":$("#min_unit").val(selectedDataConfigTerm.minUnit);
    selectedDataConfigTerm.maxUnit["@nil"]=="true"?"":$("#max_unit").val(selectedDataConfigTerm.maxUnit);
    selectedDataConfigTerm.startDate["@nil"]=="true"?"":$("#start_date").val(selectedDataConfigTerm.startDate);
    selectedDataConfigTerm.endDate["@nil"]=="true"?"":$("#end_date").val(selectedDataConfigTerm.endDate);
    // selectedDataConfigTerm.active["@nil"]=="true"?"":$("#is_active").val(selectedDataConfigTerm.active);
    $("#is_active").prop('checked', selectedDataConfigTerm.active);



}

function clearDataModalConfigTerm() {
    $("#term").val('').select2().trigger("change");
    $("#year").val('').select2().trigger("change");
    $("#min_unit").val('');
    $("#max_unit").val('');
    $("#start_date").val('');
    $("#end_date").val('');
    // $("#is_active").val('');
    $("#is_active").prop('checked', false)
}

