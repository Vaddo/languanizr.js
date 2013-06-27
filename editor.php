<!DOCTYPE html>
<html>

  <?php include 'head.php' ?>

  <body>
    <div class="page" id="page">

      <?php include 'pageHead.php' ?>

      <div data-languanize class="someText" data-step="2" data-intro="{$#32#$}">
        <h1 data-languanize data-step="4" data-intro="{$#50#$}">languanizr editor</h1>
        <h2 data-languanize >{$#4#$}</h2>
      </div>

      <div data-languanize class="jsonContainer">
        <p data-languanize class="description" data-step="11" data-intro="{$#50#$}">{$#26#$}</p>
        <textarea data-languanize id="field" class="field" data-step="10" data-intro="{$#49#$}"></textarea>
      </div>
      <hr>

      <span class="version">v. 0.1.0</span>
      <div data-languanize class="shortKeysBox" data-step="8" data-intro="{$#47#$}" data-position="top">
        <div class="leftKeyBox">
          <code>←</code>, <code>↑</code>, <code>→</code>, <code>↓</code><span class="description" data-languanize>{$#27#$}</span><br>
          <code>ENTER</code><span class="description" data-languanize>{$#27#$}</span><br>
          <code>ESCAPE</code><span class="description" data-languanize>{$#28#$}</span><br>
          <code>TAB</code><span class="description" data-languanize>{$#30#$}</span>
        </div>
        <div class="middleKeyBox">
          <code>CTRL + POS</code><span class="description" data-languanize>{$#31#$}</span><br>
          <code>CTRL + END</code><span class="description" data-languanize>{$#32#$}</span><br>
          <code>CTRL + P</code><span class="description" data-languanize>{$#33#$}</span><br>
          <code>CTRL + BACKSPACE</code><span class="description" data-languanize>{$#34#$}</span>
        </div>
        <div class="rightKeyBox">
          <code>CTRL + DEL</code><span class="description" data-languanize>{$#35#$}</span><br>
          <span data-languanize data-step="7" data-intro="{$#46#$}" data-position="top"><code>CTRL + C</code><span class="description" data-languanize>{$#36#$}</span></span><br>
          <span data-languanize data-step="9" data-intro="{$#48#$}"><code>CTRL + E</code><span class="description" data-languanize>{$#37#$}</span></span>
        </div>
      </div>
      <div class="clear"></div>

      <div data-languanize data-position="top" data-step="6" data-intro="{$#45#$}">
        <table data-languanize id="languanizrEditor" data-latest-id="1" class="languanizrEditor" cellspacing="0" cellpadding="0" border="0">
          <thead>
            <tr id="editorHead" class="editorHead">
              <th id="idCol" class="idCol">#</th>
              <th data-languanize class="col1 langCol" contenteditable="true">{$#38#$}</th>
            </tr>
          </thead>
          <tbody id="editorBody" class="editorBody">
            <tr>
              <td class="idCol">1</td>
              <td data-languanize class="col1 dataCol" contenteditable="true">{$#39#$}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <input id="languanizrEditorPlaceholder" class="languanizrEditorPlaceholder" type="text"/>

      <?php include 'pageFoot.php' ?>

    </div>

    <?php include 'script.php' ?>
  </body>
</html>