<?php 
    $html = '<div class="head">' .
                '<div data-languanize data-step="1" data-intro="{$#7#$}" class="left">' .
                  '<h3 data-languanize>languanizr.js</h3>' .
                  '<h4 data-languanize>{$#1#$}</h4>' .
                '</div>' .

                '<a data-languanize data-step="9" data-intro="{$#49#$}" class="right button" target="_blank" href="https://github.com/Vaddo/languanizr.js/tree/master">Github</a>' .
            '</div>' .
            '<hr>' .

            '<nav id="nav" class="nav" data-step="4" data-intro="{$#30#$}">' .
                '<a data-languanize id="home" class="left button" href="index.php">{$#28#$}</a>' .
                '<a data-languanize id="editor" class="left button" href="editor.php">{$#31#$}</a>' .
                '<a data-languanize id="german" class="right button" href="#">{$#2#$}</a>' .
                '<a data-languanize id="english" class="right button" href="#">{$#3#$}</a>' .
            '</nav>';

    echo $html;
?>