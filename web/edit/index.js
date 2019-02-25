/*
Copyright (©) 2003-2014 Teus Benschop.

This program is free software; you can redistribute it and/or modify
it under the terms of the GNU General Public License as published by
the Free Software Foundation; either version 3 of the License, or
(at your option) any later version.
 
This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU General Public License for more details.
  
You should have received a copy of the GNU General Public License
along with this program; if not, write to the Free Software
Foundation, Inc., 51 Franklin Street, Fifth Floor, Boston, MA 02110-1301 USA.
*/


$ (document).ready (function () 
{

  rangy.init ();

  navigationNewPassage ();

  $ ("#editor").on ("paste cut keydown", editorContentChanged);
  $ (window).on ("unload", editorUnload);

  $ ("#editor").on ("focus", editorWindowFocused);

  $ ("#editor").on ("paste", editorPaste);

  editorIdPollerTimeoutStart ();

  $ ("#editor").on ("click", editorCaretChangedByMouse);
  $ ("#editor").on ("keydown", editorCaretChangedByKeyboard);

  $ ("#editor").focus ();

  editorBindUnselectable ();
  $ ("#stylebutton").on ("click", editorStylesButtonHandler);
  $ (window).on ("keydown", editorWindowKeyHandler);

  $ (window).scroll (function () {
    $ ('#editorinnerheader').toggleClass('editorheaderscroll', $ (window).scrollTop () > $ ('#editorheader').offset ().top);
  });
  
  positionCaretViaAjax ();
  
});


/*

Section for the new Passage event from the Navigator.

*/


var editorNavigationBook;
var editorNavigationChapter;
var editorNavigationVerse;


function navigationNewPassage ()
{
  if (typeof navigationBook != 'undefined') {
    editorNavigationBook = navigationBook;
    editorNavigationChapter = navigationChapter;
    editorNavigationVerse = navigationVerse;
  } else if (parent.window.navigationBook != 'undefined') {
    editorNavigationBook = parent.window.navigationBook;
    editorNavigationChapter = parent.window.navigationChapter;
    editorNavigationVerse = parent.window.navigationVerse;
  } else {
    return;
  }

  if ((editorNavigationBook != editorLoadedBook) || (editorNavigationChapter != editorLoadedChapter)) {
    editorSaveChapter ();
    editorLoadChapter (false);
  } else {
    editorScheduleCaretPositioning ();
  }
}


/*

Section for editor load and save.

Notes:
* It remembers the Bible, book, and chapter loaded.
  The reason for remembering these is, among others, that the active Bible / book / chapter
  on the server may change due to user actions, so when saving this chapter to the server,
  it passes the correct Bible / book / chapter to the server along with the updated text.
* While loading the chapter, do not set the "contenteditable" to false, then to true,
  because Google Chrome gets confused then. This was seen on version 33.
  Other types of browsers and other versions were not tested on this behaviour.

*/


var editorLoadedBible;
var editorLoadedBook;
var editorLoadedChapter;
var editorServerText;
var editorTextChanged = false;
var editorCaretPosition = 0;
var editorSaveAsync;


function editorLoadChapter (reload)
{
  editorLoadedBible = navigationBible;
  editorLoadedBook = editorNavigationBook;
  editorLoadedChapter = editorNavigationChapter;
  editorChapterIdOnServer = 0;
  editorCaretPosition = getCaretPosition ();
  editorCaretInitialized = false;
  $.ajax ({
    url: "load.php",
    type: "GET",
    data: { bible: editorLoadedBible, book: editorLoadedBook, chapter: editorLoadedChapter },
    success: function (response) {
      // Checksumming.
      response = checksum_receive (response);
      if (response !== false) {
        // Only load new text when it is different.
        if (response != editorGetHtml ()) {
          $ ("#editor").empty ();
          $ ("#editor").append (response);
          editorStatus (editorChapterLoaded);
        }
        editorServerText = response;
        if (reload) {
          positionCaret (editorCaretPosition);
        } else {
          editorScheduleCaretPositioning ();
        }
      } else {
        // Checksum error: Reload.
        editorLoadChapter (false);
      }
      editorCaretInitialized = false;
    },
  });
}


