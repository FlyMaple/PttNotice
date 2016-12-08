function doGet(e) {
	var result = {};
	try {
		var data = e.parameter;
        
		
		MailApp.sendEmail({
			to: "rottensociety1987@gmail.com",
			subject: '¡iPTT¡j' + data.title,
            htmlBody: '<a href="' + data.content + '">click</a>'
        });
	} catch (err) {
		result.error = err;
		result.req = e;
	}
	
	return ContentService.createTextOutput(JSON.stringify(result)).setMimeType(ContentService.MimeType.JSON);
}