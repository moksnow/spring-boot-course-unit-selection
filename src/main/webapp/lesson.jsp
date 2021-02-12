<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form" %>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<!--
* @Boostan {Boostan System}
* @author {M.KHANDAN}
* @copyright {Boostan 2019}
* @file {}
*
-->


<!DOCTYPE html>
<html>

<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <%--Command Operational--%>
    <title>Lesson</title>
    <link rel="favicon" href="favicon.ico"/>
    <!-- Tell the browser to be responsive to screen width -->
    <meta content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no" name="viewport">

    <script>
        var isCreationLesson = true;
    </script>

    <style>
        @font-face {
            font-family: 'yekan';
            src: url('bootstrap/fonts/Yekan.eot?#') format('eot'), /* IE6–8 */ url('bootstrap/fonts/Yekan.woff') format('woff'), /* FF3.6+, IE9, Chrome6+, Saf5.1+*/ url('bootstrap/fonts/Yekan.ttf') format('truetype');  /* Saf3—5, Chrome4+, FF3.5, Opera 10+ */
        }


    </style>
    <style>
        label {
            display: block;
        }

        select {
            width: auto;
        }

        .overflow {
            height: auto;
        }
    </style>
    <!--map style from index -->
    <style>
        label {
            display: block;
        }

        select {
            width: auto;
        }

        .overflow {
            height: auto;
        }

        /*this style arrange */

        input[type="text"], input[type="password"], input[type="date"],
        input[type="datetime"], input[type="email"], input[type="number"],
        input[type="search"], input[type="tel"], input[type="time"],
        input[type="url"], textarea {
            background-color: white;
            border: 1px solid #CCCCCC;
            border-radius: 2px 2px 2px 2px;
            box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1) inset;
            color: rgba(0, 0, 0, 0.75);
            display: block;
            font-family: inherit;
            direction: rtl;
            text-align: right;
            font-size: 14px;
            height: 32px;
            margin: 0 0 14px;
            padding: 7px;
            width: 100%;
        }


    </style>

    <!--add new verions of jquery for resolve migration to 3.0.0 -->
    <link href="plugins/jQueryUI/jquery-ui.css" rel="stylesheet"/>
    <%--<link href="plugins/jQueryUI/jquery-ui.structure.css" rel="stylesheet"/>--%>
    <%--<link href="plugins/jQueryUI/jquery-ui.theme.css" rel="stylesheet"/>--%>
    <!--add new verions of jquery for resolve migration to 3.0.0 -->


    <!--calendar -->
    <link href="plugins/jQuery-Calendar/bootstrap.min.css" rel="stylesheet"/>
    <link rel="stylesheet" href="plugins/jQuery-Calendar/bootstrap-theme.min.css"/>
    <link rel="stylesheet" href="plugins/jQuery-Calendar/jquery.Bootstrap-PersianDateTimePicker.css"/>
    <script src="plugins/jQuery-Calendar/jquery-3.1.0.min.js" type="text/javascript"></script>
    <script src="plugins/jQuery-Calendar/bootstrap.min.js" type="text/javascript"></script>
    <!-- calendar -->
    <script src="plugins/jQuery-Calendar/jalaali.js" type="text/javascript"></script>
    <script src="plugins/jQuery-Calendar/jquery.Bootstrap-PersianDateTimePicker.js" type="text/javascript"></script>
    <script src="plugins/jQuery-Calendar/BoostanCalendar.js" type="text/javascript"></script>
    <!--End of calendar -->

    <script src="ApplicationResource.js"></script>
    <!-- Bootstrap 3.3.5 for better view calendar comment this part -->
    <link rel="stylesheet" href="bootstrap/css/bootstrap.css">
    <link rel="stylesheet" href="bootstrap/css/bootstrap.vertical-tabs.css">

    <!-- Font Awesome -->
    <link rel="stylesheet" href="dist/fonts/font-awesome-4.6.3/css/font-awesome.css">
    <!-- Theme style -->
    <link rel="stylesheet" href="dist/css/Boostan.css">
    <!-- Help tool -->
    <link rel="stylesheet" href="plugins/introjs/introjs.css">
    <link rel="stylesheet" href="plugins/introjs/introjs-rtl.css">
    <%--<!-- Map Automation css -->--%>
    <%--check shavad result: --%>
    <%--<link rel="stylesheet" href="dist/css/Boostan-Studio.css"><!--problem with calendar-->--%>
    <!-- DataTables -->
    <link rel="stylesheet" href="plugins/datatables/dataTables.bootstrap.css">
    <link rel="stylesheet" href="plugins/datatables/jquery.dataTables.css">
    <link rel="stylesheet" href="plugins/datatables/extensions/Buttons/css/buttons.dataTables.css">
    <link rel="stylesheet" href="plugins/datatables/extensions/Buttons/css/buttons.bootstrap.min.css">
    <link rel="stylesheet" href="plugins/datatables/extensions/Buttons/ColVis/css/dataTables.colVis.min.css">
    <link rel="stylesheet" href="plugins/datatables/extensions/Buttons/ColVis/css/dataTables.colvis.jqueryui.css">
    <link rel="stylesheet" href="plugins/jquery-select2/css/select2.css">

    <!-- pivottable -->
    <link rel="stylesheet" href="plugins/pivottable/dist/pivot.css">
    <link rel="stylesheet" media="screen" href="plugins/pivottable/dist/style.css">
    <!-- c3 -->
    <link rel="stylesheet" media="screen" href="plugins/D3C3/c3.css">
    <script src="plugins/D3C3/d3.min.js"></script>
    <script src="plugins/D3C3/c3.min.js"></script>

    <!-- json tree viewer -->
    <link href="plugins/jsonTreeViewer/libs/jsonTree/jsonTree.css" rel="stylesheet">

    <!-- jquery-lang-js -->

    <script src="plugins/jquery-lang-js/js/js.cookie.js" charset="utf-8" type="text/javascript"></script>
    <script src="plugins/jquery-lang-js/js/jquery-lang.js" charset="utf-8" type="text/javascript"></script>
    <script src="plugins/jquery-lang-js/js/langpack/boostan_fa.js" charset="utf-8" type="text/javascript"></script>


    <!-- yadcf -->
    <link rel="stylesheet" href="plugins/yadcf/jquery.dataTables.yadcf.css">
    <link rel="stylesheet" href="plugins/yadcf/select2.css">
