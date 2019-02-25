<?php
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


ignore_user_abort (true);
set_time_limit (0);


include ("utils.php");


ob_start ();


require_once ("../database/sqlite.php");
require_once ("../database/sqliteinjection.php");
require_once ("../filter/string.php");
require_once ("../filter/books.php");
require_once ("../filter/numeric.php");
require_once ("../database/books.php");
require_once ("../database/mappings.php");


$database_mappings = Database_Mappings::getInstance ();
$database_mappings->create1 ();
$database_mappings->defaults ();
$database_mappings->create2 ();
$database_mappings->optimize ();


$okay = !ob_get_flush ();


display_header ($okay);
if ($okay) {
  display_okay ();
  display_paragraph ("Verse mappings database okay.");
} else {
  display_paragraph ("Errors creating or upgrading the verse mappings database.");
  open_paragraph ();
  display_link ("mappings1.php", "Retry");
  close_paragraph ();
}
display_footer ();


?>
