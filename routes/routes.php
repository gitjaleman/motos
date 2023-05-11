<?php
    $listRoutes = array('index');
    foreach($listRoutes as $route) {
        require 'route.'.$route.'.php';
    }
?>
