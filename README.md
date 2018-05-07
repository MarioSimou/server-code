# server-code


**1. UCL Question System App**

*- Description*

The UCL Question System app is a browsed-based web application that works in conjunction with the UCL Quiz app. The main operation of the application is data collection and the population of the back-end database that is used by the UCL Quiz app. In particular, it enables to a user to record POIs in which information has been attached that is employed by the quiz app.

*- Target Audience*

The web application can be used by anyone of any age. The user does not need to have any experience in order to be able to use the application.

*- Product Goals*

The goal of the current app is to enhance the capabilities of ULC Quiz app, so that a user can easily populate the POI dataset that is present in the database. As a result, the dataset is constantly expanded and no more procedures are needed to adopt the changes that are happening in the dataset. 

*- Tech Details*

The web application is compatible with the following browsers:
-Google Chrome Version 66.0.3359.139 (64-bit)
-Google Chrome Version 48.0.2564.109 (64-bit)
-Mozilla Firefox Quantum Version 59.0.2 (64-bit)
-Mozilla Firefox Quantum Version 45.2.0 (64-bit)
-Internet Explorer 11 Version 11.0.9600.18920 (64-bit) 

A user can access the application in the following link:

> http://developer.cege.ucl.ac.uk:31277/


*- System Architecture*

While a variety of models are available about how the communication between a client and a server is constructed, the three-tier architecture was chosen and implemented for the purpose of our assignment. In these terms, the created app, which comprises the presentation tier of our architecture, displays information related to the requirements and specifications of the project, and any user-interface interaction is processed by the application tier and send it on the data tier. At this layer, the server and the database are maintained. 

*- Constraints*

The map display has been set such only that the UCL campus is shown. Therefore, the app will not work normally if it is launched to an area outside of UCL campus. 

*1.1 Featureset*

The main functionality of the web application is based on the Leaflet library, using a variety of functionalities that the library is compatible with. Plugins are also employed to improve the capabilities of the application.
The UCL Question System app is equipped with a variety of commands that are described below:

Search Command 
A commands that enables on a user to search a building based on its corresponded question. The result is indicated with a marker on the map.
This command has been built using the leaflet search plugin.

Clean Command
Markers that may remain from a search process are cleaned from the map. This command uses the removeFrom function to remove the markers from the map.

Full Zoom Command 
The map zoom changes so that a full display of the data is given. This command uses the fitBounds, and getBounds methods to set the bounding boxes of the map display and the buildings dataset equal.

Geolocation Command
Enables the geolocation of the user and marks his/her location on a map. The accuracy of the geolocation is shown with a buffer around the marked position of the user. Based on the user desire, the geolocation command can be activated or deactivated.
The functionality of the geolocation command is based on the locate, stopLocate methods, and locationfound and locationerror events. The geolocation has been adjusted using the desired location options.

Labels - Pop up windows
While both images below show the same content, their foundations are based on  different principles and, therefore, they are categorised in two distinct label types. The left image is a class-based label, whereas the right image is a popup-based label.  
1) Class-based:
The construction of this label type is based on leaflet classes extension. In particular, a leaflet class is extended and a div element is created using the L.DomUti utility function of Leaflet to communicate with the DOM tree. At this point, an update method is set on the div element, as well as mouse events that permit its update when the mouse moves.
2) Popup-based: 
This type of label is created using the L.popup class that is by default provided by leaflet. At this case, a pop up is created and then is attached to the geojson layer. The pointToLayer method is employed to append the pop up on the geojson layer.  









Fig. 1: The two types of labels that are employed for the UCL Question System App.

Clusters
The UCL POIs are shown as clusters using the marker cluster plugin. For different zoom levels, the map display is adapted so that a certain portion of buildings is shown.














Fig. 2: The figure shows how the map display is adapted in order to show a certain portion of the POIs. The non-shown POIs are indicated as clusters.

Form
Initially, with a double click on the map, a pop up window with two possible options is displayed (Fig. 3). This has been created by binding a pop up on a marker that is constructed when the user click on the map. Selecting the Upload option, a form is loaded through an AJAX GET request, which uses the XMLHttpRequest function. Using Javascript and interacting with the DOM tree of the document, the HTML elements of the form are gained, and therefore, the user’s information is POSTed back on the server, after the form is submitted.   


Fig. 3: The process of form loading is shown in this figure.
