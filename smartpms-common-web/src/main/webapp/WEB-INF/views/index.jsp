<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<!DOCTYPE html>
<html lang="kr" ng-app="BlurAdmin">
<head>
  <meta charset="utf-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="_csrf" content="${_csrf.token}"/>
  <meta name="_csrf_header" content="${_csrf.headerName}"/>
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>${sysTitle}</title>
  <base href="${sysContext}/angular/">


  <link href='https://fonts.googleapis.com/css?family=Roboto:400,100,100italic,300,300italic,400italic,500,500italic,700,700italic,900italic,900&subset=latin,greek,greek-ext,vietnamese,cyrillic-ext,latin-ext,cyrillic' rel='stylesheet' type='text/css'>

  <link rel="icon" type="image/png" sizes="16x16" href="${sysContext}/angular/assets/img/favicon-16x16.png?version=${resVersion}">
  <link rel="icon" type="image/png" sizes="32x32" href="${sysContext}/angular/assets/img/favicon-32x32.png?version=${resVersion}">
  <link rel="icon" type="image/png" sizes="96x96" href="${sysContext}/angular/assets/img/favicon-96x96.png?version=${resVersion}">

  <!-- build:css({.tmp/serve,src}) styles/vendor.css??version=${resVersion} -->
  <!-- bower:css -->
  <link rel="stylesheet" href="${sysContext}/angular/lib/ionicons.css??version=${resVersion}" >
  <link rel="stylesheet" href="${sysContext}/angular/lib/angular-toastr.css??version=${resVersion}" >
  <link rel="stylesheet" href="${sysContext}/angular/lib/animate.css??version=${resVersion}" >
  <link rel="stylesheet" href="${sysContext}/angular/lib/bootstrap.css??version=${resVersion}" >
  <link rel="stylesheet" href="${sysContext}/angular/lib/bootstrap-select.css??version=${resVersion}" >
  <link rel="stylesheet" href="${sysContext}/angular/lib/bootstrap-switch.css??version=${resVersion}" >
  <link rel="stylesheet" href="${sysContext}/angular/lib/bootstrap-tagsinput.css??version=${resVersion}" >
  <link rel="stylesheet" href="${sysContext}/angular/lib/font-awesome.css??version=${resVersion}" >
  <link rel="stylesheet" href="${sysContext}/angular/lib/fullcalendar.css??version=${resVersion}" >
  <link rel="stylesheet" href="${sysContext}/angular/lib/leaflet.css??version=${resVersion}" >
  <link rel="stylesheet" href="${sysContext}/angular/lib/angular-progress-button-styles.min.css??version=${resVersion}" >
  <link rel="stylesheet" href="${sysContext}/angular/lib/angular-chart.css??version=${resVersion}" >
  <link rel="stylesheet" href="${sysContext}/angular/lib/chartist.min.css??version=${resVersion}" >
  <link rel="stylesheet" href="${sysContext}/angular/lib/morris.css??version=${resVersion}" >
  <link rel="stylesheet" href="${sysContext}/angular/lib/ion.rangeSlider.css??version=${resVersion}" >
  <link rel="stylesheet" href="${sysContext}/angular/lib/ion.rangeSlider.skinFlat.css??version=${resVersion}" >
  <link rel="stylesheet" href="${sysContext}/angular/lib/textAngular.css??version=${resVersion}" >
  <link rel="stylesheet" href="${sysContext}/angular/lib/xeditable.css??version=${resVersion}" >
  <link rel="stylesheet" href="${sysContext}/angular/lib/style.css??version=${resVersion}" >
  <!-- endbower -->
  <!-- endbuild -->

  <!-- build:css({.tmp/serve,src}) styles/app.css??version=${resVersion} -->
  <!-- inject:css -->
  <link rel="stylesheet" href="${sysContext}/angular/app/main.css??version=${resVersion}">
  <!-- endinject -->
  <script type="text/javascript">
  var G_TOKEN = "${_csrf.token}";
  var G_PATH = "${sysContext}";
  </script>
  <!-- endbuild -->
