


# lib_fill_odt_pdf

ODFToolkit and PDF library


For more technical informations : [documentation](./project.md)

- [Installation](#installation)
- [Sequences](#sequences)
    - [clean_outputs](#clean_outputs)
    - [demo_export_data_to_sheet](#demo_export_data_to_sheet)
    - [demo_u_fill_odt](#demo_u_fill_odt)
    - [demo_u_fill_pdf](#demo_u_fill_pdf)
    - [demo_u_fill_table_odt](#demo_u_fill_table_odt)
    - [demo_u_fill_table_template_odt](#demo_u_fill_table_template_odt)
    - [fill_odt](#fill_odt)
    - [fill_pdf](#fill_pdf)
    - [getInstalledFonts](#getinstalledfonts)
    - [init_config](#init_config)
    - [metadata_pdf](#metadata_pdf)
    - [odt2pdf](#odt2pdf)
    - [soffice_odt2pdf](#soffice_odt2pdf)
    - [u_create_ods](#u_create_ods)
    - [u_create_odt](#u_create_odt)
    - [u_export_data_to_sheet](#u_export_data_to_sheet)
    - [u_fill_odt](#u_fill_odt)
    - [u_fill_pdf](#u_fill_pdf)
    - [u_read_odt](#u_read_odt)
    - [u_read_pdf](#u_read_pdf)


## Installation

1. In your Convertigo Studio use `File->Import->Convertigo->Convertigo Project` and hit the `Next` button
2. In the dialog `Project remote URL` field, paste the text below:
   <table>
     <tr><td>Usage</td><td>Click the copy button</td></tr>
     <tr><td>To contribute</td><td>

     ```
     lib_fill_odt_pdf=https://github.com/convertigo/c8oprj-lib-odftoolkit.git:branch=master
     ```
     </td></tr>
     <tr><td>To simply use</td><td>

     ```
     lib_fill_odt_pdf=https://github.com/convertigo/c8oprj-lib-odftoolkit/archive/master.zip
     ```
     </td></tr>
    </table>
3. Click the `Finish` button. This will automatically import the __lib_fill_odt_pdf__ project


## Sequences

### clean_outputs

Clean the generated files. Can be used in a Convertigo scheduled job to automate the process. Variables : 'max_time' => delete only files older than x ms. 'all' => Delete all files in folder even in a max_time is defined. 'target' => Folder path containing the files to delete. Can use "./",  ".//" or absolute path syntax.

**variables**

<table>
<tr>
<th>name</th><th>comment</th>
</tr>
<tr>
<td>all</td><td>Set value to 'true' to directly delete all files whatever last modified date they have. Default is 'false', it only deletes files older than 'max_time'</td>
</tr>
<tr>
<td>max_time</td><td>Define the maximum time in millisecond before deleting the file. Default is 86400000ms (24h). Only works if 'all' is 'false'</td>
</tr>
<tr>
<td>target</td><td></td>
</tr>
</table>

### demo_export_data_to_sheet

Demo sequence to create a spreadhseet filled with data.

### demo_u_fill_odt

Demo sequence to fill an ODT template file.

### demo_u_fill_pdf

Demo sequence to fill an ODT template file.

### demo_u_fill_table_odt

Demo sequence to fill an ODT template file.

### demo_u_fill_table_template_odt

Demo sequence to fill an ODT template file.

### fill_odt

Fills an ODT template file (Deprecated).
Place your template files in .//templates/odf folder.

**variables**

<table>
<tr>
<th>name</th><th>comment</th>
</tr>
<tr>
<td>date</td><td>Date</td>
</tr>
<tr>
<td>input_filename</td><td>Input ODT template file name to fill (without extension, '.doc' is automatically added but format is ODT and can be opened as a Ms Word file or OpenOffice). 
Put your templates in <project_folder>/templates/odf</td>
</tr>
<tr>
<td>objet</td><td>Subject</td>
</tr>
<tr>
<td>output_filename</td><td>Output ODT file name (without extension). 
'.doc' is automatically added to filename to be opened by Ms Word or OpenOffice.</td>
</tr>
<tr>
<td>signature</td><td>Signature. 
Absolute Image file path.</td>
</tr>
<tr>
<td>texte</td><td>Main Body Text</td>
</tr>
</table>

### fill_pdf

Fills a PDF template file (deprecated). 
Place your template file in .//templates/pdf folder.

**variables**

<table>
<tr>
<th>name</th><th>comment</th>
</tr>
<tr>
<td>date</td><td>Date</td>
</tr>
<tr>
<td>input_filename</td><td>Input PDF template file name to fill (without extension, '.pdf' is assumed). 
Put your templates in <project_folder>/templates/pdf</td>
</tr>
<tr>
<td>objet</td><td>Subject</td>
</tr>
<tr>
<td>output_filename</td><td>Output PDF file name (without extension). 
'.pdf' is automatically added to filename.</td>
</tr>
<tr>
<td>signature</td><td>Signature. 
_ Image file. Can be an aboslute path file or relative to project (.//) or workspace (./). 
_ B64 string.</td>
</tr>
<tr>
<td>texte</td><td>Main Body Text</td>
</tr>
</table>

### getInstalledFonts

Get installed Fonts

### init_config

Auto start sequence to install some required fonts for Docker Linux Platform.

### metadata_pdf

Get the metadata of the PDF file.

**variables**

<table>
<tr>
<th>name</th><th>comment</th>
</tr>
<tr>
<td>input_filename</td><td>ODT input template file name to fill. 
Can be an absolute path or a relative Convertigo path: 
".//" is relative to the project's path. 
"./" is relative to the workspace path.</td>
</tr>
<tr>
<td>mode</td><td>Read or Write PDF metadata. To write to PDF file, use 'w' or 'write'. output_filename must not be left blank or empty.</td>
</tr>
<tr>
<td>new_ap_canAssembleDocument</td><td>Permission to assemble the document</td>
</tr>
<tr>
<td>new_ap_canExtractContent</td><td>Permission to extract content from the document</td>
</tr>
<tr>
<td>new_ap_canExtractForAccessibility</td><td>Permission to extract content for accessibility purposes</td>
</tr>
<tr>
<td>new_ap_canFillInForm</td><td>Permission to fill in forms in the document</td>
</tr>
<tr>
<td>new_ap_canModify</td><td>Permission to modify the document</td>
</tr>
<tr>
<td>new_ap_canModifyAnnotations</td><td>Permission to modify annotations</td>
</tr>
<tr>
<td>new_ap_canPrint</td><td>Permission to print the document</td>
</tr>
<tr>
<td>new_ap_canPrintHighQuality</td><td>Permission to print the document faithfully</td>
</tr>
<tr>
<td>new_ap_ForcePolicy</td><td>Force a new protection policy according to password, new_user_password and new_owner_password.</td>
</tr>
<tr>
<td>new_author</td><td>Set the AUTHOR metadata</td>
</tr>
<tr>
<td>new_creation_date</td><td>Set the CREATION DATE metadata</td>
</tr>
<tr>
<td>new_creator</td><td>Set the CREATOR metadata</td>
</tr>
<tr>
<td>new_keywords</td><td>Set the KEYWORDS metadata</td>
</tr>
<tr>
<td>new_modification_date</td><td>Set the MODIFICATION DATE metadata</td>
</tr>
<tr>
<td>new_owner_password</td><td>Owner password of the protected PDF file.</td>
</tr>
<tr>
<td>new_producer</td><td>Set the PRODUCER metadata</td>
</tr>
<tr>
<td>new_setProtection</td><td>If "true", it will protect the PDF file with the given 'new_user_password' and 'new_owner_password', defaulting to 'password' variable if one is missing.</td>
</tr>
<tr>
<td>new_subject</td><td>Set the SUBJECT metadata</td>
</tr>
<tr>
<td>new_title</td><td>Set the TITLE metadata</td>
</tr>
<tr>
<td>new_trapped</td><td>Set the TRAPPED metadata</td>
</tr>
<tr>
<td>new_user_password</td><td>User password of the protected PDF file.</td>
</tr>
<tr>
<td>new_version</td><td>Set the VERSION metadata</td>
</tr>
<tr>
<td>output_filename</td><td>ODT output file path. 
Can be an absolute path or a relative Convertigo path: 
".//" is relative to the project's path. 
"./" is relative to the workspace path.</td>
</tr>
<tr>
<td>password</td><td>Password of the protected PDF file.</td>
</tr>
</table>

### odt2pdf

Convert an ODT file to a PDF file

**variables**

<table>
<tr>
<th>name</th><th>comment</th>
</tr>
<tr>
<td>font_aliases</td><td>Font aliases according to font_paths values.</td>
</tr>
<tr>
<td>font_paths</td><td>Font absolute paths to register.</td>
</tr>
<tr>
<td>fonts_folder</td><td>Folder absolute path containing the Fonts to register. Font name alias computed from file name. Use font_paths and font_aliases to manually declare fonts instead.</td>
</tr>
<tr>
<td>input_filename</td><td>ODT input file name to convert. 
Can be an absolute path or a relative Convertigo path: 
".//" is relative to the project's path. 
"./" is relative to the workspace path.</td>
</tr>
<tr>
<td>output_filename</td><td>PDF output file path. 
Can be an absolute path or a relative Convertigo path: 
".//" is relative to the project's path. 
"./" is relative to the workspace path.</td>
</tr>
</table>

### soffice_odt2pdf

Convert an ODT file to a PDF file using LibreOffice

**variables**

<table>
<tr>
<th>name</th><th>comment</th>
</tr>
<tr>
<td>input_filename</td><td>ODT input file name to convert. 
Can be an absolute path or a relative Convertigo path: 
".//" is relative to the project's path. 
"./" is relative to the workspace path.</td>
</tr>
<tr>
<td>output_filename</td><td>PDF output file path. 
Can be an absolute path or a relative Convertigo path: 
".//" is relative to the project's path. 
"./" is relative to the workspace path.</td>
</tr>
<tr>
<td>soffice_path</td><td>LibreOffice 'soffice' absolute path. Default is 'soffice'</td>
</tr>
</table>

### u_create_ods

Create a new Calc document fr om a structured JSON.

**variables**

<table>
<tr>
<th>name</th><th>comment</th>
</tr>
<tr>
<td>output_filename</td><td>ODS output file path. 
Can be an absolute path or a relative Convertigo path: 
".//" is relative to the project's path. 
"./" is relative to the workspace path.</td>
</tr>
<tr>
<td>rows</td><td>Structured object as follow : 

{
	"sheets":
	[
		"name": "&lt;Sheet name&gt;",
		"header": 
		{
			"style": //Optional
			{
				"bgColor": "&lt;Background color&gt;",
				"HAlign": "&lt;Horizontal alignment&gt;",
				"VAlign": "&lt;Vertical alignment&gt;",
				"fontName": "&lt;Font name&gt;",
				"fontStyle": "&lt;Font style&gt;",
				"fontColor": "&lt;Font color&gt;",
				"fontSize": "&lt;Font size&gt;"
			},
			"value": [&lt;Array of strings&gt;]
		},
		"data":
		[
			[
				{
					"value" : "&lt;Cell content&gt;",
					"type": "&lt;Cell type&gt;"
				}
			]
		]
	]
}</td>
</tr>
</table>

### u_create_odt

Create a new Text document with a table. Works the same as u_fill_odt sequence.

**variables**

<table>
<tr>
<th>name</th><th>comment</th>
</tr>
<tr>
<td>markers</td><td>Structured array as follow : 

[
	{
		"tag": "&lt;tag name in template file to replace with 'value' key&gt;",
		"type": "&lt;tag type. 'image' or 'string' supported&gt;",
		"value": "&lt;replacement string or image absolute path&gt;"
	}
]></td>
</tr>
<tr>
<td>output_filename</td><td>Output ODT file name (without extension). 
'.odt' is automatically added to filename to be opened by Ms Word or LibreOffice.</td>
</tr>
</table>

### u_export_data_to_sheet

Use to export data to various file format (txt, csv, xlsx, ods...). Uses the SheetJS CE framework.

**Output**

<table>
<tr>
<th>name</th><th>comment</th>
</tr>
<tr>
<td>file</td><td>local_path -> Server local file path.<br> url_path -> Server file path url.</td>
</tr>
<tr>
<td>attachment</td><td>@local-url -> Server local file path.<br>@name -> File name.</td>
</tr>
<tr>
<td>success</td><td>true/false</td>
</tr>
<tr>
<td>error</td><td>Error message.</td>
</tr>
</table>

**variables**

<table>
<tr>
<th>name</th><th>comment</th>
</tr>
<tr>
<td>book_type</td><td>Type of workbook to export to. Default is XLSX.</td>
</tr>
<tr>
<td>output_filename</td><td>Output file path. 
Can be an absolute path or a relative Convertigo path: 
".//" is relative to the project's path. 
"./" is relative to the workspace pat</td>
</tr>
<tr>
<td>rows</td><td>Structured object as follow: 

{
	"sheets":
	[
		"name": "&lt;Sheet name&gt;",
		"header": 
		{
			"style": //Optional
			{
				"bgColor": "&lt;Background color&gt;",
				"HAlign": "&lt;Horizontal alignment&gt;",
				"VAlign": "&lt;Vertical alignment&gt;",
				"fontName": "&lt;Font name&gt;",
				"fontStyle": "&lt;Font style&gt;",
				"fontColor": "&lt;Font color&gt;",
				"fontSize": "&lt;Font size&gt;"
			},
			"value": [&lt;Array of strings&gt;]
		},
		"data":
		[
			[
				{
					"value" : "&lt;Cell content&gt;",
					"type": "&lt;Cell type&gt;"
				}
			]
		]
	]
}</td>
</tr>
</table>

### u_fill_odt

Fills an ODT template file (Universal).
Place your template files in .//templates/odf folder.
It will output an attachment structure and if you call it with .bin requester it will trigger a download in the client Browser.

**variables**

<table>
<tr>
<th>name</th><th>comment</th>
</tr>
<tr>
<td>break_before</td><td>Define the BreakBefore table style property. Can be 'auto', 'column' or 'page'. Default is set to 'page'.</td>
</tr>
<tr>
<td>input_filename</td><td>ODT input template file name to fill. 
Can be an absolute path or a relative Convertigo path: 
".//" is relative to the project's path. 
"./" is relative to the workspace path.</td>
</tr>
<tr>
<td>markers</td><td>Structured array as follow : 

[
	{
		"tag": "&lt;tag name in template file to replace with 'value' key&gt;",
		"type": "&lt;tag type. 'image', 'string', 'span' (font styles), 'table' and 'tableh' (title row) supported&gt;",
		"style": "&lt;Font styles for span or table cells. Look at demo_u_fill_odt for syntax&gt;"
		"value": "&lt;replacement string or image absolute path&gt;"
	}
]></td>
</tr>
<tr>
<td>meta_creation_date</td><td>Defines the Creation Date metadata in the ODT Document. ISO 8601 date format: yyy-MM-dd'T'HH:mm:ss. If null or empty, does not change it.</td>
</tr>
<tr>
<td>meta_description</td><td>Defines the Description metadata in the ODT Document. If null, does not change it. If empty, removes it.</td>
</tr>
<tr>
<td>meta_initial_creator</td><td>Defines the Creator metadata in the ODT Document. If null, does not change it. If empty, removes it.</td>
</tr>
<tr>
<td>meta_keywords</td><td>Defines the Keywords metadata in the ODT Document. Multi-valued variable. Each entry is a keyword. If null, does not change it. If empty, removes it.</td>
</tr>
<tr>
<td>meta_subject</td><td>Defines the Subject metadata in the ODT Document. If null, does not change it. If empty, removes it.</td>
</tr>
<tr>
<td>meta_title</td><td>Defines the Title metadata in the ODT Document. If null, does not change it. If empty, removes it.</td>
</tr>
<tr>
<td>output_filename</td><td>ODT output file path. 
Can be an absolute path or a relative Convertigo path: 
".//" is relative to the project's path. 
"./" is relative to the workspace path.</td>
</tr>
<tr>
<td>table_template_file</td><td>Path of the ODT file containing a table to use as a template.</td>
</tr>
<tr>
<td>table_template_name</td><td>Name of the template table.</td>
</tr>
</table>

### u_fill_pdf

Fills a PDF template file (Universal). 
Place your template file in .//templates/pdf folder.
It will output an attachment structure and if you call it with .bin requester it will trigger a download in the client Browser.

**variables**

<table>
<tr>
<th>name</th><th>comment</th>
</tr>
<tr>
<td>input_filename</td><td>PDF input file path. 
Can be an absolute path or a relative Convertigo path: 
".//" is relative to the project's path. 
"./" is relative to the workspace path.</td>
</tr>
<tr>
<td>markers</td><td>Structured array as follow : 

[
	{
		"tag": "&lt;tag name in template file to replace with 'value' key&gt;",
		"type": "&lt;tag type. 'image' or 'string' supported&gt;",
		"value": "&lt;replacement string or image absolute path&gt;"
	}
]</td>
</tr>
<tr>
<td>output_filename</td><td>PDF output file path. 
Can be an absolute path or a relative Convertigo path: 
".//" is relative to the project's path. 
"./" is relative to the workspace path.</td>
</tr>
</table>

### u_read_odt

Dev sequence to read a table from a Text Document.

**variables**

<table>
<tr>
<th>name</th><th>comment</th>
</tr>
<tr>
<td>markers</td><td>Structured array as follow : 

[
	{
		"tag": "&lt;tag name in template file to replace with 'value' key&gt;",
		"type": "&lt;tag type. 'image' or 'string' supported&gt;",
		"value": "&lt;replacement string or image absolute path&gt;"
	}
]></td>
</tr>
<tr>
<td>output_filename</td><td>Output ODT file name (without extension). 
'.odt' is automatically added to filename to be opened by Ms Word or LibreOffice.</td>
</tr>
</table>

### u_read_pdf

Reads a PDF file (Universal). 
Place your template file in .//read folder.
It will output the following structure : { "array": [ { "name": "<technical PDF Form name>", "value": "<PDF Form value>", "type": "PDF Form type" }, ...]

**variables**

<table>
<tr>
<th>name</th><th>comment</th>
</tr>
<tr>
<td>input_filename</td><td>PDF input file name to read the technical fields name and value.
Can be an absolute path or a relative Convertigo path.
".//" is relative to the project's path.
"./" is relative to the workspace path.</td>
</tr>
</table>



