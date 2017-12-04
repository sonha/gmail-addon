function buildAddOn(e) {
    var accessToken = e.messageMetadata.accessToken;
    GmailApp.setCurrentMessageAccessToken(accessToken);

    var messageId = e.messageMetadata.messageId;
    var senderData = extractSenderData(messageId);
    var emailContent = getEmailContent(messageId);

    var cards = [];

    cards.push(createWidgetNewTask(emailContent));
    cards.push(createWidgetSearch());

//  if (senderData.recents.length > 0) {
//    senderData.recents.forEach(function(threadData) {
//      cards.push(buildRecentThreadCard(senderData.email, threadData));
//    });
//  } else {
//    cards.push(CardService.newCardBuilder()
//      .setHeader(CardService.newCardHeader()
//        .setTitle('No recent threads from this sender')).build());
//  }

    return cards;
}