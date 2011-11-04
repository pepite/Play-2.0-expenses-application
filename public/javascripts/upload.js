

jQuery(document).ready(function() {

    var ffthreesix = (jQuery.browser.mozilla && parseInt(jQuery.browser.version.substring(0, 1)) >= 1 &&
            parseInt(jQuery.browser.version.substring(2, 3)) >= 9 && parseInt(jQuery.browser.version.substring(4, 5)) >= 2 );


    /* HTML 5 -> Safari and Firefox 3.6 */
    jQuery('.attachments').attr('draggable', 'true').bind('dragenter', function(e) {
        jQuery('.attachments').addClass('dragging');
    });
    jQuery('.attachments').bind('dragleave', function(e) {
        jQuery('.attachments').removeClass('dragging');
    });

    // FF 3.6 only
    if (ffthreesix) {
	
        jQuery('.attachments')
                .get(0).addEventListener("dragover", function(event) {
            event.preventDefault();
            event.stopPropagation();

        }, false);

        jQuery('.attachments')
                .get(0).addEventListener("dragenter", function(event) {
            event.preventDefault();
            event.stopPropagation();

        }, false);

        jQuery('.attachments')
                .get(0).addEventListener("drop", function(event) {
	
	
	  	alert("drop");
            event.preventDefault();
            event.stopPropagation();
            jQuery('.attachments').removeClass('dragging');
            jQuery('#loader').show();

            // Ready to do something with the dropped object
            var files = event.dataTransfer.files;
            var fileArray = [];
            var request = new XMLHttpRequest();
            var builder = "";
            var boundary = '------' + (new Date).getTime();
            var dashdash = '--';
            var crlf = '\r\n';

            builder += (dashdash);
            builder += (boundary);
            builder += (crlf);

            for (var i = 0; i < files.length; i++) {

                var file = files[i];

                /* Generate headers. */

                builder += ('Content-Disposition: form-data; name="picture"');
                if (file.name) {
                    builder += ('; filename="' + file.name + '"');
                }
                builder += (crlf);

                builder += ('Content-Type: image/jpeg');
                builder += (crlf);
                builder += (crlf);

                /* Append binary data. */
                builder += (file.getAsBinary());
                builder += (crlf);

                if (i < (files.length - 1)) {
                    /* Write boundary. */
                    builder += (dashdash);
                    builder += (boundary);
                    builder += (crlf);
                }
            }

            /* Mark end of the request. */
            builder += (dashdash);
            builder += (boundary);
            builder += (dashdash);
            builder += (crlf);

            request.onreadystatechange = function() {
                switch (request.readyState) {
                    case 4:
                        //default:
                        /* If we got an error display it. */
                        if (request.responseText) {
                            var matchTag = /<(?:.|\s)*?>/g;
                            var attachmentParts = jQuery('#attachmentParts');
                            var escapedResponse = request.responseText.replace(matchTag, "");

                            var imgs = escapedResponse.split('|');
                            for (var v = 0; v < imgs.length; v++) {
                                if (imgs[v] != '') {
	 								// This is where we construct our thumbnails. It should be a function passed as parameter
                                    var $div = jQuery("<div class='attachments' />");
                                    var $img = jQuery("<img class='attachments' />");
                                    $div.append($img);
                                    $img.attr("src", imgs[v]);
                                    //$("#image-container").empty();
                                    $div.appendTo(".attachments");
                                    var name = imgs[v].replace("/data/", "");
                                    var reg = /-reflection\.png$/;
                                    name = name.replace(reg, "");
                                    //$div.append("<h2><span>" + name + "</span></h2>");
                                    var attachment = jQuery('<input type="hidden" name="picture" />');
                                    attachmentParts.append(attachment);
                                    attachment.attr('value', name);
                                }
                            }
                        }
                        jQuery('#loader').hide();
                        break;
                }
            };
			// TODO: passed as argument
            request.open("POST", "/picture/add");
            request.setRequestHeader('content-type', 'multipart/form-data; boundary=' + boundary);
            request.sendAsBinary(builder);
        }, false);
    }

	// TODO: This should be a parameter
    jQuery('#upload').ajaxForm(
		{
			success: function (wrapper) {

        	var attachmentParts = jQuery('#attachmentParts');

	        var matchTag = /<(?:.|\s)*?>/g;
	        var escapedResponse = wrapper.replace(matchTag, "");
	        var imgs = escapedResponse.split('|');
	        for (var v = 0; v < imgs.length; v++) {
	            if (imgs[v] != '') {
	                var $div = jQuery("<div class='x' />");
	                var $img = jQuery("<img class='x' />");
	                $div.append($img);
	                $img.attr("src", imgs[v]);
	                //$("#image-container").empty();
	                $div.appendTo(".attachments");
	                var name = imgs[v].replace("/data/", "");
	                var reg = /-reflection\.png$/;
	                name = name.replace(reg, "");
	                //$div.append("<h2><span>" + name + "</span></h2>");
	                var attachment = jQuery('<input type="hidden" name="picture" />');
	                attachmentParts.append(attachment);
	                attachment.attr('value', name);
	            }
	        }
        	jQuery('#loader').hide();
    	}
	});

	// TODO: this should be parametrable
    jQuery('#attachments').bind('change', function(e) {
		alert("atta");
        e.preventDefault();
        e.stopPropagation();
        jQuery('.attachments').removeClass('dragging');
        jQuery('#loader').show();
		// TODO: This should be a parameter and could be submitted via ajax
        jQuery('#upload').submit();
    });


    if ((jQuery.browser.mozilla && !ffthreesix) || jQuery.browser.msie) {
        // Google Gears from safari 3.4, 3.5 and IE
        var desktop = google.gears.factory.create('beta.desktop');
        var request = google.gears.factory.create('beta.httprequest');

        /* We cannot use $.bind() since jQuery does not normalize the native events. */
        if (jQuery.browser.mozilla) {
            jQuery('.attachments').attr('draggable', 'true').bind('dragenter', function(e) {
                jQuery('.attachments').addClass('dragging');
            });
            jQuery('.attachments').bind('dragover', function(e) {
                jQuery('.attachments').addClass('dragging');
            });
            jQuery('.attachments').bind('dragleave', function(e) {
                jQuery('.attachments').removeClass('dragging');
            });

            jQuery('.attachments')
                    .get(0)
                    .addEventListener('drop', upload, false);
        } else if (jQuery.browser.msie) {
            jQuery('.attachments').attr('draggable', 'true')
                    .get(0)
                    .attachEvent('ondrop', upload, false);
            jQuery('.attachments').bind('ondragenter', function(e) {
                jQuery('.attachments').addClass('dragging')
            });
            jQuery('.attachments').bind('ondragover', function(e) {
                jQuery('.attachments').addClass('dragging')
            });
            jQuery('.attachments').bind('ondragleave', function(e) {
                jQuery('.attachments').removeClass('dragging')
            });
        }

    }

    function upload(e) {
	alert("upload");
        jQuery('#loader').show();
        jQuery('.attachments').removeClass('dragging');

        var data = desktop.getDragData(e, 'application/x-gears-files');

        var boundary = '------' + (new Date).getTime();
        var dashdash = '--';
        var crlf = '\r\n';

        /* Build RFC2388 string. */
        var builder = google.gears.factory.create('beta.blobbuilder');

        builder.append(dashdash);
        builder.append(boundary);
        builder.append(crlf);

        for (var i in data.files) {

            var file = data.files[i];

            /* Generate headers. */

            builder.append('Content-Disposition: form-data; name="picture"');
            if (file.name) {
                builder.append('; filename="' + file.name + '"');
            }
            builder.append(crlf);

            builder.append('Content-Type: image/jpeg');
            builder.append(crlf);
            builder.append(crlf);

            /* Append binary data. */
            builder.append(file.blob);
            builder.append(crlf);

            if (i < (data.files.length - 1)) {
                /* Write boundary. */
                builder.append(dashdash);
                builder.append(boundary);
                builder.append(crlf);
            }
        }

        /* Mark end of the request. */
        builder.append(dashdash);
        builder.append(boundary);
        builder.append(dashdash);
        builder.append(crlf);

        request.upload.onprogress = function() {
        };

        request.onreadystatechange = function() {
            switch (request.readyState) {
                case 4:
                    //default:
                    /* If we got an error display it. */
                    if (request.responseText) {
                        var matchTag = /<(?:.|\s)*?>/g;
                        var attachmentParts = jQuery('#attachmentParts');
                        var escapedResponse = request.responseText.replace(matchTag, "");
                        var imgs = escapedResponse.split('|');
                        for (var v = 0; v < imgs.length; v++) {
                            if (imgs[v] != '') {
                                var $div = jQuery("<div class='xx' />");
                                var $img = jQuery("<img class='xx' />");
                                $div.append($img);
                                $img.attr("src", imgs[v]);
                                //$("#image-container").empty();
                                $div.appendTo(".attachments");
                                var name = imgs[v].replace("/data/", "");
                                var reg = /-reflection\.png$/;
                                name = name.replace(reg, "");
                                //$div.append("<h2><span>" + name + "</span></h2>");
                                var attachment = jQuery('<input type="hidden" name="picture" />');
                                attachmentParts.append(attachment);
                                attachment.attr('value', name);
                            }
                        }
                    }
                    jQuery('#loader').hide();
                    break;
            }
        };

        /* Use Gears to submit the data. */
        request.open("POST", "/picture/add");
        request.setRequestHeader('content-type', 'multipart/form-data; boundary=' + boundary);
        request.send(builder.getAsBlob());

        if (jQuery.browser.mozilla) {
            e.stopPropagation();
        }

    };

});