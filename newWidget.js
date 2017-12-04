function createWidgetNewTask(senderData) {
    var data = senderData.formInput;
    var actionFlag = senderData.parameters;
    Logger.log(actionFlag);
    var action = CardService.newAction().setFunctionName('saveToDatabase');
    var cardService = CardService
        .newCardBuilder()
        .setHeader(
            CardService.newCardHeader()
                .setTitle('Create new task')
                .setImageStyle(CardService.ImageStyle.SQUARE)
                .setImageUrl(CREATE_ICON)
        ).addCardAction(
            CardService.newCardAction().setText('Wework').setOpenLink(
                CardService.newOpenLink().setUrl('https://wework.vn/')
            )
        );
    var cardSection = CardService.newCardSection();
    cardSection.addWidget(CardService.newTextInput()
        .setFieldName("task_name")
        .setTitle("Task Name")
        .setHint("Task Name")
        .setValue(senderData.subject)
    )
        .addWidget(CardService.newTextInput()
            .setFieldName("task_description")
            .setTitle("Description")
            .setHint("Description")
            .setMultiline(true)
            .setValue(senderData.content)
        )
        .addWidget(selectProject(null))
        .addWidget(selectDueDate())
        .addWidget(CardService.newSelectionInput()
            .setType(CardService.SelectionInputType.RADIO_BUTTON)
            .setTitle("Priority")
            .setFieldName("task_priority")
            .addItem("High", "priority_high", true)
            .addItem("Low", "priority_low", false))
        .addWidget(CardService.newTextButton()
            .setText('Create Task')
            .setOnClickAction(action));
    cardService.addSection(cardSection)
    return cardService.build();
}

function createWidgetTask(senderData) {
    data = senderData.formInput;
    Logger.log(senderData.parameters);
    var action = CardService.newAction().setFunctionName('saveToDatabase');
    var cardService = CardService.newCardBuilder()
        .setHeader(
            CardService.newCardHeader()
                .setTitle('Create new task')
                .setImageStyle(CardService.ImageStyle.SQUARE)
                .setImageUrl(CREATE_ICON)
        );
    cardService.addCardAction(
        CardService.newCardAction().setText('Wework').setOpenLink(
            CardService.newOpenLink().setUrl('https://wework.vn/')
        )
    );
    var cardSection = CardService.newCardSection();
    cardService.addSection(
        cardSection.addWidget(CardService.newTextInput()
            .setFieldName("task_name")
            .setTitle("Task Name")
            .setHint("Task Name")
            .setValue(data.task_name)
        )
            .addWidget(CardService.newTextInput()
                .setFieldName("task_description")
                .setTitle("Description")
                .setHint("Description")
                .setMultiline(true)
                .setValue(data.task_description)
            )
            .addWidget(selectProject(data.project_id))
            .addWidget(selectGroup(data.project_id))
            .addWidget(selectDueDate())
            .addWidget(CardService.newSelectionInput()
                .setType(CardService.SelectionInputType.RADIO_BUTTON)
                .setTitle("Priority")
                .setFieldName("task_priority")
                .addItem("High", "priority_high", true)
                .addItem("Low", "priority_low", false))
            .addWidget(CardService.newTextButton()
                .setText('Create Task')
                .setOnClickAction(action))
    )

    return cardService.build();
}

function createWidgetFromDueDate(senderData) {
    var currentDate = new Date();
    data = senderData.formInput;
    switch(data.task_due_date) {
        case 'today':
            var textDate = moment().format("YYYY-MM-DD");break;
        case 'tomorrow':
            var textDate = moment(new Date()).add(1,'days').format("YYYY-MM-DD");break;
        case 'next_week':
            var textDate = moment(new Date()).add(7,'days').format("YYYY-MM-DD");break;
        case 'in_two_weeks':
            var textDate = moment(new Date()).add(14,'days').format("YYYY-MM-DD");break;
        case 'set_manually':
            var textDate = '';break;
    }

    Logger.log(data.task_due_date);
    Logger.log(moment(new Date()).add(1,'days').format("YYYY-MM-DD"));
    var action = CardService.newAction().setFunctionName('saveToDatabase');
    var cardService = CardService.newCardBuilder()
        .setHeader(
            CardService.newCardHeader()
                .setTitle('Create new task')
                .setImageStyle(CardService.ImageStyle.SQUARE)
                .setImageUrl(CREATE_ICON)
        );
    cardService.addCardAction(
        CardService.newCardAction().setText('Wework').setOpenLink(
            CardService.newOpenLink().setUrl('https://wework.vn/')
        )
    );
    var cardSection = CardService.newCardSection();
    cardService.addSection(
        cardSection.addWidget(CardService.newTextInput()
            .setFieldName("task_name")
            .setTitle("Task Name")
            .setHint("Task Name")
            .setValue(data.task_name)
        )
            .addWidget(CardService.newTextInput()
                .setFieldName("task_description")
                .setTitle("Description")
                .setHint("Description")
                .setMultiline(true)
                .setValue(data.task_description)
            )
            .addWidget(selectProject(data.project_id))
            .addWidget(selectGroup(data.project_id))
            .addWidget(CardService.newTextInput()
                .setFieldName("task_due_date")
                .setTitle("Due Date")
                .setHint("Due Date")
                .setMultiline(true)
                .setValue(textDate)
            )
            .addWidget(CardService.newSelectionInput()
                .setType(CardService.SelectionInputType.RADIO_BUTTON)
                .setTitle("Priority")
                .setFieldName("task_priority")
                .addItem("High", "priority_high", true)
                .addItem("Low", "priority_low", false))
            .addWidget(CardService.newTextButton()
                .setText('Create Task')
                .setOnClickAction(action))
    )

    return cardService.build();
}