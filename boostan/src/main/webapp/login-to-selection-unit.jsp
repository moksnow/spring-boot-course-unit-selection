<%--
  Created by IntelliJ IDEA.
  User: Morka
  Date: 01/10/2019
  Time: 06:23 PM
  To change this template use File | Settings | File Templates.
--%>


<!DOCTYPE html>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form" %>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<html>
<head>
    <title>login to selection unit</title>
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
    <script src="http://ajax.googleapis.com/ajax/libs/jquery/1.10.2/jquery.min.js" type="text/javascript"></script>
    <script src="plugins/jquery-lang-js/js/js.cookie.js" charset="utf-8" type="text/javascript"></script>
    <script src="plugins/jquery-lang-js/js/jquery-lang.js" charset="utf-8" type="text/javascript"></script>
    <script src="plugins/jquery-lang-js/js/langpack/boostan_fa.js" charset="utf-8" type="text/javascript"></script>

    <style>
        @font-face {
            font-family: 'yekan';
            src: url('bootstrap/fonts/Yekan.eot?#') format('eot'), /* IE6–8 */ url('bootstrap/fonts/Yekan.woff') format('woff'), /* FF3.6+, IE9, Chrome6+, Saf5.1+*/ url('bootstrap/fonts/Yekan.ttf') format('truetype');  /* Saf3—5, Chrome4+, FF3.5, Opera 10+ */
        }





    </style>
    <link href="plugins/jQueryUI/jquery-ui.css" rel="stylesheet"/>
    <script src="ApplicationResource.js"></script>
    <!-- Bootstrap 3.3.5 for better view calendar comment this part -->
    <link rel="stylesheet" href="bootstrap/css/bootstrap.css">
    <link rel="stylesheet" href="bootstrap/css/bootstrap.vertical-tabs.css">

    <!-- Font Awesome -->
    <link rel="stylesheet" href="dist/fonts/font-awesome-4.6.3/css/font-awesome.css">
    <!-- Theme style -->
    <link rel="stylesheet" href="dist/css/Boostan.css">


</head>
<body style="overflow-y: scroll;height: 100%;background-color: #ECF0F5;font-family:yekan!important;"
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
</div>
<!-- Content Wrapper. Contains page content -->
<div class="content-wrapper" style="min-height: 670px;width: 80%;right: 0;float: right;margin: 5px;">
    <div style="text-align: center; font-family: 'B Nazanin', Helvetica, Arial, sans-serif; font-size: 28px; padding: 20%;">

        <button id="finalizeSelection" type="button" class="btn bg-green"
                onclick="certificateUnitSelection();"
                style="width: 235px;margin-top:0px;align-content: center;"><span lang="en">Certificate Selection Unit Request</span>
        </button>


        <br><br>
        <span lang="en">Click</span> <a href="${contextPath}/login-to-selection-unit-checking"><span lang="en">here</span></a><span lang="en"> Login To Selection Unit.</span>
        <br><br>
        <span style="padding-top:50px; font-size: 19px;color: #ff1745; ">
            ${message}
        </span>
    </div>

</div>
<!-- jQuery 2.1.4 -->
<script src="plugins/jQuery/jQuery-2.1.4.min.js"></script>
<!--add new verions of jquery for resolve migration to 3.0.0 -->
<script src="plugins/jQueryUI/jquery-ui.js"></script>
<script src="plugins/jQueryUI/jquery-migrate-3.0.0.js"></script>
<!--add new verions of jquery for resolve migration to 3.0.0 -->


<script src="dist/js/cookies.js"></script>
<script type="text/javascript">
    var lang = new Lang();

    lang.dynamic('fa', 'plugins/jquery-lang-js/js/langpack/boostan_fa.js');
    lang.init({
        defaultLang: 'en'
    });
    $(document).ready(function () {




    });
</script>
<!-- ===================================Boostan selection unit scripts======================================== -->
<script type="text/javascript" src="dist/js/selectionUnit/services/Boostan-Login-Selection-Unit.js"></script>

</body>


</html>
