function createWidgetSearch() {
    var action = CardService.newAction().setFunctionName('searchFromDatabase');
    return CardService
        .newCardBuilder()
        .setHeader(
            CardService.newCardHeader()
                .setTitle('Search for task')
                .setImageStyle(CardService.ImageStyle.SQUARE)
                .setImageUrl(SEARCH_ICON))
        .addSection(
            CardService.newCardSection()
                .addWidget(CardService.newTextInput()
                    .setFieldName("task_name")
                    .setTitle("Task Name")
                    .setHint("Task Name"))
                .addWidget(CardService.newTextButton()
                    .setText('Search Task')
                    .setOnClickAction(action))
        )
        .addCardAction(CardService.newCardAction().setText('Wework').setOpenLink(
            CardService.newOpenLink().setUrl('https://wework.vn/')))
        .build();
}

function searchFromDatabase(card) {
    var task = card.formInput;
    var result = UrlFetchApp.fetch('http://sonhaanh.com/api_search.php?task_name=' + task.task_name);
    var data = JSON.parse(result);
    var action = CardService.newAction().setFunctionName('searchFromDatabase');
    return CardService
        .newCardBuilder()
        .setHeader(
            CardService.newCardHeader()
                .setTitle('Search for task')
                .setImageStyle(CardService.ImageStyle.SQUARE)
                .setImageUrl(SEARCH_ICON))
        .addSection(
            CardService.newCardSection()
                .addWidget(CardService.newTextInput()
                    .setFieldName("task_name")
                    .setTitle("Task Name")
                    .setValue(task.task_name)
                    .setHint("Task Name")
                )
                .addWidget(CardService.newTextButton()
                    .setText('Search Task')
                    .setOnClickAction(action))
        )
        .addSection(buildCard(data))
        .addCardAction(CardService.newCardAction().setText('Wework').setOpenLink(
            CardService.newOpenLink().setUrl('https://wework.vn/')))
        .build();

}

function buildCard(data) {
    var newCard = CardService.newCardSection();
    if (data !==null && data.length > 0) {
        data.forEach(function(item) {
            newCard.addWidget(
                CardService.newTextParagraph().setText(item.name)
            )
        });
    } else {
        newCard.addWidget(CardService.newTextParagraph().setText('No result'))
    }

    return newCard;
}

function buildResult() {
    var section = CardService.newCardSection();
}

function testPushCard(data) {
//   return CardService.newCardBuilder().setHeader(CardService.newCardHeader())
    var card = buildResult(data);
    var response = CardService.newActionResponseBuilder();
    response.setNavigation(CardService.newNavigation().pushCard(card))

}