function editorSaveChapter (sync)
{
  if (!editorWriteAccess) return;
  editorTextChanged = false;
  if (!editorLoadedBible) return;
  if (!editorLoadedBook) return;
  var html = editorGetHtml ();
  if (html == editorServerText) return;
  editorStatus (editorChapterSaving);
  editorServerText = html;
  editorChapterIdOnServer = 0;
  editorIdPollerTimeoutStop ();
  editorSaveAsync = true;
  if (sync) editorSaveAsync = false;
  var checksum = checksum_get (html);
  $.ajax ({
    url: "save.php",
    type: "POST",
    async: editorSaveAsync,
    data: { bible: editorLoadedBible, book: editorLoadedBook, chapter: editorLoadedChapter, html: html, checksum: checksum },
    success: function (response) {
      editorStatus (response);
    },
    error: function (jqXHR, textStatus, errorThrown) {
      editorStatus (editorChapterRetrying);
      editorServerText = "";
      editorContentChanged ();
      if (!editorSaveAsync) editorSaveChapter (true);
    },
    complete: function (xhr, status) {
      editorIdPollerTimeoutStart ();
      editorSaveAsync = true;
    },
  });
}


function editorGetHtml ()
{
  var html = $ ("#editor").html ();
  html = html.replace (' id="focus"', '');
  return html;
}


/*

Portion dealing with triggers for editor's content change.

*/


var editorContentChangedTimeoutId;


function editorContentChanged (event)
{
  if (!editorWriteAccess) return;

  if (event) {
    // Escape key,
    if (event.keyCode == 27) return;
    // Shift / Ctrl / Alt / Alt Gr / Win keys.
    if (event.keyCode == 16) return;
    if (event.keyCode == 17) return;
    if (event.keyCode == 18) return;
    if (event.keyCode == 225) return;
    if (event.keyCode == 91) return;
    // Arrow keys.
    if (event.keyCode == 37) return;
    if (event.keyCode == 38) return;
    if (event.keyCode == 39) return;
    if (event.keyCode == 40) return;
  }

  editorTextChanged = true;
  editorContentChangedTimeoutStart ();
}


function editorContentChangedTimeoutStart ()
{
  if (editorContentChangedTimeoutId) clearTimeout (editorContentChangedTimeoutId);
  editorContentChangedTimeoutId = setTimeout (editorSaveChapter, 1000);
}


function editorUnload ()
{
  editorSaveChapter (true);
}


/*

Section for polling the server for updates on the loaded chapter.

*/


var editorChapterIdOnServer = 0;
var editorChapterIdPollerTimeoutId;


function editorIdPollerTimeoutStart ()
{
  editorIdPollerTimeoutStop ();
  editorChapterIdPollerTimeoutId = setTimeout (editorEditorPollId, 1000);
}


function editorIdPollerTimeoutStop ()
{
  if (editorChapterIdPollerTimeoutId) clearTimeout (editorChapterIdPollerTimeoutId);
}


function editorEditorPollId ()
{
  $.ajax ({
    url: "id.php",
    type: "GET",
    data: { bible: editorLoadedBible, book: editorLoadedBook, chapter: editorLoadedChapter },
    success: function (response) {
      if (editorChapterIdOnServer != 0) {
        if (response != editorChapterIdOnServer) {
          editorLoadChapter (true);
          editorChapterIdOnServer = 0;
        }
      }
      editorChapterIdOnServer = response;
    },
    complete: function (xhr, status) {
      editorIdPollerTimeoutStart ();
    }
  });
}


/*

Section responding to a moved caret.

*/


var editorCaretMovedTimeoutId;
var editorCaretMovedAjaxRequest;
var editorCaretMovedAjaxOffset;
var editorCaretInitialized = false;


function editorCaretChangedByMouse (event)
{
  editorCaretMovedTimeoutStart ();
}


function editorCaretChangedByKeyboard (event)
{
  // Ctrl-G: No action.
  if ((event.ctrlKey == true) && (event.keyCode == 71)) {
    return;
  }

  // Alt / Ctrl / Shift: No action.
  if (event.keyCode == 18) return;
  if (event.keyCode == 17) return;
  if (event.keyCode == 16) return;

  // Work around the phenomenon that in some browsers it gives an extra key code 229.
  if (event.keyCode == 229) return;

  // Do nothing for next/previous verse.
  if (event.altKey) {
    if (event.keyCode == 38) return;
    if (event.keyCode == 40) return;
  }
  
  editorCaretMovedTimeoutStart ();
}


function editorCaretMovedTimeoutStart ()
{
  if (editorCaretMovedTimeoutId) clearTimeout (editorCaretMovedTimeoutId);
  editorCaretMovedTimeoutId = setTimeout (editorHandleCaretMoved, 200);
}