</head>

<body style="overflow-y: scroll;height: 100%;background-color: #ECF0F5;font-family:yekan;"
      oncontextmenu="return false;">

<div class="nav-side-menu">
    <div class="brand"><span lang="en">Boostan Selection Unit System</Span> </div>
    <i class="fa fa-bars fa-2x toggle-btn" data-toggle="collapse" data-target="#menu-content"></i>

    <div class="menu-list">

        <ul id="menu-content" class="menu-content collapse out">
            <li>
                <a href="${contextPath}/welcome">
                    <i class="fa fa-dashboard fa-lg"></i><span lang="en">Dashboard</Span>
                </a>
            </li>


            <li>
                <a href="${contextPath}/course">
                    <i class="fa fa-user fa-lg"></i><span lang="en">Course</Span>
                </a>
            </li>

            <li>
                <a href="${contextPath}/lesson">
                    <i class="fa fa-users fa-lg"></i><span lang="en">Lessons</Span>
                </a>
            </li>
            <li>
                <a href="${contextPath}/config-term">
                    <i class="fa fa-users fa-lg"></i><span lang="en">Term Setting</Span>
                </a>
            </li>
            <li>
                <a href="${contextPath}/login-to-selection-unit">
                    <i class="fa fa-users fa-lg"></i><span lang="en">Selection Unit</Span>
                </a>
            </li>
        </ul>
    </div>
