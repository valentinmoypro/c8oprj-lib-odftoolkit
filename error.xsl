<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform" xmlns:lxslt="http://xml.apache.org/xslt">
	<xsl:output method="html" indent="no" media-type="text/html" encoding="UTF-8" />
	<!-- TEMPLATE DOCUMENT -->
	<xsl:template match="error">
		<div id="generated_page">
			<form name="javelin_form" method="post" onSubmit="return false;">
				<input type="hidden" name="__javelin_current_field" id="__javelin_current_field" />
				<input type="hidden" name="__javelin_action" />
				<input type="hidden" name="__transaction" value="{@transaction}" />
				<input type="hidden" name="__sesskey" />
				<input type="hidden" name="__context" />
				<input type="hidden" name="__signature" id="__signature" />
				<input type="hidden" name="resize" id="resize" value="false" />
			</form>
			<div style="
                       border-radius: 25px;
                       background-color: #ffffff;
                       box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.10);
                       position:absolute;
                       width:40%;
                       height:20%;
                       left:30%;
                       top:40%;">
               
           <p style="font-family: Helvetica; text-align:center; width:100%; display:flex; justify-content:center; position: absolute; top: 25%; font-size:1.5em;">
               Une erreur est survenue.<br/>
               Veuillez rafraîchir la page de votre navigateur Internet.<br/>
			   Si l'erreur persiste, contactez votre support Helpdesk. 
           </p>
           </div>
		</div>
	</xsl:template>
</xsl:stylesheet>
