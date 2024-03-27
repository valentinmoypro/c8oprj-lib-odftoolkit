CARACTERE_SEPARATION_PARAMETRE = "$";
C8O.vars.log_remote = false;

var $dsp = null;
var $agc = null;
var $cpt = null;
var $ccl = null;
var $sdt = null;
var $edt = null;
var $flt = null;
var $noSat = null;
var $noSun = null;
var pricingDlg = null;
var sendPdfDialg = null; // Ajout JG-2018-01-29 touche entrée sur fenêtre envoi de facture
var bStopKeys = false;
var histoPROSmult = []; //new Array(); // ajout JG-2017-12-06 enregistrement de plusieurs articles dans la table histo
var ligne_catclass = "";
var isPROSRunning = false;
var MenuPlus = false; // ajout JG-2018-01-31 ouvre le menu plus par défaut
var sc = null;
var cx = null;
var cx2 = null;
var refresh_interval = null; // pour le polling lors de l'accusé d'envoi des mails
var popAttente = null;
var KitCat = false;
var $devise = null; // Ajout GV-EN-2023-08-29
var $startTime = null; // Ajout EN-2023-08-30
var $endTime = null; // Ajout EN-2023-08-30
var $duration = 0;
var $threshold_price = 0;
var $target_price = 0;
var $reference_price = 0;
var $final_price = 0;
var $start_date = 0;
var $cat_class = null;
var bForcePros = false;
var eqt_col = "6";

function updatePROSData(el, store) {
	localStorage.setItem(store, el.value);
}

function RollonScroll() {
	var maxWAit = 20;
	var wait = window.setInterval(function () {
		if ($("#_ScRoLl_").length || maxWAit-- < 0) {
			if ($("#_ScRoLl_ table tr").length > 15) {
				$("#_ScRoLl_").on("wheel", function () {
					// console.log("SCROLLING IN THE DEEP!");
					if ($("#_ScRoLl_").scrollTop() + $("#_ScRoLl_").height() >= $("table.data").height()) {
						// console.log("bottom!");
						doAction('KEY_ROLLDOWN');
					}
					if ($("#_ScRoLl_").scrollTop() == 0) {
						// console.log("top!");
						doAction('KEY_ROLLUP');
					}
				});
			}
			clearInterval(wait);
			maxWAit = 20;
		}
	}, 250);
}

$(document).on("help", function (e) {
	return false;
});
$(document).on("click", "#btnQuitter", function () {
	javelin.doAction("KEY_PF3");
});
$(document).on("click", "#Back1", function () {
	doAction("KEY_PF12");
});
$(document).on("click", "#Back2", function () {
	doAction("KEY_PF12");
});
$(document).on("click", "#ShowMenu", function () {
	$("#ShowHideMenu").show();
	$("#ShowMenu").hide();
});
$(document).on("click", "#HideMenu", function () {
	$("#ShowHideMenu").hide();
	$("#ShowMenu").show();
});
/**
 * Add a CLick event on buttons
 */
$(document).on("click", "input[value='=Prendre Credit']", function () {
	C8O.call(".InsertProductInSalesforce", {
		"ID": "XXXX",
		"Label": $("#__field_c17_l12_n1").val().trim()
	});
});

$(document).on("click", "input", function () {
	if ($(this).val().substr(0, 3) == 'F24') { //F24 Plus
		MenuPlus = true;
	}
});

/*
Bouton présent uniquement sur Ecran AS/400 AffichageContratInfoClient.
Appel avec numéro de facture extrait de la classe d'écran.
TODO : Authentification ?
*/
$(document).on("click", "#SendPDF", function () {
	sendPdfDialg = $("#sendPdfDialog").dialog({
		modal: true,
		close: function (event, ui) {
			$("#sendPdfDialog").dialog("destroy");
			sendPdfDialg = null; // fermeture de sendPdfDialog
		},
		buttons: {
			"Envoyer": function () {
				var valid = true;
				$("#sendPdfDialog input").removeClass("ui-state-error");
				if (checkMail($("#sendPdfDialog #expediteur").val())) {
					valid = valid && true;
				} else {
					$("#sendPdfDialog #expediteur").addClass("ui-state-error");
					valid = false;
				}
				if (checkMail($("#sendPdfDialog #dest").val())) {
					valid = valid && true;
				} else {
					$("#sendPdfDialog #dest").addClass("ui-state-error");
					valid = false;
				}
				if (valid) {
					C8O.call(".SendFacture", {
						expediteur: $("#sendPdfDialog #expediteur").val(),
						destinataire: $("#sendPdfDialog #dest").val(),
						object: $("#sendPdfDialog #object").val(),
						body: $("#sendPdfDialog #mbody").val(),
						__context: "SendFacture",
						myContext: C8O._init.params.__context
					});
					sendPdfDialg = null; // fermeture de sendPdfDialog
				}
			}
		}
	});
});