</div><!-- Content Wrapper. Contains page content -->
<div class="content-wrapper" style="min-height: 670px;width: 80%;right: 0;float: right;margin: 5px;">
    <!-- Content Header (Page header) -->
    <section class="content-header">
        <a id="hintBtn" class="fa fa-question-circle-o fa-lg" lang="en" title="Show hints" href="javascript:void(0);"
           onclick="javascript:introJs().addHints();"></a>
        <a id="stopHintBtn" class="fa fa-question-circle-o fa-lg hidden" lang="en" title="Stop show hints"
           href="javascript:void(0);" onclick="javascript:introJs().hideHints();"></a>
        <h1 id="pageHeader" lang="en">Lesson list</h1>

        <ol class="breadcrumb">
            <li class="active" lang="en"><i class="fa fa-dashboard"></i>Lesson list</li>
            <li><a href="welcome" target="_parent" lang="en">Home</a></li>
        </ol>
    </section>

    <!-- ====================================================================================================== -->
    <!-- Main content -->

    <section class="content">

        <div class="row">
            <div class="col-xs-12">

                <%-- ****add code*** --%>
                <!-- /.box -->
                <%--<h4 class="box-title" id="box-header" lang="en">Command Operation list</h4>--%>
                <!-- create crud buttons -->
                <div class="row">

                    <form id="frmButtons" role="form">
                        <div id="frmButtonsSection">

                            <a id="advancedBtnPlan" class="btn btn-block bg-orange pull-right" data-toggle="collapse"
                               data-target=".btn-group" style="width: 105px;margin-top: 10px;margin-left: 10px;"
                               lang="en">Advanced</a>
                            <button id="refreshBtn" type="button" class="btn btn-block btn-primary pull-right"
                                    style="width: 105px;margin-top: 10px;margin-left: 10px;" data-toggle="modal"
                                    onclick="refreshDataTableLesson()"
                                    data-target="#refreshModal" lang="en">Refresh
                            </button>
                            <button id="updateBtn" type="button" class="btn btn-block bg-blue pull-right"
                                    data-toggle="modal" data-target="#updateModal" onclick="fillDataToModalLesson()"
                                    style="width: 105px;margin-top: 10px;margin-left: 10px;" lang="en">Update
                            </button>
                            <button id="createBtn" type="button" class="btn btn-block bg-blue pull-right"
                                    data-toggle="modal" data-target="#updateModal"
                                    style="width: 105px;margin-top: 10px;margin-left: 10px;" lang="en">Create
                            </button>
                            <button id="deleteBtn" type="button" class="btn btn-block btn-danger pull-right"
                                    data-toggle="modal" data-target="#deleteModal"
                                    style="width: 105px;margin-top: 10px;margin-left: 10px;" lang="en">Delete
                            </button>

                        </div>
                    </form>
                </div>


                <!-- data table columns -->
                <div class="box-body">

                    <table id="LessonList" class="table table-bordered table-striped"
                           style="direction:rtl;">
                        <thead>

                        <tr>

                            <th lang="en">order</th>
                            <th lang="en">course_id</th>
                            <th lang="en">year_lesson</th>
                            <th lang="en">term</th>
                            <th lang="en">final_date</th>
                            <th lang="en">fee</th>
                            <th lang="en">level_lesson</th>
                            <th lang="en">prof_id</th>


                        </tr>
                        </thead>

                    </table>
                </div>
                <!-- /.box-body -->
            </div>
            <!-- /.col -->
        </div>
        <!-- /.row -->
    </section>

    <!--Instruction modal-->
    <div class="modal fade" id="updateModal" role="dialog" style="direction: rtl">
        <div class="modal-dialog" style="width: 60%">
            <div class="modal-content">
                <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close"
                            onclick=clearDataModalLesson()>
                        <span aria-hidden="true">&times;</span></button>
                    <h4 class="modal-title" lang="en">Lesson</h4>
                </div>
                <div class="modal-body">

                    <div class="row">
                        <div class="col-xs-12">
                            <label lang="en" style="width: 100%">course_id</label><select type="text" id="course_id"
                                                                                          class="col-md-9"
                                                                                          style="width: 50%"
                                                                                          dir="rtl"></select>
                            <br><br>
                        </div>

                    </div>
                    <div class="row">
                        <div class="col-xs-12">
                            <label lang="en" style="width: 100%">year_lesson</label><select type="text" id="year_lesson"
                                                                                            class="col-md-9"
                                                                                            style="width: 50%"
                                                                                            dir="rtl"></select>
                            <br><br>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-xs-12">
                            <label lang="en" style="width: 100%">term</label><select type="text" id="term"
                                                                                     class="col-md-9" style="width: 50%"
                                                                                     dir="rtl"></select>
                            <br><br>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-xs-12">
                            <label lang="en">prof_id</label><input type="text" id="prof_id" class="col-md-9">
                            <br><br>
                        </div>
                    </div>


                </div>

                <div class="modal-footer">
                    <div class="modalBtn">
                        <button id="modalOk" type="submit" class="btn btn-modal pull-left bg-olive margin"

                                onclick="saveOrUpdateLesson();" data-dismiss="modal"
                                lang="en">Save
                        </button>
                        <button type="button" class="btn btn-modal btn-secondary pull-left btn-danger margin"
                                data-dismiss="modal" lang="en" onclick="clearDataModalLesson()">Cancel
                        </button>
                    </div>
                </div>
            </div>

        </div>
        <!-- /.modal-content -->
    </div>
    <!-- /.modal-dialog -->

    <!--delete modal-->
    <div class="modal" id="deleteModal" tabindex="-1" role="dialog">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span
                            aria-hidden="true">&times;</span></button>
                    <h4 class="modal-title" lang="en">delete</h4>
                </div>
                <div class="modal-body">
                    <p lang="en">are u sure about deleting this?</p>
                </div>
                <div class="modal-footer">
                    <div class="modalBtn">
                        <button id="modaldelete" type="submit" class="btn btn-modal pull-left bg-olive margin"
                                onclick='deleteRowLesson();refreshDataTableLesson();' data-dismiss="modal" lang="en">Yes
                        </button>
                        <button type="button" class="btn btn-modal btn-secondary pull-left btn-danger margin"
                                data-dismiss="modal" lang="en">cancel
                        </button>
                    </div>
                </div>
            </div>

        </div>
        <!-- /.modal-content -->
    </div>
    <!-- /.content -->
