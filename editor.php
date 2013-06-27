<!DOCTYPE html>
<html>

  <?php include 'head.php' ?>

  <body>
    <div class="page" id="page">

      <?php include 'pageHead.php' ?>

      <div data-languanize class="someText" data-step="2" data-intro="{$#32#$}">
        <h1 data-languanize data-step="4" data-intro="{$#50#$}">languanizr editor</h1>
        <h2 data-languanize >{$#5#$}</h2>
      </div>

      <div data-languanize class="jsonContainer" data-step="10" data-intro="{$#51#$}">
        <p data-languanize class="description">{$#48#$}</p>
        <textarea id="field" class="field"></textarea>
      </div>
      <hr>

      <span class="version">v. 0.1.0</span>
      <div data-languanize class="shortKeysBox" data-step="7" data-intro="{$#34#$}">
        <div class="leftKeyBox">
          <code>←</code>, <code>↑</code>, <code>→</code>, <code>↓</code><span class="description" data-languanize>{$#35#$}</span><br>
          <code>ENTER</code><span class="description" data-languanize>{$#36#$}</span><br>
          <code>ESCAPE</code><span class="description" data-languanize>{$#37#$}</span><br>
          <code>TAB</code><span class="description" data-languanize>{$#38#$}</span>
        </div>
        <div class="middleKeyBox">
          <code>CTRL + POS</code><span class="description" data-languanize>{$#39#$}</span><br>
          <code>CTRL + END</code><span class="description" data-languanize>{$#40#$}</span><br>
          <code>CTRL + P</code><span class="description" data-languanize>{$#41#$}</span><br>
          <code>CTRL + BACKSPACE</code><span class="description" data-languanize>{$#42#$}</span>
        </div>
        <div class="rightKeyBox">
          <code>CTRL + DEL</code><span class="description" data-languanize>{$#43#$}</span><br>
          <code>CTRL + C</code><span class="description" data-languanize>{$#44#$}</span><br>
          <span data-languanize data-step="8" data-intro="{$#47#$}"><code>CTRL + E</code><span class="description" data-languanize>{$#45#$}</span></span>
        </div>
      </div>
      <div class="clear"></div>

      <table data-languanize id="languanizrEditor" data-latest-id="1" class="languanizrEditor" cellspacing="0" cellpadding="0" border="0" data-step="6" data-intro="{$#46#$}">
        <thead>
          <tr id="editorHead" class="editorHead">
            <th id="idCol" class="idCol">#</th>
            <th data-languanize class="col1 langCol" contenteditable="true">{$#24#$}</th>
          </tr>
        </thead>
        <tbody id="editorBody" class="editorBody">
          <tr>
            <td class="idCol">1</td>
            <td data-languanize class="col1 dataCol" contenteditable="true">{$#25#$}</td>
          </tr>
        </tbody>
      </table>
      <input id="languanizrEditorPlaceholder" class="languanizrEditorPlaceholder" type="text"/>

      <?php include 'pageFoot.php' ?>

    </div>

    <?php include 'script.php' ?>
  </body>
</html>