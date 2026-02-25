<?xml version="1.0" encoding="UTF-8"?><xsl:stylesheet xmlns:lxslt="http://xml.apache.org/xslt" xmlns:xsl="http://www.w3.org/1999/XSL/Transform" version="1.0">
	<xsl:output encoding="UTF-8" indent="no" media-type="text/html" method="html"/>
	<!-- Convertigo System Includes -->

	<!-- HTML block rendering templates -->
	<xsl:param name="doSort">false</xsl:param>
	<xsl:param name="sortColon">-1</xsl:param>	
	<xsl:param name="sortDataType">text</xsl:param>		
	<xsl:param name="sortOrder">ascending</xsl:param>
	<xsl:param name="bullet">-15</xsl:param>

	<!-- TEMPLATE DOCUMENT -->

	<xsl:template match="document">
		<!--  these two inputs are generated to hold the screen Dimension !-->
		<input id="screenWidth" type="hidden" value="{@screenWidth}"/>
		<input id="screenHeight" type="hidden" value="{@screenHeight}"/>

		<input id="resize" type="hidden" value="{$resize}"/>
		<input id="coefx" type="hidden" value="{$coefx}"/>
		<input id="coefy" type="hidden" value="{$coefy}"/>
		<input id="offsetx" type="hidden" value="{$offsetx}"/>
		<input id="offsetr" type="hidden" value="{$offsetr}"/>
		<input id="offsety" type="hidden" value="{$offsety}"/>
		<input id="scrollwidth" type="hidden" value="{$scrollwidth}"/>
		
		<!-- Cas particulier : anoamlie rencontrée sur le retour à l'EXPMNA -->
		<xsl:if test="(@AnomalieRetourExpmna)">
			<input id="AnomalieRetourExpmna" type="hidden" value="{@AnomalieRetourExpmna}"/>
		</xsl:if>

		<xsl:call-template name="generate-page"/>
		
		<div id="sendPdfDialog" style="display: none;" title="Entrez les informations">
			<form>
				<fieldset>
					<table>
						<tr>
							<td>
								<label for="expediteur">Expediteur<span style="color: #e40115">*</span> :</label>
                                <br/>
								<input class="text ui-widget-content ui-corner-all" id="expediteur" name="expediteur" type="text"/>
							</td>
						</tr>
						<tr>
							<td>
								<label for="dest">Destinataire<span style="color: #e40115">*</span> :</label>
                                <br/>
								<input class="text ui-widget-content ui-corner-all" id="dest" name="dest" type="text"/>
							</td>
						</tr>
						<tr>
							<td>
								<label for="object">Objet :</label>
                                <br/>
								<input class="text ui-widget-content ui-corner-all" id="object" name="object" type="text"/>
							</td>
						</tr>
						<tr>
							<td>
								<label for="mbody">Commentaires :</label>
                                <br/>
								<input class="text ui-widget-content ui-corner-all" id="mbody" name="mbody" type="text"/>
							</td>
						</tr>
						<tr>
							<td>
								<span style="color: #e40115;font-size: small">*Champs obligatoires.</span>
							</td>
						</tr>
					</table>					
				</fieldset>
				<input style="position:absolute; top:-1000px" tabindex="-1" type="submit"/>
			</form>
		</div>
		
		<div id="pricingW" style="display: none; z-index: 99995" title="PRICING PROS">
			<div id="contentW"></div>
		</div>
		
	</xsl:template>
	

	<xsl:template name="generate-page">
		<div id="generated_page">	
			<form id="javelin_form" method="post" name="javelin_form" onSubmit="doAction('KEY_ENTER');">
				<xsl:for-each select="blocks[position()=1]">
					<!-- hidden element containing calendar fields -->
					<input id="calendar_fields" name="calendar_fields" type="hidden">
						<xsl:attribute name="value">
							<xsl:for-each select="*[@type='date']">
								<xsl:value-of select="@name"/>|<xsl:value-of select="@pattern"/>;</xsl:for-each>
						</xsl:attribute>
					</input>
					<!--Hidden inputs for cursor position-->
					<input id="cursorColumn" type="hidden" value="{/document/@cursorColumn}"/>
					<input id="cursorLine" type="hidden" value="{/document/@cursorLine}"/>
					<xsl:apply-templates>
						<xsl:with-param name="offsety" select="$offsety + @page-number * $coefy * 24"/>
					</xsl:apply-templates>
				</xsl:for-each>
				<input id="__javelin_current_field" name="__javelin_current_field" type="hidden"/>
				<input id="__javelin_modified_fields" name="__javelin_modified_fields" type="hidden"/>
				<input id="__javelin_action" name="__javelin_action" type="hidden"/>
				<input id="__transaction" name="__transaction" type="hidden"/>
				<input name="__sesskey" type="hidden"/>

				<!-- >>>>> ### AT - Transmission du contexte de la séquence appelante vers la séquence appelée (targetTransaction : TR) -->
				<xsl:if test="not(/document/@contextTR)">
					<input id="__context" name="__context" type="hidden" value="{/document/@context}"/>
				</xsl:if>

				<xsl:if test="/document/@contextTR">
					<input id="__context" name="__context" type="hidden" value="{/document/@contextTR}"/>
				</xsl:if>
				<!-- <<<<< ### AT - Transmission du contexte de la séquence appelante vers la séquence appelée (targetTransaction : TR) -->

				<!-- <input id="__signature" name="__signature" type="hidden" value="{/document/@signature}"/> -->
				<xsl:if test="not(/document/@signatureLast)">
					<input id="__signature" name="__signature" type="hidden" value="{/document/@signature}"/>
				</xsl:if>
				<xsl:if test="/document/@signatureLast">
					<input id="__signature" name="__signature" type="hidden" value="{/document/@signatureLast}"/>
				</xsl:if>
				
				<input id="table_values" name="table_values" type="hidden" value=""/>
			</form>
		</div>
		<xsl:call-template name="mashupAddTooltip"/>
		
	</xsl:template>

	<xsl:template match="status">
		<html>
			<head>
				<meta content="TWinSoft Convertigo" name="GENERATOR"/>
				<meta content="0" http-equiv="expires"/>
				<meta content="2; url={@refresh-url}" http-equiv="refresh"/>
				<style> p {font-family:verdana;} </style>
			</head>
			<body background="../../images/marbre.gif" bgcolor="#FFFFFF">
				<p>
					<img src="../../images/twinsoft.gif"/>
				</p>
				<table border="0" cellpadding="8" style="border: 2px solid #FA8072;">
					<tr>
						<td width="100%">
							<xsl:apply-templates/>
						</td>
					</tr>
				</table>
				<p>
					<a href="http://www.convertigo.com">
						<img border="0" src="../../images/convertigo.gif"/>
					</a>
					<br/>
					<font size="-1">Copyright © 2001-2011 Convertigo SA. All rights reserved.</font>
				</p>
			</body>
		</html>
	</xsl:template>
	<xsl:template match="job">
		<p>
			<b>La transaction (job #<xsl:value-of select="@id"/>) est en cours 
				d'éxécution ; veuillez patienter...</b>
		</p>
		<p>
			<xsl:apply-templates/>
		</p>
	</xsl:template>
	<xsl:template match="step">
		<br>
			<xsl:apply-templates/>
		</br>
	</xsl:template>

	<!--- WARNING : if you modify these constants, display may be wrong -->
	<!-- Set this to false if you want to disable dynamic screen content resizing -->
	<xsl:variable name="resize">true</xsl:variable>

	<!-- Espacement horizontal des caractères : largeur du texte -->
	<xsl:variable name="coefx">8</xsl:variable>
	<!-- 9.7 pour "Lucida console" en 16px-->
	<!-- 8.8 pour "Consolas" en 16px-->
	<!-- 9.9 pour "Consolas" en 20px-->
	<!-- Espacement vertical des caractères : hauteur du texte -->
	<xsl:variable name="coefy">29</xsl:variable>
	<!-- 22 pour "Lucida console" en 16px-->
	<!-- 25 pour "Consolas" en 20px-->

	<!-- Viewport left margin -->
	<!--  <xsl:param name="offsetx">10</xsl:param> -->
	<xsl:param name="offsetx">
		<xsl:if test="/document/@screenWidth='80'">
			50
		</xsl:if>
		<xsl:if test="/document/@screenWidth='132'">
			20
		</xsl:if>
	</xsl:param>
	<!-- Viewport right margin -->
	<xsl:param name="offsetr">22</xsl:param>
	<!-- Viewport top margin -->
	<xsl:param name="offsety">110</xsl:param>

	<!-- Width of a scroll bar -->
	<xsl:param name="scrollwidth">17</xsl:param>

	<!-- Width of icons (like  page up/down incons in table XSL template) -->
	<xsl:variable name="iconSize" select="16"/>

	<!-- Panel width enlargement -->
	<xsl:param name="offsetw">30</xsl:param>
	<!-- Panel height enlargement -->
	<xsl:param name="offseth">50</xsl:param>

	<!--Set this value to true if you want to display the action key in action buttons-->
	<xsl:variable name="DisplayActionKey">true</xsl:variable>

	<!-- Set this value to true if you want to display action buttons outside of panels -->
	<xsl:variable name="DisplayDisabledButtons">false</xsl:variable>

	<!-- Set this to true if you want to gather action buttons in a panel on the left of the screen -->
	<!-- Note : requires offsetx (left margin) to be at least 110px  -->
	<xsl:variable name="GroupActionButtons">true</xsl:variable>

	<!-- Help keyword string -->
	<xsl:variable name="helpKeywordString">(F4)</xsl:variable>

	<xsl:template name="absXpath">
		<xsl:if test="..">
			<xsl:for-each select="..">
				<xsl:call-template name="absXpath"/>
			</xsl:for-each>/*[<xsl:value-of select="count(preceding-sibling::*)+1"/>]</xsl:if>
	</xsl:template>

	<xsl:template name="mashupEventTxt">
		<xsl:param name="mashevent"/>
		doMashupEvent(event,'<xsl:value-of select="$mashevent"/>', this);
	</xsl:template>

	<xsl:template name="mashupVars">
		<xsl:variable name="mashevent" select="./@mashup_event"/>
		<xsl:if test="//interactions/interaction[./@dfevent=$mashevent]">
			<xsl:attribute name="dfevent">
				<xsl:value-of select="./@mashup_event"/>
			</xsl:attribute>
			<xsl:for-each select="//interactions/interaction[./@dfevent=$mashevent]/variable">
				<xsl:attribute name="{./@name}">
					<xsl:value-of select="."/>
				</xsl:attribute>
			</xsl:for-each>
		</xsl:if>
	</xsl:template>

	<xsl:template name="mashupEvent">
		<xsl:variable name="mashevent" select="./@mashup_event"/>
		<xsl:if test="//interactions/interaction[./@dfevent=$mashevent]">
			<xsl:call-template name="mashupEventTxt">
				<xsl:with-param name="mashevent" select="$mashevent"/>
			</xsl:call-template>
		</xsl:if>		
	</xsl:template>

	<xsl:template name="mashupEventOnClick">
		<xsl:variable name="mashevent" select="./@mashup_event"/>
		<xsl:if test="//interactions/interaction[./@dfevent=$mashevent]">
			<xsl:attribute name="onclick">
				<xsl:call-template name="mashupEventTxt">
					<xsl:with-param name="mashevent" select="$mashevent"/>
				</xsl:call-template>
			</xsl:attribute>
		</xsl:if>
	</xsl:template>

	<xsl:template name="mashupTooltipOnTxt">showDiv(event);</xsl:template>

	<xsl:template name="mashupTooltipOn">
		<xsl:param name="ref" select="."/>
		<xsl:if test="$ref/@mashup_event">
			<xsl:call-template name="mashupTooltipOnTxt"/>
		</xsl:if>
	</xsl:template>

	<xsl:template name="mashupTooltipOnOver">
		<xsl:param name="ref" select="."/>
		<xsl:if test="$ref/@mashup_event">
			<xsl:attribute name="onmouseover">
				<xsl:call-template name="mashupTooltipOnTxt"/>
			</xsl:attribute>
		</xsl:if>
	</xsl:template>

	<xsl:template name="mashupTooltipOffTxt">hideDiv(event);</xsl:template>

	<xsl:template name="mashupTooltipOff">
		<xsl:param name="ref" select="."/>
		<xsl:if test="$ref/@mashup_event">
			<xsl:call-template name="mashupTooltipOffTxt"/>
		</xsl:if>
	</xsl:template>

	<xsl:template name="mashupTooltipOnOut">
		<xsl:param name="ref" select="."/>
		<xsl:if test="$ref/@mashup_event">
			<xsl:attribute name="onmouseout">
				<xsl:call-template name="mashupTooltipOffTxt"/>
			</xsl:attribute>
		</xsl:if>
	</xsl:template>

	<xsl:template name="mashupTooltipOnOff">
		<xsl:param name="ref" select="."/>
		<xsl:if test="$ref/@mashup_event">
			<xsl:attribute name="onmouseover">
				<xsl:call-template name="mashupTooltipOnTxt"/>
			</xsl:attribute>
			<xsl:attribute name="onmouseout">
				<xsl:call-template name="mashupTooltipOffTxt"/>
			</xsl:attribute>
		</xsl:if>
	</xsl:template>


	<xsl:template name="mashupAddTooltip">
		<div class="mashupTooltip" id="mashupTooltip">
                Click here to do mashup event
		</div>
	</xsl:template>

	<!-- TEMPLATE STATIC -->
	<xsl:template match="*[@type='static']">
		<xsl:param name="offsety"/>
		<xsl:variable name="elDepth">
			<xsl:choose>
				<xsl:when test="ancestor::*[@type='panel']/@zOrder">
					<xsl:value-of select="10 - ancestor::*[@type='panel']/@zOrder"/>
				</xsl:when>
				<xsl:otherwise>1</xsl:otherwise>
			</xsl:choose>
		</xsl:variable>
		<!-- Hide non-visible statics -->
		<xsl:if test="@background != @foreground">
			<!-- Container SPAN. Used only for positioning and framework behaviour -->
			<span>
				<xsl:choose>
					<xsl:when test="@mashup_event != ''">
						<xsl:attribute name="style">position: absolute;
							left: <xsl:value-of select="./@column*$coefx+$offsetx"/>px;
							<xsl:choose>
								<xsl:when test="(/document/@screenWidth='132') and (./@line=26)">
									<!-- top: <xsl:value-of select="./@line*$coefy + $offsety - 2*$coefy"/>px; -->
									bottom: 10px;
								</xsl:when>
								<xsl:otherwise>
									top: <xsl:value-of select="./@line*$coefy + $offsety"/>px;
								</xsl:otherwise>
							</xsl:choose>
							white-space: nowrap;
							z-index: <xsl:value-of select="$elDepth * 10 + 1"/>;
							cursor: pointer;
							text-decoration: underline;
						</xsl:attribute>
						<xsl:call-template name="mashupVars"/>
						<xsl:attribute name="onclick">
							spanClick(this, <xsl:value-of select="@column"/>, <xsl:value-of select="@line"/>);
							<xsl:call-template name="mashupEvent"/>
						</xsl:attribute>
					</xsl:when>
					<xsl:otherwise>
						<xsl:attribute name="style">position: absolute;
							left: <xsl:value-of select="./@column*$coefx+$offsetx"/>px;
							<xsl:choose>
								<xsl:when test="(/document/@screenWidth='132') and (./@line=26)">
									top: <xsl:value-of select="./@line*$coefy + $offsety - 1*$coefy"/>px; 
									<!--   bottom: 0px; -->
								</xsl:when>
								<xsl:otherwise>
									top: <xsl:value-of select="./@line*$coefy + $offsety"/>px;
								</xsl:otherwise>
							</xsl:choose>
							<!-- GV-20260225: Fix declage affichage nombres avec espaces -->
							white-space: pre;
							z-index: <xsl:value-of select="$elDepth * 10 + 1"/>;
						</xsl:attribute>
						<xsl:attribute name="onclick">spanClick(this, <xsl:value-of select="@column"/>, <xsl:value-of select="@line"/>);</xsl:attribute>
					</xsl:otherwise>
				</xsl:choose>
				<xsl:call-template name="mashupTooltipOnOff"/>
				<!-- Background color style SPAN -->
				<span class="bgcolor{@background}">
					<!-- Foreground color style SPAN -->
					<span class="color{@foreground}">
						<xsl:choose>
							<xsl:when test="starts-with(., 'http://')">
								<a href="{.}" target="_blank">
									<xsl:value-of select="."/>
								</a>
							</xsl:when>
							<xsl:otherwise>
								<xsl:if test="@blink">
									<!-- Blink style SPAN -->
									<span class="blink">
										<xsl:if test="@underline">
											<!-- Underline style SPAN -->
											<span class="title2">
												<span class="subTitle">
													<xsl:choose>
														<xsl:when test="@style">
															<span style="{@style}">
																<xsl:value-of select="."/>
															</span>
														</xsl:when>
														<xsl:otherwise>
															<xsl:value-of select="."/>
														</xsl:otherwise>
													</xsl:choose>
												</span>
											</span>
										</xsl:if>
										<xsl:if test="not(@underline)">
											<span class="subTitle">
												<xsl:choose>
													<xsl:when test="@style">
														<span style="{@style}">
															<xsl:value-of select="."/>
														</span>
													</xsl:when>
													<xsl:otherwise>
														<xsl:value-of select="."/>
													</xsl:otherwise>
												</xsl:choose>
											</span>
										</xsl:if>
									</span>
								</xsl:if>
								<xsl:if test="not(@blink)">
									<xsl:if test="@underline">
										<!-- Underline style SPAN -->
										<span class="title2">
											<span class="subTitle">
												<xsl:choose>
													<xsl:when test="@style">
														<span style="{@style}">
															<xsl:value-of select="."/>
														</span>
													</xsl:when>
													<xsl:otherwise>
														<xsl:value-of select="."/>
													</xsl:otherwise>
												</xsl:choose>
											</span>
										</span>
									</xsl:if>
									<xsl:if test="not(@underline)">
										<span>
											<xsl:choose>
												<xsl:when test="@foreground='white' and @background='black' and @line='0' and @column&gt;=20 and @column&lt;=60">
													<xsl:attribute name="class">title2 title1</xsl:attribute>
												</xsl:when>
												<xsl:otherwise>
													<xsl:attribute name="class">staticText</xsl:attribute>
												</xsl:otherwise>
											</xsl:choose>
											<xsl:choose>
												<xsl:when test="@style">
													<span style="{@style}">
														<xsl:value-of select="."/>
													</span>
												</xsl:when>
												<xsl:otherwise>
													<xsl:value-of select="."/>
												</xsl:otherwise>
											</xsl:choose>
										</span>
									</xsl:if>
								</xsl:if>
							</xsl:otherwise>
						</xsl:choose>
					</span>
				</span>
			</span>
		</xsl:if>
	</xsl:template>

	<!-- TEMPLATE FIELD -->
	<!-- <xsl:template match="*[@type='field' and not(@hidden)]"> -->
	<xsl:template match="*[@type='field']">
	
		<!-- Taille en dessous de laquelle un champ débordant sur la ligne suivante n'est pas transformé en textarea -->
		<!-- C'est pour gérer le cas particulier des courrier avec saisie libre (champs de 90)  -->
		<xsl:param name="fTextareaLimit">
			<xsl:value-of select="150"/>
		</xsl:param>
			
		<!-- Le champ doit-il etre un textarea ? -->
		<!-- Oui si ce n'est pas un champ caché (type MDP) ou s'il fait plus de 100 caractères -->
		<xsl:param name="fTextarea">
			<xsl:choose>
				<xsl:when test="@hidden = 'true'">
					<xsl:value-of select="0"/>
				</xsl:when>
				<xsl:when test="@size &gt; $fTextareaLimit">				
					<xsl:value-of select="1"/>
				</xsl:when>
				<xsl:otherwise>
					<xsl:value-of select="0"/>
				</xsl:otherwise>
			</xsl:choose>
		</xsl:param>					
				
		<!-- Hauteur de la textarea : --> 
		<!-- on divise la taille du champ par le nombre de colonnes qui seront affichées à l'écran --> 
		<!-- s'il y a un reste, on ajoute 1 ligne -->		
		<xsl:param name="fRows">
		
			<xsl:if test="$fTextarea = 1">
			
				<xsl:choose>
				
					<!-- Le champ est moins large que l'écran (il n'est donc pas cadré à gauche), il fait donc 2 lignes -->
					<xsl:when test="@size &lt;= /document/@screenWidth">	
						<xsl:value-of select="2"/>
					</xsl:when>
					
					<!-- Le champ est affiché sur le nombre maximum sans chevaucher les champs suivants -->
					<xsl:when test="@size mod /document/@screenWidth &gt; 0">	
						<xsl:value-of select="floor(@size div /document/@screenWidth)"/>
					</xsl:when>
					
					<xsl:otherwise>
						<xsl:value-of select="(@size div /document/@screenWidth)"/>
					</xsl:otherwise>
					
				</xsl:choose>
				
			</xsl:if>
			
			<!-- Input -->
			<xsl:if test="$fTextarea = 0">
				<xsl:value-of select="0"/>
			</xsl:if>
			
		</xsl:param>
				
		<!-- Taille de la zone d'affichage :  -->
		<!-- on multiplie le nombre de colonnes affichées sur la première ligne par le nombre de lignes -->
		<xsl:param name="tZoneLen">
		
			<xsl:if test="$fTextarea = 1">		
				<xsl:value-of select="(/document/@screenWidth - @column) * $fRows"/>
			</xsl:if>
			
			<!-- Input -->
			<xsl:if test="$fTextarea = 0">
				<xsl:value-of select="0"/>
			</xsl:if>
			
		</xsl:param>
				
		<!-- Colonne de la zone d'affichage -->
		<!-- Si la taille de la zone d'affichage est supérieure à la longueur du champ, il faut calculer un nombre de colonne par rapport au champ -->
		<xsl:param name="fCols">
		
			<!-- textarea -->
			<xsl:if test="$fTextarea = 1">
			
				<xsl:choose>
					
					<!-- taille de la zone d'affichage supérieure à taille du champ -->
					<xsl:when test="$tZoneLen &gt; @size">
						
						<xsl:choose>
				
							<xsl:when test="@size mod $fRows &gt; 0">	
								<xsl:value-of select="floor(@size div $fRows) + 1"/>
							</xsl:when>
					
							<xsl:otherwise>
								<xsl:value-of select="(@size div $fRows)"/>
							</xsl:otherwise>
						
						</xsl:choose>
					
					</xsl:when>
					
					<!-- taille de la zone d'affichage inférieure à taille du champ -->
					<xsl:when test="$tZoneLen &lt; @size">
						<xsl:value-of select="/document/@screenWidth - @column"/>
					</xsl:when>
					
					<!-- taille de la zone d'affichage égale à taille du champ -->
					<xsl:otherwise>
						<xsl:value-of select="/document/@screenWidth - @column"/>
					</xsl:otherwise>
					
				</xsl:choose>
						
			</xsl:if>
			
			<!-- input -->
			<xsl:if test="$fTextarea = 0">
				<xsl:value-of select="0"/>
			</xsl:if>
			
		</xsl:param>			
		
		<!-- La taille d'un textarea doit correpondre au maximum à un multiple de sa taille sur le nombre de ligne -->
		<xsl:param name="fieldSize">
					
			<!-- textarea -->
			<xsl:if test="$fTextarea = 1">
				<xsl:value-of select="$fCols"/>
			</xsl:if>		
		
			<!-- input -->
			<xsl:if test="$fTextarea = 0">
				<!-- <xsl:variable name="sWidth" select="/document/@screenWidth"/> -->
				<xsl:choose>
					<xsl:when test="@size &gt; $fTextareaLimit">
						<xsl:value-of select="$fTextareaLimit"/>
					</xsl:when>
					<!-- <xsl:when test="(@column + @size) &gt;= $sWidth">
						<xsl:value-of select="$sWidth - @column"/>
					</xsl:when>					 -->
					<xsl:otherwise>
						<xsl:value-of select="@size"/>
					</xsl:otherwise>
				</xsl:choose>
			</xsl:if>		

		</xsl:param>					

		<xsl:param name="offsety"/>
		<xsl:param name="checkAutoEnter">
			<xsl:if test="(@autoenter)">true</xsl:if>
			<xsl:if test="(not(@autoenter))">false</xsl:if>
		</xsl:param>
	
		<!-- Le champ est-il numérique -->
		<xsl:param name="isFieldNumeric">
			<xsl:if test="(@numeric)">true</xsl:if>
			<xsl:if test="(not(@numeric))">false</xsl:if>
		</xsl:param>		
		
		<xsl:variable name="elDepth">
			<xsl:choose>
				<xsl:when test="ancestor::*[@type='panel']/@zOrder">
					<xsl:value-of select="10 - ancestor::*[@type='panel']/@zOrder"/>
				</xsl:when>
				<xsl:otherwise>1</xsl:otherwise>
			</xsl:choose>
		</xsl:variable>

		<xsl:if test="(@hasFocus ='true')">
			<input id="focus" type="hidden" value="{@name}"/>
		</xsl:if>

		<!-- Container SPAN. Used only for positioning and framework behaviour -->
		<span id="{@name}_n1parent">
<!-- 			<xsl:if test="/document/@screenclass='ReservationCreationInformEqp'"> -->
			<xsl:if test="contains('|OffreCreationInformEqp|ReservationCreationInformEqp|OffreCreationInformEqpNotTxDeg|OffreCreationInformEqp_MAJ|current_catclass|current_catclass_contrat|OffreCreationInformEqp_Contrat|', concat('|', /document/@screenclass, '|'))">
				<div class="hidden" id="toolbar-buttons{@name}">
				   <a href="#" onclick="toolbarPROS('{@name}');return false;">
                        <i class="fa fa-eur"/>
                    </a>
				</div>
			</xsl:if>
			<!-- >>>>> TEXTAREA -->
						
			<xsl:if test="$fTextarea = 1">
				<xsl:attribute name="style">position:absolute; left: <xsl:value-of select="./@column*$coefx+$offsetx"/>px; top: <xsl:value-of select="./@line*$coefy + $offsety - 8"/>px; z-index: <xsl:value-of select="$elDepth * 10 + 2"/>;</xsl:attribute>
				<textarea cols="{$fCols}" id="{@name}_n1" maxlength="{@size}" name="{@name}" onfocus="currentFieldOnFocus=this.id; onInputClick(this);" onkeyup="checkInputChars(event, {@size}, {$checkAutoEnter}, document.javelin_form.{@name});" rows="{$fRows}" style="width: {$fieldSize*$coefx}px;">
							<!-- ondblclick="doAction('KEY_ENTER',  {@name});" -->
							<!-- overflow="hidden" -->
							<!-- wrap="off" -->
							<!-- rows="(@size mod 80)+1">  -->

					<!-- Evaluation de la couleur de l'inversion vidéo -->
					<xsl:choose>
						<xsl:when test="./@background ='blue'">
							<xsl:attribute name="class">extFieldBlue</xsl:attribute>
						</xsl:when>
						<xsl:when test="./@background ='cyan'">
							<xsl:attribute name="class">extFieldCyan</xsl:attribute>
						</xsl:when>											
						<xsl:when test="./@background ='green'">
							<xsl:attribute name="class">extFieldGreen</xsl:attribute>
						</xsl:when>
						<xsl:when test="./@background ='magenta'">
							<xsl:attribute name="class">extFieldMagenta</xsl:attribute>
						</xsl:when>
						<xsl:when test="./@background ='red'">
							<xsl:attribute name="class">extFieldRed</xsl:attribute>
						</xsl:when>
						<xsl:when test="./@background ='white'">
							<xsl:attribute name="class">extFieldWhite</xsl:attribute>
						</xsl:when>
						<xsl:when test="./@background ='yellow'">
							<xsl:attribute name="class">extFieldYellow</xsl:attribute>
						</xsl:when>	

						<xsl:otherwise>
							<xsl:attribute name="class">extField</xsl:attribute>
						</xsl:otherwise>

					</xsl:choose>
					<xsl:value-of select="."/>
				</textarea>					
			</xsl:if>
			
			<!-- <<<<< TEXTAREA -->
			
			<!-- >>>>> INPUT -->
			
			<xsl:if test="$fTextarea = 0">
				<xsl:attribute name="style">position:absolute; left: <xsl:value-of select="./@column*$coefx+$offsetx + 2"/>px; top: <xsl:value-of select="./@line*$coefy + $offsety + 4"/>px; z-index: <xsl:value-of select="$elDepth * 10 + 2"/>;</xsl:attribute>
				<input data-toto="{/document/@screenclass}" id="{@name}_n1" maxlength="{@size}" name="{@name}" onfocus="currentFieldOnFocus=this.id; onInputClick(this);" onkeyup="checkInput(event, {$isFieldNumeric}, {@size}, {$checkAutoEnter}, document.javelin_form.{@name});" size="{$fieldSize}" style="width: {$fieldSize*$coefx}px;font-size: 14pt; height: 14px;" value="{.}">
								<!-- ondblclick="doAction('KEY_ENTER',  {@name});" -->
								<!-- onkeyup="checkInputChars(event, {@size}, {$checkAutoEnter}, document.javelin_form.{@name});" -->
					<!-- GV-20171110: Ajout Toolbar -->
					<xsl:if test="contains('|OffreCreationInformEqp|ReservationCreationInformEqp|OffreCreationInformEqpNotTxDeg|OffreCreationInformEqp_MAJ|current_catclass|current_catclass_contrat|OffreCreationInformEqp_Contrat|', concat('|', /document/@screenclass, '|')) and (@name='__field_c1_l5' or @name='__field_c1_l6' or @name='__field_c1_l7' or @name='__field_c1_l8' or @name='__field_c1_l9' or @name='__field_c1_l10')">
						<xsl:attribute name="data-toolbar">loxuser-options<xsl:value-of select="@name"/>
                        </xsl:attribute>
					</xsl:if>
					<!-- GV-20170927: Mise à jour du localstorage $ste si changement par utilisateur -->
					<xsl:if test="((/document/@screenclass='OPERATIONS') or (/document/@screenclass='RENTALMAN')) and (name()='site')">
						<xsl:attribute name="onkeydown">updatePROSData(this, '<xsl:value-of select="/document/@context"/>_ste');</xsl:attribute>
						<xsl:attribute name="onblur">updatePROSData(this, '<xsl:value-of select="/document/@context"/>_ste');</xsl:attribute>
					</xsl:if>
					<!-- GV-20170927: Mise à jour du localstorage $agc si changement par utilisateur -->
					<xsl:if test="((/document/@screenclass='OPERATIONS') or (/document/@screenclass='RENTALMAN')) and (name()='agence')">
						<xsl:attribute name="onkeydown">updatePROSData(this, '<xsl:value-of select="/document/@context"/>_agc');</xsl:attribute>
						<xsl:attribute name="onblur">updatePROSData(this, '<xsl:value-of select="/document/@context"/>_agc');</xsl:attribute>
					</xsl:if>
						<!-- à remettre -->
					<xsl:if test="((/document/@screenclass='RepartitionCamionEntreeCodeD') or (/document/@screenclass='RepartitionCamionEntreeCodeP')) and (@name='__field_c11_l12')">
    	               	<xsl:attribute name="disabled"></xsl:attribute>
					</xsl:if>
						<!-- à remettre -->
					<xsl:if test="(/document/@screenclass='ChantierClientMaj') and (@name='__field_c17_l12')">
    	               	<xsl:attribute name="disabled"></xsl:attribute>
					</xsl:if>
					<!-- GV-20240131: Gestion startTime  -->
					<xsl:if test="(contains('|ReservationCreationInformClient|ReservationOffreCreation|OffreCreationInformClient|OffreCreationInformClient_MAJ|ReservationCreationInformClient_MAJ|Contrat_Creation|', concat('|', /document/@screenclass, '|'))) and (name()='startTime')">
						<xsl:attribute name="onkeydown">updatePROSData(this, '<xsl:value-of select="/document/@context"/>_startTime');</xsl:attribute>
						<xsl:attribute name="onblur">updatePROSData(this, '<xsl:value-of select="/document/@context"/>_startTime');</xsl:attribute>
						<xsl:attribute name="onchange">updatePROSData(this, '<xsl:value-of select="/document/@context"/>_startTime');</xsl:attribute>
					</xsl:if>
					<!-- GV-20240131: Gestion endTime  -->
					<xsl:if test="(contains('|ReservationCreationInformClient|ReservationOffreCreation|OffreCreationInformClient|OffreCreationInformClient_MAJ|ReservationCreationInformClient_MAJ|Contrat_Creation|ContratLocation_FR|', concat('|', /document/@screenclass, '|'))) and (name()='endTime')">
						<xsl:attribute name="onkeydown">updatePROSData(this, '<xsl:value-of select="/document/@context"/>_endTime');</xsl:attribute>
						<xsl:attribute name="onblur">updatePROSData(this, '<xsl:value-of select="/document/@context"/>_endTime');</xsl:attribute>
						<xsl:attribute name="onchange">updatePROSData(this, '<xsl:value-of select="/document/@context"/>_endTime');</xsl:attribute>
					</xsl:if>
					<!-- GV-20240131: Gestion devise  -->
					<xsl:if test="(contains('|ReservationCreationInformClient|OffreCreationInformClient|OffreCreationInformClient_MAJ|ReservationCreationInformClient_MAJ|ContratLocation_FR|', concat('|', /document/@screenclass, '|'))) and (name()='devise')">
						<xsl:attribute name="onkeydown">updatePROSData(this, '<xsl:value-of select="/document/@context"/>_devise');</xsl:attribute>
						<xsl:attribute name="onblur">updatePROSData(this, '<xsl:value-of select="/document/@context"/>_devise');</xsl:attribute>
						<xsl:attribute name="onchange">updatePROSData(this, '<xsl:value-of select="/document/@context"/>_devise');</xsl:attribute>
					</xsl:if>
					<!-- GV-20240207: Gestion FLT  -->
					<xsl:if test="(contains('|ChoixFacturation|', concat('|', /document/@screenclass, '|'))) and (name()='facturation_long_terme')">
						<xsl:attribute name="onkeydown">updatePROSData(this, '<xsl:value-of select="/document/@context"/>_flt');</xsl:attribute>
						<xsl:attribute name="onblur">updatePROSData(this, '<xsl:value-of select="/document/@context"/>_flt');</xsl:attribute>
						<xsl:attribute name="onchange">updatePROSData(this, '<xsl:value-of select="/document/@context"/>_flt');</xsl:attribute>
					</xsl:if>
					<xsl:choose>
						
						<xsl:when test="./@mashup_event">
							<xsl:attribute name="class">mashupableFieldText</xsl:attribute>
						</xsl:when>

						<!-- Evaluation de la couleur de l'inversion vidéo -->
						<xsl:when test="./@background ='blue'">
							<xsl:attribute name="class">extFieldBlue</xsl:attribute>
						</xsl:when>
						<xsl:when test="./@background ='cyan'">
							<xsl:attribute name="class">extFieldCyan</xsl:attribute>
						</xsl:when>											
						<xsl:when test="./@background ='green'">
							<xsl:attribute name="class">extFieldGreen</xsl:attribute>
						</xsl:when>
						<xsl:when test="./@background ='magenta'">
							<xsl:attribute name="class">extFieldMagenta</xsl:attribute>
						</xsl:when>
						<xsl:when test="./@background ='red'">
							<xsl:attribute name="class">extFieldRed</xsl:attribute>
						</xsl:when>
						<xsl:when test="./@background ='white'">
							<xsl:attribute name="class">extFieldWhite</xsl:attribute>
						</xsl:when>
						<xsl:when test="./@background ='yellow'">
							<xsl:attribute name="class">extFieldYellow</xsl:attribute>
						</xsl:when>	

						<xsl:otherwise>
							<xsl:attribute name="class">extField</xsl:attribute>
						</xsl:otherwise>

					</xsl:choose>

					<xsl:if test="./@mashup_event">
						<xsl:call-template name="mashupVars"/>
						<xsl:call-template name="mashupTooltipOnOff"/>
						<xsl:attribute name="onclick">
							<xsl:call-template name="mashupEvent"/>
						</xsl:attribute>
					</xsl:if>

					<xsl:if test="./@previousContinuous">
						<xsl:attribute name="previousField_disabled">
							<xsl:value-of select="./@previousContinuous"/>_n1</xsl:attribute>
					</xsl:if>

					<xsl:if test="./@nextContinuous">
						<xsl:attribute name="nextField_disabled">
							<xsl:value-of select="./@nextContinuous"/>_n1</xsl:attribute>
					</xsl:if>

					<xsl:choose>
						<xsl:when test="@hidden = 'true'">
							<xsl:attribute name="type">password</xsl:attribute>
						</xsl:when>
						<xsl:otherwise>
							<xsl:attribute name="type">text</xsl:attribute>
														
							<!-- Champ numérique -->
							<xsl:if test="$isFieldNumeric = 'true'">									
								<!-- <xsl:attribute name="required"></xsl:attribute> -->		
								<xsl:attribute name="title">Champ numérique uniquement</xsl:attribute>
								<xsl:attribute name="type2">number</xsl:attribute>
							</xsl:if>
							
						</xsl:otherwise>
					</xsl:choose>
				</input>				
			</xsl:if>
			
			<!-- <<<<< INPUT -->
			
		</span>
	</xsl:template>				

	<!-- TEMPLATE VALUE FOR HISTORY -->
	<xsl:template match="value" mode="history">
		<option value="{.}">
			<xsl:value-of select="."/>
		</option>
	</xsl:template>

	<!-- TEMPLATE VALUE -->
	<xsl:template match="value"/>

	<!-- TEMPLATE DATE -->
	<xsl:template match="*[@type='date']">
		<xsl:param name="fieldSize">
			<xsl:variable name="sWidth" select="/document/@screenWidth"/>
			<xsl:if test="(@column + @size) &lt; $sWidth">
				<xsl:value-of select="@size"/>
			</xsl:if>
			<xsl:if test="(@column + @size) &gt;= $sWidth">
				<xsl:value-of select="$sWidth - @column"/>
			</xsl:if>
		</xsl:param>
		<xsl:param name="offsety"/>
		<xsl:param name="checkAutoEnter">
			<xsl:if test="(@autoenter)">true</xsl:if>
			<xsl:if test="(not(@autoenter))">false</xsl:if>
		</xsl:param>
		<xsl:variable name="elDepth">
			<xsl:choose>
				<xsl:when test="ancestor::*[@type='panel']/@zOrder">
					<xsl:value-of select="10 - ancestor::*[@type='panel']/@zOrder"/>
				</xsl:when>
				<xsl:otherwise>1</xsl:otherwise>
			</xsl:choose>
		</xsl:variable>

		<xsl:if test="(@hasFocus ='true')">
			<input id="focus" type="hidden" value="{@name}"/>
		</xsl:if>

		<!-- Container SPAN. Used only for positioning and framework behaviour -->
		<span id="{@name}_n1parentImg" style="position:absolute;       left:{./@column*$coefx+$offsetx - 26}px;       top:{./@line*$coefy + $offsety + 0 }px;       z-index: {$elDepth * 10 + 1};">
			<img class="imgCalendar" id="{@name}_imgCalendar" src="images/icn_calendar.png" style="cursor: pointer;"/>
		</span>
		
		<!-- GV-20260225: Fix decalage champ date -->
		<span id="{@name}_n1parent" style="position: absolute;left: {./@column*$coefx+$offsetx + 2}px;top: {./@line*$coefy + $offsety + 3}px;z-index: {$elDepth * 10 + 1};">
		<input class="fixed" id="{@name}_n1" maxlength="{@size}" name="{@name}" onfocus="currentFieldOnFocus=this.id;onInputClick(this)" onkeyup="checkInputChars(event, {@size}, {$checkAutoEnter}, document.javelin_form.{@name})" size="{$fieldSize}" style="width: {$fieldSize*$coefx}px;height: 14px;font-size:14pt;" type="text" value="{.}">
				<!-- GV-20170926: Mise à jour du localstorage $sdt si changement par utilisateur -->
				<xsl:if test="(contains('|ReservationCreationInformClient|ReservationOffreCreation|OffreCreationInformClient|OffreCreationInformClient_MAJ|ReservationCreationInformClient_MAJ|Contrat_Creation|', concat('|', /document/@screenclass, '|'))) and (name()='startDate')">
					<xsl:attribute name="onkeydown">updatePROSData(this, '<xsl:value-of select="/document/@context"/>_sdt');</xsl:attribute>
					<xsl:attribute name="onblur">updatePROSData(this, '<xsl:value-of select="/document/@context"/>_sdt');</xsl:attribute>
					<xsl:attribute name="onchange">updatePROSData(this, '<xsl:value-of select="/document/@context"/>_sdt');</xsl:attribute>
				</xsl:if>
				<!-- GV-20170926: Mise à jour du localstorage $edt si changement par utilisateur -->
				<xsl:if test="(contains('|ReservationCreationInformClient|ReservationOffreCreation|OffreCreationInformClient|OffreCreationInformClient_MAJ|ReservationCreationInformClient_MAJ|Contrat_Creation|ContratLocation_FR|', concat('|', /document/@screenclass, '|'))) and (name()='endDate')">
					<xsl:attribute name="onkeydown">updatePROSData(this, '<xsl:value-of select="/document/@context"/>_edt');</xsl:attribute>
					<xsl:attribute name="onblur">updatePROSData(this, '<xsl:value-of select="/document/@context"/>_edt');</xsl:attribute>
					<xsl:attribute name="onchange">updatePROSData(this, '<xsl:value-of select="/document/@context"/>_edt');</xsl:attribute>
				</xsl:if>
			</input>
		</span>
	</xsl:template>

	<!-- TEMPLATE KEYWORD -->
	<xsl:template match="*[@type='keyword']">
		<xsl:param name="offsety"/>
		<xsl:param name="enable"/>

		<xsl:variable name="elDepth">
			<xsl:choose>
				<xsl:when test="ancestor::*[@type='panel']/@zOrder">
					<xsl:value-of select="10 - ancestor::*[@type='panel']/@zOrder"/>
				</xsl:when>
				<xsl:otherwise>1</xsl:otherwise>
			</xsl:choose>
		</xsl:variable>

		<xsl:variable name="displayMe">
			<xsl:choose>
				<!-- Case this is not a 5250 extended button -->
				<xsl:when test="$enable = ''">
					<xsl:choose>
						<!-- Case project is parametered explicitly to display disabled buttons when outside of panels -->
						<xsl:when test="$DisplayDisabledButtons = 'true'">true</xsl:when>
						<!-- Normal case -->
						<xsl:otherwise>
							<xsl:choose>
								<!-- Case there is a panel in the screen -->
								<xsl:when test="/document/blocks/*/@type ='panel'">
									<xsl:choose>
										<!-- Case button is in the panel -->
										<xsl:when test="ancestor::*/@type = 'panel'">true</xsl:when>
										<!-- Case button is not in the panel -->
										<xsl:otherwise>false</xsl:otherwise>
									</xsl:choose>
								</xsl:when>
								<!-- Case there is not any panel is the screen -->
								<xsl:otherwise>true</xsl:otherwise>
							</xsl:choose>
						</xsl:otherwise>
					</xsl:choose>
				</xsl:when>
				<!-- Case this is a 5250 extended button -->
				<xsl:otherwise>
					<xsl:choose>
						<xsl:when test="$enable = 'true'">true</xsl:when>
						<xsl:otherwise>false</xsl:otherwise>
					</xsl:choose>
				</xsl:otherwise>
			</xsl:choose>
		</xsl:variable>
		<!-- Container SPAN. Used only for positioning and framework behaviour -->
		<span style="position:absolute; left:{./@column*$coefx+$offsetx}px; top:{./@line*$coefy + $offsety}px; z-index: {$elDepth * 10 + 1};">
			<xsl:choose>
				<!-- Case the button was disabled -->
				<xsl:when test="$displayMe = 'false'">
					<table border="0" cellpadding="0" cellspacing="0" class="disabledbuttontab">
						<xsl:call-template name="mashupTooltipOnOff"/>
						<xsl:call-template name="mashupVars"/>
						<tbody>
							<tr>
								<td class="disabledbuttonl">
									<img border="0" height="1" src="images/pixel.gif" width="3"/>
								</td>
								<td class="disabledbuttonc">
									<input class="disabledinsidebutton" type="button">
										<xsl:choose>
											<!-- Display the action key (PF1=, PF14=, PA2=...) on the button -->
											<xsl:when test="$DisplayActionKey='true' and $enable = ''">
												<xsl:choose>
													<xsl:when test="@action='KEY_ENTER'">
														<xsl:attribute name="value">
															<xsl:value-of select="substring-after(@action, 'KEY_')"/>=<xsl:value-of select="."/>
														</xsl:attribute>
													</xsl:when>
													<xsl:otherwise>
														<xsl:attribute name="value">
															<xsl:value-of select="substring-after(@action, 'KEY_P')"/>=<xsl:value-of select="."/>
														</xsl:attribute>
													</xsl:otherwise>
												</xsl:choose>												                                            
											</xsl:when>
											<!-- Or not -->
											<xsl:otherwise>
												<xsl:attribute name="value">
													<xsl:value-of select="."/>
												</xsl:attribute>
											</xsl:otherwise>
										</xsl:choose>
									</input>
								</td>
								<td class="disabledbuttonr">
									<img border="0" height="1" src="images/pixel.gif" width="3"/>
								</td>
							</tr>
						</tbody>
					</table>	
				</xsl:when>
				<!-- Case the button is selectable -->
				<xsl:otherwise>
					<table border="0" cellpadding="0" cellspacing="0" class="buttontab">
						<xsl:call-template name="mashupTooltipOnOff"/>
						<xsl:call-template name="mashupVars"/>
						<xsl:choose>
							<!-- Is this an help/F4/popup button ? -->
							<xsl:when test="(starts-with(., $helpKeywordString)) and (preceding-sibling::*[1][@type = 'field']/@line = ./@line)">
								<xsl:attribute name="onclick">
										document.javelin_form.<xsl:value-of select="preceding-sibling::*[1]/@name"/>.focus();
										currentFieldOnFocus='<xsl:value-of select="preceding-sibling::*[1]/@name"/>';
										doAction('<xsl:value-of select="@action"/>');
									<xsl:call-template name="mashupEvent"/>
								</xsl:attribute>
							</xsl:when>
							<!-- Standard button -->
							<xsl:otherwise>
								<xsl:choose>
									<xsl:when test="@action = ''">
										<xsl:attribute name="onclick">
											<xsl:call-template name="mashupEvent"/>
										</xsl:attribute>
									</xsl:when>
									<xsl:otherwise>
										<xsl:choose>
											<!-- Does this button trigger a transaction ? -->
											<xsl:when test="@dotransaction = 'true'">
												<xsl:attribute name="onclick">document.getElementById('__transaction').value='<xsl:value-of select="@action"/>'; doAction('');<xsl:call-template name="mashupEvent"/>
												</xsl:attribute>
											</xsl:when>
											<!-- Is this a 5250 Extended button ? -->
											<xsl:when test="not($enable = '')">
												<xsl:attribute name="onclick">currentFieldOnFocus='__field_c<xsl:value-of select="@column"/>_l<xsl:value-of select="@line"/>'; doAction('KEY_NPTUI');<xsl:call-template name="mashupEvent"/>
												</xsl:attribute>
											</xsl:when>
											<!-- Standard button onclick behaviour -->
											<xsl:otherwise>
												<xsl:attribute name="onclick">doAction('<xsl:value-of select="@action"/>');<xsl:call-template name="mashupEvent"/>
												</xsl:attribute>
											</xsl:otherwise>
										</xsl:choose>
									</xsl:otherwise>
								</xsl:choose>
							</xsl:otherwise>
						</xsl:choose>
						<tbody>
							<tr>
								<td class="buttonl">
									<img border="0" height="1" src="images/pixel.gif" width="3"/>
								</td>
								<td class="buttonc">

									<input type="button">

										<xsl:choose>

											<!-- Display the action key (PF1=, PF14=, PA2=...) on the button -->
											<xsl:when test="$DisplayActionKey='true' and $enable = ''">

												<!-- Evaluation de la couleur de la police des touches de fonction -->
												<xsl:choose>
													<xsl:when test="./@foreground ='blue'">
														<xsl:attribute name="class">insidebuttonBlue</xsl:attribute>
													</xsl:when>
													<xsl:when test="./@foreground ='cyan'">
														<xsl:attribute name="class">insidebuttonCyan</xsl:attribute>
													</xsl:when>											
													<xsl:when test="./@foreground ='green'">
														<xsl:attribute name="class">insidebuttonGreen</xsl:attribute>
													</xsl:when>
													<xsl:when test="./@foreground ='magenta'">
														<xsl:attribute name="class">insidebuttonMagenta</xsl:attribute>
													</xsl:when>
													<xsl:when test="./@foreground ='red'">
														<xsl:attribute name="class">insidebuttonRed</xsl:attribute>
													</xsl:when>
													<xsl:when test="./@foreground ='white'">
														<xsl:attribute name="class">insidebuttonWhite</xsl:attribute>
													</xsl:when>
													<xsl:when test="./@foreground ='yellow'">
														<xsl:attribute name="class">insidebuttonYellow</xsl:attribute>
													</xsl:when>
													<xsl:otherwise>
														<xsl:attribute name="class">insidebutton</xsl:attribute>
													</xsl:otherwise>											
												</xsl:choose>

												<xsl:choose>
													<xsl:when test="@action='KEY_ENTER'">
														<xsl:attribute name="value">
															<xsl:value-of select="substring-after(@action, 'KEY_')"/>=<xsl:value-of select="."/>
														</xsl:attribute>
													</xsl:when>
													<xsl:otherwise>
														<xsl:attribute name="value">
															<xsl:value-of select="substring-after(@action, 'KEY_P')"/>=<xsl:value-of select="."/>
														</xsl:attribute>
													</xsl:otherwise>
												</xsl:choose>												                                            
											</xsl:when>
											<!-- Or not -->
											<xsl:otherwise>
												<xsl:attribute name="value">
													<xsl:value-of select="."/>
												</xsl:attribute>
											</xsl:otherwise>
										</xsl:choose>
									</input>
								</td>
								<td class="buttonr">
									<img border="0" height="1" src="images/pixel.gif" width="3"/>
								</td>
							</tr>
						</tbody>
					</table>
				</xsl:otherwise>
			</xsl:choose>
		</span>

	</xsl:template>

	<!-- TEMPLATE SNAMENU -->
	<xsl:template match="*[@type='snamenu']">
		<xsl:variable name="elDepth">
			<xsl:choose>
				<xsl:when test="ancestor::*[@type='panel']/@zOrder">
					<xsl:value-of select="10 - ancestor::*[@type='panel']/@zOrder"/>
				</xsl:when>
				<xsl:otherwise>1</xsl:otherwise>
			</xsl:choose>
		</xsl:variable>
		<xsl:for-each select="menu/menuitem">
			<xsl:if test="not(@foreground = @background)">
			<a href="javascript:doMenu('KEY_ENTER','{@id}')" style="line-height: {$coefy - 1}px">
				<img src="images/bullet_menu.png">
					<xsl:attribute name="style">
						position: absolute;
						<xsl:if test="@id&lt;10">
							left: <xsl:value-of select="./@column*$coefx+$offsetx - 13"/>px;
						</xsl:if>
						<xsl:if test="@id&gt;9">
							left: <xsl:value-of select="./@column*$coefx+$offsetx - 6"/>px;
						</xsl:if>
						top: <xsl:value-of select="./@line*$coefy + $offsety + 4"/>px;
						z-index: <xsl:value-of select="$elDepth * 10 + 1"/>;
						border: none;
					</xsl:attribute>
				</img>
			</a>	
                <xsl:if test="@id&lt;10">
						<span style="position:absolute;        left:{./@column*$coefx+$offsetx}px;        top:{./@line*$coefy + $offsety}px;       z-index: {$elDepth * 10 + 1};">
				<a class="menuItem" href="javascript:doMenu('KEY_ENTER','{@id}')" style="line-height: {$coefy - 1}px">
					<xsl:value-of select="@id"/>. <xsl:value-of select="@literal"/>
<!-- 					<xsl:if test="not(@command = '')">-<xsl:value-of select="@command"/> -->
<!-- 					</xsl:if> -->
				</a>
			</span>
						</xsl:if>
                  <xsl:if test="@id&gt;9">
						<span style="position:absolute;        left:{./@column*$coefx+$offsetx+7}px;        top:{./@line*$coefy + $offsety}px;       z-index: {$elDepth * 10 + 1};">
				<a class="menuItem" href="javascript:doMenu('KEY_ENTER','{@id}')" style="line-height: {$coefy - 1}px">
					<xsl:value-of select="@id"/>. <xsl:value-of select="@literal"/>
<!-- 					<xsl:if test="not(@command = '')">-<xsl:value-of select="@command"/> -->
<!-- 					</xsl:if> -->
				</a>
			</span>
						</xsl:if>
                
			
                
                
                
                
			</xsl:if>
		</xsl:for-each>
	</xsl:template>

	<!-- TEMPLATE PANEL -->
	<xsl:template match="*[@type='panel']">
		<xsl:param name="elDepth">
			<xsl:choose>
				<xsl:when test="@zOrder">
					<xsl:value-of select="10 - number(./@zOrder)"/>
				</xsl:when>
				<xsl:otherwise>
					0
				</xsl:otherwise>
			</xsl:choose>
		</xsl:param>
		<xsl:param name="offsety"/>
		<span class="myPanel">
		<!-- Background panel used for drop shadow graphical effect-->
		<span style="width: {@width*$coefx+$offsetw}px;       height:{@height*$coefy+$offseth}px;        position:absolute;       left:{./@column*$coefx+$offsetx + 4}px;       top:{./@line*$coefy + $offsety + 4}px;      z-index: {$elDepth * 10 - 1};">
			<xsl:choose>
				<xsl:when test="@shadow = 'true'">
					<xsl:attribute name="class">disabledPanelOmbre</xsl:attribute>
				</xsl:when>
				<xsl:otherwise>
					<xsl:attribute name="class">panelOmbre</xsl:attribute>
				</xsl:otherwise>
			</xsl:choose>
		</span>
		<!-- Front panel -->
		<span style="width:{@width*$coefx+$offsetw}px;       height:{@height*$coefy+$offseth}px;       position:absolute;       left:{./@column*$coefx + $offsetx}px;       top:{./@line*$coefy + $offsety}px;      z-index: {$elDepth * 10 };">
			<xsl:choose>
				<xsl:when test="@shadow = 'true'">
					<xsl:attribute name="class">disabledPanel</xsl:attribute>
				</xsl:when>
				<xsl:otherwise>
					<xsl:attribute name="class">panel</xsl:attribute>
				</xsl:otherwise>
			</xsl:choose>
		</span>
		<!-- Panel top title -->
		<span style="position:absolute;       left:{(number(./@column)+1)*$coefx + $offsetx}px;       top:{round((number(./@line) - 0.3)*$coefy + $offsety)}px;      z-index: {$elDepth * 10};">
			<xsl:choose>
				<xsl:when test="@shadow = 'true'">
					<xsl:attribute name="class">disabledPanelTopTitle</xsl:attribute>
				</xsl:when>
				<xsl:otherwise>
					<xsl:attribute name="class">panelTopTitle</xsl:attribute>
				</xsl:otherwise>
			</xsl:choose>
			<xsl:value-of select="./@topTitle"/>
		</span>
		<!-- Panel bottom title -->
		<span style="position:absolute;       left:{(number(./@column)+1)*$coefx + $offsetx}px;       top:{round((number(./@line) + number(./@height) - 0.3)*$coefy + $offsety)}px;">
			<xsl:choose>
				<xsl:when test="@shadow = 'true'">
					<xsl:attribute name="class">disabledPanelBottomTitle</xsl:attribute>
				</xsl:when>
				<xsl:otherwise>
					<xsl:attribute name="class">panelBottomTitle</xsl:attribute>
				</xsl:otherwise>
			</xsl:choose>
			<xsl:value-of select="./@bottomTitle"/>
		</span>
		<xsl:apply-templates>
			<xsl:with-param name="offsety" select="$offsety"/>
		</xsl:apply-templates>
		</span>
	</xsl:template>


	<!-- TEMPLATE TABLE -->
	<xsl:template match="*[@type='tableX']">
		<xsl:param name="offsety"/>
		<xsl:variable name="tableTop">
			<xsl:choose>
				<xsl:when test="./actionsTable">
					<xsl:value-of select="./@line - ./@titleheight - ./@offset - 1"/>
				</xsl:when>
				<xsl:otherwise>
					<xsl:value-of select="./@line - ./@titleheight - ./@offset"/>
				</xsl:otherwise>
			</xsl:choose>
		</xsl:variable>
		<xsl:variable name="elDepth">
			<xsl:choose>
				<xsl:when test="ancestor::*[@type='panel']/@zOrder">
					<xsl:value-of select="10 - ancestor::*[@type='panel']/@zOrder"/>
				</xsl:when>
				<xsl:otherwise>1</xsl:otherwise>
			</xsl:choose>
		</xsl:variable>
		<!-- Main container -->
		<div class="Grid" style="position: absolute;       left: {@column * $coefx}px;       top: {$tableTop * $coefy + $offsety}px;      width: {@width * $coefx}px;      z-index: {$elDepth * 10 + 1};">
			<!-- Titles table -->
			<table border="0" cellpadding="0" cellspacing="0" class="titletable" style="width: {@width * $coefx + $offsetw }px;">
				<tr>
					<xsl:apply-templates select="row/Title"/>
				</tr>
			</table>
			<xsl:choose>
				<!-- Data table when number of rows (including title row) is greater than table height -->
				<xsl:when test="count(row) &gt; @height">
<!-- 					<div id="_ScRoLl_" style="min-height:200px;height:200px;overflow-y:auto;overflow-x:hidden;"> -->
					<div id="_ScRoLl_" style="overflow-y: auto;overflow-x: visible;width:{@width * $coefx + $scrollwidth}px;height: {(@height - 0) * $coefy + 1}px;">
						<table border="0" cellpadding="0" cellspacing="0" class="data" style="width: {@width * $coefx}px;">
							<xsl:choose>
								<xsl:when test="$doSort = 'true'">
									<xsl:if test="$sortDataType = 'number'">
										<xsl:apply-templates select="row[position() &gt; 1]">
											<xsl:sort data-type="{$sortDataType}" order="{$sortOrder}" select="translate(child::*[position()=$sortColon],',','.')"/>
										</xsl:apply-templates>
									</xsl:if>
									<xsl:if test="$sortDataType = 'text'">
										<xsl:apply-templates select="row[position() &gt; 1]">
											<xsl:sort data-type="{$sortDataType}" order="{$sortOrder}" select="child::*[position()=$sortColon]"/>
										</xsl:apply-templates>
									</xsl:if>						
								</xsl:when>
								<xsl:otherwise>
									<xsl:apply-templates select="row[position() &gt; 1]"/>
								</xsl:otherwise>
							</xsl:choose>
						</table>
					</div>
				</xsl:when>
				<!-- Data table when number of rows (including title row) is equal or lower than table height -->
				<xsl:otherwise>
<!-- 					<div id="_ScRoLl_" style="min-height:300px;height:300px;overflow-y:auto;overflow-x: hidden;"> -->
						<div id="_ScRoLl_" style="overflow: visible;width:{@width * $coefx}px;height: {(count(row) - 1) * $coefy + 2}px;">
						<table border="0" cellpadding="0" cellspacing="0" class="data scroll" style="width: {round(@width * $coefx +$offsetw )}px;">
							<xsl:choose>
								<xsl:when test="$doSort = 'true'">
									<xsl:if test="$sortDataType = 'number'">
										<xsl:apply-templates select="row[position() &gt; 1]">
											<xsl:sort data-type="{$sortDataType}" order="{$sortOrder}" select="translate(child::*[position()=$sortColon],',','.')"/>
										</xsl:apply-templates>
									</xsl:if>
									<xsl:if test="$sortDataType = 'text'">
										<xsl:apply-templates select="row[position() &gt; 1]">
											<xsl:sort data-type="{$sortDataType}" order="{$sortOrder}" select="child::*[position()=$sortColon]"/>
										</xsl:apply-templates>
									</xsl:if>						
								</xsl:when>
								<xsl:otherwise>
									<xsl:apply-templates select="row[position() &gt; 1]"/>
								</xsl:otherwise>
							</xsl:choose>
						</table>
					</div>
				</xsl:otherwise>
			</xsl:choose>				
		</div>
		
		<!-- Table icons (page up/down, sort type... -->
		<span style="position:absolute;     left:{round((@column + 2 + @width)*$coefx+$offsetx) + $offsetw}px;      top:{round((@line - @titleheight)*$coefy + $offsety)}px;      width: {1*$iconSize}px;">
			<img alt="" onclick="doAction('KEY_ROLLUP')" onmouseout="tooltip.hide(this)" onmouseover="tooltip.show(this)" src="./images/arrow_top.png" style="cursor: pointer;" title="Page Up"/>
			<br/>
			<br/>
			<img alt="" onclick="doAction('KEY_ROLLDOWN')" onmouseout="tooltip.hide(this)" onmouseover="tooltip.show(this)" src="./images/arrow_down.png" style="cursor: pointer;" title="Page Down"/>
		</span>

		<!-- 
		<div class="pageUp">
			<img alt="" onclick="doAction('KEY_ROLLUP')" onmouseout="tooltip.hide(this)" onmouseover="tooltip.show(this)" title="Page Up"/>
		</div>
		
		<div class="pageDown">
			<img alt="" onclick="doAction('KEY_ROLLUP')" onmouseout="tooltip.hide(this)" onmouseover="tooltip.show(this)" src="./images/arrow_top.png" title="Page Up"/>
		</div>
		 -->
		<xsl:apply-templates select="actionsTable"/>
	</xsl:template>

	<!-- TEMPLATE ROW -->
	<xsl:template match="rowX" priority="1">
		<tr>
			<xsl:call-template name="mashupEventOnClick">
				<xsl:with-param name="ref" select=".."/> 
			</xsl:call-template>
			<xsl:if test="../actionsTable">
				<xsl:attribute name="ondblclick">getCurrentRowXml('<xsl:value-of select="../@column"/>', '<xsl:value-of select="../@line"/>', '<xsl:value-of select="./@index"/>', '|');</xsl:attribute>
			</xsl:if>

			<xsl:if test="(position() mod 2) = 0">
				<xsl:choose>
					<xsl:when test="starts-with(/document/@screenclass,'RepartitionCamions')">
						<xsl:attribute name="class">datarowevenTC</xsl:attribute>
					</xsl:when>
					<xsl:otherwise>
						<xsl:attribute name="class">dataroweven</xsl:attribute>
					</xsl:otherwise>
				</xsl:choose>
			</xsl:if>
			<xsl:if test="(position() mod 2) != 0">
				<xsl:choose>
					<xsl:when test="starts-with(/document/@screenclass,'RepartitionCamions')">
						<xsl:attribute name="class">datarowoddTC</xsl:attribute>
					</xsl:when>
					<xsl:otherwise>
						<xsl:attribute name="class">datarowodd</xsl:attribute>
					</xsl:otherwise>
				</xsl:choose>
			</xsl:if>
			<xsl:attribute name="onmouseover">
				over_tr(this);
				<xsl:call-template name="mashupTooltipOn">
					<xsl:with-param name="ref" select=".."/> 
				</xsl:call-template>
			</xsl:attribute>
			<xsl:attribute name="onmouseout">
				over_tr(this);
				<xsl:call-template name="mashupTooltipOff">
					<xsl:with-param name="ref" select=".."/> 
				</xsl:call-template>
			</xsl:attribute>			
			<xsl:for-each select="child::*">
				<xsl:variable name="index" select="position()"/>
				<td class="cell" style="width:{round(../../row[1]/Title[$index]/@size * $coefx)}px; height: {round($coefy)+10}px">
					<xsl:choose>
						<!-- Cell content when it is a field -->
						<xsl:when test="@type = 'field'">
							<xsl:attribute name="align">center</xsl:attribute>
							<xsl:if test="(@hasFocus ='true')">
								<input id="focus" type="hidden" value="{@name}"/>
							</xsl:if>
							<!-- Container SPAN. Used only for framework behaviour -->
							<span id="{@name}_n{../@page}parent">
								<input class="fieldText" id="{@name}_n{../@page}" maxlength="{@size}" name="{@name}" onfocus="getCurrentRowXml('{../../@column}', '{../../@line}', '{../@index}', '|'); currentFieldOnFocus=this.id; onInputClick(this);" style="width: {@size*$coefx}px;" type="text" value="{.}">

									<xsl:choose>
										<xsl:when test="@columnSelection = 'true'">
											<xsl:attribute name="onclick">show_mySelectMenu(event, this, document.getElementById('act_c<xsl:value-of select="../../@column"/>_l<xsl:value-of select="../../@line"/>'));</xsl:attribute>
											<!--xsl:attribute name="onblur">hide_mySelectMenu2(document.getElementById('act_c<xsl:value-of select="../../@column"/>_l<xsl:value-of select="../../@line"/>'))</xsl:attribute-->
										</xsl:when>
										<xsl:otherwise>
											<xsl:attribute name="onkeyup">checkInputChars(event, <xsl:value-of select="@size"/>, false, document.javelin_form.<xsl:value-of select="@name"/>);</xsl:attribute>
										</xsl:otherwise>
									</xsl:choose>
								</input>
							</span>
						</xsl:when>
						<!-- Cell content when it is a date field -->
						<xsl:when test="@type = 'date'">
							<xsl:attribute name="align">center</xsl:attribute>
							<xsl:if test="(@hasFocus ='true')">
								<input id="focus" type="hidden" value="{@name}"/>
							</xsl:if>
							<!-- Container SPAN. Used only for framework behaviour -->
							<span id="{@name}_n{../@page}parent">
								<input class="fieldText" id="{@name}_n{../@page}" maxlength="{@size}" name="{@name}" onfocus="getCurrentRowXml('{../../@column}', '{../../@line}', '{../@index}', '|'); currentFieldOnFocus=this.id; onInputClick(this);" onkeyup="checkInputChars(event, {@size}, false, document.javelin_form.{@name});" style="width: {@size*$coefx}px;" type="text" value="{.}"/>
							</span>
						</xsl:when>
						<!-- Cell content when it is a choice -->
						<xsl:when test="(@type = &quot;choice&quot;)">
							<select class="fixed" id="{@name}" name="{@name}" onfocus="currentFieldOnFocus=this.id">
								<xsl:for-each select="child::*">
									<option value="{@action}">
										<xsl:if test="(@selected = 'true')">
											<xsl:attribute name="selected">
												selected
											</xsl:attribute>
										</xsl:if>
										<xsl:value-of select="@value"/>
									</option>
								</xsl:for-each>
							</select>
							<xsl:if test="(@hasFocus ='true')">
								<script language="javascript" type="text/javascript">
									var elt = document.getElementsByTagName("SELECT");
									if(elt['<xsl:value-of select="@name"/>'])
										focusOnField = elt['<xsl:value-of select="@name"/>'];
								</script>
							</xsl:if>
						</xsl:when>
						<!-- Default Cell content (static...) -->
						<xsl:otherwise>
							<!-- Use this to force right-align numbers in cells -->
							<xsl:if test="string-length(.) = 0"> </xsl:if>
							<xsl:if test="string-length(.) != 0 and not(@foreground = @background)">
								<!-- Container SPAN. Used only for positioning and framework behaviour -->
								<span onclick="spanClick(this, {@column}, {@line})" style="white-space: nowrap;">
									<!-- Background color style SPAN -->
									<span class="bgcolor{@background}">
										<!-- Foreground color style SPAN -->
										<span class="color{@foreground}">
											<span class="tableText">
												<xsl:if test="starts-with(/document/@screenclass,'RepartitionCamions')">
													<xsl:attribute name="class">tableText trueColors</xsl:attribute>
												</xsl:if>
												<xsl:value-of select="."/> 
											</span>
										</span>
									</span>
								</span>
							</xsl:if>
						</xsl:otherwise>
					</xsl:choose>
				</td>
			</xsl:for-each>
		</tr>
	</xsl:template>

	<!-- TEMPLATE TITLE -->
	<xsl:template match="TitleX" priority="1">
		<td class="datatitle" style="width:{round(@size * $coefx)}px;height:{../../@titleheight * $coefy}px;" valign="bottom">
			<xsl:if test="string-length(.) = 0"> </xsl:if>
			<xsl:if test="string-length(.) != 0">
				<xsl:for-each select="block">
					<span class="datatitle">
						<xsl:value-of select="."/>
						<xsl:if test="position() != last()">
							<br/>
						</xsl:if>
					</span>
				</xsl:for-each>
			</xsl:if>
<!-- 			<img alt="" id="CoLiMg{position()}" src="images/ascending_sug.gif"/> -->
		</td>
	</xsl:template>

	<!-- TEMPLATE ACTIONSTABLE -->
	<xsl:template match="actionsTable" priority="1">
		<div class="actDiv" id="act_c{../@column}_l{../@line}" style="height: { 5 * $coefy}px ; z-index:1000;overflow-y:scroll; overflow-x:hidden;">
			<img alt="Fermer" height="8" onclick="hide_mySelectMenu(document.getElementById('act_c{../@column}_l{../@line}'));" src="images/croix.gif" width="8"/>
			<table cellpadding="0" cellspacing="0">
				<xsl:for-each select="./action">
					<tr>
						<td class="menuitems" onMouseout="lowlight(this);" onmouseover="highlight(this);">
							<xsl:choose>
								<xsl:when test="@key = 'null'">
									<xsl:attribute name="onclick">updateDataInObjSelected('<xsl:value-of select="@char"/>', document.getElementById('act_c<xsl:value-of select="../../@column"/>_l<xsl:value-of select="../../@line"/>'));</xsl:attribute>
								</xsl:when>
								<xsl:otherwise>
									<xsl:attribute name="onclick">updateDataInObjSelected('<xsl:value-of select="@char"/>', document.getElementById('act_c<xsl:value-of select="../../@column"/>_l<xsl:value-of select="../../@line"/>')); return doAction('<xsl:value-of select="@key"/>');</xsl:attribute>
								</xsl:otherwise>
							</xsl:choose>
							<xsl:value-of select="@label"/>
						</td>
						<td class="menuitems">
							(<xsl:value-of select="@char"/>)    
						</td>
					</tr>
				</xsl:for-each>
			</table>
		</div>
	</xsl:template>


	<!-- TEMPLATE CHOICE TEST-->
	<xsl:template match="*[@type='choice']" priority="1">
		<xsl:param name="fieldSize">
			<xsl:value-of select="@size"/>
		</xsl:param>
		<xsl:param name="offsety"/>
		<xsl:variable name="elDepth">
			<xsl:choose>
				<xsl:when test="ancestor::*[@type='panel']/@zOrder">
					<xsl:value-of select="10 - ancestor::*[@type='panel']/@zOrder"/>
				</xsl:when>
				<xsl:otherwise>1</xsl:otherwise>
			</xsl:choose>
		</xsl:variable>
		<xsl:if test="@radio = 'true'">
			<input class="fixed" id="{@name}" maxlength="{@size}" name="{@name}" onfocus="currentFieldOnFocus=this.id" size="{@size}" style="position:absolute; left:{./@column*$coefx+$offsetx}px; top:{./@line*$coefy + $offsety}px;z-index: {$elDepth * 10 + 1};" value="{.}"/>
			<span class="panel" style="position:absolute; left:{(@column+@size+1)*$coefx+$offsetx}px; top:{./@line*$coefy + $offsety}px; z-index: {$elDepth * 10 + 1};">
				<xsl:for-each select="child::*">
					<xsl:if test="@selected = 'true'">
						<input checked="true" id="{../@name}_r" name="{../@name}_r" onclick="document.javelin_form.{../@name}.value = '{@value}'" type="radio" value="{@value}"/>
						<xsl:value-of select="@value"/>
						 
					</xsl:if>
					<xsl:if test="string-length(@selected) = 0">
						<input id="{../@name}_r" name="{../@name}_r" onclick="document.javelin_form.{../@name}.value = '{@value}'" type="radio" value="{@value}"/>
						<xsl:value-of select="@value"/>
						 
					</xsl:if>
				</xsl:for-each>
			</span>
			<xsl:if test="(@hasFocus ='true')">
				<script language="javascript" type="text/javascript">
					var elt= document.getElementsByTagName("INPUT");
					if(elt['<xsl:value-of select="@name"/>']) focusOnField = elt['<xsl:value-of select="@name"/>'];
				</script>
			</xsl:if>
		</xsl:if>
		<xsl:if test="@radio = 'false'">
			<select class="fixed" id="{@name}" name="{@name}" onfocus="currentFieldOnFocus=this.id">
				<!-- GV-20260225: Correction decalage select -->
				<xsl:attribute name="style">position:absolute; left: <xsl:value-of select="@column*$coefx+$offsetx + 3"/>px; top: <xsl:value-of select="./@line*$coefy + $offsety + 2"/>px; z-index: <xsl:value-of select="$elDepth * 10 + 1"/>;</xsl:attribute>
				<!-- GV-20170926: Mise à jour du localstorage $noSat si changement par utilisateur -->
				<xsl:if test="(/document/@screenclass='DerogCalculTx') and (@name='__field_c64_l3')">
					<xsl:attribute name="onchange">updatePROSData(this, '<xsl:value-of select="/document/@context"/>_noSat');</xsl:attribute>
				</xsl:if>
				<!-- GV-20170926: Mise à jour du localstorage $noSun si changement par utilisateur -->
				<xsl:if test="(/document/@screenclass='DerogCalculTx') and (@name='__field_c64_l4')">
					<xsl:attribute name="onchange">updatePROSData(this, '<xsl:value-of select="/document/@context"/>_noSun');</xsl:attribute>
				</xsl:if>
				<xsl:for-each select="child::*">
					<option value="{@action}">
						<xsl:if test="(@selected = 'true')">
							<xsl:attribute name="selected">selected</xsl:attribute>
						</xsl:if>
						<xsl:value-of select="@value"/>
					</option>
				</xsl:for-each>
			</select>
			<xsl:if test="(@hasFocus ='true')">
				<script language="javascript" type="text/javascript">
					var elt= document.getElementsByTagName("SELECT");
					if(elt['<xsl:value-of select="@name"/>']) focusOnField = elt['<xsl:value-of select="@name"/>'];
				</script>
			</xsl:if>
		</xsl:if>
	</xsl:template>

	<!-- TEMPLATE SEPARATOR -->
	<xsl:template match="*[@type='separator']" priority="1">
		<span style="position:absolute; left:{./@column*$coefx+$offsetx}px; top:{./@line*$coefy + $offsety + 8}px; z-index: -1;">
			<hr style="width: {@width*$coefx}px;"/>
		</span>
	</xsl:template>

	<!-- TEMPLATE SLIDER -->
	<xsl:template match="*[@type='slider']">
		<xsl:param name="offsety"/>
		<xsl:variable name="elDepth">
			<xsl:choose>
				<xsl:when test="ancestor::*[@type='panel']/@zOrder">
					<xsl:value-of select="10 - ancestor::*[@type='panel']/@zOrder"/>
				</xsl:when>
				<xsl:otherwise>1</xsl:otherwise>
			</xsl:choose>
		</xsl:variable>
		<!-- Top arrow -->
		<span style="position:absolute;       left: {./@column*$coefx + $offsetx - 1}px;        top: {./@line*$coefy + $offsety}px;       z-index: {$elDepth * 10 + 1};">
			<img onclick="doAction('KEY_ROLLUP');" src="images/slider-arrow-top.gif" style="position:absolute;        width: {$coefx + 2}px;         height: {$coefy}px;"/>
		</span>
		<!-- Bottom arrow -->
		<span style="position:absolute;       left: {./@column*$coefx + $offsetx - 1}px;        top: {(number(./@line)+number(./@height)-1)*$coefy + $offsety}px;       z-index: {$elDepth * 10 + 1};">
			<img onclick="doAction('KEY_ROLLDOWN');" src="images/slider-arrow-bottom.gif" style="width: {$coefx + 2}px;        height: {$coefy}px;"/>
		</span>
		<!-- Empty bar -->
		<span style="position:absolute;       left: {./@column*$coefx + $offsetx - 1}px;        top: {(number(./@line)+1)*$coefy + $offsety}px;       width: {$coefx + 2}px;       height: {(number(@height)-2)*$coefy}px;       background-color: #D4D4D4;       z-index: {$elDepth * 10 + 1};">
		</span>
		<!-- Selection bar -->
		<span style="position:absolute;       left: {((number(./@column) - 0)*$coefx) + $offsetx}px;        top: {(number(./@line)+1+number(./@sliderPos))*$coefy + $offsety}px;       width: {$coefx - 2}px;       height: {(number(./@sliderSize)-1)*$coefy}px;       border: solid 1px #909090;       background-color : #D4D0C8;       z-index: {$elDepth * 10 + 1};">
		</span>
	</xsl:template>

	<!-- TEMPLATE TAB BOX -->
	<xsl:template match="*[@type='tabBox']">
		<xsl:param name="offsety"/>
		<xsl:variable name="elDepth">
			<xsl:choose>
				<xsl:when test="ancestor::*[@type='panel']/@zOrder">
					<xsl:value-of select="10 - ancestor::*[@type='panel']/@zOrder"/>
				</xsl:when>
				<xsl:otherwise>0</xsl:otherwise>
			</xsl:choose>
		</xsl:variable>
		<div style="position:absolute;      left:{./@column*$coefx+$offsetx}px;      top:{./@line*$coefy + $offsety + 1}px;      width: {./@width*$coefx}px;      margin: 0px;      z-index: {$elDepth * 10};">
			<table border="0" cellpadding="0" cellspacing="0" style="border-collapse: separate; height: {@height*$coefy}px;">
				<tbody>
					<tr>
						<xsl:for-each select="tabBox/*[@type='tabBoxItem']">
							<td class="tabSpacer"> </td>
							<xsl:choose>
								<xsl:when test="./@selected = 'true'">
									<td class="selectedTab"> <xsl:value-of select="."/> </td>
								</xsl:when>
								<xsl:otherwise>
									<td class="unselectedTab" onclick="currentFieldOnFocus='__field_c{./@column}_l{./@line}'; doAction('KEY_NPTUI');"> <xsl:value-of select="."/> </td>
								</xsl:otherwise>
							</xsl:choose>
						</xsl:for-each>
						<td class="tabSpacer" width="100%"> </td>
					</tr>
					<tr style="height: 100%">
						<td class="openedTab" colspan="{count(tabBox/block)*2 + 1}"> </td>
					</tr>
				</tbody>
			</table>
		</div>
		<xsl:apply-templates select="*[name() != 'tabBox']">
			<xsl:with-param name="offsety" select="$offsety"/>
		</xsl:apply-templates>
	</xsl:template>	

	<!-- TEMPLATE IMAGE -->
	<xsl:template match="*[@type='image']" priority="1">
		<span style="position:absolute; left:{./@column*$coefx+$offsetx}px; top:{./@line*$coefy + $offsety}px;">
			<img alt="{@alt}" src="{@url}">
				<xsl:if test="@width">
					<xsl:attribute name="width">
						<xsl:value-of select="@width*$coefx"/>
					</xsl:attribute>
					<xsl:attribute name="height">
						<xsl:value-of select="@height*$coefy"/>
					</xsl:attribute>
				</xsl:if>
				<xsl:if test="@action">
					<xsl:attribute name="style">cursor: hand;</xsl:attribute>
					<xsl:choose>
						<xsl:when test="@dotransaction='true'">
							<xsl:attribute name="onclick">document.getElementById('__transaction').value='<xsl:value-of select="@action"/>'; doAction('');</xsl:attribute>
						</xsl:when>
						<xsl:otherwise>
							<xsl:attribute name="onclick">doAction('<xsl:value-of select="@action"/>');</xsl:attribute>
						</xsl:otherwise>
					</xsl:choose>
				</xsl:if>
			</img>
		</span>
	</xsl:template>

	<!-- TEMPLATE COMMANDS -->
	<xsl:template match="commands[@type='container']" priority="1">
		<xsl:choose>
			<xsl:when test="$GroupActionButtons = 'true'">
			
			<div id="ShowMenu">
			
					<xsl:attribute name="style">
						display: table;
						z-index: 200;
						<xsl:if test="/document/@screenWidth='80'">
							display: none;
						</xsl:if>
					</xsl:attribute> 
     					<div class="bg" style="display: table-cell; vertical-align: middle;">
   						   <div class="menu_title_closed">
   						   		<img src="./images/icn_menu.png" style="margin-top:80px; width:18px; cursor:pointer;" title="Open Menu"/>
						        Menu
						        
								<!-- back button -->
								<!--  <div class="btn_back2" id="Back2">
									<a href="#" onclick="window.frames['container'].doAction('KEY_PF12');">Back</a>
								</div>  -->
					       </div> 

     				</div>
   				</div> 
   				
				<div class="commandsButtons" id="ShowHideMenu">
					<xsl:attribute name="style">
						z-index: 200;
						<xsl:if test="/document/@screenWidth='132'">
							display: none;
						</xsl:if>
					</xsl:attribute>			
				   <div>
				  <div>
				 		<div style="display: table; overflow: hidden; margin-top:66px; margin-left:20px; margin-bottom:15px">
						     <div class="menu_title" id="HideMenu" style="display: table-cell; vertical-align: top;">
						          Menu
						     </div>
							<!-- back button -->
							<!--  <div class="btn_back" id="Back1">
								<a href="#" onclick="window.frames['container'].doAction('KEY_PF12');">Back</a>
							</div>  -->
					     </div>
     				</div>
   				</div> 

				<!-- <div class = "MenuTable">MENU</div> -->
					<table cellpadding="0" cellspacing="0">
						
						<xsl:for-each select="*[@type='keyword']">
							<tr>
								<td>
									<table border="0" cellpadding="0" cellspacing="0" class="buttontab" style="width: 245px;" title="{.}">
										<xsl:attribute name="onclick">doAction('<xsl:value-of select="@action"/>');<xsl:call-template name="mashupEvent"/>
										</xsl:attribute>
										<tr>
											<!--  <td class="buttonl">
												<img border="0" height="1" src="images/pixel.gif" width="3"/>
											</td> -->
											<td class="buttonc">
												<input class="insidebutton" type="button">
													<xsl:choose>
														<!-- Display the action key (PF1=, PF14=, PA2=...) on the button -->
														<xsl:when test="$DisplayActionKey='true'">
															<xsl:attribute name="value">
																<xsl:value-of select="substring-after(@action, 'KEY_P')"/> <xsl:value-of select="."/>
															</xsl:attribute>
														</xsl:when>
														<!-- Or not -->
														<xsl:otherwise>
															<xsl:choose>
																<xsl:when test="string-length(.) &gt; 10 ">
																	<xsl:attribute name="value">
																		<xsl:value-of select="substring(., 0, 10)"/>...</xsl:attribute>
																</xsl:when>
																<xsl:otherwise>
																	<xsl:attribute name="value">
																		<xsl:value-of select="."/>
																	</xsl:attribute>
																</xsl:otherwise>
															</xsl:choose>
														</xsl:otherwise>
													</xsl:choose>
												</input>
											</td>
											<!--  <td class="buttonr">
												<img border="0" height="1" src="images/pixel.gif" width="3"/>
											</td> -->
										</tr>
									</table>
									<!--<input type="button" class="keywordButton" value="{.}" style="cursor: pointer; width: 80px;" onclick="doAction('{@action}');"/> -->
								</td>
							</tr>
						</xsl:for-each>
						<tr>
                            <td/>
                        </tr>
							<tr>
                            <td>
                                <table border="0" cellpadding="0" cellspacing="0" class="buttontab" onclick="document.getElementById('__transaction').value='gotoOffre'; doAction('');" style="width: 245px;" title="Recherche contrat client">
                                    <tbody>
                                        <tr>
                                            <td class="buttonc">
                                                <input class="insidebutton" type="button" value="Recherche contrat client"/>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </td>
                        </tr>
                        
						<xsl:if test="/document/@screenclass='AffichageContratInfoClient'">
							<tr>
                                <td>
                                    <table border="0" cellpadding="0" cellspacing="0" class="buttontab" style="width: 100%;" title="Envoyer Facture">
                                        <tbody>
                                            <tr>
                                                <td class="buttonc">
                                                    <input class="insidebutton" data-agence="{translate(/document//agence, '-', '')}" data-facture="{translate(/document//facture, '-', '')}" id="SendPDF" type="button" value="Envoyer Facture"/>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </td>
                            </tr>
						</xsl:if>
						<xsl:if test="/document/@screenclass='AffichageContratInfoClient'">
							<tr>
                                <td>
                                    <table border="0" cellpadding="0" cellspacing="0" class="buttontab" style="width: 100%;" title="Afficher Facture">
                                        <tbody>
                                            <tr>
                                                <td class="buttonc">
                                                    <input class="insidebutton" data-agence="{translate(/document//agence, '-', '')}" data-facture="{translate(/document//facture, '-', '')}" id="DisplayPDF" type="button" value="Afficher Facture"/>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </td>
                            </tr>
						</xsl:if>
					</table>
					<div id="menu-version">V.25.06.002</div>
				</div>
			</xsl:when>
			<xsl:otherwise>
				<xsl:apply-templates>
					<xsl:with-param name="offsety" select="$offsety"/>
				</xsl:apply-templates>
			</xsl:otherwise>
		</xsl:choose>
	</xsl:template>


	<!-- TEMPLATE RADIO PANEL -->
	<xsl:template match="*[@type='radioPanel']">
		<xsl:param name="offsety"/>
		<xsl:variable name="elDepth">
			<xsl:choose>
				<xsl:when test="ancestor::*[@type='panel']/@zOrder">
					<xsl:value-of select="10 - ancestor::*[@type='panel']/@zOrder"/>
				</xsl:when>
				<xsl:otherwise>1</xsl:otherwise>
			</xsl:choose>
		</xsl:variable>

		<xsl:for-each select="./item[not(@value = '')]">
			<!-- Container SPAN. Used only for positioning and framework behaviour -->
			<span id="radio__field_c{./@column}_l{./@line}_n1parent" style="position: absolute;       top: {@line*$coefy + $offsety}px;       left: {(@column)*$coefx + $offsetx}px;       z-index: {$elDepth * 10 + 1};">
				<input id="radio__field_c{./@column}_l{./@line}_n1" name="radio__field_c{../@column}_l{../@line}" onfocus="currentFieldOnFocus=this.id; onInputClick(this);" type="radio" value="{./@value}">
					<!-- Disable radio button if radioPanel is shadowed -->
					<xsl:if test="../@shadow = 'true'">
						<xsl:attribute name="disabled">disabled</xsl:attribute>
					</xsl:if>
					<xsl:choose>
						<xsl:when test="@selected='true'">
							<xsl:attribute name="checked">checked</xsl:attribute>
						</xsl:when>
						<xsl:otherwise>
							<xsl:choose>
								<xsl:when test="../@autoEnter = 'true'">
									<xsl:attribute name="onclick">currentFieldOnFocus='__field_c<xsl:value-of select="@column+2"/>_l<xsl:value-of select="@line"/>'; doAction('KEY_NPTUI');</xsl:attribute>
								</xsl:when>
								<xsl:otherwise>
									<xsl:attribute name="onclick">currentFieldOnFocus='__field_c<xsl:value-of select="@column+2"/>_l<xsl:value-of select="@line"/>'; doAction('');</xsl:attribute>
								</xsl:otherwise>
							</xsl:choose>
						</xsl:otherwise>
					</xsl:choose>
				</input>
				<!-- Background color style SPAN for label -->
				<span class="bgcolor{./@background}">
					<!-- Foreground color style SPAN -->
					<span class="color{./@foreground}">
						<span class="radioText">
							<xsl:value-of select="@value"/>
						</span>
					</span>
				</span>
			</span>
			<xsl:if test="(@hasFocus ='true')">
				<input id="focus" type="hidden" value="radio__field_c{./@column}_l{./@line}"/>
			</xsl:if>
		</xsl:for-each>
	</xsl:template>

	<!-- TEMPLATE CHECKBOXES PANEL -->
	<xsl:template match="*[@type='checkboxesPanel']">
		<xsl:param name="offsety"/>
		<xsl:variable name="elDepth">
			<xsl:choose>
				<xsl:when test="ancestor::*[@type='panel']/@zOrder">
					<xsl:value-of select="10 - ancestor::*[@type='panel']/@zOrder"/>
				</xsl:when>
				<xsl:otherwise>1</xsl:otherwise>
			</xsl:choose>
		</xsl:variable>

		<xsl:for-each select="./item">
			<!-- Container SPAN. Used only for positioning and framework behaviour -->
			<span id="checkbox__field_c{./@column}_l{./@line}_n1parent" style="position: absolute;         top: {./@line*$coefy + $offsety}px;          left: {./@column*$coefx + $offsetx}px;         z-index: {$elDepth * 10 + 1};">
				<input id="checkbox__field_c{./@column}_l{./@line}_n1" onfocus="currentFieldOnFocus=this.id; onInputClick(this);" type="checkbox">
					<xsl:choose>
						<xsl:when test="../@autoEnter = 'true'">
							<xsl:attribute name="onclick">currentFieldOnFocus='__field_c<xsl:value-of select="@column+2"/>_l<xsl:value-of select="@line"/>'; doAction('KEY_NPTUI');</xsl:attribute>
						</xsl:when>
						<xsl:otherwise>
							<xsl:attribute name="onclick">currentFieldOnFocus='__field_c<xsl:value-of select="@column+2"/>_l<xsl:value-of select="@line"/>'; doAction('');</xsl:attribute>
						</xsl:otherwise>
					</xsl:choose>
					<!-- Hide shadowed checkboxes -->
					<xsl:if test="../@shadow = 'true'">
						<xsl:attribute name="disabled">disabled</xsl:attribute>
					</xsl:if>
					<xsl:if test="@checked='true'">
						<xsl:attribute name="checked">checked</xsl:attribute>
					</xsl:if>
				</input>
				<!-- Background color style SPAN for label -->
				<span class="bgcolor{./@background}">
					<!-- Foreground color style SPAN -->
					<span class="color{./@foreground}">
						<xsl:value-of select="."/>
					</span>
				</span>
			</span>
			<xsl:if test="@hasFocus ='true'">
				<input id="focus" type="hidden" value="checkbox__field_c{./@column}_l{./@line}"/>
			</xsl:if>
		</xsl:for-each>
	</xsl:template>


	<!-- TEMPLATE MENU -->
	<xsl:template match="*[@type='menu']">
		<xsl:param name="offsety"/>
		<xsl:variable name="elDepth">
			<xsl:choose>
				<xsl:when test="ancestor::*[@type='panel']/@zOrder">
					<xsl:value-of select="10 - ancestor::*[@type='panel']/@zOrder"/>
				</xsl:when>
				<xsl:otherwise>1</xsl:otherwise>
			</xsl:choose>
		</xsl:variable>

		<!-- Container SPAN. Used only for positioning and framework behaviour -->
		<span style="position:absolute;        left:{./@column*$coefx+$offsetx}px;        top:{./@line*$coefy + $offsety}px;       z-index: {$elDepth * 10 + 1};">
			<div class="extmenu">
				<table cellspacing="0">
					<tbody>
						<tr>
							<xsl:apply-templates>
								<xsl:with-param name="offsety" select="$offsety + ancestor::blocks[1]/@page-number * $coefy * 24"/>
								<xsl:with-param name="extended">true</xsl:with-param>
								<xsl:with-param name="elDepth">
									<xsl:value-of select="$elDepth"/>
								</xsl:with-param>
							</xsl:apply-templates>
						</tr>
					</tbody>
				</table>
			</div>
		</span>
	</xsl:template>

	<!-- TEMPLATE MENUITEM -->
	<xsl:template match="*[@type='menuItem']">
		<xsl:param name="offsety"/>
		<xsl:param name="elDepth"/>
		<td>
			<table border="0" cellpadding="0" cellspacing="0" style="width: auto;">
				<tbody>
					<tr>
						<td>
							<img height="1" src="../images/pixel.gif" width="3"/>
						</td>
						<td style="vertical-align: middle; text-align: left;">
							<em class="extmenu">
								<input class="extmenu" type="button" value="    {@value}">
									<xsl:attribute name="onclick">currentFieldOnFocus='__field_c<xsl:value-of select="./@column"/>_l<xsl:value-of select="./@line"/>'; doAction('KEY_ENTER');</xsl:attribute>
								</input>
							</em>
						</td>
						<td>
							<img height="1" src="../images/pixel.gif" width="3"/>
						</td>
					</tr>
				</tbody>
			</table>
		</td>
	</xsl:template>
</xsl:stylesheet>