</head>
<body>
<div class="body-bg"></div>
<main ng-if="$pageFinishedLoading" ng-class="{ 'menu-collapsed': $baSidebarService.isMenuCollapsed() }">

  <ba-sidebar></ba-sidebar>
  <page-top></page-top>

  <div class="al-main">
    <div class="al-content">
      <content-top></content-top>
      <div ui-view></div>
    </div>
  </div>

  <footer class="al-footer clearfix">
    <div class="al-footer-right">Created with <i class="ion-heart"></i></div>
    <div class="al-footer-main clearfix">
      <div class="al-copy">${sysOwner} 2016</div>
      <ul class="al-share clearfix">
        <li><i class="socicon socicon-facebook"></i></li>
        <li><i class="socicon socicon-twitter"></i></li>
        <li><i class="socicon socicon-google"></i></li>
        <li><i class="socicon socicon-github"></i></li>
      </ul>
    </div>
  </footer>

  <back-top></back-top>
</main>

<div id="preloader" ng-show="!$pageFinishedLoading">
  <div></div>
</div>

<!-- build:js(src) scripts/vendor.js -->
<!-- bower:js -->
<script src="${sysContext}/angular/bower_components/jquery/dist/jquery.js"></script>
<script src="${sysContext}/angular/bower_components/Chart.js/Chart.js"></script>
<script src="${sysContext}/angular/bower_components/amcharts/dist/amcharts/amcharts.js"></script>
<script src="${sysContext}/angular/bower_components/amcharts/dist/amcharts/plugins/responsive/responsive.min.js"></script>
<script src="${sysContext}/angular/bower_components/amcharts/dist/amcharts/serial.js"></script>
<script src="${sysContext}/angular/bower_components/amcharts/dist/amcharts/funnel.js"></script>
<script src="${sysContext}/angular/bower_components/amcharts/dist/amcharts/pie.js"></script>
<script src="${sysContext}/angular/bower_components/amcharts/dist/amcharts/gantt.js"></script>
<script src="${sysContext}/angular/bower_components/amcharts-stock/dist/amcharts/amstock.js"></script>
<script src="${sysContext}/angular/bower_components/ammap/dist/ammap/ammap.js"></script>
<script src="${sysContext}/angular/bower_components/ammap/dist/ammap/maps/js/worldLow.js"></script>
<script src="${sysContext}/angular/bower_components/angular/angular.js"></script>
<script src="${sysContext}/angular/bower_components/angular-route/angular-route.js"></script>
<script src="${sysContext}/angular/bower_components/slimScroll/jquery.slimscroll.js"></script>
<script src="${sysContext}/angular/bower_components/angular-slimscroll/angular-slimscroll.js"></script>
<script src="${sysContext}/angular/bower_components/angular-smart-table/dist/smart-table.js"></script>
<script src="${sysContext}/angular/bower_components/angular-toastr/dist/angular-toastr.tpls.js"></script>
<script src="${sysContext}/angular/bower_components/angular-touch/angular-touch.js"></script>
<script src="${sysContext}/angular/bower_components/jquery-ui/jquery-ui.js"></script>
<script src="${sysContext}/angular/bower_components/angular-ui-sortable/sortable.js"></script>
<script src="${sysContext}/angular/bower_components/bootstrap/js/dropdown.js"></script>
<script src="${sysContext}/angular/bower_components/bootstrap-select/dist/js/bootstrap-select.js"></script>
<script src="${sysContext}/angular/bower_components/bootstrap-switch/dist/js/bootstrap-switch.js"></script>
<script src="${sysContext}/angular/bower_components/bootstrap-tagsinput/dist/bootstrap-tagsinput.js"></script>
<script src="${sysContext}/angular/bower_components/moment/moment.js"></script>
<script src="${sysContext}/angular/bower_components/fullcalendar/dist/fullcalendar.js"></script>
<script src="${sysContext}/angular/bower_components/jquery.easing/js/jquery.easing.js"></script>
<script src="${sysContext}/angular/bower_components/jquery.easy-pie-chart/dist/jquery.easypiechart.js"></script>
<script src="${sysContext}/angular/bower_components/leaflet/dist/leaflet-src.js"></script>
<script src="${sysContext}/angular/bower_components/angular-progress-button-styles/dist/angular-progress-button-styles.min.js"></script>
<script src="${sysContext}/angular/bower_components/angular-ui-router/release/angular-ui-router.js"></script>
<script src="${sysContext}/angular/bower_components/angular-chart.js/dist/angular-chart.js"></script>
<script src="${sysContext}/angular/bower_components/chartist/dist/chartist.min.js"></script>
<script src="${sysContext}/angular/bower_components/angular-chartist.js/dist/angular-chartist.js"></script>
<script src="${sysContext}/angular/bower_components/raphael/raphael.js"></script>
<script src="${sysContext}/angular/bower_components/mocha/mocha.js"></script>
<script src="${sysContext}/angular/bower_components/morris.js/morris.js"></script>
<script src="${sysContext}/angular/bower_components/angular-morris-chart/src/angular-morris-chart.min.js"></script>
<script src="${sysContext}/angular/bower_components/ionrangeslider/js/ion.rangeSlider.js"></script>
<script src="${sysContext}/angular/bower_components/angular-bootstrap/ui-bootstrap-tpls.js"></script>
<script src="${sysContext}/angular/bower_components/angular-animate/angular-animate.js"></script>
<script src="${sysContext}/angular/bower_components/rangy/rangy-core.js"></script>
<script src="${sysContext}/angular/bower_components/rangy/rangy-classapplier.js"></script>
<script src="${sysContext}/angular/bower_components/rangy/rangy-highlighter.js"></script>
<script src="${sysContext}/angular/bower_components/rangy/rangy-selectionsaverestore.js"></script>
<script src="${sysContext}/angular/bower_components/rangy/rangy-serializer.js"></script>
<script src="${sysContext}/angular/bower_components/rangy/rangy-textrange.js"></script>
<script src="${sysContext}/angular/bower_components/textAngular/dist/textAngular.js"></script>
<script src="${sysContext}/angular/bower_components/textAngular/dist/textAngular-sanitize.js"></script>
<script src="${sysContext}/angular/bower_components/textAngular/dist/textAngularSetup.js"></script>
<script src="${sysContext}/angular/bower_components/angular-xeditable/dist/js/xeditable.js"></script>
<script src="${sysContext}/angular/bower_components/jstree/dist/jstree.js"></script>
<script src="${sysContext}/angular/bower_components/ng-js-tree/dist/ngJsTree.js"></script>
<!-- endbower -->
<!-- endbuild -->
<script type="text/javascript" src="http://maps.google.com/maps/api/js?sensor=false"></script>

