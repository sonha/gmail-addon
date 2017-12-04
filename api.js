function getProject() {
    var url_fetch = 'http://sonhaanh.com/api_post.php';
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

    UrlFetchApp.fetch(url_fetch, options);
}

function selectDueDate() {
    return CardService.newSelectionInput()
        .setType(CardService.SelectionInputType.DROPDOWN)
        .setOnChangeAction(
            CardService.newAction()
                .setFunctionName("createWidgetFromDueDate")
        )
        .setTitle("Due Date")
        .setFieldName("task_due_date")
        .addItem("Not set", "priority_notset", true)
        .addItem("Today", "today", false)
        .addItem("Tomorrow", "tomorrow", false)
        .addItem("Next week", "next_week", false)
        .addItem("In two weeks", "in_two_weeks", false)
        .addItem("Set Manually", "set_manually", false)
}

//Input : json data
function selectProject(project_id) {
    var projects = UrlFetchApp.fetch('http://sonhaanh.com/api_get_project.php');
    var data = JSON.parse(projects);

    var projectCard = CardService.newSelectionInput()
        .setType(CardService.SelectionInputType.DROPDOWN)
        .setTitle("Project")
        .setFieldName("project_id");
    projectCard.setOnChangeAction(
        CardService.newAction()
            .setFunctionName("createWidgetTask")
            .setParameters({'paramName': 'selectProject'})
    );

    for (var i = 0; i < data.length; i++) {
        var selected = (project_id === data[i]['id']) ? true : false;
        projectCard.addItem(data[i]['name'],data[i]['id'], selected);
    }

    return projectCard;
}

//Input : json data
function selectGroup(project_id) {
    var groups = UrlFetchApp.fetch('http://sonhaanh.com/api_get_group.php?project_id=' + project_id);
    var data = JSON.parse(groups);
    var groupCard = CardService.newSelectionInput()
        .setType(CardService.SelectionInputType.DROPDOWN)
        .setTitle("Task List")
        .setFieldName("group_id");

    if(data && data.length > 0) {
        for (var i = 0; i < data.length; i++) {
            groupCard.addItem(data[i]['name'],data[i]['id'], false);
        }
    } else {
        groupCard.addItem('No Results',null , true);
    }
    return groupCard;
}

//Input : json data
function getResult(data) {
    var card = CardService.newCardBuilder();
    card.setHeader(CardService.newCardHeader().setTitle('sdsdsds'));

    for (var i = 0; i < data.length; i++) {
        projectCard.addItem(data[i]['name'],data[i]['id'], false);
    }

    return projectCard;
}
