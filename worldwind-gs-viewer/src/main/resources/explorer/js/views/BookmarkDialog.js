/*
 * The MIT License - http://www.opensource.org/licenses/mit-license
 * Copyright (c) 2017 Bruce Schubert.
 */

/*global WorldWind*/

define(['knockout', 'jquery', 'jquery-growl',
],
        function (ko, $, growl) {
            "use strict";
            /**
             *
             * @constructor
             */
            function BookmarkDialog() {
                var self = this;

                self.bookmark = ko.observable("");

                /**
                 * Opens a dialog used to copy a URL to the clipboard
                 * @param {type} url
                 */
                self.open = function (url) {
                    self.bookmark(url);

                    // Open the  copy-bookmark dialog
                    var $bookmarkDialog = $("#bookmark-dialog");

                    $bookmarkDialog.dialog({
                        autoOpen: false,
                        title: "Bookmark"
                    });
                    $bookmarkDialog.dialog("open");
                };

                /**
                 * Copies the text from the dialogs bookmark-url input element 
                 * to the clipboard
                 */
                self.copyUrlToClipboard = function () {
                    // 
                    var $bookmarkUrl = $("#bookmark-url");
                    $bookmarkUrl.select();

                    try {
                        // Copy the urrent selection to the clipboard
                        var successful = document.execCommand('copy');
                        if (successful) {
                            $.growl({
                                title: "Bookmark Copied",
                                message: "The link was copied to the clipboard"});
                        } else {
                            $.growl.warning({
                                title: "Bookmark Not Copied",
                                message: "The link could not be copied"});

                        }
                    } catch (err) {
                        $.growl.error({
                            title: "Error",
                            message: "Unable to copy link"});
                    }

                };

            }

            return BookmarkDialog;
        }
);