<!-- build:js({.tmp/serve,.tmp/partials,src}) scripts/app.js -->
<!-- inject:js -->
<script src="${sysContext}/angular/app/pages/pages.module.js"></script>
<script src="${sysContext}/angular/app/theme/theme.module.js"></script>
<script src="${sysContext}/angular/app/pages/charts/charts.module.js"></script>
<script src="${sysContext}/angular/app/pages/components/components.module.js"></script>
<script src="${sysContext}/angular/app/pages/dashboard/dashboard.module.js"></script>
<script src="${sysContext}/angular/app/pages/form/form.module.js"></script>
<script src="${sysContext}/angular/app/pages/maps/maps.module.js"></script>
<script src="${sysContext}/angular/app/pages/profile/profile.module.js"></script>
<script src="${sysContext}/angular/app/pages/tables/tables.module.js"></script>
<script src="${sysContext}/angular/app/pages/ui/ui.module.js"></script>
<script src="${sysContext}/angular/app/theme/components/components.module.js"></script>
<script src="${sysContext}/angular/app/pages/charts/amCharts/amCharts.module.js"></script>
<script src="${sysContext}/angular/app/pages/charts/chartJs/chartJs.module.js"></script>
<script src="${sysContext}/angular/app/pages/charts/chartist/chartist.module.js"></script>
<script src="${sysContext}/angular/app/pages/charts/morris/morris.module.js"></script>
<script src="${sysContext}/angular/app/pages/components/timeline/timeline.module.js"></script>
<script src="${sysContext}/angular/app/pages/components/mail/mail.module.js"></script>
<script src="${sysContext}/angular/app/pages/components/tree/tree.module.js"></script>
<script src="${sysContext}/angular/app/pages/ui/alerts/alerts.module.js"></script>
<script src="${sysContext}/angular/app/pages/ui/buttons/buttons.module.js"></script>
<script src="${sysContext}/angular/app/pages/ui/grid/grid.module.js"></script>
<script src="${sysContext}/angular/app/pages/ui/icons/icons.module.js"></script>
<script src="${sysContext}/angular/app/pages/ui/modals/modals.module.js"></script>
<script src="${sysContext}/angular/app/pages/ui/notifications/notifications.module.js"></script>
<script src="${sysContext}/angular/app/pages/ui/panels/panels.module.js"></script>
<script src="${sysContext}/angular/app/pages/ui/progressBars/progressBars.module.js"></script>
<script src="${sysContext}/angular/app/pages/ui/slider/slider.module.js"></script>
<script src="${sysContext}/angular/app/pages/ui/tabs/tabs.module.js"></script>
<script src="${sysContext}/angular/app/pages/ui/typography/typography.module.js"></script>
<script src="${sysContext}/angular/app/app.js"></script>
<script src="${sysContext}/angular/app/theme/theme.config.js"></script>
<script src="${sysContext}/angular/app/theme/theme.configProvider.js"></script>
<script src="${sysContext}/angular/app/theme/theme.constants.js"></script>
<script src="${sysContext}/angular/app/theme/theme.run.js"></script>
<script src="${sysContext}/angular/app/theme/theme.service.js"></script>
<script src="${sysContext}/angular/app/pages/profile/ProfileModalCtrl.js"></script>
<script src="${sysContext}/angular/app/pages/profile/ProfilePageCtrl.js"></script>
<script src="${sysContext}/angular/app/pages/tables/TablesPageCtrl.js"></script>
<script src="${sysContext}/angular/app/theme/components/toastrLibConfig.js"></script>
<script src="${sysContext}/angular/app/theme/directives/animatedChange.js"></script>
<script src="${sysContext}/angular/app/theme/directives/autoExpand.js"></script>
<script src="${sysContext}/angular/app/theme/directives/autoFocus.js"></script>
<script src="${sysContext}/angular/app/theme/directives/includeWithScope.js"></script>
<script src="${sysContext}/angular/app/theme/directives/ionSlider.js"></script>
<script src="${sysContext}/angular/app/theme/directives/ngFileSelect.js"></script>
<script src="${sysContext}/angular/app/theme/directives/scrollPosition.js"></script>
<script src="${sysContext}/angular/app/theme/directives/trackWidth.js"></script>
<script src="${sysContext}/angular/app/theme/directives/zoomIn.js"></script>
<script src="${sysContext}/angular/app/theme/services/baUtil.js"></script>
<script src="${sysContext}/angular/app/theme/services/fileReader.js"></script>
<script src="${sysContext}/angular/app/theme/services/preloader.js"></script>
<script src="${sysContext}/angular/app/theme/services/stopableInterval.js"></script>
<script src="${sysContext}/angular/app/pages/charts/chartJs/chartJs1DCtrl.js"></script>
<script src="${sysContext}/angular/app/pages/charts/chartJs/chartJs2DCtrl.js"></script>
<script src="${sysContext}/angular/app/pages/charts/chartJs/chartJsWaveCtrl.js"></script>
<script src="${sysContext}/angular/app/pages/charts/chartist/chartistCtrl.js"></script>
<script src="${sysContext}/angular/app/pages/charts/morris/morrisCtrl.js"></script>
<script src="${sysContext}/angular/app/pages/components/timeline/TimelineCtrl.js"></script>
<script src="${sysContext}/angular/app/pages/components/mail/MailTabCtrl.js"></script>
<script src="${sysContext}/angular/app/pages/components/mail/mailMessages.js"></script>
<script src="${sysContext}/angular/app/pages/components/tree/treeCtrl.js"></script>
<script src="${sysContext}/angular/app/pages/dashboard/blurFeed/BlurFeedCtrl.js"></script>
<script src="${sysContext}/angular/app/pages/dashboard/blurFeed/blurFeed.directive.js"></script>
<script src="${sysContext}/angular/app/pages/dashboard/calendar/dashboardCalendar.js"></script>
<script src="${sysContext}/angular/app/pages/dashboard/dashboardCalendar/DashboardCalendarCtrl.js"></script>
<script src="${sysContext}/angular/app/pages/dashboard/dashboardCalendar/dashboardCalendar.directive.js"></script>
<script src="${sysContext}/angular/app/pages/dashboard/dashboardLineChart/DashboardLineChartCtrl.js"></script>
<script src="${sysContext}/angular/app/pages/dashboard/dashboardLineChart/dashboardLineChart.directive.js"></script>
<script src="${sysContext}/angular/app/pages/dashboard/dashboardMap/DashboardMapCtrl.js"></script>
<script src="${sysContext}/angular/app/pages/dashboard/dashboardMap/dashboardMap.directive.js"></script>
<script src="${sysContext}/angular/app/pages/dashboard/dashboardPieChart/DashboardPieChartCtrl.js"></script>
<script src="${sysContext}/angular/app/pages/dashboard/dashboardPieChart/dashboardPieChart.directive.js"></script>
<script src="${sysContext}/angular/app/pages/dashboard/dashboardTodo/DashboardTodoCtrl.js"></script>
<script src="${sysContext}/angular/app/pages/dashboard/dashboardTodo/dashboardTodo.directive.js"></script>
<script src="${sysContext}/angular/app/pages/dashboard/pieCharts/dashboardPieChart.js"></script>
<script src="${sysContext}/angular/app/pages/dashboard/popularApp/popularApp.directive.js"></script>
<script src="${sysContext}/angular/app/pages/dashboard/trafficChart/TrafficChartCtrl.js"></script>
<script src="${sysContext}/angular/app/pages/dashboard/trafficChart/trafficChart.directive.js"></script>
<script src="${sysContext}/angular/app/pages/dashboard/weather/WeatherCtrl.js"></script>
<script src="${sysContext}/angular/app/pages/dashboard/weather/weather.directive.js"></script>
<script src="${sysContext}/angular/app/pages/form/wizard/wizrdCtrl.js"></script>
<script src="${sysContext}/angular/app/pages/maps/google-maps/GmapPageCtrl.js"></script>
<script src="${sysContext}/angular/app/pages/maps/leaflet/LeafletPageCtrl.js"></script>
<script src="${sysContext}/angular/app/pages/maps/map-bubbles/MapBubblePageCtrl.js"></script>
<script src="${sysContext}/angular/app/pages/maps/map-lines/MapLinesPageCtrl.js"></script>
<script src="${sysContext}/angular/app/pages/ui/buttons/ButtonPageCtrl.js"></script>
<script src="${sysContext}/angular/app/pages/ui/icons/IconsPageCtrl.js"></script>
<script src="${sysContext}/angular/app/pages/ui/modals/ModalsPageCtrl.js"></script>
<script src="${sysContext}/angular/app/pages/ui/notifications/NotificationsPageCtrl.js"></script>
<script src="${sysContext}/angular/app/theme/components/baPanel/baPanel.directive.js"></script>
<script src="${sysContext}/angular/app/theme/components/baPanel/baPanel.service.js"></script>
<script src="${sysContext}/angular/app/theme/components/baPanel/baPanelBlur.directive.js"></script>
<script src="${sysContext}/angular/app/theme/components/baPanel/baPanelBlurHelper.service.js"></script>
<script src="${sysContext}/angular/app/theme/components/baPanel/baPanelSelf.directive.js"></script>
<script src="${sysContext}/angular/app/theme/components/baSidebar/BaSidebarCtrl.js"></script>
<script src="${sysContext}/angular/app/theme/components/baSidebar/baSidebar.directive.js"></script>
<script src="${sysContext}/angular/app/theme/components/baSidebar/baSidebar.service.js"></script>
<script src="${sysContext}/angular/app/theme/components/baSidebar/baSidebarHelpers.directive.js"></script>
<script src="${sysContext}/angular/app/theme/components/baWizard/baWizard.directive.js"></script>
<script src="${sysContext}/angular/app/theme/components/baWizard/baWizardCtrl.js"></script>
<script src="${sysContext}/angular/app/theme/components/baWizard/baWizardStep.directive.js"></script>
<script src="${sysContext}/angular/app/theme/components/backTop/backTop.directive.js"></script>
<script src="${sysContext}/angular/app/theme/components/contentTop/contentTop.directive.js"></script>
<script src="${sysContext}/angular/app/theme/components/msgCenter/MsgCenterCtrl.js"></script>
<script src="${sysContext}/angular/app/theme/components/msgCenter/msgCenter.directive.js"></script>
<script src="${sysContext}/angular/app/theme/components/pageTop/pageTop.directive.js"></script>
<script src="${sysContext}/angular/app/theme/components/widgets/widgets.directive.js"></script>
<script src="${sysContext}/angular/app/theme/filters/image/appImage.js"></script>
<script src="${sysContext}/angular/app/theme/filters/image/kameleonImg.js"></script>
<script src="${sysContext}/angular/app/theme/filters/image/profilePicture.js"></script>
<script src="${sysContext}/angular/app/theme/filters/text/removeHtml.js"></script>
<script src="${sysContext}/angular/app/pages/charts/amCharts/areaChart/AreaChartCtrl.js"></script>
<script src="${sysContext}/angular/app/pages/charts/amCharts/barChart/BarChartCtrl.js"></script>
<script src="${sysContext}/angular/app/pages/charts/amCharts/combinedChart/combinedChartCtrl.js"></script>
<script src="${sysContext}/angular/app/pages/charts/amCharts/funnelChart/FunnelChartCtrl.js"></script>
<script src="${sysContext}/angular/app/pages/charts/amCharts/ganttChart/ganttChartCtrl.js"></script>
<script src="${sysContext}/angular/app/pages/charts/amCharts/lineChart/LineChartCtrl.js"></script>
<script src="${sysContext}/angular/app/pages/charts/amCharts/pieChart/PieChartCtrl.js"></script>
<script src="${sysContext}/angular/app/pages/components/mail/composeBox/composeBoxCtrl.js"></script>
<script src="${sysContext}/angular/app/pages/components/mail/composeBox/composeModal.js"></script>
<script src="${sysContext}/angular/app/pages/components/mail/detail/MailDetailCtrl.js"></script>
<script src="${sysContext}/angular/app/pages/components/mail/list/MailListCtrl.js"></script>
<script src="${sysContext}/angular/app/pages/ui/modals/notifications/NotificationsCtrl.js"></script>
<script src="${sysContext}/angular/app/theme/components/backTop/lib/jquery.backTop.min.js"></script>
<script src="${sysContext}/angular/app/pages/form/inputs/widgets/select/SelectpickerPanelCtrl.js"></script>
<script src="${sysContext}/angular/app/pages/form/inputs/widgets/select/selectpicker.directive.js"></script>
<script src="${sysContext}/angular/app/pages/form/inputs/widgets/switch/SwitchPanelCtrl.js"></script>
<script src="${sysContext}/angular/app/pages/form/inputs/widgets/switch/switch.directive.js"></script>
<script src="${sysContext}/angular/app/pages/form/inputs/widgets/tagsInput/tagsInput.directive.js"></script>
<!-- endinject -->

<!-- inject:partials -->
<!-- angular templates will be automatically converted in js and inserted here -->
<!-- endinject -->
<!-- endbuild -->

<input type="hidden" name="${_csrf.parameterName}" value="${_csrf.token}">

</body>
</html>