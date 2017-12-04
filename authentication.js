function accessProtectedResource(url, method_opt, headers_opt) {
    var service = getOAuthService();
    var maybeAuthorized = service.hasAccess();

    if (maybeAuthorized) {
        var accessToken = service.getAccessToken();
        var method = method_opt || 'get';
        var headers = headers_opt || {};
        headers['Authorization'] =
            Utilities.formatString('Bearer %s', accessToken);
        var resp = UrlFetchApp.fetch(url, {
            'headers': headers,
            'method' : method,
            'muteHttpExceptions': true, // Prevents thrown HTTP exceptions.
        });

        var code = resp.getResponseCode();
        if (code >= 200 && code < 300) {
            return resp.getContentText("utf-8"); // Success
        } else if (code == 401 || code == 403) {
            maybeAuthorized = false;
        } else {
            console.error("Backend server error (%s): %s", code.toString(),
                resp.getContentText("utf-8"));
            throw ("Backend server error: " + code);
        }
    }

    if (!maybeAuthorized) {
        CardService.newAuthorizationException()
            .setAuthorizationUrl(service.getAuthorizationUrl())
            .setResourceDisplayName("Wework add-on apps")
            .setCustomUiCallback('create3PAuthorizationUi')
            .throwException();
    }
}

function create3PAuthorizationUi() {
    var service = getOAuthService();
    var authUrl = service.getAuthorizationUrl();
    Logger.log(authUrl);
    var promptText = '<ul><li>Wework - </li><li>Giải pháp quản lý công việc, dự án và làm việc với khách hàng</li></ul>.';
    var card = CardService.newCardBuilder()
        .setHeader(
            CardService.newCardHeader()
                .setTitle(' ')
        )
        .addSection(CardService.newCardSection()
            .addWidget(CardService.newImage().setImageUrl(WEWORK_ICON))
            .addWidget(
                CardService.newImage()
                    .setImageUrl(LOGIN_ICON)
                    .setAuthorizationAction(CardService.newAuthorizationAction().setAuthorizationUrl(authUrl))
            )
            .addWidget(
                CardService.newImage()
                    .setImageUrl(SIGNUP_ICON)
                    .setOpenLink(CardService.newOpenLink()
                        .setUrl(REGISTER_URL)
                        .setOpenAs(CardService.OpenAs.FULL_SIZE)
                        .setOnClose(CardService.OnClose.NOTHING)
                    )
            )
        )
        .build();
    return [card];
}



function getOAuthService() {
    return OAuth2.createService('Wework')
        .setAuthorizationBaseUrl(SERVICE_AUTH_URL)
        .setTokenUrl(SERVICE_AUTH_TOKEN_URL)
        .setClientId(CLIENT_ID)
        .setClientSecret(CLIENT_SECRET)
        //.setScope('SERVICE_SCOPE_REQUESTS')
        .setCallbackFunction('authCallback')
        .setCache(CacheService.getUserCache())
        .setPropertyStore(PropertiesService.getUserProperties());
}

function authCallback(callbackRequest) {
    var authorized = getOAuthService().handleCallback(callbackRequest);
    if (authorized) {
        return HtmlService.createHtmlOutput(
            'Success! <script>setTimeout(function() { top.window.close() }, 1);</script>');
    } else {
        return HtmlService.createHtmlOutput('Denied');
    }
}

function resetOAuth() {
    getOAuthService().reset();
}

function get3PAuthorizationUrls() {
    accessProtectedResource("https://api.service3.com/check_logged_in");
}