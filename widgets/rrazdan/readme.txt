-This application works best in Firefox. Responsive design elements are present, however it is best viewed in a browser with inner window size of 1440 x 822 
(this is equivalent to maximum browser size for 15'' Macbook Pro). 

-Effort was made for cross browser compatibility, thus the appilication functions at relatively the same level in Chrome and Safari.

-Note, the "About widget" link becomes hidden when you shrink browser beyond a certain width. Furthermore, the menu items container at the bottom of the map attains a scroll bar if the width of browser window is too small. These design decisions were made in an effort to provide best user experience regardless of screen constrains (ie. application of responsive design).   

-Widget's main features:
	- 'About' link
	- Introductory page with unique widget logo and clear directions for the user
	- Origin/Destination drop down with stylized 'Generate' button
	- Animated entrance of markers when the map is first generated
	- Two marker images are randomly chosen from a host of possible images everytime the user presses 'Generate'
	- A unique hue and saturation is chosen for the map everytime the user presses 'Generate'
	- Preselected color options with varying hue/saturation/level of detail on map; user can manually select one of these  
	- The user can identify the origin/destination marker along with it's address by clicking 'Origin'/'Destination' from the map menu located below the map. This animates the origin marker and displays the infobox. 
	- 'Reset' brings the map/map menu back to the state it was in after pressing 'Generate'
	- 'Time' displays a pop up box with car travel duration between origin-destination
	- 'Route' allows user to toggle between displaying the route. A unique color for the route is chosen everytime user presses 'Generate'

-University of Waterloo Open Data API and Google Maps API was used.

-Colorbox.js was used to create the pop up box effect. The colorbox.js script was modified so that the pop up appears within the app regardless of the app's position.

-Infobox.js was used to create the map marker messages 

-Bootstrap styles were utilized where appropriate.

-Widget Description:
The 'UW Creative Map' generates artistic maps using UW buildings as the origin and destination. Each time the user clicks generate, a random route color and map is chosen. The user can also manually choose from a selection of pre formatted maps.
Moreover, this widget provides sleek map-based services such as animating location markers, identifying building addresses, providing travel durations and route information as well as a reset functionality.