function editorHandleCaretMoved ()
{
  // If the text in the editor has been changed, and therefore not saved,
  // postpone handling the moved caret.
  if (editorTextChanged) {
    editorCaretMovedTimeoutStart ();
    return;
  }
  
  // If the caret has not yet been positioned, postpone the action.
  if (!editorCaretInitialized) {
    editorCaretMovedTimeoutStart ();
    return;
  }

  if ($ ("#editor").is (":focus")) {
    // Cancel any previous ajax request that might still be incompleted.
    // This is to avoid the caret jumping on slower or unstable connections.
    if (editorCaretMovedAjaxRequest && editorCaretMovedAjaxRequest.readystate != 4) {
      editorCaretMovedAjaxRequest.abort();
    }
    // Record the offset of the caret at the start of the ajax request.
    editorCaretMovedAjaxOffset = getCaretPosition ();
    // Initiate a new ajax request.
    editorCaretMovedAjaxRequest = $.ajax ({
      url: "offset.php",
      type: "GET",
      data: { bible: editorLoadedBible, book: editorLoadedBook, chapter: editorLoadedChapter, offset: editorCaretMovedAjaxOffset },
      success: function (response) {
        if (response != "") {
          var offset = getCaretPosition ();
          // Take action only when the caret is still at the same position as it was when this ajax request was initiated.
          if (offset == editorCaretMovedAjaxOffset) {
            // Set the verse correct immediately, rather than waiting on the Navigator signal that likely is later.
            // This fixes a clicking / scrolling problem.
            editorNavigationVerse = response;
            editorScheduleWindowScrolling ();
          } else {
            // Caret was moved during this AJAX operation: Reschedule it.
            editorCaretMovedTimeoutStart ();
          }
        }
      },
      error: function (jqXHR, textStatus, errorThrown) {
        // On (network) failure, reschedule the update.
        editorCaretMovedTimeoutStart ();
      }
    });
  }

  editorActiveStylesFeedback ();
}


/*

Section with window events and their basic handlers.

*/


function editorWindowKeyHandler (event)
{
  if (!editorWriteAccess) return;
  // Ctrl-S: Style.
  if ((event.ctrlKey == true) && (event.keyCode == 83)) {
    editorStylesButtonHandler ();
    return false;
  }
  // Escape.
  if (event.keyCode == 27) {
    editorClearStyles ();
  }
}


function editorWindowFocused ()
{
  editorCaretMovedTimeoutStart ();
}


/*

Section for user interface updates and feedback.

*/


function editorStatus (text)
{
  $ ("#editorstatus").empty ();
  $ ("#editorstatus").append (text);
}


function editorActiveStylesFeedback ()
{
  var editor = $ ("#editor");
  if (editor.is (":focus")) {
    var parent = rangy.getSelection().anchorNode.parentElement;
    parent = $ (parent);
    var paragraph = parent.closest ("p");
    var pname = paragraph.attr ('class');
    var span = parent.closest ("span");
    var cname = span.attr ("class");
    if (cname == undefined) cname = "";
    var element = $ ("#activestyles");
    element.text (pname + " " + cname);
  }
}


/*

Section for getting and setting the caret position.

*/


function getCaretPosition ()
{
  var position = undefined;
  var editor = $ ("#editor");
  if (editor.is (":focus")) {
    var element = editor.get (0);
    position = getCaretCharacterOffsetWithin (element);
  }
  return position;
}


function getCaretCharacterOffsetWithin (element)
{
  var caretOffset = 0;
  if (typeof window.getSelection != "undefined") {
    var range = window.getSelection().getRangeAt(0);
    var preCaretRange = range.cloneRange();
    preCaretRange.selectNodeContents(element);
    preCaretRange.setEnd(range.endContainer, range.endOffset);
    caretOffset = preCaretRange.toString().length;
  } else if (typeof document.selection != "undefined" && document.selection.type != "Control") {
    var textRange = document.selection.createRange();
    var preCaretTextRange = document.body.createTextRange();
    preCaretTextRange.moveToElementText(element);
    preCaretTextRange.setEndPoint("EndToEnd", textRange);
    caretOffset = preCaretTextRange.text.length;
  }
  return caretOffset;
}


function positionCaret (position)
{
  var currentPosition = getCaretPosition ();
  if (currentPosition == undefined) return;
  if (position == undefined) return;
  var selection = rangy.getSelection ();
  selection.move ("character", position - currentPosition);
}