function checkMail(email) {
	return /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/.test(email);
}

function isPriceFormatValid(amount) {
	if (amount == 0 || amount >= 999999999) // ajout JG-2018-03-07 : format invalide si prix =0 ou 999999999 
		return false;
	var sAmount = String(amount);
	var re = /^[0-9]{1,}(\.[0-9]{1,2})?$/;
	return re.test(sAmount);
}

$(document).on("click", "#DisplayPDF", function () {
	C8O.call(".DisplayFacture", {
		__context: "DisplayFacture",
		myContext: C8O._init.params.__context
	});
});

function getHightlightWidget(type, message) {
	var $uiState;
	var $uiIcon;
	if ('alert' == type) {
		$uiState = 'ui-state-error';
		$uiIcon = 'ui-icon-alert';
	} else {
		$uiState = 'ui-state-highlight';
		$uiIcon = 'ui-icon-info';
	}
	var $divWidget = $('<div />').addClass('ui-widget');
	var $divWidgetInner = $('<div />').addClass($uiState).addClass('ui-corner-all');
	var $icon = $('<span />').addClass('ui-icon').addClass($uiIcon);
	var $text = $('<span />').text(message);
	var $p = $('<p />');
	$p.append($icon).append($text);
	$divWidgetInner.append($p);
	$divWidget.append($divWidgetInner);
	return $divWidget;
}

function getPriceBubble(type, title, amount) {
	var $priceBubbleEl = $('<div />')
		.addClass('speech-bubble')
		.addClass(type);

	if (isNaN(amount))
		return $priceBubbleEl;
	var $priceBubbleDtEl = $('<dt />')
		.text(title);
	var $priceBubbleDdEl = $('<dd />')
		.text(Number(amount).toFixed(2));
	var $priceBubbleDlEl = $('<dl />').append($priceBubbleDtEl).append($priceBubbleDdEl);
	$priceBubbleEl
		.append($priceBubbleDlEl);
	return $priceBubbleEl;
}

function removePreviousHighlight() {
	//remove previous error messages
	$('div.ui-widget > div.ui-state-highlight, div.ui-widget > div.ui-state-error ').parent().remove();
}

function getStep(min, max) {
	var $diff = max - min;
	//20 graduations
	var $step = $diff / 20;
	//choose between 0.01, 0.05, 0.1, 0.25, 0.5 and 1
	// step min = 0.01, even if min=max
	if ($step <= 0.025)
		return 0.01;
	if ($step <= 0.075)
		return 0.05;
	if ($step <= 0.175)
		return 0.1;
	if ($step <= 0.375)
		return 0.25;
	if ($step < 1)
		return 0.5;
	//step max = 1
	return 1;
}

function toolbarPROS(fromEl) {
	$('div.tool-container').hide();
	ligne_catclass = fromEl.split("_l")[1];
	var isContrat = false;
	if(sc=="OffreCreationInformEqp_Contrat"){
		isContrat = true;
		eqt_col = "9";
	}else{
		isContrat = false;
		eqt_col = "6";
	}
	var nextCatClass = fromEl.replace("c1", "c"+eqt_col);
	var nextCatClassVal = $("input[name='" + nextCatClass + "']").val();
	cx2 = document.location.search.substring(document.location.search.indexOf("Lox"));
	if (nextCatClassVal != "") {
		if(isContrat){
			execPROS("", nextCatClassVal);
		}else{
			execPROS(nextCatClassVal.slice(0, 3) + "-" + nextCatClassVal.slice(3), "");
		}
	}
}

