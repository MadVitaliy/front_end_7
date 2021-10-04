<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <meta name="keywords" content="Front end, Example, practice7, Omelchenko" />
    <meta name="description" content="Практична робота 7" />
    <TITLE>Омельченко В.В. ІК-82 Друга сторінка</TITLE>
    <link href="./styles.css" rel="stylesheet">
</head>
<BODY>
  <p><h4>Ваше замовлення прийнято</h4></p>
  <?php
    if ($_SERVER["REQUEST_METHOD"] == "POST") {
      $furniture = $_POST["furniture"];
      $material = $_POST["material"];
      $count = $_POST["count"];

      echo nl2br("Замовлений виріб: " . $furniture . "\r\n");
      echo nl2br("Матеріал: " . $material . "\r\n");
      echo nl2br("Кількість: " . $count . " шт.\r\n");
    }
  ?>
  <p>
    <a href="index.html"> На попередню </a>
  </p>
</body>
</html>
