/*
 * Copyright (c) 1999-2004 TWinSoft sarl. All Rights Reserved.
 *
 * The copyright to the computer  program(s) herein  is the property
 * of TWinSoft sarl.
 * The program(s) may  be used  and/or copied  only with the written
 * permission  of TWinSoft  sarl or in accordance with the terms and
 * conditions  stipulated  in the agreement/contract under which the
 * program(s) have been supplied.
 *
 * TWinSoft  makes  no  representations  or  warranties  about   the
 * suitability of the software, either express or implied, including
 * but  not  limited  to  the implied warranties of merchantability,
 * fitness  for  a particular purpose, or non-infringement. TWinSoft
 * shall  not  be  liable for  any damage  suffered by licensee as a
 * result of using,  modifying or  distributing this software or its
 * derivatives.
 */

/*
 * $Workfile: position.js $
 * $Author: Davidm $
 * $Revision: 1 $
 * $Date: 20/06/06 16:05 $
 */
// JavaScript Document

/**********************/
/* VARIABLES GLOBALES */
/**********************/
if (!document.getElementById && document.all)
    document.getElementById = function (id) {
        return document.all[id];
    };
if (!document.getElementById && document.layer)
    document.getElementById = function (id) {
        return document.layer[id];
    };

var bResize = false;

var objectsResizabled = [];
var nbElementRezisabled = 0;

var originalFontSize = [];
var nbFontSize = 0;

function ElementRezisabled() {
    this.X = 0;
    this.width = 0;
    this.Y = 0;
    this.height = 0;
    this.obj = null;
}

function getOriginalFontSize() {
    originalFontSize = [];
    nbFontSize = 0;
    if (!document.styleSheets) return;
    for (var i = 0; i < document.styleSheets.length; i++) {
        var rules = document.styleSheets[i].rules ? document.styleSheets[i].rules : document.styleSheets[i].cssRules; // (IE 4+) : (Netscape 6)
        if (!rules) return;
        for (var j = 0; j < rules.length; j++)
            if (rules[j].style && rules[j].style.fontSize) originalFontSize[nbFontSize++] = rules[j].style.fontSize;
    }
}

/************************************************/
/* calcule les positions initiales des objets   */
/* les valeurs sont stock? dans les tableaux    */
/* positionX et positionY                       */
/* les indices correspondent ?'ordre donn?      */
/* par le navigateur avec les ?ments suivants   */
/* SPAN, INPUT, DIV, SELECT, BUTTON, TABLE, A   */
/************************************************/
function getPositions() {
    bResize = (document.getElementById("resize").value == "true") ? true : false;
    if (!bResize) return;

    var type = ["SPAN", "INPUT", "TD", "DIV", "SELECT", "BUTTON", "TABLE", "A", "IMG"];

    objectsResizabled = [];
    nbElementRezisabled = 0;
    var mydocument = document.getElementById("generated_page");
    for (var j = 0; type[j]; j++) {
        var elt = mydocument.getElementsByTagName(type[j]);
        for (var i = 0; elt[i]; i++) {
            objectsResizabled[nbElementRezisabled] = new ElementRezisabled();
            objectsResizabled[nbElementRezisabled].obj = elt[i];
            objectsResizabled[nbElementRezisabled].X = elt[i].style.left;
            objectsResizabled[nbElementRezisabled].Y = elt[i].style.top;
            objectsResizabled[nbElementRezisabled].width = elt[i].style.width;
            objectsResizabled[nbElementRezisabled].height = elt[i].style.height;
            nbElementRezisabled++;
        }
    }
}