function execPROS(ctclss, eqpt) {
	$ste = localStorage.getItem(cx + "_ste");
	$agc = localStorage.getItem(cx + "_agc");
	$cpt = localStorage.getItem(cx + "_cpt");
	$sdt = localStorage.getItem(cx + "_sdt");
	$edt = localStorage.getItem(cx + "_edt");
	$startTime = localStorage.getItem(cx + "_startTime"); // Ajout EN-2023-08-30
	$endTime = localStorage.getItem(cx + "_endTime"); // Ajout EN-2023-08-30
	$flt = localStorage.getItem(cx + "_flt");
	$noSat = localStorage.getItem(cx + "_noSat");
	$noSun = localStorage.getItem(cx + "_noSun");
	$devise = localStorage.getItem(cx + "_devise"); // Ajout 28-08-23 GV-EN
	console.log("ste:" + $ste + " agc:" + $agc + " cpt:" + $cpt + " ccl:" + ctclss + " eqpt:" + eqpt + " sdt:" + $sdt + " edt:" + $edt + " startTime:" + $startTime + " endTime:" + $endTime); // Modif EN-2023-08-30 Ajout de startTime et endTime
	
	if (
			$ste && $ste != "" && 
			$agc && $agc != "" && 
			$cpt && $cpt != "" && 
			$sdt && $sdt != "" && 
			$edt && $edt != "" && 
			$noSat && $noSat != "" && 
			$noSun && $noSun != "" &&
			$startTime && $startTime != "" &&
			$endTime && $endTime != "" &&
			$flt && $flt != "" &&
			$devise && $devise != ""
		) {
		// console.log("<<<<<<<<<<<< RELANCE EXECPROS >>>>>>>>>>>>>");
		$("#waitDiv").show();
		bStopKeys = true;
		// modif JG-2018-03-07 :remplacement fenêtre recherche pricing par loader
		isPROSRunning = true;
		$.post('.xml', {
			"societe": $ste,
			"agence": $agc,
			"client": $cpt,
			"catClass": ctclss,
			"equipement": eqpt,
			"startDate": $sdt,
			"endDate": $edt,
			"startTime": $startTime, // Ajout EN-2023-08-30
			"endTime": $endTime, // Ajout EN-2023-08-30
			"EnleveSat": $noSat,
			"EnleveSun": $noSun,
			"facturationLongTerme": $flt,
			"devise": $devise, //ajout 29-08-23 GV-EN
			"__context": "LOX_GET_PRICING",
			"myContext": C8O._init.params.__context,
			"__removeNamespaces": "true",
			"__sequence": "getPROS"
		}, function(xml) {
			isPROSRunning = false;
			C8O._hook("xml_response", xml);
		}, "xml");

		/*C8O.call(".getPROS", {
			"societe": $ste,
			"agence": $agc,
			"client": $cpt,
			"catClass": ctclss,
			"startDate": $sdt,
			"endDate": $edt,
			"startTime": $startTime, // Ajout EN-2023-08-30
			"endTime": $endTime, // Ajout EN-2023-08-30
			"EnleveSat": $noSat,
			"EnleveSun": $noSun,
			"facturationLongTerme": $flt,
			"devise": $devise, //ajout 29-08-23 GV-EN
			"__context": "LOX_GET_PRICING",
			"myContext": C8O._init.params.__context,
			"__removeNamespaces": "true"
		});*/
		return true;
	} else {
		isPROSRunning = false;
		waitdiv_hide();
		window.setTimeout(function () {
			pricingDlg = $("#pricingW").dialog({ //modif JG-2017-19-12 fermeture par F3 ou F12 et non Enter
				closeOnEscape: false,
				open: function (event, ui) {
					bStopKeys = true;
				},
				height: "auto",
				width: 600,
				modal: true,
				buttons: { // TEST JG-2017-12-21 fermer msg PasDeReco avec entrée 
					OK: function () {
						$(this).dialog("close"); //pbclose
						bStopKeys = true;
						pricingDlg = null;
					}
				},
				close: function (event, ui) {
					bStopKeys = false;
					if (pricingDlg != null){
						pricingDlg.dialog("destroy");
					}
					pricingDlg = null;
				}
			});
			$("#pricingW div#contentW").empty().append(getHightlightWidget('alert', "IMPOSSIBLE DE CHERCHER LES RECOMMANDATIONS TARIFAIRES. \nIL MANQUE DES INFORMATIONS."));
			$(".ui-button").hide();
		}, 50);
	}
}

function escapeRegExp(string) {
	return string.replace(/([.*+?^=!:${}()|\[\]\/\\])/g, "\\$1");
}

function replaceAll(string, find, replace) {
	return string.replace(new RegExp(escapeRegExp(find), 'g'), replace);
}

function getLastUpperTier(doc) {
	//Search Last Upper Tier
	for (var x = 1; x <= 10; x++) {
		if (doc.find('Element[name="q_UpperTier' + x + '"]').attr('value') >= 365)
			return x + 1;
	}
}

function doRefresh() {
	var ja = $("#__javelin_action").length;
	if (ja) {
		if (typeof wst != "undefined") {
			window.clearTimeout(wst);
		}
		refresh();
	} else {
		wst = window.setTimeout(doRefresh, 250);
	}
}