function positionCaretViaAjax ()
{
  $.ajax ({
    url: "focus.php",
    type: "GET",
    data: { bible: editorLoadedBible, book: editorLoadedBook, chapter: editorLoadedChapter },
    success: function (response) {
      if (response != "") {
        response = $.parseJSON (response);
        var start = response ["start"];
        var end = response ["end"];
        var offset = getCaretPosition ();
        if ((offset < start) || (offset > end)) {
          positionCaret (start);
          editorCaretInitialized = true;
        }
      }
      editorScheduleWindowScrolling ();
    },
    error: function (jqXHR, textStatus, errorThrown) {
      // Network error: Reschedule.
      editorScheduleCaretPositioning ();
    },
    complete: function (xhr, status) {
    }
  });
}


/*

Section for scrolling the caret into view.

*/


function editorScrollVerseIntoView ()
{
  $ (".v").each (function (index) {
    var element = $(this);
    var text = element[0].innerText;
    if (text == editorNavigationVerse) {
      element.attr ("id", "focus");
      var offset = element.offset ();
      var verseTop = offset.top;
      var viewportHeight = $(window).height ();
      var scrollTo = verseTop - (viewportHeight / 2);
      var currentScrollTop = $ ("body").scrollTop ();
      var lowerBoundary = currentScrollTop - (viewportHeight / 10);
      var upperBoundary = currentScrollTop + (viewportHeight / 10);
      if ((scrollTo < lowerBoundary) || (scrollTo > upperBoundary)) {
        $ ("body").animate ({ scrollTop: scrollTo }, 500);
      }
    } else {
      if (element.attr ("id") == "focus") {
        element.removeAttr ("id");
      }
    }
  });
  if (editorNavigationVerse == 0) {
    $ ("body").animate ({ scrollTop: scrollTo }, 0);
  }
}


/*

Section for the styles handling.

*/


function editorStylesButtonHandler ()
{
  if (!editorWriteAccess) return;
  $.get ("styles.php", function (response) {
    editorShowResponse (response);
    editorBindUnselectable ();
    dynamicClickHandlers ();
  });
  return false;
}


function editorBindUnselectable ()
{
  var elements = $ (".unselectable");
  elements.off ("mousedown");
  elements.on ("mousedown", function (event) {
    event.preventDefault();
  });
}


function editorShowResponse (response)
{
  if (!editorWriteAccess) return;
  $ ("#stylebutton").hide ();
  $ ("#nostyles").hide ();
  var area = $ ("#stylesarea");
  area.empty ();
  area.append (response);
}


function editorClearStyles ()
{
  var area = $ ("#stylesarea");
  area.empty ();
  $ ("#stylebutton").show ();
  $ ("#nostyles").show ();
}


function dynamicClickHandlers ()
{
  var elements = $ ("#stylesarea > a");
  elements.on ("click", function (event) {
    event.preventDefault();
    editorClearStyles ();
    $ ("#editor").focus ();
    var href = event.currentTarget.href;
    href = href.substring (href.lastIndexOf ('/') + 1);
    if (href == "cancel") return;
    if (href == "all") {
      displayAllStyles ();
    } else {
      requestStyle (href);
    }
  });

  $ ("#styleslist").on ("change", function (event) {
    var selection = $ ("#styleslist option:selected").text ();
    var style = selection.substring (0, selection.indexOf (" "));
    event.preventDefault();
    editorClearStyles ();
    $ ("#editor").focus ();
    requestStyle (style);
  });
}


function requestStyle (style)
{
  $.get ("styles.php?style=" + style, function (response) {
    response = $.parseJSON (response);
    var style = response ["style"];
    var action = response ["action"];
    if (action == "p") {
      applyParagraphStyle (style);
      editorContentChanged ();
    } else if (action == 'c') {
      applyCharacterStyle (style);
      editorContentChanged ();
    } else if (action == 'n') {
      applyNotesStyle (style);
      editorContentChanged ();
    } else if (action == "m") {
      applyMonoStyle (style);
      editorContentChanged ();
    }
  });
}


function displayAllStyles ()
{
  $.get ("styles.php?all=", function (response) {
    editorShowResponse (response);
    editorBindUnselectable ();
    dynamicClickHandlers ();
  });
}


function applyParagraphStyle (style)
{
  if (!editorWriteAccess) return;
  $ ("#editor").focus ();
  var parent = rangy.getSelection().anchorNode.parentElement;
  parent = $ (parent);
  var paragraph = parent.closest ("p");
  paragraph.removeClass ();
  paragraph.addClass (style);
}


