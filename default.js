function extractSenderData(messageId) {
    // Use the Gmail service to access information about this message.
    var mail = GmailApp.getMessageById(messageId);
    var threadId = mail.getThread().getId();
    var senderEmail = extractEmailAddress(mail.getFrom());

    var recentThreads = GmailApp.search('from:' + senderEmail);
    var recents = [];

    // Retrieve information about up to 5 recent threads from the same sender.
    recentThreads.slice(0,MAX_THREADS).forEach(function(thread) {
        if (thread.getId() != threadId && ! thread.isInChats()) {
            recents.push({
                'subject': thread.getFirstMessageSubject(),
                'count': thread.getMessageCount(),
                'link': 'https://mail.google.com/mail/u/0/#inbox/' + thread.getId(),
                'lastDate': thread.getLastMessageDate().toDateString()
            });
        }
    });

    var senderData = {
        "email": senderEmail,
        'recents': recents
    };

    return senderData;
}

function getEmailContent(messageId) {
    var mail = GmailApp.getMessageById(messageId);
    Logger.log(mail.get);
    var subject = mail.getSubject();
    var content = mail.getPlainBody();
    var senderData = {
        "subject": subject,
        "content": content
    };
    return senderData;
}

function extractEmailAddress(sender) {
    var regex = /\<([^\@]+\@[^\>]+)\>/;
    var email = sender;  // Default to using the whole string.
    var match = regex.exec(sender);
    if (match) {
        email = match[1];
    }
    return email;
}

function buildRecentThreadCard(senderEmail, threadData) {
    var card = CardService.newCardBuilder();
    card.setHeader(CardService.newCardHeader().setTitle(threadData.subject).setImageStyle(CardService.ImageStyle.SQUARE)
        .setImageUrl(SEARCH_ICON));
    var section = CardService.newCardSection()
        .setHeader("<font color=\"#1257e0\">Recent thread</font>");
    section.addWidget(CardService.newTextParagraph().setText(threadData.subject));
    section.addWidget(CardService.newKeyValue()
        .setTopLabel('Sender')
        .setContent(senderEmail));
    section.addWidget(CardService.newKeyValue()
        .setTopLabel('Number of messages')
        .setContent(threadData.count.toString()));
    section.addWidget(CardService.newKeyValue()
        .setTopLabel('Last updated')
        .setContent(threadData.lastDate.toString()));

    var threadLink = CardService.newOpenLink()
        .setUrl(threadData.link)
        .setOpenAs(CardService.OpenAs.FULL_SIZE);
    var button = CardService.newTextButton()
        .setText('Open Thread')
        .setOpenLink(threadLink);
    section.addWidget(CardService.newButtonSet().addButton(button));

    card.addSection(section);
    return card.build();
}