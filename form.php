<?php

copy($_FILES['uploadfile']['tmp_name'], "uploads/" . basename($_FILES['uploadfile']['name']));
include './header.php';
?>
<main>
    <img src="uploads/<?php echo $_FILES['uploadfile']['name'] ?>" alt="" />
</main>

<?php

include './footer.php';

