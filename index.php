<?php include './header.php'; ?>
<main data-ng-app="imgLoad">
    <div class="wrapper" data-ng-controller="imgCtrl">
        <form enctype="multipart/form-data" method="post" data-ng-submit="submit()">
            <p>Загрузите ваши фотографии на сервер</p>
            <input type="file" name="uploadfile" multiple accept="image/*,image/jpeg" />
            <input type="text" ng-model="name" name="name" />
            <input type="submit" value="Отправить" />
        </form>
        <div class="grid-five-col">
            <div class="f-col" data-ng-repeat="img in images">
                {{img.name}}
            </div>
        </div>

        <div class="pagination-wrap">
            <ul class="pagination">
                <li data-ng-repeat="item in paginationList" data-ng-click="showPage(item.link)" data-ng-class="{'active': currentPageNum() == item.link}"><a href="#" data-ng-bind-html="item.name"></a></li>
            </ul>
        </div>

        <?php
        $host = 'localhost'; // имя хоста (уточняется у провайдера)
        $database = 'images_list'; // имя базы данных, которую вы должны создать
        $user = 'root'; // заданное вами имя пользователя, либо определенное провайдером
        $pswd = ''; // заданный вами пароль

        $dbh = mysql_connect($host, $user, $pswd) or die("Не могу соединиться с MySQL.");
        mysql_select_db($database) or die("Не могу подключиться к базе.");

        $query = "SELECT `content` FROM `images`";
        $res = mysql_query($query);
        
        if (mysql_num_rows($res) > 0) {
            while ($img = mysql_fetch_array($res)) {
                echo '<img src="data:image/jpeg;base64,' . base64_encode($img['content']) . '" />';
            }
        }
        ?>

    </div>
</main>
<?php include './footer.php'; ?>