function applyCharacterStyle (style)
{
  if (!editorWriteAccess) return;
  $ ("#editor").focus ();
  var cssApplier = rangy.createCssClassApplier (style);
  cssApplier.toggleSelection ();
}


function applyMonoStyle (style)
{
  if (!editorWriteAccess) return;

  $ ("#editor").focus ();

  var parent = rangy.getSelection().anchorNode.parentElement;
  parent = $ (parent);
  var paragraph = parent.closest ("p");

  paragraph.removeClass ();
  paragraph.addClass ("mono");

  var text = paragraph.text ();

  var char = text.substring (0, 1);
  if (char == "\\") {
    text = text.substring (1, 10000);
    var pos = text.indexOf (' ');
    text = text.substring (pos + 1, 10000);
  }
  text = "\\" + style + " " + text;
  paragraph.text (text);
}


/*

Section for the notes.

*/


var editorInsertedNotesCount = 0;


function applyNotesStyle (style)
{
  if (!editorWriteAccess) return;

  $ ("#editor").focus ();

  // Check for / append notes section.
  var notes = $ ("#notes");
  if (notes.length == 0) {
    $ ("#editor").append ('<div id="notes"><hr></div>');
  }

  // Get a new node identifier based on the local time.
  var date = new Date();
  var noteId = date.getTime();

  var caller = (editorInsertedNotesCount % 9) + 1;
  
  // Insert note caller at caret.
  var html = '<a href="#note' + noteId + '" id="citation' + noteId + '" class="superscript">' + caller + '</a>';
  insertHtmlAtCaret (html);
  
  // Append note text to notes section.
  html = '<p class="' + style + '"><a href="#citation' + noteId + '" id="note' + noteId + '">' + caller + '</a><span> </span><span>+ </span><span> </span></p>';
  $ ("#notes").append (html);
  
  editorInsertedNotesCount++;
}


function insertHtmlAtCaret (html) 
{
  var sel, range;
  if (window.getSelection) {
    // IE9 and non-IE
    sel = window.getSelection();
    if (sel.getRangeAt && sel.rangeCount) {
      range = sel.getRangeAt(0);
      range.deleteContents();

      // Range.createContextualFragment() would be useful here but is
      // only relatively recently standardized and is not supported in
      // some browsers (IE9, for one)
      var el = document.createElement("div");
      el.innerHTML = html;
      var frag = document.createDocumentFragment(), node, lastNode;
      while ( (node = el.firstChild) ) {
        lastNode = frag.appendChild(node);
      }
      var firstNode = frag.firstChild;
      range.insertNode(frag);
      
      // Preserve the selection
      if (lastNode) {
        range = range.cloneRange();
        range.setStartAfter(lastNode);
        range.collapse(true);
        sel.removeAllRanges();
        sel.addRange(range);
      }
    }
  } else if ((sel = document.selection) && sel.type != "Control") {
    // IE < 9
    var originalRange = sel.createRange();
    originalRange.collapse(true);
    sel.createRange().pasteHTML(html);
  }
}


/*

Section for the clipboard.

*/


function editorPaste (event)
{
  var data = event.originalEvent.clipboardData.getData ('Text');
  event.preventDefault();
  document.execCommand ("insertHTML", false, data);
}


/*

Caret positioning and subsequent window scrolling.

The purpose of this section is coordinate the two events,
so that caret positioning is done first, 
and window scrolling last.

*/


var editorPositioningTimerId;
var editorPendingCaretPositioning = false;
var editorPendingWindowScrolling = false;


function editorScheduleCaretPositioning ()
{
  editorPendingCaretPositioning = true;
  editorPendingWindowScrolling = false;
  editorPositioningTimerStart ();
}


function editorScheduleWindowScrolling ()
{
  editorPendingWindowScrolling = true;
  editorPositioningTimerStart ();
}


function editorPositioningTimerStart ()
{
  if (editorPositioningTimerId) clearTimeout (editorPositioningTimerId);
  editorPositioningTimerId = setTimeout (editorPositioningRun, 200);
}


function editorPositioningRun ()
{
  if (editorPendingCaretPositioning) {
    positionCaretViaAjax ();
    editorPendingCaretPositioning = false;
    editorPendingWindowScrolling = false;
  }
  if (editorPendingWindowScrolling) {
    editorPendingWindowScrolling = false;
    editorScrollVerseIntoView ();
  }
}