</div>
<!-- /.content-wrapper -->

<!-- ================================================================ -->
<link rel="stylesheet" href="plugins/jQuery-Calendar/BoostanCalendar.css"/><!--Resolve problem with glyicon calander-->
<!-- jQuery 2.1.4 -->
<script src="plugins/jQuery/jQuery-2.1.4.min.js"></script>
<!--add new verions of jquery for resolve migration to 3.0.0 -->
<script src="plugins/jQueryUI/jquery-ui.js"></script>
<script src="plugins/jQueryUI/jquery-migrate-3.0.0.js"></script>
<!--add new verions of jquery for resolve migration to 3.0.0 -->


<script src="dist/js/cookies.js"></script>
<script src="plugins/jquerysoap/hashes.js"></script>
<script src="plugins/jquery-select2/js/select2.full.js" type="text/javascript"></script>


<!-- Boostan  App -->
<script src="dist/js/app.js"></script>
<!-- Intro.js -->
<script src="plugins/introjs/intro.js"></script>


<!-- json tree viewer -->
<script src="plugins/jsonTreeViewer/libs/jsonTree/jsonTree.js"></script>
<script>
    $("#sqlbtn").click(function () {
        $("#sqlRules").toggleClass("hidden");
    });
</script>


<!-- DataTables -->
<script src="plugins/datatables/jquery.dataTables.js"></script>
<!--data tables-->
<script src="plugins/datatables/extensions/Buttons/js/buttons.html5.min.js"></script>
<script src="plugins/datatables/extensions/Buttons/js/buttons.print.min.js"></script>
<script src="plugins/datatables/dataTables.bootstrap.min.js"></script>
<script src="plugins/datatables/extensions/Buttons/js/dataTables.buttons.min.js"></script>
<script src="plugins/datatables/extensions/Buttons/js/buttons.bootstrap.min.js"></script>

<script src="plugins/datatables/extensions/Buttons/Excell/js/buttons.html5.min_2.js"></script>
<script src="plugins/datatables/extensions/Buttons/ColVis/js/dataTables.colVis.min.js"></script>
<script src="plugins/datatables/extensions/Buttons/ColVis/js/dataTables.fixedHeader.min.js"></script>
<script src="plugins/datatables/extensions/Buttons/ColVis/js/buttons.colVis.min.js"></script>

<!-- ===================================Boostan selection unit scripts======================================== -->
<script type="text/javascript" src="dist/js/selectionUnit/Boostan-Course-Manager.js"></script>

<script type="text/javascript" src="dist/js/selectionUnit/Boostan-Lesson-Manager.js"></script>
<script type="text/javascript" src="dist/js/selectionUnit/services/Boostan-Lesson.js"></script>

<!--================================================================================================= -->
<script type="text/javascript">
    var lang = new Lang();
    lang.dynamic('fa', 'plugins/jquery-lang-js/js/langpack/boostan_fa.js');
    lang.init({
        defaultLang: 'en'
    });

</script>

</body>

</html>
