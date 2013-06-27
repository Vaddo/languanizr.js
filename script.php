<?php 
    $html =  '<script src="//ajax.googleapis.com/ajax/libs/jquery/1.10.1/jquery.min.js"></script>' .
             '<script src="js/languanizrEditor.js"></script>' .
             '<script src="js/languanizr.js"></script>' .
             '<script src="js/main.js"></script>' .
             '<script src="js/vendor/intro.min.js"></script>' . 
             "<script>!function(d,s,id){var js,fjs=d.getElementsByTagName(s)[0],p=/^http:/.test(d.location)?'http':'https';if(!d.getElementById(id)){js=d.createElement(s);js.id=id;js.src=p+'://platform.twitter.com/widgets.js';fjs.parentNode.insertBefore(js,fjs);}}(document, 'script', 'twitter-wjs');</script>";

    echo $html;
?>