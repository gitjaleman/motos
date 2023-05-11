<!DOCTYPE html>
    <html lang="es">
    <head>
        <meta charset="UTF-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <link rel="stylesheet" href="assets/css/bootstrap.css">
        <link rel="stylesheet" href="assets/css/owl.carousel.min.css">
        <link rel="stylesheet" href="assets/css/select2.min.css">
        <link rel="stylesheet" href="assets/css/toastr.min.css">
        <link rel="stylesheet" href="assets/css/style.css">
        <link rel="stylesheet" href="assets/css/style.header-classic-variant-one.css">
        <link rel="stylesheet" href="assets/css/style.header-spaceship-variant-one.css">
        <link rel="stylesheet" href="assets/css/style.mobile-header-variant-one.css">  
        <link rel="stylesheet" href="assets/css/remixicon.min.css"> 
        <link rel="stylesheet" href="assets/css/fonts.css">   
        <link rel="stylesheet" href="assets/css/motos.css">     
        <title>MotoRepuestosDk</title>
    </head>
    <body >
    <?php 
        require 'core/app.php';
        $AppRoutes = new AppRoutes;
        require 'routes/routes.php';
        $listRoutes=$AppRoutes->getRoutes();
        $AppViews = new AppViews($listRoutes);
        $AppViews->loadViews();
    ?>
    <script src="assets/js/jquery.min.js"></script>
    <script src="assets/js/bootstrap.bundle.min.js"></script>
    <script src="assets/js/owl.carousel.min.js"></script>
    <script src="assets/js/toastr.min.js"></script>
    <script src="assets/js/number.js"></script>
    <script src="assets/js/select2.min.js"></script>
    <script src="assets/js/main.js"></script>
    <script src="assets/js/app.js"></script>
    <?php 
        $AppScript = new AppScript($listRoutes);
        $AppScript->loadScript();
    ?>
    </body>
</html>