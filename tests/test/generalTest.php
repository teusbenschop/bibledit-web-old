<?php
/*
Copyright (©) 2003-2013 Teus Benschop.

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

 
class generalTest extends PHPUnit_Framework_TestCase
{

  public function testGeneralOne()
  {
$first = <<<'EOD'
\c 29
\s Kugadzwa kwevapristi
\p
\v 1 Zvino ichi ndicho chinhu chauchavaitira kuvaita vatsvene, kuti vandishumire pabasa reupristi: Tora nzombe imwe diki; nemakondohwe maviri asina chaanopomerwa,
\v 2 nechingwa chisina kuviriswa, nemakeke asina kuviriswa akakanyiwa nemafuta, nezvingwa zvitete zvisina kuviriswa zvine mafuta; uchazviita neupfu hwakatsetseka hwegorosi.
\v 3 Zvino uchazviisa mudengu rimwe, ugopinda nazvo zviri mudengu, pamwe nenzombe diki nemakondohwe maviri.
\v 4 NaAroni nevanakomana vake uchauya navo kumukova wetende rekusangana, ugovashambidza nemvura;
\v 5 uchatorawo hanzu ugopfekedza Aroni nguvo refu, nejazi reefodhi, neefodhi, nechidzitiro chechipfuva; uye umusunge chiuno nebhanhire reefodhi rakarukwa neumhizha;
\v 6 uisewo ngundu pamusoro wake, nekuisa korona tsvene pangundu.
\v 7 Zvino uchatora mafuta ekuzodza, ugodira pamusoro wake, ugomuzodza.
\v 8 Nevanakomana vake uchavaswededza pedo ugovapfekedza majazi.
\v 9 Uchavasungawo zviuno nebhanhire, Aroni nevanakomana vake, uvasungirire nguwani; uye basa reupristi richava ravo chive chimiso nekusingaperi; uye uchaeresa Aroni nevanakomana vake.
\v 10 Zvino uchauisa nzombe pamberi petende rekusangana, uye Aroni nevanakomana vake vachaisa maoko avo pamusoro pemusoro wenzombe.
\v 11 Zvino uchabaya nzombe pamberi paJehovha pamukova wetende rekusangana.
\v 12 Zvino uchatora ropa renzombe, ugoisa panyanga dzearitari nemunwe wako, ndokudururira ropa rese mujinga memuzasi mearitari:
\v 13 Zvino uchatora mafuta ese anofukidza zvemukati, nebutiro riri pamusoro pechiropa, neitsvo mbiri, nemafuta ari padziri uzvipise pamusoro pearitari.
\v 14 Asi nyama yenzombe, nedehwe rayo, nechizvizvi chayo, uchapisa nemoto kunze kwemisasa; chipiriso chezvivi.
\p
\v 15 Uchatorawo gondohwe rimwe, uye Aroni nevanakomana vake vachaisa maoko avo pamusoro pemusoro wegondohwe,
\v 16 zvino uchauraya gondohwe ndokutora ropa raro ndokusasa kupoteredza aritari.
\v 17 Zvino uchaguranya gondohwe ndokusuka zvemukati zvaro nemakumbo aro ugoisa panhindi dzaro nepamusoro waro.
\v 18 Zvino uchapisa gondohwe rese paaritari; chipiriso chinopiswa kuna Jehovha, hwema hunonhuhwira, chipiriso chinoitirwa Jehovha, nemoto.
\v 19 Zvino uchatora gondohwe rechipiri, uye Aroni nevanakomana vake vagoisa maoko avo pamusoro pemusoro wegondohwe.
\v 20 Ipapo uchauraya gondohwe ndokutora paropa raro, ndokuisa pamucheto wezasi wenzeve yerudyi yaAroni, nepamicheto yezasi yenzeve dzerudyi dzevanakomana vake, nepagunwe reruoko rwerudyi, nepagumwe guru retsoka yavo yerudyi, nekusasawo ropa paaritari kupoteredza.
\v 21 Zvino uchatora paropa riri paaritari nepamafuta ekuzodza ugosasa pamusoro paAroni napanguvo dzake nepamusoro pevanakomana vake, nepanguvo dzevanakomana vake pamwe naye, agoitwa mutsvene iye nenguvo dzake nevanakomana vake nenguvo dzevanakomana vake pamwe naye.
\v 22 Zvino utorewo mamwe mafuta egondohwe, nebemhe raro, namafuta anofukidza ura, namafuta ari pamusoro pechiropa, netsvo mbiri, namafuta ari padziri, nebandauko rorudyi (nokuti igondohwe rokugadza naro),
\v 23 nebundu rimwe rechingwa, nechingwa chimwe chidiki chinamafuta, nechingwa chimwe chitete chinobva mudengu rezvingwa zvisina kuviriswa, zviri pamberi paJehovha.
\v 24 Zvino uzviise zvese pamaoko aAroni napamaoko avanakomana vake, vagozvizunguzira, chive chipo chinozunguzirwa pamberi paJehovha.
\v 25 Zvino uzvibvise pamaoko avo, uzvipise paaritari pamusoro pechipiriso chinopiswa, kuti chive chipo chinonhuhwira pamberi paJehovha; chipiriso chakaitirwa Jehovha pamoto.
\v 26 Utorewo chityu chegondohwe rokugadza naro raAroni, urizunguzire pamberi paJehovha, kuti chive chipo chinozunguzirwa; ndiwo mugove wako.
\v 27 Zvino chityu chinozunguzirwa uchiite chitsvene, nebandauko rechipiriso chinosimudzwa, chinozunguzirwa nekusimudzwa, zvegondohwe rokugadza naro, kuti zvive zvaAroni nezvavanakomana vake.
\v 28 Izvozvo zvinofanira kupiwa Aroni navanakomana vake navana vaIsraeri nokusingaperi nokuti chipiriso chinosimudzwa, chinobva kuvana vaIsraeri pazvibairo zvezvipiriso zvavo zvokuyananisa, chive chipiriso chavo chinosimudzirwa Jehovha.
\p
\v 29 Nguvo dzaAroni dzichava dzavanakomana vake vanomutevera, kuti vazodzwe vakadzipfeka, vagadzwe vakadzipfeka.
\v 30 Mwanakomana wake anopinda paupristi panzvimbo yake, anofanira kudzipfeka mazuva manomwe, kana achipinda mutende rekusangana kushumira panzvimbo tsvene.
\p
\v 31 Zvino unofanira kutora gondohwe rokugadza naro, ubike nyama yaro panzvimbo tsvene.
\v 32 Aroni navanakomana vake ngavadye nyama yegondohwe, nechingwa chiri mudengu pamukova wetende rokusangana.
\v 33 Vanofanira kudya izvozvo zvaiyananiswa nazvo, pakugadzwa nokuitwa vatsvene kwavo; asi mweni ngaarege kuzvidya, nokuti zvitsvene.
\v 34 Kana imwe nyama yokugadza nayo ikasara, kana chimwe chingwa, kusvikira mangwana, unofanira kupisa zvasara nomoto; hazvifaniri kudyiwa, nokuti zvitsvene.
\p
\v 35 Unofanira kuitira Aroni navanakomana vake saizvozvo, zvese sezvandakuraira; uite mazuva manomwe uchivagadza.
\v 36 Zuva rimwe nerimwe unofanira kubaira nzombe yechipiriso chezvivi, chokuyananisa nacho; unofanira kunatsa aritari, kana uchiiyananisira; uizodze kuti uiite tsvene.
\v 37 Unofanira kuita mazuva manomwe pakuyananisira aritari, nokuiita tsvene; kuti aritari ive tsvene kwazvo, uye zvese zvinobata paaritari zvinofanira kuva zvitsvene.
\s Zvibairo zvezuva rimwe nerimwe
\p
\v 38 Zvino ndizvo zvaunofanira kubaira paaritari: Zuva rimwe nerimwe nguva dzese makwayana maviri.
\v 39 Rimwe gwayana unofanira kuribaira mangwanani, rimwe gwayana unofanira kuribaira madekwani.
\v 40 Pamwe chete negwayana rimwe unofanira kuisa chipiriso choupfu hwakatsetseka hwakasvika pachegumi cheefa hwakakanyiwa nechechina chehini yamafuta akasviniwa nechechina chehini yewaini, chive chipiriso chinodururwa.
\v 41 Rimwe gwayana uribaire madekwani, uriitire sezvawakaitira chipiriso choupfu chamangwanani, nezvawakaitira chipiriso charo chinomwiwa, kuti chive chipiriso chinonhuhwira, chipiriso chakaitirwa Jehovha pamoto.
\v 42 Chinofanira kuva chipiriso chinopiswa nguva dzese pamarudzi enyu ese, pamukova wetende rekusangana pamberi paJehovha, pandichasangana nemi, nditaurepo newe.
\v 43 Ndipo pandichasangana nevana vaIsraeri, uye tende richaitwa dzvene nekubwinya kwangu.
\v 44 Tende rokusangana nearitari ndichazviita zvitsvene; uye Aroni navanakomana vake ndichavaita vatsvene, kuti vandishumire pabasa roupristi.
\v 45 Ndichagara pakati pavana vaIsraeri, kuti ndive Mwari wavo.
\v 46 Vachaziva kuti ndini Jehovha wavo, wakavabudisa panyika kuti ndigare pakati pavo; ndini Jehovha Mwari wavo.
EOD;

$second = <<<'EOD'
\c 29
\s Kugadzwa kwevapristi
\p
\v 1 Zvino ichi ndicho chinhu chauchavaitira kuvaita vatsvene, kuti vandishumire pabasa reupristi: Tora nzombe imwe diki; nemakondohwe maviri asina chaanopomerwa,
\v 2 nechingwa chisina kuviriswa, nemakeke asina kuviriswa akakanyiwa nemafuta, nezvingwa zvitete zvisina kuviriswa zvine mafuta; uchazviita neupfu hwakatsetseka hwegorosi.
\v 3 Zvino uchazviisa mudengu rimwe, ugopinda nazvo zviri mudengu, pamwe nenzombe diki nemakondohwe maviri.
\v 4 NaAroni nevanakomana vake uchauya navo kumukova wetende rekusangana, ugovashambidza nemvura;
\v 5 uchatorawo hanzu ugopfekedza Aroni nguvo refu, nejazi reefodhi, neefodhi, nechidzitiro chechipfuva; uye umusunge chiuno nebhanhire reefodhi rakarukwa neumhizha;
\v 6 uisewo ngundu pamusoro wake, nekuisa korona tsvene pangundu.
\v 7 Zvino uchatora mafuta ekuzodza, ugodira pamusoro wake, ugomuzodza.
\v 8 Nevanakomana vake uchavaswededza pedo ugovapfekedza majazi.
\v 9 Uchavasungawo zviuno nebhanhire, Aroni nevanakomana vake, uvasungirire nguwani; uye basa reupristi richava ravo chive chimiso nekusingaperi; uye uchaeresa Aroni nevanakomana vake.
\v 10 Zvino uchauisa nzombe pamberi petende rekusangana, uye Aroni nevanakomana vake vachaisa maoko avo pamusoro pemusoro wenzombe.
\v 11 Zvino uchabaya nzombe pamberi paJehovha pamukova wetende rekusangana.
\v 12 Zvino uchatora ropa renzombe, ugoisa panyanga dzearitari nemunwe wako, ndokudururira ropa rese mujinga memuzasi mearitari:
\v 13 Zvino uchatora mafuta ese anofukidza zvemukati, nebutiro riri pamusoro pechiropa, neitsvo mbiri, nemafuta ari padziri uzvipise pamusoro pearitari.
\v 14 Asi nyama yenzombe, nedehwe rayo, nechizvizvi chayo, uchapisa nemoto kunze kwemisasa; chipiriso chezvivi.
\p
\v 15 Uchatorawo gondohwe rimwe, uye Aroni nevanakomana vake vachaisa maoko avo pamusoro pemusoro wegondohwe,
\v 16 zvino uchauraya gondohwe ndokutora ropa raro ndokusasa kupoteredza aritari.
\v 17 Zvino uchaguranya gondohwe ndokusuka zvemukati zvaro nemakumbo aro ugoisa panhindi dzaro nepamusoro waro.
\v 18 Zvino uchapisa gondohwe rese paaritari; chipiriso chinopiswa kuna Jehovha, hwema hunonhuhwira, chipiriso chinoitirwa Jehovha, nemoto.
\v 19 Zvino uchatora gondohwe rechipiri, uye Aroni nevanakomana vake vagoisa maoko avo pamusoro pemusoro wegondohwe.
\v 20 Ipapo uchauraya gondohwe ndokutora paropa raro, ndokuisa pamucheto wezasi wenzeve yerudyi yaAroni, nepamicheto yezasi yenzeve dzerudyi dzevanakomana vake, nepagunwe reruoko rwerudyi, nepagumwe guru retsoka yavo yerudyi, nekusasawo ropa paaritari kupoteredza.
\v 21 Zvino uchatora paropa riri paaritari nepamafuta ekuzodza ugosasa pamusoro paAroni napanguvo dzake nepamusoro pevanakomana vake, nepanguvo dzevanakomana vake pamwe naye, agoitwa mutsvene iye nenguvo dzake nevanakomana vake nenguvo dzevanakomana vake pamwe naye.
\v 22 Zvino utorewo mamwe mafuta egondohwe, nebemhe raro, namafuta anofukidza ura, namafuta ari pamusoro pechiropa, netsvo mbiri, namafuta ari padziri, nebandauko rorudyi (nokuti igondohwe rokugadza naro),
\v 23 nebundu rimwe rechingwa, nechingwa chimwe chidiki chinamafuta, nechingwa chimwe chitete chinobva mudengu rezvingwa zvisina kuviriswa, zviri pamberi paJehovha.
\v 24 Zvino uzviise zvese pamaoko aAroni napamaoko avanakomana vake, vagozvizunguzira, chive chipo chinozunguzirwa pamberi paJehovha.
\v 25 Zvino uzvibvise pamaoko avo, uzvipise paaritari pamusoro pechipiriso chinopiswa, kuti chive chipo chinonhuhwira pamberi paJehovha; chipiriso chakaitirwa Jehovha pamoto.
\v 26 Utorewo chityu chegondohwe rokugadza naro raAroni, urizunguzire pamberi paJehovha, kuti chive chipo chinozunguzirwa; ndiwo mugove wako.
\v 27 Zvino chityu chinozunguzirwa uchiite chitsvene, nebandauko rechipiriso chinosimudzwa, chinozunguzirwa nekusimudzwa, zvegondohwe rokugadza naro, kuti zvive zvaAroni nezvavanakomana vake.
\v 28 Izvozvo zvinofanira kupiwa Aroni navanakomana vake navana vaIsraeri nokusingaperi nokuti chipiriso chinosimudzwa, chinobva kuvana vaIsraeri pazvibairo zvezvipiriso zvavo zvokuyananisa, chive chipiriso chavo chinosimudzirwa Jehovha.
\p
\v 29 Nguvo dzaAroni dzichava dzavanakomana vake vanomutevera, kuti vazodzwe vakadzipfeka, vagadzwe vakadzipfeka.
\v 30 Mwanakomana wake anopinda paupristi panzvimbo yake, anofanira kudzipfeka mazuva manomwe, kana achipinda mutende rekusangana kushumira panzvimbo tsvene.
\p
\v 31 Zvino unofanira kutora gondohwe rokugadza naro, ubike nyama yaro panzvimbo tsvene.
\v 32 Aroni navanakomana vake ngavadye nyama yegondohwe, nechingwa chiri mudengu pamukova wetende rokusangana.
\v 33 Vanofanira kudya izvozvo zvaiyananiswa nazvo, pakugadzwa nokuitwa vatsvene kwavo; asi mweni ngaarege kuzvidya, nokuti zvitsvene.
\v 34 Kana imwe nyama yokugadza nayo ikasara, kana chimwe chingwa, kusvikira mangwana, unofanira kupisa zvasara nomoto; hazvifaniri kudyiwa, nokuti zvitsvene.
\p
\v 35 Unofanira kuitira Aroni navanakomana vake saizvozvo, zvese sezvandakuraira; uite mazuva manomwe uchivagadza.
\v 36 Zuva rimwe nerimwe unofanira kubaira nzombe yechipiriso chezvivi, chokuyananisa nacho; unofanira kunatsa aritari, kana uchiiyananisira; uizodze kuti uiite tsvene.
\v 37 Unofanira kuita mazuva manomwe pakuyananisira aritari, nokuiita tsvene; kuti aritari ive tsvene kwazvo, uye zvese zvinobata paaritari zvinofanira kuva zvitsvene.
\s Zvibairo zvezuva rimwe nerimwe
\p
\v 38 Zvino ndizvo zvaunofanira kubaira paaritari: Zuva rimwe nerimwe nguva dzese makwayana maviri.
\v 39 Rimwe gwayana unofanira kuribaira mangwanani, rimwe gwayana unofanira kuribaira madekwani.
\v 40 Pamwe chete negwayana rimwe unofanira kuisa chipiriso choupfu hwakatsetseka hwakasvika pachegumi cheefa hwakakanyiwa nechechina chehini yamafuta akasviniwa nechechina chehini yewaini, chive chipiriso chinodururwa.
\v 41 Rimwe gwayana uribaire madekwani, uriitire sezvawakaitira chipiriso choupfu chamangwanani, nezvawakaitira chipiriso charo chinomwiwa, kuti chive chipiriso chinonhuhwira, chipiriso chakaitirwa Jehovha pamoto.
\v 42 Chinofanira kuva chipiriso chinopiswa nguva dzese pamarudzi enyu ese, pamukova wetende rekusangana pamberi paJehovha, pandichasangana nemi, nditaurepo newe.
\v 43 Ndipo pandichasangana nevana vaIsraeri, uye tende richaitwa dzvene nekubwinya kwangu.
\v 44 Tende rokusangana nearitari ndichazviita zvitsvene; uye Aroni navanakomana vake ndichavaita vatsvene, kuti vandishumire pabasa roupristi.
\v 45 Ndichagara pakati pavana vaIsraeri, kuti ndive Mwari wavo.
\v 46 Vachaziva kuti ndini Jehovha wavo, wakavabudisa panyika kuti ndigare pakati pavo; ndini Jehovha Mwari wavo.
EOD;
    similar_text ($first, $second, $percent);
  }


  
}
?>
