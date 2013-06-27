<?php 
    $html = '<div class="head">' .
                '<div data-languanize data-step="1" data-intro="{$#40#$}" class="left">' .
                  '<h3 data-languanize>languanizr.js</h3>' .
                  '<h4 data-languanize>{$#1#$}</h4>' .
                '</div>' .

                '<a data-languanize data-step="12" data-intro="{$#51#$}" class="right button" target="_blank" href="https://github.com/Vaddo/languanizr.js/tree/master" data-position="left">Github</a>' .
            '</div>' .
            '<hr>' .

            '<nav id="nav" class="nav">' .
                '<a data-languanize id="home" class="left button" href="index.php">{$#24#$}</a>' .
                '<a data-languanize id="editor" data-step="5" data-intro="{$#44#$}" class="left button" href="editor.php">{$#25#$}</a>' .
                '<a data-languanize id="german" class="right button" href="#">{$#2#$}</a>' .
                '<a data-languanize id="english" class="right button" href="#">{$#3#$}</a>' .
            '</nav>';

    echo $html;
?>