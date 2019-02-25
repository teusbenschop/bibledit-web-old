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


$(document).ready(function() {
  changesFocusTimerId = 0;
  updateIdCount ();
  selectEntry ($ ("div[id^='entry']").first ());
  $("body").on ("keydown", keyDown);
  $("div[id^='entry']").on ("click", handleClick);
  navigationSetup ();
});


function keyDown (event) {
  // Down arrow: Go to next entry.
  if (event.keyCode == 40) {
    event.preventDefault ();
    selectEntry (getNextEntry ());
  }
  // Up arrow: Go to previous entry.
  if (event.keyCode == 38) {
    event.preventDefault ();
    selectEntry (getPreviousEntry ());
  }
  // Delete the entry.
  if (event.keyCode == 46) {
    var newEntry = getEntryAfterDelete ();
    removeEntry ();
    selectEntry (newEntry);
  }
  // Right arrow: Expand entry.
  if (event.keyCode == 39) {
    event.preventDefault ();
    expandEntry ();
  }
  // Left arrow: Collapse entry.
  if (event.keyCode == 37) {
    event.preventDefault ();
    collapseEntry ();
  }
}


function handleClick (event) {
  var entry = $(event.currentTarget);

  selectEntry (entry);

  var identifier = entry.attr ("id").substring (5, 100);

  var eventTarget = $(event.target);
  var actionID = eventTarget.attr ("id");
  if (!actionID) return;

  if (actionID == ("remove" + identifier)) {
    var newEntry = getEntryAfterDelete ();
    removeEntry ();
    selectEntry (newEntry);
    event.preventDefault ();
  }

  if (actionID == ("expand" + identifier)) {
    toggleEntry ();
    event.preventDefault ();
  }

  if (actionID.substring (0, 11) == ("unsubscribe")) {
    $.post ("change.php", { unsubscribe:actionID });
    eventTarget.fadeOut ();
    event.preventDefault ();
  }

  if (actionID.substring (0, 8) == ("unassign")) {
    $.post ("change.php", { unassign:actionID });
    eventTarget.fadeOut ();
    event.preventDefault ();
  }

  if (actionID.substring (0, 6) == ("delete")) {
    $.post ("change.php", { delete:actionID });
    eventTarget.parent ().parent ().fadeOut ();
    event.preventDefault ();
  }
}


function getNextEntry () {
  var current = $(".selected");
  if (!current) return undefined;
  var next = current.next ("div");
  if (next.length) return next;
  return current;
}


function getPreviousEntry () {
  var current = $(".selected");
  if (!current) return undefined;
  var prev = current.prev ("div");
  if (prev.length) return prev;
  return current;
}


function getEntryAfterDelete () {
  var current = $(".selected");
  if (!current) return undefined;
  var entry = current.next ("div");
  if (entry.length) return entry;
  entry = current.prev ("div");
  if (entry.length) return entry;
  return undefined;  
}


function selectEntry (entry)
{
  if (entry) {
    $(".selected").removeClass ("selected");
    entry.addClass ("selected");
    var elementOffset = entry.offset ();
    $("body").scrollTop (elementOffset.top + (entry.height () / 2) - ($(window).height () / 2));
    changesFocusTimerStart ();
  }
}


function removeEntry () {
  var identifier = getSelectedIdentifier ();
  if (identifier == 0) return;
  $.post ("changes.php", { remove:identifier });
  $(".selected").remove ();
  updateIdCount ();
}


function updateIdCount () {
  var idCount = $("div[id^='entry']").length;
  $("#count").html (idCount);
}


function expandEntry () {
  // Bail out if nothing has been selected.
  var current = $(".selected");
  if (!current) return;
  // Bail out if the entry is already expanded.
  if ($(".selected > div").length > 0) return;
  // Get the selected identifier.
  var identifier = getSelectedIdentifier ();
  // Get extra information through AJAX calls.
  $(".selected").append ($ ("<div>" + loading + "</div>"));
  $.get ("change.php", { get: identifier }, function (response) {
    $(".selected > div").remove ();
    var extraInfo = $ ("<div>" + response + "</div>");
    $(".selected").append (extraInfo);
    noteClickSetup ();
    var viewportHeight = $(window).height ();
    var infoHeight = extraInfo.height ();
    var infoOffset = extraInfo.offset ();
    $("body").animate({ scrollTop: infoOffset.top + (infoHeight / 2) - (viewportHeight / 2) }, 500);
  });
}


function collapseEntry () {
  $(".selected > div").remove ();
  selectEntry ($(".selected"));
}


function toggleEntry () {
  if ($(".selected > div").length > 0) {
    collapseEntry ();
  } else {
    expandEntry ();
  }
}


function getSelectedIdentifier () {
  var current = $(".selected");
  if (!current) return 0;
  var identifier = current.attr ("id").substring (5, 100);
  return identifier;
}


var changesFocusTimerId;


function changesFocusTimerStart ()
{
  if (changesFocusTimerId) clearTimeout (changesFocusTimerId);
  changesFocusTimerId = setTimeout (changesFocusTimeout, 300);
}


function changesFocusTimeout ()
{
  // Navigate to the passage of the entry.
  var identifier = getSelectedIdentifier ();
  $.post ("changes.php", { navigate: identifier });
}