C8O.addHook("xml_response", function (xml) {
	if(xml == null){
		//console.log("*** DOCUMENT XML VIDE ***");
		waitdiv_hide();
		return false;
	}
	if(xml.documentURI.indexOf(".xsl") != -1){
		//console.log("*** FICHIER XSL ***");
		return false;
	}
	var $doc = $(xml.documentElement);
	var sq = $doc.attr("sequence");
	var tr = $doc.attr("transaction");
	if(!sq || sq == ""){
		sc = $doc.attr("screenclass");
		cx = $doc.attr("context");
	}
	cx2 = document.location.search.substring(document.location.search.indexOf("Lox"));
	
	if (sq == "InsertProductInSalesforce") {
		// Remove the ScriptLib Wait Div... Not the C8O Lib One
		waitdiv_hide();
		return false;
	}

	if (tr == "XMLize") {
		if (sc == "Ouverture") {
			$("#wrapper").show();
			localStorage.removeItem(cx + "_sys");
			localStorage.removeItem(cx + "_ste");
			localStorage.removeItem(cx + "_agc");
			localStorage.removeItem(cx + "_cpt");
			localStorage.removeItem(cx + "_sdt");
			localStorage.removeItem(cx + "_edt");
			localStorage.removeItem(cx + "_startTime"); // Ajout EN-2023-08-30
			localStorage.removeItem(cx + "_endTime"); // Ajout EN-2023-08-30
			localStorage.removeItem(cx + "_flt");
			localStorage.removeItem(cx + "_noSat");
			localStorage.removeItem(cx + "_noSun");
			localStorage.removeItem(cx + "_ccl");
			localStorage.removeItem(cx + "_oldccl");
			localStorage.removeItem(cx + "_nb_cat_class");
			localStorage.removeItem(cx + "_nb_eqpt");
			localStorage.removeItem(cx + "_devise");
			localStorage.removeItem(cx + "_prevLin");
			localStorage.removeItem("_actionName");
			// Save display pool to show it on Convertigo Style header for support purpose
			$dsp = $.trim($doc.find('display').text());
			if ($dsp && $dsp != "") {
				$(window.parent.document).find("#dsp").text($dsp);
				localStorage.setItem(cx + "_dsp", $dsp);
			}
		} else {
			$("#wrapper").hide();
			$sys = localStorage.getItem(cx + "_sys");
			if ($sys != null) {
				$(window.parent.document).find("#sys").text($sys);
			}
			$ste = localStorage.getItem(cx + "_ste");
			if ($ste != null) {
				$(window.parent.document).find("#ste").text($ste);
			}
			$agc = localStorage.getItem(cx + "_agc");
			if ($agc != null) {
				$(window.parent.document).find("#agc").text($agc);
			}
			$dsp = localStorage.getItem(cx + "_dsp");
			if ($dsp != null) {
				$(window.parent.document).find("#dsp").text($dsp);
			}
		}
	}
	// Smartour pour empêcher d'afficher le message d'alerte deux fois 
	if (tr == "XMLize" && sc == "DefaultScreenClass") {
		SecondeEntree = "";
	}
	if (tr == "XMLize" && sc == "RENTALMAN") {
		$sys = $.trim($doc.find('system').text());
		if ($sys && $sys != "") {
			$(window.parent.document).find("#sys").text($sys);
			localStorage.setItem(cx + "_sys", $sys);
		}
		$ste = $.trim($doc.find('site').text());
		if ($ste && $ste != "") {
			$(window.parent.document).find("#ste").text($ste);
			localStorage.setItem(cx + "_ste", $ste);
		}
		$agc = $.trim($doc.find('agence').text());
		if ($agc && $agc != "") {
			$(window.parent.document).find("#agc").text($agc);
			localStorage.setItem(cx + "_agc", $agc);
		}
	}
	if (tr == "XMLize" && sc.indexOf("CreationInformClient") != -1) {
		$cpt = $.trim($doc.find('compte').text());
		localStorage.setItem(cx + "_cpt", $cpt);
		$sdt = $.trim($doc.find('startDate').text());
		localStorage.setItem(cx + "_sdt", $sdt);
		$edt = $.trim($doc.find('endDate').text());
		localStorage.setItem(cx + "_edt", $edt);
		$startTime = $.trim($doc.find('startTime').text()); // Ajout EN-2023-08-30
		localStorage.setItem(cx + "_startTime", $startTime); // Ajout EN-2023-08-30
		$endTime = $.trim($doc.find('endTime').text()); // Ajout EN-2023-08-30
		localStorage.setItem(cx + "_endTime", $endTime); // Ajout EN-2023-08-30
	}
	
	// GV: 20240326 - Contrat Creation
	if (tr == "XMLize" && sc.indexOf("Contrat_Creation") != -1) {
		$sdt = $.trim($doc.find('startDate').text());
		localStorage.setItem(cx + "_sdt", $sdt);
		$startTime = $.trim($doc.find('startTime').text());
		localStorage.setItem(cx + "_startTime", $startTime);
		$edt = $.trim($doc.find('endDate').text());
		localStorage.setItem(cx + "_edt", $edt);
		$endTime = $.trim($doc.find('endTime').text());
		localStorage.setItem(cx + "_endTime", $endTime);
	}
	
	// GV: 20240326 - Contrat Location
	if (tr == "XMLize" && sc.indexOf("ContratLocation_FR") != -1) {
		$cpt = $.trim($doc.find('compte').text());
		localStorage.setItem(cx + "_cpt", $cpt);
		$edt = $.trim($doc.find('endDate').text());
		localStorage.setItem(cx + "_edt", $edt);
		$endTime = $.trim($doc.find('endTime').text());
		localStorage.setItem(cx + "_endTime", $endTime);
		$devise = $doc.find("devise").text();
		localStorage.setItem(cx + "_devise", $devise);
	}
	
	if (tr == "XMLize" && sc.indexOf("RechercheEquipement_") != -1) {
		bForcePros = true;
	}
	
	if ((sc == "OffreCreationInformEqp" || 
			sc == "OffreCreationInformEqpNotTxDeg" || 
			sc == "ReservationCreationInformEqp"  || 
			sc == "current_catclass")
			&& tr == "XMLize" && bForcePros) {
		bForcePros = false;
		var catclass_list = $doc.find('block[column=6][type=field]:not(block[name^=__field_c6_l2])');
		var nb_catclass = localStorage.getItem(cx + "_nb_cat_class") ? localStorage.getItem(cx + "_nb_cat_class") : 0 ;
		if(catclass_list.length){
			var ccl_vals = catclass_list.filter(i => $(catclass_list[i]).text() != "");
			if(ccl_vals.length > nb_catclass || ccl_vals.length == 6){
				var last_ccl = $(ccl_vals[ccl_vals.length-1]).text();
				if(last_ccl && last_ccl != "" && /^[0-9]+$/.test(last_ccl)){
					ligne_catclass = $(ccl_vals[ccl_vals.length-1]).attr('line');
					localStorage.setItem(cx + "_nb_cat_class", ccl_vals.length);
					execPROS(last_ccl.slice(0, 3) + "-" + last_ccl.slice(3));
					isWaiting = false;
				}
			}
		}
	}
	
	if ((sc == "current_catclass_contrat")
			&& tr == "XMLize" && bForcePros) {
		bForcePros = false;
		var eqpt_list = $doc.find('equipement');
		var nb_eqpt = localStorage.getItem(cx + "_nb_eqpt") ? localStorage.getItem(cx + "_eqpt") : 0 ;
		if(eqpt_list.length){
			var eqpt_vals = eqpt_list.filter(i => $(eqpt_list[i]).text() != "");
			if(eqpt_vals.length > nb_eqpt || eqpt_vals.length == 6){
				var last_eqpt = $(eqpt_vals[eqpt_vals.length-1]).text();
				if(last_eqpt && last_eqpt != "" && /^[0-9]+$/.test(last_eqpt)){
					// GV - 2023-03-27 : Laisser ligne_catclass pour contrat
					ligne_catclass = $(eqpt_vals[eqpt_vals.length-1]).attr('line');
					localStorage.setItem(cx + "_nb_eqpt", eqpt_vals.length);
					execPROS("", last_eqpt);
					isWaiting = false;
				}
			}
		}
	}
	
	//20171114 - GV: Retour appel transaction DB2
	if (sq == "usePROS") {
		waitdiv_hide();
		if ($doc.find("row[CMVAL]").length) {
			// modif JG-2017-12-12 pricing si Y ou ""
			if ($doc.find("row").attr("CMVAL") == "Y" || $doc.find("row").attr("CMVAL") == "" || $doc.find("row").attr("CMVAL") == " " || $doc.find("row").attr("CMVAL") == undefined) {
				bUsePROS = true;
			} else {
				bUsePROS = false;
			}
			localStorage.setItem(cx2 + "_usePROS", bUsePROS);
		}
		isWaiting = false;
		return false;
	}
	if (tr == "XMLize" && sc == "ChoixFacturation") {
		$flt = $doc.find('*[column="53"][line="5"]').text();
		localStorage.setItem(cx + "_flt", $flt);
	}
	if (tr == "XMLize" && sc == "DerogCalculTx") {
		$noSat = $doc.find('*[column="64"][line="3"]').text().trim();
		localStorage.setItem(cx + "_noSat", $noSat);
		$noSun = $doc.find('*[column="64"][line="4"]').text().trim();
		localStorage.setItem(cx + "_noSun", $noSun);
	}
	//! 20170619 : A.DIALLO Reinitialise les variables pourl'appels de PROS
	if (tr == "XMLize" && sc == "OPERATIONS") {
		histoPROSmult = []; // ajout JG-2017-12-07 réinit du tableau des histos
		$cpt = "";
		localStorage.setItem(cx + "_cpt", $cpt);
		localStorage.setItem(cx + "_nb_cat_class", 0);
		localStorage.setItem(cx + "_nb_eqpt", 0);
		bForcePros = false;
	}
		
	if (tr == "XMLize" && (sc == "ReservationCreationInformClient" || sc == "OffreCreationInformClient")) {
		$devise = $doc.find("devise").text();
		localStorage.setItem(cx + "_devise", $devise);
	}
	
	if (tr == "XMLize" && sc == "ChoixKitCatClass") {
		KitCat = true;
	}
	if (tr == "XMLize" && sc == "MessageWE") {
		// console.log("Message WEEK END");
		bStopKeys = false;
	}
	
	if (sq && sq == "getPROS") {
		waitdiv_hide();
		isWaiting = false;
		$("#pricingW div#contentW").empty();
		var $noPROS = $doc.find("noPROS");
		if ($noPROS.length) {
			bStopKeys = false;
			return false;
		}

		var $errors = $doc.find("EvaluationError");
		if ($errors.length) {
			$("#pricingW").dialog({ //modif JG-2017-19-12 fermeture par F3 ou F12 et non Enter
				closeOnEscape: false,
				open: function (event, ui) {
					bStopKeys = true;
				},
				close: function (event, ui) {
					bStopKeys = false;
					$(this).dialog("destroy"); // JG-2018-05-25
					pricingDlg = null;
				},
				height: "auto",
				width: 600,
				modal: true
			});
			$errors.each(function () {
				var $msg = $(this).attr("message");
				if ($msg != null) {
					$("#pricingW div#contentW").append(getHightlightWidget('alert', $msg));
					$(".ui-button").hide();
				}
			});

			return false;
		}
		var $return = $doc.find("EvaluationResult");
		if ($return.length) {
			$duration = Number($doc.find('duration').text());
			$threshold_price = Number($doc.find('threshold_price').text());
			$target_price = Number($doc.find('target_price').text());
			$reference_price = Number($doc.find('reference_price').text());
			$start_date = $doc.find('start_date').text();
			$cat_class = $doc.find('cat_class').text();
			if (
					$reference_price != 0 &&
					$target_price != 0 &&
					$threshold_price != 0
			) {
				
				$sliderInputEl = $('<input />').attr({
					type: 'text',
					name: "input_price",
					value: $reference_price.toFixed(2),
					class: "upper-price"
				});
				$timeSectionContainerEl = $('<div />').addClass('time-section');
				$timeSectionTitle = $('<h2 />').text('Durée de location');
				$timeSectionDayNumber =
				$('<p />')
				.addClass('days-number')
				.append($('<span />').addClass('ui-icon ui-icon-clock'))
				.append($('<span />').text($duration + ' jour(s)'))
				.append($('<span />').html('&nbsp;&nbsp;&nbsp;'))
				.append($('<span />').addClass('ui-icon ui-icon-calendar'))
				.append($('<span />').html('Du&nbsp;' + $sdt + '&nbsp;à&nbsp;' + $startTime + '&nbsp;au&nbsp;' + $edt + '&nbsp;à&nbsp;' + $endTime)); // Modif EN-2023-08-30 Ajout de startTime et endTime

			/*$timeSectionInterval =
				$('<p />')
				.addClass('date-interval')
				.append($('<span />').addClass('ui-icon ui-icon-calendar'))
				.append($('<span />').html('Du&nbsp;&nbsp;' + $sdt + '&nbsp;&nbsp;à&nbsp;&nbsp;' + $startTime + '&nbsp;&nbsp;au&nbsp;&nbsp;' + $edt + '&nbsp;&nbsp;à&nbsp;&nbsp;' + $endTime)); // Modif EN-2023-08-30 Ajout de startTime et endTime
*/
			$timeSectionContainerEl
				.append($timeSectionTitle)
				.append($timeSectionDayNumber)
				/*.append($timeSectionInterval);*/

			$("#pricingW div#contentW").append($timeSectionContainerEl);
			$("#pricingW div#contentW").append($('<hr />'));

			//Price Section
			$priceSectionContainerEl = $('<div />').addClass('price-section');
			$priceSectionTitle = $('<h2 />').text('Négociation des prix');
			$priceSectionInstruction = $('<p />').addClass('instructions').text("Ajustez le prix de l'article à l'aide du curseur ou en saisissant directement un montant dans le champ concerné");

			$priceSectionContainerEl
				.append($priceSectionTitle)
				.append($priceSectionInstruction);

			//Price selection
			$priceSelectionContainerEl = $('<div/>').addClass('price-selection'); //container

			// Prix ref / Prix cible
			$priceInfosContainerEl = $('<div />').addClass('price-infos');
			
			$priceInfosTable = 
				'<table> <tbody> <tr style="vertical-align: bottom;"> <td> <table> <tbody> <tr> <td><span class="ui-icon ui-icon-refprice"></span></td> <td><span>Prix de référence : </span></td> <td><span>'+ $reference_price.toFixed(2) 
				+ '</span></td> </tr> </tbody> </table> </td> <td> <table> <tbody> <tr style="vertical-align: baseline;"> <td><span class="ui-icon ui-icon-targetprice"></span></td> <td><span>Prix seuil : </span></td> <td><span style=" color: green; font-size: 25pt; font-weight: bold; ">'
				+$target_price.toFixed(2)+'</span></td> </tr> </tbody> </table> </td> </tr> </tbody> </table>';

			$priceInfosContainerEl
				.append($priceInfosTable)
			$priceSelectionContainerEl.append($priceInfosContainerEl);

				//Slider
				$sliderWidgetEl = $('<div />').attr('id', 'slider'); //widget

				$sliderFormContainerEl = $('<p/>').addClass('slider-form');
				$sliderInputEl.appendTo($sliderFormContainerEl);
				$priceSelectionContainerEl.append($sliderWidgetEl);
				$priceSelectionContainerEl.append($sliderFormContainerEl);

				//Prix min / Prix max
				$priceMinEl = getPriceBubble('price-min', 'Prix min.', $threshold_price);
				$priceMaxEl = getPriceBubble('price-max', 'Prix de réf.', $reference_price);

				$sliderFormContainerEl.prepend($priceMaxEl).prepend($priceMinEl);
				$priceSectionContainerEl.append($priceSelectionContainerEl);
				$("#pricingW div#contentW").append($priceSectionContainerEl);

				$jQSlider = $sliderWidgetEl.slider({
					min: $threshold_price,
					max: $reference_price,
					value: $reference_price,
					step: getStep($threshold_price, $reference_price),
					slide: function (event, ui) {
						var $input_value = (ui.value + getStep($threshold_price, $reference_price)) > $reference_price ? $reference_price.toFixed(2) : ui.value.toFixed(2);
						$("div.price-selection input[name='input_price']")
							.val($input_value)
							.change();
					}
				});
				if ($sliderWidgetEl.slider("option", "min") == $sliderWidgetEl.slider("option", "max")) {
					$sliderWidgetEl.find('.ui-slider-handle').css('left', '50%');
				}
				// console.log("<<<<<<<<< FOCUS SUR FENETRE PROS !!! >>>>>>>>>>>");
				$(".ui-slider-handle").focus(); //JG-2018-01-05 focus sur Slider à l'ouverture de la fenêtre PROS
				$(document).on("input change", "div.price-selection input[type='text']", function () {
					// Gestion des erreurs
					var $bUnexploitableValue = false;
					var $bOutOfRangeValue = false;

					var $min = $sliderWidgetEl.slider("option", "min");
					var $max = $sliderWidgetEl.slider("option", "max");

					var $inputVal = $(this).val();
					var $bIsPriceFormatValid = isPriceFormatValid($inputVal);
					//Vérifier que la valeur est bien un nb exploitable
					var $sliderVal = $sliderWidgetEl.slider("option", "value");

					$(this).removeClass("error-price lower-price upper-price");
					removePreviousHighlight();
					$(".ui-dialog .ui-dialog-buttonpane button").removeAttr("disabled");

					if (true == $bIsPriceFormatValid) {
						// console.log('Format Valide');
						var $nInputVal = Number($inputVal);
						// Verifier que la valeur est dans le bon intervalle
						if ($nInputVal < $min) {
							$bOutOfRangeValue = true;
							$sliderWidgetEl.find('.ui-slider-handle').css('left', '0%');
							// réactivé par JG-2018-03-015 message si prix < prix min
							$priceSelectionContainerEl.before(getHightlightWidget("info", "Le prix saisi est inférieur au prix minimum")); // JG-2017-11-28-suppression tests devenus inutiles
						}
						if ($nInputVal > $max) {
							$bOutOfRangeValue = true;
							$sliderWidgetEl.find('.ui-slider-handle').css('left', '100%');
						}
						// ajout JG-2018-03-015 message si prix > prix ref
						if ($nInputVal > $reference_price) {
							$priceSelectionContainerEl.before(getHightlightWidget("info", "Le prix saisi est supérieur au prix de référence"));
						}
						// MAJ CSS
						$(this).addClass($nInputVal < $target_price ? "lower-price" : "upper-price");
						
						if (false == $bOutOfRangeValue) {
							$sliderWidgetEl.slider("option", "value", $nInputVal);
						}
						bStopKeys = true;
					} else {
						$(this).addClass("error-price");
						$(".ui-dialog .ui-dialog-buttonpane button").attr("disabled", "disabled");
						$priceSelectionContainerEl.before(getHightlightWidget("alert", "valeur invalide"));
						bStopKeys = false; // desactive la validation si erreur
					}
				});
				//SaveHistoPROS(); 20230912 GV TMP DISABLED // ajout JG-2017-12-22 sauvegarde PROS quand on ferme la fenêtre
				pricingDlg = $("#pricingW").dialog({
					closeOnEscape: false,
					open: function (event, ui) {
						bStopKeys = true;
					},
					height: "auto",
					width: 600,
					modal: true,
					buttons: { // TEST JG-2017-12-21 fermer msg PasDeReco avec entrée 
						Valider: function () {
							$("input[name='input_price']").removeClass("errorFocus");
							//SaveHistoPROS(); 20230912 GV TMP DISABLED // ajout JG-2017-12-22 sauvegarde PROS quand on ferme la fenêtre
							bStopKeys = true;
							$final_price = $("div.price-selection input[name='input_price']").val();
							C8O.call(".setPROS", {
								"ligne": ligne_catclass,
								"new_price": $final_price,
								"duration": $duration,
								"catclass": $cat_class,
								"__context": "LOX_SET_PRICING",
								"myContext": C8O._init.params.__context
							});
						}
					},
					close: function (event, ui) {
						bStopKeys = false;
						// 20171113 - GV: fix, don't throw an error when $sliderWidgetEl is not defined:
						if (typeof ($sliderWidgetEl) != "undefined" && typeof ($sliderWidgetEl.slider("instance")) != "undefined") {
							if (pricingDlg != null){
								pricingDlg.dialog("destroy");
							}
						}
						pricingDlg = null;
					}
				});
			} else {
				$("#pricingW div#contentW").append(getHightlightWidget('alert', "PAS DE RECOMMANDATIONS TARIFAIRES."));
				$(".ui-button").hide();
			}
		}
		return false;
	}
	if (sq && sq == "setPROS") {
		waitdiv_hide();
		isWaiting = false;
		var errMsg = "";
		$("#__signature").val($doc.find("sig").text());
		if (errMsg != "") {
			alert(errMsg);
		} else {
			pricingDlg.dialog("close");
			if (pricingDlg != null){
				pricingDlg.dialog("destroy");
			}
			pricingDlg = null;
			bStopKeys = false;
			// GV 20230926 : Récupération des data en prévision de l'historisation
			if($doc.find("tier").length){
				histoPROSmult.push({
					"sq_type": "tier",
					"SPG_PRODUCT_SEGMENT": $cat_class,
					"GEOGRAPHY": $ste + "-" + $agc,
					"q_LORValue": $duration, 
					"RentalStartDate": $start_date, 
					"q_Floor_Guidance": $threshold_price,
					"q_Target_Guidance": $target_price,
					"q_Expert_Guidance": $reference_price,
					"q_FinalPriceValue": $final_price
					});
			}else if($doc.find("colonne").length){
				histoPROSmult.push({
					"sq_type": "col",
					"SPG_PRODUCT_SEGMENT": $cat_class, 
					"GEOGRAPHY": $ste + "-" + $agc,
					/*"CB_CUSTOMER": $ste + "-" + $cpt,*/
					/*"BILLINGTYPE": $flt,*/
					"CB_LORVALUE": $duration, 
					"RENTALSTARTDATE": $start_date, 
					"CB_FLOOR_GUIDANCE": $threshold_price,
					"CB_TARGET_GUIDANCE": $target_price,
					"CB_EXPERT_GUIDANCE": $reference_price,
					"CB_FINALPRICEVALUE": $final_price
					});
			}
			doRefresh();
		}
		return false;
	}
	// ajout JG-2017-12-01 pour histoPROS
	if (tr == "XMLize" && sc == "CreationRevision") {
		//console.log("Classe d'écran CreationRevision !!!");
		waitdiv_hide();
		var refOffre = $.trim($doc.find('Reference').text());
		var compteur = 1;
		histoPROSmult.forEach(function (data) {
			compteur++;
			window.setTimeout(function () {
				data.NUMERO_OFFRE = refOffre;
				C8O.call(".SetProsHistoDB2", data);
			}, 150 * compteur);
		});
	}
	// ajout JG-2017-12-04 pour histoPROS
	if (sq && sq == "SetProsHistoDB2") {
		waitdiv_hide();
		isWaiting = false;
		// bStopKeys = false;
		// doRefresh();
		return false;
	}
	if (sq && sq == "LogoutLOXS") {
		waitdiv_hide();
		isWaiting = false;
		return false;
	}
	if (sq && sq == "getTarifs") {
		waitdiv_hide();
		var mail = $doc.find('emailAddress').text();
		alert('>>>' + mail + '<<<');
		window.open();
		return false;
	}
	if (sq && sq == "DisplayFacture") {
		waitdiv_hide();
		isWaiting = false; // ajout JG-2018-01-25 corrige F3 ne fonctionnant plus après affichage de la facture
		var urlPDF = $doc.find("url").text();
		window.open(urlPDF, "_blank");
		// console.log("Affiche FACTURE !!!");
		return false;
	}
	if (sq && sq == "SendFacture") {
		waitdiv_hide();
		isWaiting = false; // ajout JG-2018-01-26 corrige F3 ne fonctionnant plus après l'envoi de la facture
		$("#sendPdfDialog").dialog("destroy");
		var ret = $doc.find("retour").text();
		switch (ret) {
			case '0':
				alert("Facture envoyée");
				break;
			case '1':
				alert("Une erreur s'est produite lors de l'envoi de l'email");
				break;
			case '2':
				alert("La facture n'a pas été trouvée");
				break;
		}
		return false;
	}
});