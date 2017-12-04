function testApi() {
    var data = {
        "user_id": 12,
        "username": "Son Ha",
        "creator_id": 35,
        "creator_username": "Simon Ha",
        "status": 1
    };

    var options = {
        "method" : "post",
        "contentType" : "application/json",
        "payload" : JSON.stringify(data)
    };

    UrlFetchApp.fetch('http://sonhaanh.com/api_post.php', options);
}

function saveToDatabase(card) {
    var task = card.formInput;
    Logger.log(task);
    var task_data = {
        "user_id": 12,
        "username": "Simon Ha",
        "name": task.task_name,
        "content": task.task_description,
        "tasklist_id": 35,
        "ns_id": 35,
        "creator_id": 35,
        "task_due_date" : task.task_due_date,
        "system_id": 1,
        "creator_username": "Simon Ha",
        "status": 1
    };

    if(task.task_due_date === 'priority_notset') {
        return CardService.newActionResponseBuilder()
            .setNotification(
                CardService.newNotification()
                    .setText("Vui lòng nhập thời gian hoàn thành.")
                    .setType(CardService.NotificationType.ERROR)
            )
            .build();
    } else {
        var options = {
            "method" : "post",
            "payload" : task_data
        };

        UrlFetchApp.fetch('http://sonhaanh.com/api_post.php', options);

        return CardService.newActionResponseBuilder()
            .setNotification(CardService.newNotification()
                .setType(CardService.NotificationType.INFO)
                .setText("Data saved"))
            .build();
    }


}


function test() {
    cards.push(createWidgetSearch());
}




 