/************************************************************************/
/* positionne les contr? en fonction de la taille de la fen?e      */
/* positionne la taille de la police en fonction de celle de la fen?e */
/************************************************************************/
function resize() {
    if (!bResize) return;

    var sWidth = parseInt(document.getElementById("screenWidth").value);
    var sHeight = parseInt(document.getElementById("screenHeight").value);
    var ex_coefx = parseInt(document.getElementById("coefx").value);
    var ex_coefy = parseInt(document.getElementById("coefy").value);
    var offsetx = parseInt(document.getElementById("offsetx").value);
    var offsetr = parseInt(document.getElementById("offsetr").value);
    var offsety = parseInt(document.getElementById("offsety").value);
    var scrollwidth = parseInt(document.getElementById("scrollwidth").value);

    var winW;
    var winH;
    var coefx;
    var coefy;
    var scaleX = 1;
    var scaleY = 1;

    if (document.body) winW = document.body.clientWidth - document.body.scrollLeft;
    else winW = window.innerWidth;
    winH = window.innerHeight;



    /************************************************************************/
    /* fonction resize : changement de taille selon taille écran */
    /************************************************************************/

    var currentPage;
    var optionInput;






    /************************************************************************/
    /* fonction resize : winW > 1370 px
    /************************************************************************/
    if (winW > 1370) {

        //window.status = "Colonnes="+sWidth+" Lignes="+sHeight+" scaleX="+scaleX+" scaleY="+scaleY;
        //         console.log(offsetx +"HO");
        //      console.log(coefx + "   /   " + coefy);
        //         console.log(coefy);
        //    console.log(scaleX + "  /  " + scaleY);
        //         console.log(scaleY);
        //console.log(winW + " / " + winH);

        for (var i = 0; objectsResizabled[i]; i++) {

            var elt = objectsResizabled[i];

            //  console.log(elt.obj.tagName + "        " + elt.obj.className + "   " + i + "     " + elt.obj.title + "      " + elt.obj.innerText + "          /   ");




            if (i == 8 && elt.obj.innerText == "Sélection - Chantier/Client") {
                currentPage = "Sélection - Chantier/Client";
            }
            if (i == 8 && elt.obj.innerText == "Réservation - Création Inform. Client") {
                currentPage = "Réservation - Création Inform. Client";
            }
            if (i == 9 && (elt.obj.innerText == "Recherche contrat client " || elt.obj.innerText == "Recherche Client en Compte" || elt.obj.innerText == "Gestion des Clients en Compte")) {
                currentPage = "Recherche contrat client";
            }
            if (i == 9 && elt.obj.innerText == "Lettrage Manuel par Client") {
                currentPage = "Recherche contrat client";
                sWidth = 140;
            }
            if ((i == 7 && elt.obj.innerText == "OPÉRATIONS") || (i == 5 && elt.obj.innerText == "Comptabilité Client") || (i == 4 && elt.obj.innerText == "COMPTABILITÉ FOURNISSEURS") || (i == 4 && elt.obj.innerText == "COMPTABILITÉ GÉNÉRALE") || (i == 4 && elt.obj.innerText == "Maintenance des Équipements") || (i == 4 && elt.obj.innerText == "Menu de Mise à Jour") || (i == 4 && elt.obj.innerText == "CLIENTS - OPTIONS SUPPL.") || (i == 8 && elt.obj.innerText == "CLIENTS - OPTIONS SUPPL.")) {
                currentPage = "Menu2colonnes";
                sWidth = 90;
            }

            if (elt.obj.innerText == "Option ou commande") {
                optionInput = true;
            }
            if (i == 5 && elt.obj.innerText == "Select Your Location") {
                currentPage = "Select Your Location";
            }
            if (i == 8 && elt.obj.innerText == "Maintenance équipement") {
                currentPage = "Maintenance équipement";
                sWidth = 105;
            }
            if (i == 0 && elt.obj.innerText == "Display Program Messages") {
                currentPage = "Display Program Messages";
            }
            if (i == 4 && elt.obj.innerText == "Opérations pour les Achats") {
                currentPage = "Opérations pour les Achats";
            }
            if ((i == 0 && elt.obj.innerText == "Work with All Printers") || (i == 8 && elt.obj.innerText == "Mise à Jour des Fichiers")) {
                currentPage = "Work with All Printers";
            }
            if (i == 8 && elt.obj.innerText == "Clients - Recherche Factures") {
                currentPage = "Clients - Recherche Factures";
            }
            if (i == 8 && elt.obj.innerText == "Soumission de Travail - Interrogation " || elt.obj.innerText == "Affichage Contrôle") {
                currentPage = "Soumission de Travail - Interrogation";
            }
            if (i == 8 && (elt.obj.innerText == "Rech. d'équip. par mot clé")) {
                currentPage = "Rech. d'équip. par mot clé";
            }
            if (i == 8 && elt.obj.innerText == "Affichage de Contrat - Information Client ") {
                currentPage = "Affichage de Contrat - Information Client";
            }
            if (i == 8 && elt.obj.innerText == "Affichage de la répartition des camions") {
                currentPage = "Affichage de la répartition des camions";
            }
            if (i == 8 && elt.obj.innerText == "Répartition Camion - Entrée") {
                currentPage = "Répartition Camion - Entrée";

            }











            coefx = ((winW - offsetx - offsetr) / sWidth);
            coefy = ((winH - offsety - offsetr) / sHeight);



            if (coefx > ex_coefx) scaleX = coefx / ex_coefx;
            if (coefy > ex_coefy) scaleY = coefy / ex_coefy;








            /************************************************************************/
            /* fonction resize : changement de taille bloc xml 
            /************************************************************************/

            if ((elt.obj.tagName == "TABLE" && elt.obj.className == "buttontab") || elt.obj.title == "Recherche contrat client" || elt.obj.title == "Open Menu") {
                //   console.log("1/R" + i);
            } else {
                //    console.log("2/NORMAL " + i);
                if (elt.obj.style.top != "" && elt.obj.style.left != "" && elt.Y && elt.X) {
                    elt.obj.style.top = Math.round((parseInt(elt.Y) - offsety) * scaleY + offsety) + "px";
                    elt.obj.style.left = Math.round((parseInt(elt.X) - offsetx) * scaleX + offsetx) + "px";
                }

                if (elt.obj.style.height) elt.obj.style.height = Math.round(parseInt(elt.height) * scaleY) + "px";
                if (elt.obj.style.width) elt.obj.style.width = Math.round(parseInt(elt.width) * scaleX) + "px";

                if (elt.obj.id == "_ScRoLl_") {

                    if (elt.obj.style.width) elt.obj.style.width = Math.round((parseInt(elt.width) - scrollwidth) * scaleX + scrollwidth) + "px";
                }
            }



            /************************************************************************/
            /* fonction resize : cas particulier
            /************************************************************************/

            if (currentPage == "Sélection - Chantier/Client") {

                if (elt.obj.tagName == "DIV") {
                    if (elt.obj.style.top != "" && elt.obj.style.left != "" && elt.Y && elt.X) {
                        elt.obj.style.top = Math.round((parseInt(elt.Y) - offsety) * scaleY + offsety) + "px";
                        elt.obj.style.left = Math.round((parseInt(elt.X) - offsetx) * scaleX + offsetx + 10) + "px";
                    }

                    if (elt.obj.style.height) elt.obj.style.height = Math.round(parseInt(elt.height) * scaleY) + "px";
                    if (elt.obj.style.width) elt.obj.style.width = Math.round(parseInt(elt.width) * scaleX) + "px";

                    if (elt.obj.id == "_ScRoLl_") {

                        if (elt.obj.style.width) elt.obj.style.width = Math.round((parseInt(elt.width) - scrollwidth) * scaleX + scrollwidth) + "px";
                    }

                } else if ((elt.obj.tagName == "TABLE" && elt.obj.className == "buttontab") || elt.obj.title == "Recherche contrat client" || elt.obj.title == "Open Menu") {
                    //   console.log("1/R" + i);
                } else {
                    if (elt.obj.style.top != "" && elt.obj.style.left != "" && elt.Y && elt.X) {
                        elt.obj.style.top = Math.round((parseInt(elt.Y) - offsety) * scaleY + offsety) + "px";
                        elt.obj.style.left = Math.round((parseInt(elt.X) - offsetx) * scaleX + offsetx + 20) + "px";
                    }
                    if (elt.obj.style.height) elt.obj.style.height = Math.round(parseInt(elt.height) * scaleY) + "px";
                    if (elt.obj.style.width) elt.obj.style.width = Math.round(parseInt(elt.width) * scaleX) + "px";

                    if (elt.obj.id == "_ScRoLl_") {

                        if (elt.obj.style.width) elt.obj.style.width = Math.round((parseInt(elt.width) - scrollwidth) * scaleX + scrollwidth) + "px";
                    }
                }

                if (currentPage == "Sélection - Chantier/Client" && elt.obj.tagName == "TD") {

                    if (elt.obj.style.top != "" && elt.obj.style.left != "" && elt.Y && elt.X) {
                        elt.obj.style.top = Math.round((parseInt(elt.Y) - offsety) * scaleY + offsety) + "px";
                        elt.obj.style.left = Math.round((parseInt(elt.X) - offsetx) * scaleX + offsetx) + "px";
                    }
                    if (elt.obj.style.height) elt.obj.style.height = 20 + "px";
                    if (elt.obj.style.width) elt.obj.style.width = Math.round(parseInt(elt.width) * scaleX) + "px";

                    if (elt.obj.id == "_ScRoLl_") {
                        if (elt.obj.style.width) elt.obj.style.width = Math.round((parseInt(elt.width) - scrollwidth) * scaleX + scrollwidth) + "px";
                    }

                }
                if ((elt.obj.innerHTML).indexOf('<img title=\"Page Up\"') != -1) {
                    elt.obj.style.top = 40 + "%";
                    elt.obj.style.left = 95 + "%";
                }

                if ((elt.obj.innerHTML).indexOf('<tbody><tr><td class=') != -1) {
                    elt.obj.style.width = Math.round(parseInt(elt.width) * scaleX) - 200 + "px";
                }
                if ((elt.obj.innerHTML).indexOf('<tbody><tr class=') != -1) {
                    elt.obj.style.width = Math.round(parseInt(elt.width) * scaleX) - 200 + "px";
                }
                if ((elt.obj.innerHTML).indexOf("># Bon de Commande</span>") != -1) {
                    elt.obj.style.left = 20 + "%";
                }


            }

            if (currentPage == "Menu2colonnes") {

                if ((elt.obj.tagName == "TABLE" && elt.obj.className == "buttontab") || elt.obj.title == "Recherche contrat client" || elt.obj.title == "Open Menu") {
                    //   console.log("1/R" + i);
                } else {
                    //    console.log("2/NORMAL " + i);
                    if (elt.obj.style.top != "" && elt.obj.style.left != "" && elt.Y && elt.X) {
                        elt.obj.style.top = Math.round((parseInt(elt.Y) - offsety) * scaleY + offsety) + "px";
                        elt.obj.style.left = Math.round((parseInt(elt.X) - offsetx) * scaleX + offsetx) + 200 + "px";
                    }

                    if (elt.obj.style.height) elt.obj.style.height = Math.round(parseInt(elt.height) * scaleY) + "px";
                    if (elt.obj.style.width) elt.obj.style.width = Math.round(parseInt(elt.width) * scaleX) + "px";

                    if (elt.obj.id == "_ScRoLl_") {

                        if (elt.obj.style.width) elt.obj.style.width = Math.round((parseInt(elt.width) - scrollwidth) * scaleX + scrollwidth) + "px";
                    }
                }

            }
            if (currentPage == "Recherche contrat client" && elt.obj.tagName == "TD") {

                if (elt.obj.style.top != "" && elt.obj.style.left != "" && elt.Y && elt.X) {
                    elt.obj.style.top = Math.round((parseInt(elt.Y) - offsety) * scaleY + offsety) + "px";
                    elt.obj.style.left = Math.round((parseInt(elt.X) - offsetx) * scaleX + offsetx) + "px";
                }
                if (elt.obj.style.height) elt.obj.style.height = 20 + "px";
                if (elt.obj.style.width) elt.obj.style.width = Math.round(parseInt(elt.width) * scaleX) + "px";

                if (elt.obj.id == "_ScRoLl_") {
                    if (elt.obj.style.width) elt.obj.style.width = Math.round((parseInt(elt.width) - scrollwidth) * scaleX + scrollwidth) + "px";
                }

            }

            if (currentPage == "Recherche contrat client" && (elt.obj.innerText == "Faites vos sélections et appuyez sur Entrée pour continuer." || elt.obj.innerText == "Saisissez n° client puis appuyez sur Entrée, ou app. sur F4 pour rechercher.")) {
                elt.obj.style.top = 97 + "%";
            }




            if (optionInput == true && (elt.obj.innerText == "Option ou commande" || elt.obj.innerText == "===>" || (elt.obj.innerHTML).indexOf("<textarea name=") != -1)) {
                elt.obj.style.top = Math.round((parseInt(elt.Y) - offsety) * scaleY + offsety) + 50 + "px";
                elt.obj.style.left = Math.round((parseInt(elt.X) - offsetx) * scaleX + offsetx) + 200 + "px";
            }
            if (currentPage == "Select Your Location") {
                if (elt.obj.innerText == "F3=Quitter" || elt.obj.innerText == "F7=Supprimer valeur par défaut") {
                    elt.obj.style.top = 90 + "%";
                }
                if (elt.obj.innerText == "Saisissez une option et appuyez sur Entrée") {
                    elt.obj.style.top = 95 + "%";
                }

            }



            if (currentPage == "Recherche contrat client" && elt.obj.tagName == "DIV") {

                if (elt.obj.style.top != "" && elt.obj.style.left != "" && elt.Y && elt.X) {
                    elt.obj.style.top = Math.round((parseInt(elt.Y) - offsety) * scaleY + offsety) + "px";
                    elt.obj.style.left = Math.round((parseInt(elt.X) - offsetx) * scaleX + offsetx) + 30 + "px";
                }
                if (elt.obj.style.height) elt.obj.style.height = 20 + "px";
                if (elt.obj.style.width) elt.obj.style.width = Math.round(parseInt(elt.width) * scaleX) + "px";

                if (elt.obj.id == "_ScRoLl_") {
                    if (elt.obj.style.width) elt.obj.style.width = Math.round((parseInt(elt.width) - scrollwidth) * scaleX + scrollwidth) + "px";
                }

            }


            if (currentPage == "Display Program Messages" && (i >= 4 && i <= 15)) {

                if (elt.obj.style.top != "" && elt.obj.style.left != "" && elt.Y && elt.X) {
                    elt.obj.style.top = Math.round((parseInt(elt.Y) - offsety) * scaleY + offsety) + "px";
                    elt.obj.style.left = Math.round((parseInt(elt.X) - offsetx) * scaleX + offsetx) + 300 + "px";
                }
                if (elt.obj.style.height) elt.obj.style.height = 20 + "px";
                if (elt.obj.style.width) elt.obj.style.width = Math.round(parseInt(elt.width) * scaleX) + "px";

                if (elt.obj.id == "_ScRoLl_") {
                    if (elt.obj.style.width) elt.obj.style.width = Math.round((parseInt(elt.width) - scrollwidth) * scaleX + scrollwidth) + "px";
                }

            }

            if (currentPage == "Opérations pour les Achats" && ((elt.obj.tagName == "TABLE" && elt.obj.className == "buttontab") || elt.obj.title == "Recherche contrat client" || elt.obj.title == "Open Menu")) {
                //   console.log("1/R" + i);
            } else if (currentPage == "Opérations pour les Achats" && (i < 8 || i > 35)) {
                //    console.log("2/NORMAL " + i);
                if (elt.obj.style.top != "" && elt.obj.style.left != "" && elt.Y && elt.X) {
                    elt.obj.style.top = Math.round((parseInt(elt.Y) - offsety) * scaleY + offsety) + "px";
                    elt.obj.style.left = Math.round((parseInt(elt.X) - offsetx) * scaleX + offsetx) + 150 + "px";
                }

                if (elt.obj.style.height) elt.obj.style.height = Math.round(parseInt(elt.height) * scaleY) + "px";
                if (elt.obj.style.width) elt.obj.style.width = Math.round(parseInt(elt.width) * scaleX) + "px";

                if (elt.obj.id == "_ScRoLl_") {

                    if (elt.obj.style.width) elt.obj.style.width = Math.round((parseInt(elt.width) - scrollwidth) * scaleX + scrollwidth) + "px";
                }
            }

            if (currentPage == "Work with All Printers" && ((elt.obj.tagName == "TABLE" && elt.obj.className == "buttontab") || elt.obj.title == "Recherche contrat client" || elt.obj.title == "Open Menu")) {
                //   console.log("1/R" + i);
            } else if (currentPage == "Work with All Printers") {
                //    console.log("2/NORMAL " + i);
                if (elt.obj.style.top != "" && elt.obj.style.left != "" && elt.Y && elt.X) {
                    elt.obj.style.top = Math.round((parseInt(elt.Y) - offsety) * scaleY + offsety) + "px";
                    elt.obj.style.left = Math.round((parseInt(elt.X) - offsetx) * scaleX + offsetx) + 180 + "px";
                }

                if (elt.obj.style.height) elt.obj.style.height = Math.round(parseInt(elt.height) * scaleY) + "px";
                if (elt.obj.style.width) elt.obj.style.width = Math.round(parseInt(elt.width) * scaleX) + "px";

                if (elt.obj.id == "_ScRoLl_") {

                    if (elt.obj.style.width) elt.obj.style.width = Math.round((parseInt(elt.width) - scrollwidth) * scaleX + scrollwidth) + "px";
                }
            }

            if (currentPage == "Clients - Recherche Factures" && elt.obj.tagName == "TD") {

                if (elt.obj.style.top != "" && elt.obj.style.left != "" && elt.Y && elt.X) {
                    elt.obj.style.top = Math.round((parseInt(elt.Y) - offsety) * scaleY + offsety) + "px";
                    elt.obj.style.left = Math.round((parseInt(elt.X) - offsetx) * scaleX + offsetx) + "px";
                }
                if (elt.obj.style.height) elt.obj.style.height = 20 + "px";
                if (elt.obj.style.width) elt.obj.style.width = Math.round(parseInt(elt.width) * scaleX) + "px";

                if (elt.obj.id == "_ScRoLl_") {
                    if (elt.obj.style.width) elt.obj.style.width = Math.round((parseInt(elt.width) - scrollwidth) * scaleX + scrollwidth) + "px";
                }

            }
            if (currentPage == "Clients - Recherche Factures") {
                if (elt.obj.style.top != "" && elt.obj.style.left != "" && elt.Y && elt.X) {
                    elt.obj.style.top = Math.round((parseInt(elt.Y) - offsety) * scaleY + offsety - 30) + "px";
                }
                for (var iForDate = 0; iForDate <= 4; iForDate++) {
                    objectsResizabled[iForDate].obj.style.top = Math.round((parseInt(elt.Y) - offsety) * scaleY + offsety - 300) + "px";
                }
            }

            if (currentPage == "Clients - Recherche Factures" && (elt.obj.innerText == "Faire sélections" || elt.obj.innerText == "Field requires numeric characters." || elt.obj.innerText == "More...")) {
                elt.obj.style.top = 97 + "%";
            }


            if (currentPage == "Rech. d'équip. par mot clé" && elt.obj.tagName == "TD") {

                if (elt.obj.style.top != "" && elt.obj.style.left != "" && elt.Y && elt.X) {
                    elt.obj.style.top = Math.round((parseInt(elt.Y) - offsety) * scaleY + offsety) + "px";
                    elt.obj.style.left = Math.round((parseInt(elt.X) - offsetx) * scaleX + offsetx) + "px";
                }
                if (elt.obj.style.height) elt.obj.style.height = 20 + "px";
                if (elt.obj.style.width) elt.obj.style.width = Math.round(parseInt(elt.width) * scaleX) + "px";

                if (elt.obj.id == "_ScRoLl_") {
                    if (elt.obj.style.width) elt.obj.style.width = Math.round((parseInt(elt.width) - scrollwidth) * scaleX + scrollwidth) + "px";
                }




            }
            if (currentPage == "Rech. d'équip. par mot clé") {

                if ((elt.obj.innerHTML).indexOf('<tbody><tr class=') != -1) {
                    elt.obj.style.width = Math.round(parseInt(elt.width) * scaleX) + "px";
                }

                if ((elt.obj.innerHTML).indexOf('<tbody><tr class=') != -1) {
                    elt.obj.style.width = Math.round(parseInt(elt.width) * scaleX) + 60 + "px";

                }
            }


            if (currentPage == "Affichage de Contrat - Information Client" && !(i >= 8 && i <= 11) && elt.obj.tagName !== "TABLE" && elt.obj.tagName !== "IMG" && !(i >= 12 && i <= 39)) {

                if (elt.obj.style.top != "" && elt.obj.style.left != "" && elt.Y && elt.X) {
                    elt.obj.style.top = Math.round((parseInt(elt.Y) - offsety) * scaleY + offsety) + "px";
                    elt.obj.style.left = Math.round((parseInt(elt.X) - offsetx) * scaleX + offsetx) + 200 + "px";
                }
                if (elt.obj.style.height) elt.obj.style.height = Math.round(parseInt(elt.height) * scaleY) + "px";
                if (elt.obj.style.width) elt.obj.style.width = Math.round(parseInt(elt.width) * scaleX) + "px";

                if (elt.obj.id == "_ScRoLl_") {
                    if (elt.obj.style.width) elt.obj.style.width = Math.round((parseInt(elt.width) - scrollwidth) * scaleX + scrollwidth) + "px";
                }

            }

            if (currentPage == "Affichage de Contrat - Information Client") {
                for (var iForDate = 0; iForDate <= 3; iForDate++) {
                    objectsResizabled[iForDate].obj.style.top = 10 + "%";
                    objectsResizabled[iForDate].obj.style.left = 20 + "%";
                }
                for (var iForDate = 4; iForDate <= 7; iForDate++) {
                    objectsResizabled[iForDate].obj.style.top = 10 + "%";
                    objectsResizabled[iForDate].obj.style.left = 28 + "%";
                }
                //                 for (var iForDate = 12; iForDate<=39; iForDate++){
                //                   elt.obj.style.left = Math.round((parseInt(elt.X) - offsetx) * scaleX + offsetx) + "px";
                //               }
            }




            //             if (currentPage == "Rech. d'équip. par mot clé" && i >= 525 && i <= 528) {
            //                 elt.obj.style.backgroundColor = "blue";
            //             if (elt.obj.style.height) elt.obj.style.width = 100 + "%";
            //            }

            if (currentPage == "Affichage de la répartition des camions") {
                if (elt.obj.tagName == "IMG" && elt.obj.className == "imgCalendar") {
                    elt.obj.style.paddingLeft = 20 + "px";
                    elt.obj.style.width = 20 + "px";
                    elt.obj.style.height = 20 + "px";
                }
                if (elt.obj.tagName == "DIV") {
                    if (elt.obj.style.top != "" && elt.obj.style.left != "" && elt.Y && elt.X) {
                        elt.obj.style.top = Math.round((parseInt(elt.Y) - offsety) * scaleY + offsety) + "px";
                        elt.obj.style.left = Math.round((parseInt(elt.X) - offsetx) * scaleX + offsetx + 10) + "px";
                    }

                    if (elt.obj.style.height) elt.obj.style.height = Math.round(parseInt(elt.height) * scaleY) + "px";
                    if (elt.obj.style.width) elt.obj.style.width = Math.round(parseInt(elt.width) * scaleX) + "px";

                    if (elt.obj.id == "_ScRoLl_") {

                        if (elt.obj.style.width) elt.obj.style.width = Math.round((parseInt(elt.width) - scrollwidth) * scaleX + scrollwidth) + "px";
                    }

                } else if ((elt.obj.tagName == "TABLE" && elt.obj.className == "buttontab") || elt.obj.title == "Open Menu") {
                    //   console.log("1/R" + i);
                } else {
                    if (elt.obj.style.top != "" && elt.obj.style.left != "" && elt.Y && elt.X) {
                        elt.obj.style.top = Math.round((parseInt(elt.Y) - offsety) * scaleY + offsety) + "px";
                        elt.obj.style.left = Math.round((parseInt(elt.X) - offsetx) * scaleX + offsetx + 20) + "px";
                    }
                    if (elt.obj.style.height) elt.obj.style.height = Math.round(parseInt(elt.height) * scaleY) / 2 + "px";
                    if (elt.obj.style.width) elt.obj.style.width = Math.round(parseInt(elt.width) * scaleX) + "px";

                    if (elt.obj.id == "_ScRoLl_") {

                        if (elt.obj.style.width) elt.obj.style.width = Math.round((parseInt(elt.width) - scrollwidth) * scaleX + scrollwidth) + "px";
                    }
                }

                if (currentPage == "Affichage de la répartition des camions" && elt.obj.tagName == "TD") {

                    if (elt.obj.style.top != "" && elt.obj.style.left != "" && elt.Y && elt.X) {
                        elt.obj.style.top = Math.round((parseInt(elt.Y) - offsety) * scaleY + offsety) + "px";
                        elt.obj.style.left = Math.round((parseInt(elt.X) - offsetx) * scaleX + offsetx) + "px";
                    }
                    if (elt.obj.style.height) elt.obj.style.height = 20 + "px";
                    if (elt.obj.style.width) elt.obj.style.width = Math.round(parseInt(elt.width) * scaleX) + "px";

                    if (elt.obj.id == "_ScRoLl_") {
                        if (elt.obj.style.width) elt.obj.style.width = Math.round((parseInt(elt.width) - scrollwidth) * scaleX + scrollwidth) + "px";
                    }

                }
                if ((elt.obj.innerHTML).indexOf('<img title=\"Page Up\"') != -1) {
                    elt.obj.style.top = 40 + "%";
                    elt.obj.style.left = 95 + "%";
                }


                if ((elt.obj.innerHTML).indexOf('<tbody><tr><td class=') != -1) {
                    elt.obj.style.width = Math.round(parseInt(elt.width) * scaleX) - 200 + "px";
                }
                if ((elt.obj.innerHTML).indexOf('<tbody><tr class=') != -1) {
                    elt.obj.style.width = Math.round(parseInt(elt.width) * scaleX) - 200 + "px";
                }
                if ((elt.obj.innerHTML).indexOf("># Bon de Commande</span>") != -1) {
                    elt.obj.style.left = 20 + "%";
                }
            }

            if (elt.obj.tagName == "IMG" && elt.obj.className == "imgCalendar") {
                elt.obj.style.paddingLeft = 20 + "px";
                elt.obj.style.width = 20 + "px";
                elt.obj.style.height = 20 + "px";
            }

            if (currentPage == "Répartition Camion - Entrée") {
                elt.obj.style.left = Math.round((parseInt(elt.X) - offsetx) * scaleX + offsetx) * 1.5 + "px";
            }

        }
        /************************************************************************/
        /* fonction resize : changement de taille police */
        /************************************************************************/


        var nbfs = 0;
        if (document.styleSheets && currentPage != "Soumission de Travail - Interrogation") {
            for (var i = 0; i < document.styleSheets.length; i++) {
                var rules = document.styleSheets[i].rules ? document.styleSheets[i].rules : document.styleSheets[i].cssRules; // (IE 4+) : (Netscape 6)
                if (rules)
                    for (var j = 0; j < rules.length; j++)
                        if (rules[j].style && rules[j].style.fontSize) rules[j].style.fontSize = Math.round(parseInt(originalFontSize[nbfs++]) + 2) + "pt";
            }

        } else {
            for (var i = 0; i < document.styleSheets.length; i++) {
                var rules = document.styleSheets[i].rules ? document.styleSheets[i].rules : document.styleSheets[i].cssRules; // (IE 4+) : (Netscape 6)
                if (rules)
                    for (var j = 0; j < rules.length; j++)
                        if (rules[j].style && rules[j].style.fontSize) rules[j].style.fontSize = Math.round(parseInt(originalFontSize[nbfs++])) - 2 + "pt";
            }
        }



    }



    /************************************************************************/
    /* fonction resize : winW < 1370 px   ThinkPad
    /************************************************************************/
    if (winW < 1370) {

        //window.status = "Colonnes="+sWidth+" Lignes="+sHeight+" scaleX="+scaleX+" scaleY="+scaleY;
        //         console.log(offsetx +"HO");
        //      console.log(coefx + "   /   " + coefy);
        //         console.log(coefy);
        //    console.log(scaleX + "  /  " + scaleY);
        //         console.log(scaleY);
        //  console.log(winW + " / " + winH);

        for (var i = 0; objectsResizabled[i]; i++) {

            var elt = objectsResizabled[i];
            //   console.log(elt.obj.tagName + "        " + elt.obj.className + "   " + i + "     " + elt.obj.title + "      " + elt.obj.innerText + "          /   ");

            if (i == 8 && elt.obj.innerText == "Sélection - Chantier/Client") {
                currentPage = "Sélection - Chantier/Client";
            }
            if (i == 8 && elt.obj.innerText == "Réservation - Création Inform. Client") {
                currentPage = "Réservation - Création Inform. Client";
            }
            if (i == 9 && (elt.obj.innerText == "Recherche contrat client " || elt.obj.innerText == "Recherche Client en Compte" || elt.obj.innerText == "Gestion des Clients en Compte")) {
                currentPage = "Recherche contrat client";
            }
            if ((i == 7 && elt.obj.innerText == "OPÉRATIONS") || (i == 5 && elt.obj.innerText == "Comptabilité Client") || (i == 4 && elt.obj.innerText == "COMPTABILITÉ FOURNISSEURS") || (i == 4 && elt.obj.innerText == "COMPTABILITÉ GÉNÉRALE") || (i == 4 && elt.obj.innerText == "Maintenance des Équipements") || (i == 4 && elt.obj.innerText == "Menu de Mise à Jour") || (i == 4 && elt.obj.innerText == "CLIENTS - OPTIONS SUPPL.")) {
                currentPage = "Menu2colonnes";
                sWidth = 90;
            }
            if (elt.obj.innerText == "Option ou commande") {
                optionInput = true;
            }
            if (i == 5 && elt.obj.innerText == "Select Your Location") {
                currentPage = "Select Your Location";
            }
            if (i == 8 && elt.obj.innerText == "Maintenance équipement") {
                currentPage = "Maintenance équipement";
                sWidth = 112;
            }
            if (i == 0 && elt.obj.innerText == "Display Program Messages") {
                currentPage = "Display Program Messages";
            }
            if (i == 4 && elt.obj.innerText == "Opérations pour les Achats") {
                currentPage = "Opérations pour les Achats";
            }
            if ((i == 0 && elt.obj.innerText == "Work with All Printers") || (i == 8 && elt.obj.innerText == "Mise à Jour des Fichiers")) {
                currentPage = "Work with All Printers";
            }
            if (i == 8 && elt.obj.innerText == "Clients - Recherche Factures") {
                currentPage = "Clients - Recherche Factures";
            }
            if (i == 8 && elt.obj.innerText == "Soumission de Travail - Interrogation " || elt.obj.innerText == "Affichage Contrôle" || elt.obj.innerText == "Fiche Équipement - Recherche") {
                currentPage = "Soumission de Travail - Interrogation";
            }
            if (i == 8 && (elt.obj.innerText == "Rech. d'équip. par mot clé")) {
                currentPage = "Rech. d'équip. par mot clé";
            }

            if (i == 8 && elt.obj.innerText == "Affichage de Contrat - Information Client ") {
                currentPage = "Affichage de Contrat - Information Client";
            }
            if (i == 8 && elt.obj.innerText == "Affichage de la répartition des camions") {
                currentPage = "Affichage de la répartition des camions";
            }
            if (i == 8 && elt.obj.innerText == "Répartition Camion - Entrée") {
                currentPage = "Répartition Camion - Entrée";
            }


            coefx = ((winW - offsetx - offsetr) / sWidth);
            coefy = ((winH - offsety - offsetr) / sHeight);



            if (coefx > ex_coefx) scaleX = coefx / ex_coefx;
            if (coefy > ex_coefy) scaleY = coefy / ex_coefy;








            /************************************************************************/
            /* fonction resize : changement de taille bloc xml 
            /************************************************************************/

            if ((elt.obj.tagName == "TABLE" && elt.obj.className == "buttontab") || elt.obj.title == "Recherche contrat client" || elt.obj.title == "Open Menu") {
                //   console.log("1/R" + i);
            } else {
                //    console.log("2/NORMAL " + i);
                if (elt.obj.style.top != "" && elt.obj.style.left != "" && elt.Y && elt.X) {
                    elt.obj.style.top = Math.round((parseInt(elt.Y) - offsety) * scaleY + offsety) + "px";
                    elt.obj.style.left = Math.round((parseInt(elt.X) - offsetx) * scaleX + offsetx) + "px";
                }

                if (elt.obj.style.height) elt.obj.style.height = Math.round(parseInt(elt.height) * scaleY) + "px";
                if (elt.obj.style.width) elt.obj.style.width = Math.round(parseInt(elt.width) * scaleX) + "px";

                if (elt.obj.id == "_ScRoLl_") {

                    if (elt.obj.style.width) elt.obj.style.width = Math.round((parseInt(elt.width) - scrollwidth) * scaleX + scrollwidth) + "px";
                }
            }



            /************************************************************************/
            /* fonction resize : cas particulier
            /************************************************************************/

            if (currentPage == "Sélection - Chantier/Client") {

                if (elt.obj.tagName == "DIV") {
                    if (elt.obj.style.top != "" && elt.obj.style.left != "" && elt.Y && elt.X) {
                        elt.obj.style.top = Math.round((parseInt(elt.Y) - offsety) * scaleY + offsety) + "px";
                        elt.obj.style.left = Math.round((parseInt(elt.X) - offsetx) * scaleX + offsetx + 10) + "px";
                    }

                    if (elt.obj.style.height) elt.obj.style.height = Math.round(parseInt(elt.height) * scaleY) + "px";
                    if (elt.obj.style.width) elt.obj.style.width = Math.round(parseInt(elt.width) * scaleX) + "px";

                    if (elt.obj.id == "_ScRoLl_") {

                        if (elt.obj.style.width) elt.obj.style.width = Math.round((parseInt(elt.width) - scrollwidth) * scaleX + scrollwidth) + "px";
                    }

                } else if ((elt.obj.tagName == "TABLE" && elt.obj.className == "buttontab") || elt.obj.title == "Recherche contrat client" || elt.obj.title == "Open Menu") {
                    //   console.log("1/R" + i);
                } else {
                    if (elt.obj.style.top != "" && elt.obj.style.left != "" && elt.Y && elt.X) {
                        elt.obj.style.top = Math.round((parseInt(elt.Y) - offsety) * scaleY + offsety) + "px";
                        elt.obj.style.left = Math.round((parseInt(elt.X) - offsetx) * scaleX + offsetx + 20) + "px";
                    }
                    if (elt.obj.style.height) elt.obj.style.height = Math.round(parseInt(elt.height) * scaleY) + "px";
                    if (elt.obj.style.width) elt.obj.style.width = Math.round(parseInt(elt.width) * scaleX) + "px";

                    if (elt.obj.id == "_ScRoLl_") {

                        if (elt.obj.style.width) elt.obj.style.width = Math.round((parseInt(elt.width) - scrollwidth) * scaleX + scrollwidth) + "px";
                    }
                }

                if ((elt.obj.innerHTML).indexOf('<img title=\"Page Up\"') != -1) {
                    elt.obj.style.top = 90 + "%";
                    elt.obj.style.left = 90 + "%";
                }

                if (currentPage == "Sélection - Chantier/Client" && elt.obj.tagName == "TD") {

                    if (elt.obj.style.top != "" && elt.obj.style.left != "" && elt.Y && elt.X) {
                        elt.obj.style.top = Math.round((parseInt(elt.Y) - offsety) * scaleY + offsety) + "px";
                        elt.obj.style.left = Math.round((parseInt(elt.X) - offsetx) * scaleX + offsetx) + "px";
                    }
                    if (elt.obj.style.height) elt.obj.style.height = 20 + "px";
                    if (elt.obj.style.width) elt.obj.style.width = Math.round(parseInt(elt.width) * scaleX) + "px";

                    if (elt.obj.id == "_ScRoLl_") {
                        if (elt.obj.style.width) elt.obj.style.width = Math.round((parseInt(elt.width) - scrollwidth) * scaleX + scrollwidth) + "px";
                    }

                }

                if ((elt.obj.innerHTML).indexOf('<img title=\"Page Up\"') != -1) {
                    elt.obj.style.top = 40 + "%";
                    elt.obj.style.left = 95 + "%";
                }

                if ((elt.obj.innerHTML).indexOf('<tbody><tr><td class=') != -1) {
                    elt.obj.style.width = Math.round(parseInt(elt.width) * scaleX) - 200 + "px";
                }
                if ((elt.obj.innerHTML).indexOf('<tbody><tr class=') != -1) {
                    elt.obj.style.width = Math.round(parseInt(elt.width) * scaleX) - 200 + "px";
                }
                if ((elt.obj.innerHTML).indexOf("># Bon de Commande</span>") != -1) {
                    elt.obj.style.left = 20 + "%";
                }
            }

            if (currentPage == "Menu2colonnes") {

                if ((elt.obj.tagName == "TABLE" && elt.obj.className == "buttontab") || elt.obj.title == "Recherche contrat client" || elt.obj.title == "Open Menu") {
                    //   console.log("1/R" + i);
                } else {
                    //    console.log("2/NORMAL " + i);
                    if (elt.obj.style.top != "" && elt.obj.style.left != "" && elt.Y && elt.X) {
                        elt.obj.style.top = Math.round((parseInt(elt.Y) - offsety) * scaleY + offsety) + "px";
                        elt.obj.style.left = Math.round((parseInt(elt.X) - offsetx) * scaleX + offsetx) + 200 + "px";
                    }

                    if (elt.obj.style.height) elt.obj.style.height = Math.round(parseInt(elt.height) * scaleY) + "px";
                    if (elt.obj.style.width) elt.obj.style.width = Math.round(parseInt(elt.width) * scaleX) + "px";

                    if (elt.obj.id == "_ScRoLl_") {

                        if (elt.obj.style.width) elt.obj.style.width = Math.round((parseInt(elt.width) - scrollwidth) * scaleX + scrollwidth) + "px";
                    }
                }

            }
            if (currentPage == "Recherche contrat client" && elt.obj.tagName == "TD") {

                if (elt.obj.style.top != "" && elt.obj.style.left != "" && elt.Y && elt.X) {
                    elt.obj.style.top = Math.round((parseInt(elt.Y) - offsety) * scaleY + offsety) + "px";
                    elt.obj.style.left = Math.round((parseInt(elt.X) - offsetx) * scaleX + offsetx) + "px";
                }
                if (elt.obj.style.height) elt.obj.style.height = 20 + "px";
                if (elt.obj.style.width) elt.obj.style.width = Math.round(parseInt(elt.width) * scaleX) + "px";

                if (elt.obj.id == "_ScRoLl_") {
                    if (elt.obj.style.width) elt.obj.style.width = Math.round((parseInt(elt.width) - scrollwidth) * scaleX + scrollwidth) + "px";
                }

            }

            if (currentPage == "Recherche contrat client" && (elt.obj.innerText == "Faites vos sélections et appuyez sur Entrée pour continuer." || elt.obj.innerText == "Saisissez n° client puis appuyez sur Entrée, ou app. sur F4 pour rechercher.")) {
                elt.obj.style.top = 97 + "%";
            }




            if (optionInput == true && (elt.obj.innerText == "Option ou commande" || elt.obj.innerText == "===>" || (elt.obj.innerHTML).indexOf("<textarea name=") != -1)) {
                elt.obj.style.top = Math.round((parseInt(elt.Y) - offsety) * scaleY + offsety) + 50 + "px";
                elt.obj.style.left = Math.round((parseInt(elt.X) - offsetx) * scaleX + offsetx) + 200 + "px";
            }
            if (currentPage == "Select Your Location") {
                if (elt.obj.style.top != "" && elt.obj.style.left != "" && elt.Y && elt.X) {
                    elt.obj.style.top = Math.round((parseInt(elt.Y) - offsety) * scaleY + offsety) + "px";
                    elt.obj.style.left = Math.round((parseInt(elt.X) - offsetx) * scaleX + offsetx) + "px";
                }
                if (elt.obj.style.height) elt.obj.style.height = 20 + "px";
                if (elt.obj.style.width) elt.obj.style.width = Math.round(parseInt(elt.width) * scaleX) + "px";

                if (elt.obj.id == "_ScRoLl_") {
                    if (elt.obj.style.width) elt.obj.style.width = Math.round((parseInt(elt.width) - scrollwidth) * scaleX + scrollwidth) + "px";
                }
                if (currentPage == "Select Your Location") {
                    if (elt.obj.innerText == "F3=Quitter" || elt.obj.innerText == "F7=Supprimer valeur par défaut") {
                        elt.obj.style.top = 90 + "%";
                    }
                    if (elt.obj.innerText == "Saisissez une option et appuyez sur Entrée") {
                        elt.obj.style.top = 95 + "%";
                    }

                }
            }

            if (currentPage == "Recherche contrat client" && elt.obj.tagName == "DIV") {

                if (elt.obj.style.top != "" && elt.obj.style.left != "" && elt.Y && elt.X) {
                    elt.obj.style.top = Math.round((parseInt(elt.Y) - offsety) * scaleY + offsety) + "px";
                    elt.obj.style.left = Math.round((parseInt(elt.X) - offsetx) * scaleX + offsetx) + 25 + "px";
                }
                if (elt.obj.style.height) elt.obj.style.height = 20 + "px";
                if (elt.obj.style.width) elt.obj.style.width = Math.round(parseInt(elt.width) * scaleX) + "px";

                if (elt.obj.id == "_ScRoLl_") {
                    if (elt.obj.style.width) elt.obj.style.width = Math.round((parseInt(elt.width) - scrollwidth) * scaleX + scrollwidth) + "px";
                }

            }

            if (currentPage == "Display Program Messages" && (i >= 4 && i <= 15)) {

                if (elt.obj.style.top != "" && elt.obj.style.left != "" && elt.Y && elt.X) {
                    elt.obj.style.top = Math.round((parseInt(elt.Y) - offsety) * scaleY + offsety) + "px";
                    elt.obj.style.left = Math.round((parseInt(elt.X) - offsetx) * scaleX + offsetx) + 300 + "px";
                }
                if (elt.obj.style.height) elt.obj.style.height = 20 + "px";
                if (elt.obj.style.width) elt.obj.style.width = Math.round(parseInt(elt.width) * scaleX) + "px";

                if (elt.obj.id == "_ScRoLl_") {
                    if (elt.obj.style.width) elt.obj.style.width = Math.round((parseInt(elt.width) - scrollwidth) * scaleX + scrollwidth) + "px";
                }

            }
            if (currentPage == "Opérations pour les Achats" && ((elt.obj.tagName == "TABLE" && elt.obj.className == "buttontab") || elt.obj.title == "Recherche contrat client" || elt.obj.title == "Open Menu")) {
                //   console.log("1/R" + i);
            } else if (currentPage == "Opérations pour les Achats" && (i < 8 || i > 35)) {
                //    console.log("2/NORMAL " + i);
                if (elt.obj.style.top != "" && elt.obj.style.left != "" && elt.Y && elt.X) {
                    elt.obj.style.top = Math.round((parseInt(elt.Y) - offsety) * scaleY + offsety) + "px";
                    elt.obj.style.left = Math.round((parseInt(elt.X) - offsetx) * scaleX + offsetx) + 150 + "px";
                }

                if (elt.obj.style.height) elt.obj.style.height = Math.round(parseInt(elt.height) * scaleY) + "px";
                if (elt.obj.style.width) elt.obj.style.width = Math.round(parseInt(elt.width) * scaleX) + "px";

                if (elt.obj.id == "_ScRoLl_") {

                    if (elt.obj.style.width) elt.obj.style.width = Math.round((parseInt(elt.width) - scrollwidth) * scaleX + scrollwidth) + "px";
                }
            }

            if (currentPage == "Work with All Printers" && ((elt.obj.tagName == "TABLE" && elt.obj.className == "buttontab") || elt.obj.title == "Recherche contrat client" || elt.obj.title == "Open Menu")) {
                //   console.log("1/R" + i);
            } else if (currentPage == "Work with All Printers") {
                //    console.log("2/NORMAL " + i);
                if (elt.obj.style.top != "" && elt.obj.style.left != "" && elt.Y && elt.X) {
                    elt.obj.style.top = Math.round((parseInt(elt.Y) - offsety) * scaleY + offsety) + "px";
                    elt.obj.style.left = Math.round((parseInt(elt.X) - offsetx) * scaleX + offsetx) + 180 + "px";
                }

                if (elt.obj.style.height) elt.obj.style.height = Math.round(parseInt(elt.height) * scaleY) + "px";
                if (elt.obj.style.width) elt.obj.style.width = Math.round(parseInt(elt.width) * scaleX) + "px";

                if (elt.obj.id == "_ScRoLl_") {

                    if (elt.obj.style.width) elt.obj.style.width = Math.round((parseInt(elt.width) - scrollwidth) * scaleX + scrollwidth) + "px";
                }
            }

            if (currentPage == "Clients - Recherche Factures" && elt.obj.tagName == "TD") {

                if (elt.obj.style.top != "" && elt.obj.style.left != "" && elt.Y && elt.X) {
                    elt.obj.style.top = Math.round((parseInt(elt.Y) - offsety) * scaleY + offsety) + "px";
                    elt.obj.style.left = Math.round((parseInt(elt.X) - offsetx) * scaleX + offsetx) + "px";
                }
                if (elt.obj.style.height) elt.obj.style.height = 20 + "px";
                if (elt.obj.style.width) elt.obj.style.width = Math.round(parseInt(elt.width) * scaleX) + "px";

                if (elt.obj.id == "_ScRoLl_") {
                    if (elt.obj.style.width) elt.obj.style.width = Math.round((parseInt(elt.width) - scrollwidth) * scaleX + scrollwidth) + "px";
                }

            }
            if (currentPage == "Clients - Recherche Factures") {
                if (elt.obj.style.top != "" && elt.obj.style.left != "" && elt.Y && elt.X) {
                    elt.obj.style.top = Math.round((parseInt(elt.Y) - offsety) * scaleY + offsety - 30) + "px";
                }
                for (var iForDate = 0; iForDate <= 4; iForDate++) {
                    objectsResizabled[iForDate].obj.style.top = Math.round((parseInt(elt.Y) - offsety) * scaleY + offsety - 300) + "px";
                }
            }

            if (currentPage == "Clients - Recherche Factures" && (elt.obj.innerText == "Faire sélections" || elt.obj.innerText == "Field requires numeric characters." || elt.obj.innerText == "More...")) {
                elt.obj.style.top = 97 + "%";
            }

            if (currentPage == "Rech. d'équip. par mot clé" && elt.obj.tagName == "TD") {

                if (elt.obj.style.top != "" && elt.obj.style.left != "" && elt.Y && elt.X) {
                    elt.obj.style.top = Math.round((parseInt(elt.Y) - offsety) * scaleY + offsety) + "px";
                    elt.obj.style.left = Math.round((parseInt(elt.X) - offsetx) * scaleX + offsetx) + "px";
                }
                if (elt.obj.style.height) elt.obj.style.height = 20 + "px";
                if (elt.obj.style.width) elt.obj.style.width = Math.round(parseInt(elt.width) * scaleX) + "px";

                if (elt.obj.id == "_ScRoLl_") {
                    if (elt.obj.style.width) elt.obj.style.width = Math.round((parseInt(elt.width) - scrollwidth) * scaleX + scrollwidth) + "px";
                }

            }
            if (currentPage == "Rech. d'équip. par mot clé") {

                if ((elt.obj.innerHTML).indexOf('<tbody><tr class=') != -1) {
                    elt.obj.style.width = Math.round(parseInt(elt.width) * scaleX) + "px";
                }

                if ((elt.obj.innerHTML).indexOf('<tbody><tr class=') != -1) {
                    elt.obj.style.width = Math.round(parseInt(elt.width) * scaleX) + 60 + "px";

                }
            }

            if (currentPage == "Affichage de Contrat - Information Client" && !(i >= 8 && i <= 11) && elt.obj.tagName !== "TABLE" && elt.obj.tagName !== "IMG" && !(i >= 12 && i <= 39)) {

                if (elt.obj.style.top != "" && elt.obj.style.left != "" && elt.Y && elt.X) {
                    elt.obj.style.top = Math.round((parseInt(elt.Y) - offsety) * scaleY + offsety) + "px";
                    elt.obj.style.left = Math.round((parseInt(elt.X) - offsetx) * scaleX + offsetx) + 200 + "px";
                }
                if (elt.obj.style.height) elt.obj.style.height = Math.round(parseInt(elt.height) * scaleY) + "px";
                if (elt.obj.style.width) elt.obj.style.width = Math.round(parseInt(elt.width) * scaleX) + "px";

                if (elt.obj.id == "_ScRoLl_") {
                    if (elt.obj.style.width) elt.obj.style.width = Math.round((parseInt(elt.width) - scrollwidth) * scaleX + scrollwidth) + "px";
                }

            }

            if (currentPage == "Affichage de Contrat - Information Client") {
                for (var iForDate = 0; iForDate <= 3; iForDate++) {
                    objectsResizabled[iForDate].obj.style.top = 10 + "%";
                    objectsResizabled[iForDate].obj.style.left = 20 + "%";
                }
                for (var iForDate = 4; iForDate <= 7; iForDate++) {
                    objectsResizabled[iForDate].obj.style.top = 10 + "%";
                    objectsResizabled[iForDate].obj.style.left = 28 + "%";
                }
                //                 for (var iForDate = 12; iForDate<=39; iForDate++){
                //                   elt.obj.style.left = Math.round((parseInt(elt.X) - offsetx) * scaleX + offsetx) + "px";
                //               }
            }

            if (currentPage == "Affichage de la répartition des camions") {
                if (elt.obj.tagName == "IMG" && elt.obj.className == "imgCalendar") {
                    elt.obj.style.paddingLeft = 15 + "px";
                    elt.obj.style.width = 16 + "px";
                    elt.obj.style.height = 16 + "px";
                }
                if (elt.obj.tagName == "DIV") {
                    if (elt.obj.style.top != "" && elt.obj.style.left != "" && elt.Y && elt.X) {
                        elt.obj.style.top = Math.round((parseInt(elt.Y) - offsety) * scaleY + offsety) + "px";
                        elt.obj.style.left = Math.round((parseInt(elt.X) - offsetx) * scaleX + offsetx + 10) + "px";
                    }

                    if (elt.obj.style.height) elt.obj.style.height = Math.round(parseInt(elt.height) * scaleY) + "px";
                    if (elt.obj.style.width) elt.obj.style.width = Math.round(parseInt(elt.width) * scaleX) + "px";

                    if (elt.obj.id == "_ScRoLl_") {

                        if (elt.obj.style.width) elt.obj.style.width = Math.round((parseInt(elt.width) - scrollwidth) * scaleX + scrollwidth) + "px";
                    }

                } else if ((elt.obj.tagName == "TABLE" && elt.obj.className == "buttontab") || elt.obj.title == "Open Menu") {
                    //   console.log("1/R" + i);
                } else {
                    if (elt.obj.style.top != "" && elt.obj.style.left != "" && elt.Y && elt.X) {
                        elt.obj.style.top = Math.round((parseInt(elt.Y) - offsety) * scaleY + offsety) + "px";
                        elt.obj.style.left = Math.round((parseInt(elt.X) - offsetx) * scaleX + offsetx + 20) + "px";
                    }
                    if (elt.obj.style.height) elt.obj.style.height = Math.round(parseInt(elt.height) * scaleY) / 2 + "px";
                    if (elt.obj.style.width) elt.obj.style.width = Math.round(parseInt(elt.width) * scaleX) + "px";

                    if (elt.obj.id == "_ScRoLl_") {

                        if (elt.obj.style.width) elt.obj.style.width = Math.round((parseInt(elt.width) - scrollwidth) * scaleX + scrollwidth) + "px";
                    }
                }

                if (currentPage == "Affichage de la répartition des camions" && elt.obj.tagName == "TD") {

                    if (elt.obj.style.top != "" && elt.obj.style.left != "" && elt.Y && elt.X) {
                        elt.obj.style.top = Math.round((parseInt(elt.Y) - offsety) * scaleY + offsety) + "px";
                        elt.obj.style.left = Math.round((parseInt(elt.X) - offsetx) * scaleX + offsetx) + "px";
                    }
                    if (elt.obj.style.height) elt.obj.style.height = 20 + "px";
                    if (elt.obj.style.width) elt.obj.style.width = Math.round(parseInt(elt.width) * scaleX) + "px";

                    if (elt.obj.id == "_ScRoLl_") {
                        if (elt.obj.style.width) elt.obj.style.width = Math.round((parseInt(elt.width) - scrollwidth) * scaleX + scrollwidth) + "px";
                    }

                }
                if ((elt.obj.innerHTML).indexOf('<img title=\"Page Up\"') != -1) {
                    elt.obj.style.top = 40 + "%";
                    elt.obj.style.left = 95 + "%";
                }


                if ((elt.obj.innerHTML).indexOf('<tbody><tr><td class=') != -1) {
                    elt.obj.style.width = Math.round(parseInt(elt.width) * scaleX) - 200 + "px";
                }
                if ((elt.obj.innerHTML).indexOf('<tbody><tr class=') != -1) {
                    elt.obj.style.width = Math.round(parseInt(elt.width) * scaleX) - 200 + "px";
                }
                if ((elt.obj.innerHTML).indexOf("># Bon de Commande</span>") != -1) {
                    elt.obj.style.left = 20 + "%";
                }

                if (elt.obj.className == "tableText trueColors") {
                    elt.obj.style.fontSize = 11 + "pt";
                }
            }

            if (elt.obj.tagName == "IMG" && elt.obj.className == "imgCalendar") {
                elt.obj.style.paddingLeft = 20 + "px";
                elt.obj.style.width = 16 + "px";
                elt.obj.style.height = 16 + "px";
            }

            if (currentPage == "Répartition Camion - Entrée") {
                elt.obj.style.left = Math.round((parseInt(elt.X) - offsetx) * scaleX + offsetx) * 1.5 + "px";
            }
        }
        /************************************************************************/
        /* fonction resize : changement de taille police */
        /************************************************************************/


        var nbfs = 0;
        if (document.styleSheets && currentPage != "Soumission de Travail - Interrogation") {
            for (var i = 0; i < document.styleSheets.length; i++) {
                var rules = document.styleSheets[i].rules ? document.styleSheets[i].rules : document.styleSheets[i].cssRules; // (IE 4+) : (Netscape 6)
                if (rules)
                    for (var j = 0; j < rules.length; j++)
                        if (rules[j].style && rules[j].style.fontSize) rules[j].style.fontSize = Math.round(parseInt(originalFontSize[nbfs++]) + 1) + "pt";
            }

        } else {
            for (var i = 0; i < document.styleSheets.length; i++) {
                var rules = document.styleSheets[i].rules ? document.styleSheets[i].rules : document.styleSheets[i].cssRules; // (IE 4+) : (Netscape 6)
                if (rules)
                    for (var j = 0; j < rules.length; j++)
                        if (rules[j].style && rules[j].style.fontSize) rules[j].style.fontSize = Math.round(parseInt(originalFontSize[nbfs++])) - 4 + "pt";
            }
        }



    }





}