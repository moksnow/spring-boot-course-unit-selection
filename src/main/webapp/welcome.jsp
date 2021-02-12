<%@ taglib prefix="spring" uri="http://www.springframework.org/tags" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>

<c:set var="contextPath" value="${pageContext.request.contextPath}"/>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <!-- The above 3 meta tags *must* come first in the head; any other head content must come *after* these tags -->
    <meta name="description" content="">
    <meta name="author" content="">

    <title>Create an account</title>

    <link href="${contextPath}/resources/css/bootstrap.min.css" rel="stylesheet">

    <!-- HTML5 shim and Respond.js for IE8 support of HTML5 elements and media queries -->
    <!--[if lt IE 9]>
    <script src="https://oss.maxcdn.com/html5shiv/3.7.2/html5shiv.min.js"></script>
    <script src="https://oss.maxcdn.com/respond/1.4.2/respond.min.js"></script>


        <script src="ApplicationResource.js"></script>
    <!-- Bootstrap 3.3.5 for better view calendar comment this part -->
    <script src="plugins/jquery-lang-js/js/jquery.min.js" type="text/javascript"></script>
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
    <link rel="stylesheet" href="bootstrap/css/bootstrap.css">
    <link rel="stylesheet" href="bootstrap/css/bootstrap.vertical-tabs.css">

    <!-- Font Awesome -->
    <link rel="stylesheet" href="dist/fonts/font-awesome-4.6.3/css/font-awesome.css">
    <!-- Theme style -->
    <link rel="stylesheet" href="dist/css/Boostan.css">

    <![endif]-->
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
<div class="container" style="background-color: #eaeaea!important; min-height: 670px;width: 80%;right: 0;float: right;margin: 5px;font-family:yekan!important;">

    <c:if test="${pageContext.request.userPrincipal.name != null}">
        <a style="color: #0d5e9e;" onclick="window.lang.change('fa');">fa</a>
        <a style="color: #0d5e9e;" onclick="window.lang.change('en');">en</a>
        <form id="logoutForm" method="POST" action="${contextPath}/logout">
            <input type="hidden" name="${_csrf.parameterName}" value="${_csrf.token}"/>
        </form>

        <h2><span lang="en">Welcome</Span> ${pageContext.request.userPrincipal.name} | <a onclick="document.forms['logoutForm'].submit()"><span lang="en">Logout</Span></a></h2>

    </c:if>

</div>
<!-- /container -->
<!-- jQuery 2.1.4 -->
<script src="plugins/jQuery/jQuery-2.1.4.min.js"></script>
<!--add new verions of jquery for resolve migration to 3.0.0 -->
<script src="plugins/jQueryUI/jquery-ui.js"></script>
<%--<script src="plugins/jQueryUI/jquery-migrate-3.0.0.js"></script>--%>
<!--add new verions of jquery for resolve migration to 3.0.0 -->


<script src="dist/js/cookies.js"></script>
<script type="text/javascript">
    var lang = new Lang();

    lang.dynamic('fa', 'plugins/jquery-lang-js/js/langpack/boostan_fa.js');
    lang.init({
        defaultLang: 'en'
    });

</script>
<script src="${contextPath}/resources/js/bootstrap.min.js"></script>


</body>
</html>
