
function rrazdan(userid, htmlId) {

    //for general aesthetic purposes to remove highlighting of elements when double click on text
    function clearSelection() {
        if(document.selection && document.selection.empty) {
            document.selection.empty();
        } else if(window.getSelection) {
            var sel = window.getSelection();
            sel.removeAllRanges();
        }
    }
    //make sure scripts are added only once
    var firstTime = true;
    var calledFromGenerateButton = false;
    window.initializeMap = function(){
        model.initializeMap();
        //get relevant information about address and duration
        model.setAddressAndDurationValue();
    };

  var myDiv = $("div" + htmlId);
  var templates = {};

  var model = {
    views: [],
    dropDownOptions: [],
    mapOptions:{},
    map: null,
    latitude_origin: null, 
    longitude_origin: null,
    latitude_destination: null, 
    longitude_destination: null,
    origin: null,
    destination: null, 
    style: null,
    originAnimationState: false,
    destinationAnimationState: false,
    originMarker: null, 
    destinationMarker: null,
    infoWindow: null, 
    infoWindow2: null,
    originIcon: null, 
    destinationIcon: null,
    markerPositionOrigin: null,
    markerPositionDestination: null,
    originAddress: null, 
    destinationAddress: null,
    duration: null, 
    directionsDisplay: null,
    directionsService: null,
    routeDisplayState: false,
    //4 possible preset styles can be chosen if user unhappy with randomly set style after they click generate  
    //(Gowalla, Pale Dawn, Greyscale, Icy Blue, Red Hues, Turquoise Water; 
    //the style values for these are predetermined)

    //Randomizer 
    style0: [
    {
        "featureType": "all",
        "stylers": [
            {
                "hue": '#'+ Math.floor(Math.random()*16777215).toString(16)
            },
            {
                "saturation": 0
            },
            {
                "visibility": "on"
            }
        ]
    }
    ],

    //Blue Water
    style1 : [
    {
        "featureType": "water",
        "stylers": [
            {
                "color": "#46bcec"
            },
            {
                "visibility": "on"
            }
        ]
    },
    {
        "featureType": "landscape",
        "stylers": [
            {
                "color": "#f2f2f2"
            }
        ]
    },
    {
        "featureType": "road",
        "stylers": [
            {
                "saturation": -100
            },
            {
                "lightness": 45
            }
        ]
    },
    {
        "featureType": "road.highway",
        "stylers": [
            {
                "visibility": "simplified"
            }
        ]
    },
    {
        "featureType": "road.arterial",
        "elementType": "labels.icon",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "administrative",
        "elementType": "labels.text.fill",
        "stylers": [
            {
                "color": "#444444"
            }
        ]
    },
    {
        "featureType": "transit",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "poi",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    }
    ],
    //Greyscale
    style2: [
    {
        "featureType": "all",
        "stylers": [
            {
                "saturation": -100
            },
            {
                "gamma": 0.5
            }
        ]
    }
    ],
    //Icy Blue
    style3: [
    {
        "stylers": [
            {
                "hue": "#2c3e50"
            },
            {
                "saturation": 250
            }
        ]
    },
    {
        "featureType": "road",
        "elementType": "geometry",
        "stylers": [
            {
                "lightness": 50
            },
            {
                "visibility": "simplified"
            }
        ]
    },
    {
        "featureType": "road",
        "elementType": "labels",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    }
    ],
    //Gowalla style
    style4: [
    {
        "featureType": "road",
        "elementType": "labels",
        "stylers": [
            {
                "visibility": "simplified"
            },
            {
                "lightness": 20
            }
        ]
    },
    {
        "featureType": "administrative.land_parcel",
        "elementType": "all",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "landscape.man_made",
        "elementType": "all",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "transit",
        "elementType": "all",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "road.local",
        "elementType": "labels",
        "stylers": [
            {
                "visibility": "simplified"
            }
        ]
    },
    {
        "featureType": "road.local",
        "elementType": "geometry",
        "stylers": [
            {
                "visibility": "simplified"
            }
        ]
    },
    {
        "featureType": "road.highway",
        "elementType": "labels",
        "stylers": [
            {
                "visibility": "simplified"
            }
        ]
    },
    {
        "featureType": "poi",
        "elementType": "labels",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "road.arterial",
        "elementType": "labels",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "water",
        "elementType": "all",
        "stylers": [
            {
                "hue": "#a1cdfc"
            },
            {
                "saturation": 30
            },
            {
                "lightness": 49
            }
        ]
    },
    {
        "featureType": "road.highway",
        "elementType": "geometry",
        "stylers": [
            {
                "hue": "#f49935"
            }
        ]
    },
    {
        "featureType": "road.arterial",
        "elementType": "geometry",
        "stylers": [
            {
                "hue": "#fad959"
            }
        ]
    }
    ],
    //Turqoise Water
    style5: [
    {
        "stylers": [
            {
                "hue": "#16a085"
            },
            {
                "saturation": 0
            }
        ]
    },
    {
        "featureType": "road",
        "elementType": "geometry",
        "stylers": [
            {
                "lightness": 100
            },
            {
                "visibility": "simplified"
            }
        ]
    },
    {
        "featureType": "road",
        "elementType": "labels",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    }
    ],
    //Red Hues
    style6:[
    {
        "stylers": [
            {
                "hue": "#dd0d0d"
            }
        ]
    },
    {
        "featureType": "road",
        "elementType": "labels",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "road",
        "elementType": "geometry",
        "stylers": [
            {
                "lightness": 100
            },
            {
                "visibility": "simplified"
            }
        ]
    }
    ],



        /**
         * Add a new view to be notified when the model changes.
         */
        addView: function(view) {
            this.views.push(view);
            view("");
        },
        
        /**
         * Update all of the views that are observing us.
         */
        updateViews: function(msg) {
            for(i=0; i<this.views.length; i++) {
                this.views[i](msg);
            }
        },

        loadBuildingData: function() {
            var that = this;
            $.getJSON("https://api.uwaterloo.ca/v2/buildings/list.json?key=0424c682d36fa91aaffaa6284f3c29d8",
                    function (d) {
                        if (d.meta.status === 200) {
                            
                            //store data for populated dropdown
                            for(var i = 0; i < d.data.length; i++){
                                that.dropDownOptions.push(d.data[i]); 
                            }
                            that.updateViews("getBuildingDataLoaded");
                        } 
                        else {
                            that.buildingName = {};
                            that.updateViews("error");
                            console.log("Failed to read building data." + JSON.stringify(d.meta));
                        }
 
                    });
        },

        initializeMap: function(){
            //need to store data associated with the map in model since logic directly 
            //impacts these values (the mapOption property values change according upon
            //every generate button click   

            console.log('Ready to use google maps API');

            //set origin building
            this.origin = $("#rrazdan_originSelector").val();
            //set destination building
            this.destination = $("#rrazdan_destinationSelector").val();

            //find relevant data of origin
            for (var i = 0; i < this.dropDownOptions.length; i++) {
                if(this.dropDownOptions[i].building_name === this.origin){
                    this.latitude_origin = this.dropDownOptions[i].latitude;
                    this.longitude_origin = this.dropDownOptions[i].longitude;
                    console.log("origin: " + this.dropDownOptions[i].building_name);
                    break;
                }
            };
            for (var i = 0; i< this.dropDownOptions.length; i++) {
                if(this.dropDownOptions[i].building_name === this.destination){
                    this.latitude_destination = this.dropDownOptions[i].latitude;
                    this.longitude_destination = this.dropDownOptions[i].longitude;
                    console.log("destination: " + this.dropDownOptions[i].building_name);
                    break;
                }
            };
            this.mapOptions.center = new google.maps.LatLng(this.latitude_origin, this.longitude_origin);
         
            //only display certain type of map, no option of changing map type, streetView, pan control
            this.mapOptions.mapTypeControl= false;
            this.mapOptions.streetViewControl= false;
            this.mapOptions.panControl = false;
            this.mapOptions.zoomControl = true;

            //store information in map variable. Map var is affected my logic concerning map properties.
            //thus it must be located in model object   
            this.map = new google.maps.Map(document.getElementById('rrazdan_mapContainer'),
            this.mapOptions);
            

            //initialization for showing route information
            var routeLineCustom = new google.maps.Polyline({
                strokeColor: '#'+ Math.floor(Math.random()*16777215).toString(16),
                strokeOpacity: 0.7,
                strokeWeight: 7,
                suppressMarkers : true
            });
            this.directionsService = new google.maps.DirectionsService();
            this.directionsDisplay = new google.maps.DirectionsRenderer({suppressMarkers: true, polylineOptions: routeLineCustom});
            this.directionsDisplay.setMap(this.map);


            model.getOriginIconURL();
            model.getDestinationIconURL();

            //custom marker
            model.loadUWBuildingMarker();
            
            model.getStyle();

            //custom map style via JSON wizard
            model.loadStyleDataIntoMap();

            //related to getting duration
            geocoder = new google.maps.Geocoder();
  
    
            this.updateViews('map');
        },

        getStyle: function(){
            //a different colored map generated each time
            model.style0[0].stylers[0].hue = '#'+ Math.floor(Math.random()*16777215).toString(16);
            model.style0[0].stylers[1].saturation = Math.floor(Math.random() * (100 - (-100)) + (-100));
            this.style = this.style0;
        },

        loadStyleDataIntoMap: function(){
            var mapWithStyle = new google.maps.StyledMapType(this.style, {name: "map style data"});
            this.map.mapTypes.set('mapStyleChosen', mapWithStyle);
            this.map.setMapTypeId('mapStyleChosen');
        },

        getOriginIconURL: function(){
            var iconNumber = parseInt((Math.random() * 3));
            var icons = ['http://i.imgur.com/1K4LsDk.png', 'http://i.imgur.com/hwd4UnH.png', 'http://i.imgur.com/jIbHEWv.png'];
            this.originIcon = icons[iconNumber];
        },


        getDestinationIconURL: function(){
            var iconNumber = parseInt((Math.random() * 3));
            var icons = ['http://i.imgur.com/z8YfX86.png', 'http://i.imgur.com/pp2UD6g.png', 'http://i.imgur.com/8T48lGu.png'];
            this.destinationIcon = icons[iconNumber];
        },


        loadUWBuildingMarker: function(){
            this.markerPositionOrigin = new google.maps.LatLng(this.latitude_origin, this.longitude_origin);    
            this.markerPositionDestination = new google.maps.LatLng(this.latitude_destination, this.longitude_destination); 
            
            // origin marker creation           
            this.originMarker = new google.maps.Marker({
                position: this.markerPositionOrigin,
                map: this.map,
                title: this.origin,
                animation: google.maps.Animation.DROP,
                icon: this.originIcon,
            });

            // destination marker creation
            this.destinationMarker = new google.maps.Marker({
                position: this.markerPositionDestination,
                map: this.map,
                title: this.destination,
                animation: google.maps.Animation.DROP,
                icon: this.destinationIcon,
            });

            //re-zoom so that both markers are visible, this sets optimal zoom value
            var bounds = new google.maps.LatLngBounds();
            bounds.extend(this.markerPositionOrigin);
            bounds.extend(this.markerPositionDestination);
            this.map.fitBounds(bounds);
 
        },

        colorPickerChangeMapStyleData: function(color){
            if(color === 'red'){
                this.style = this.style6;
            }
            else if(color === 'lightGreen'){
                this.style = this.style4;
            }
            else if(color === 'blue'){
                this.style = this.style3;
            }
            else if(color === 'green'){
                this.style = this.style5;
            }
            else if(color === 'grey'){
                this.style = this.style2;
            }
            else if(color === 'lightGrey'){
                this.style = this.style1;
            }

            model.loadStyleDataIntoMap();

            this.updateViews('map');
        },

        setMarkerAnimationState: function(object){
            if(object === 'origin'){ 
                this.destinationAnimationState = false;

                this.originAnimationState = !this.originAnimationState;
                this.destinationMarker.setAnimation(google.maps.Animation.null);
                this.originMarker.setAnimation(google.maps.Animation.null);    
                if(this.originAnimationState === true){               
                    this.originMarker.setAnimation(google.maps.Animation.BOUNCE);
                }
            }
            else if(object === 'destination'){
                this.originAnimationState = false;

                this.destinationAnimationState = !this.destinationAnimationState;
                this.originMarker.setAnimation(google.maps.Animation.null);
                this.destinationMarker.setAnimation(google.maps.Animation.null);    
                if(this.destinationAnimationState === true){               
                    this.destinationMarker.setAnimation(google.maps.Animation.BOUNCE);
                }
            }
            else if(object === ""){
                this.originMarker.setAnimation(google.maps.Animation.null);
                this.destinationMarker.setAnimation(google.maps.Animation.null);
            }
        },

        reset: function(){
            //set all states to false
            this.originAnimationState = false;
            this.destinationAnimationState = false;
            this.routeDisplayState = false;

            //make currently present markers dissapear temporarily to give more of a reset feel
            this.originMarker.setVisible(false);
            this.destinationMarker.setVisible(false);
            this.directionsDisplay.setMap(null);
            //close any open info boxs
            model.infoWindow.close();
            model.infoWindow2.close();

            //make any active link colors appear inactive 
            $('#rrazdan_direction').removeClass('rrazdan_activeLink');
            $('#rrazdan_origin').removeClass('rrazdan_activeLink');
            $('#rrazdan_destination').removeClass('rrazdan_activeLink');
            
            //reset zoom
            model.loadUWBuildingMarker();
        },

        setAddressAndDurationValue: function(){
            var durationService = new google.maps.DistanceMatrixService();
            durationService.getDistanceMatrix(
            {
              origins: [this.markerPositionOrigin],
              destinations: [this.markerPositionDestination],
              travelMode: google.maps.TravelMode.DRIVING,
              unitSystem: google.maps.UnitSystem.METRIC,
              avoidHighways: false,
              avoidTolls: false
            }, model.AddressAndDurationCallback);
        },

        AddressAndDurationCallback: function(response, status){
            if (status != google.maps.DistanceMatrixStatus.OK) {
                console.log('Error was: ' + status);
            }
            else{
                var originAddressArray;
                var destinationAddressArray;
                var tempDurationResult;
                var unknowOriginOrDestinationAddress = false;


                originAddressArray = response.originAddresses;
                model.originAddress = originAddressArray[0];
                destinationAddressArray = response.destinationAddresses;
                model.destinationAddress = destinationAddressArray[0];
                tempDurationResult = response.rows[0].elements;

                //Distance matrix does not seem to be able to resolve addresses of locations outside of US/Canada, thus have to account for this here
                //In the future, if Waterloo building from outside US/Canada are added then these exceptions will automatically be accounted for here
                if(tempDurationResult[0].status === 'ZERO_RESULTS'){   
                    model.originAddress = "Oops, address could not be found";
                    model.destinationAddress = "Oops, address could not be found";
                    unknowOriginOrDestinationAddress = true;
                }
                if(unknowOriginOrDestinationAddress === true){   
                    model.duration = "Oops, no route could be found thus duration is unknown"
                }
                else{
                    model.duration = tempDurationResult[0].duration.text;
                }

            }
            model.updateViews('map');
        },

        toggleRouteDisplay: function(){

             if(!this.routeDisplayState){
                 var request = {
                      origin:this.markerPositionOrigin,
                      destination:this.markerPositionDestination,
                      travelMode: google.maps.TravelMode.DRIVING
                  };
                  this.directionsService.route(request, function(response, status) {
                    if (status == google.maps.DirectionsStatus.OK) {
                      model.directionsDisplay.setDirections(response);
                    }
                  });

                  this.directionsDisplay.setMap(this.map);
             }
             else{
                //clear the route
                this.directionsDisplay.setMap(null);
             }

             this.routeDisplayState = !this.routeDisplayState;
        }
  }

var startView = {
    updateDropdownDisplay: function(){
        //get info directly from view
        selectOrigin = document.getElementById("rrazdan_originSelector");
        selectDestn = document.getElementById("rrazdan_destinationSelector");
 
        for(var i = 0; i < model.dropDownOptions.length; i++){
            var option_origin = document.createElement("option");
            option_origin.value = model.dropDownOptions[i].building_name;
            option_origin.textContent = model.dropDownOptions[i].building_name;
            selectOrigin.appendChild(option_origin);
        }
        for(var i = 0; i < model.dropDownOptions.length; i++){
            var option_destination = document.createElement("option");
            option_destination.value = model.dropDownOptions[i].building_name;
            option_destination.textContent = model.dropDownOptions[i].building_name;
            selectDestn.appendChild(option_destination);
        }
    },


    updateView: function(msg) {
        var t = ""
        if (msg === "error") {
            t = templates.error;
            $("#rrazdan_choice").html(t);
        } 
        else if (msg === "getBuildingDataLoaded") {
            t = templates.selectionOption;
            $("#rrazdan_choice").html(t);
            startView.updateDropdownDisplay();

            //controller for button. This needed to be inserted here because
            //controller for #generateButton can only be added once that DOM
            //element is loaded, this only occurs if msg = getBuildingDataLoaded
            $("#rrazdan_generateButton").click(function(){
            calledFromGenerateButton = true;    
            mapView.initView();
            $('#rrazdan_durationIFrame').empty();
            $(window).colorbox.close();
            console.log('in generate button controller');
        });
        }
    },

    initView: function() {
        console.log("Initializing startView");
        
        model.addView(startView.updateView);    
        model.loadBuildingData(); 

        //load Colorbox library
        function loadColorboxScript(src, callback){
            var script = document.createElement('script');
            script.type = 'text/javascript';
            if(callback){
                script.onload = callback;
            }
            document.getElementsByTagName("head")[0].appendChild(script);
            script.src = src;
            console.log('Done loading Colorbox library');
        }
        loadColorboxScript('widgets/rrazdan/jquery.colorbox.js', function(){
            //controller for about link click
            var aboutLink = $('#rrazdan_about'); 
            aboutLink.colorbox({
                inline:true,
                width:"310",
                scrolling:false
            });
        });             
    }
}

var mapView = {
    updateView: function(msg) {
        var t2 = "";
        if (msg === "error") {
            console.log("map view error");
            t2 = templates.error;
            $("#rrazdan_mapContainer").html(t2);
        } 
        else if (msg === "map") {
            t2 = templates.colorPicker;
            $("#rrazdan_colorPicker").html(t2);
            
            //controller for color picker. This needed to be inserted here because
            //controller for #[certain color] can only be added once that DOM
            //element is loaded, this only occurs if msg = map
            $('#rrazdan_red').click(function () {
                model.colorPickerChangeMapStyleData('red');
                clearSelection();
            });
            $('#rrazdan_lightGreen').click(function () {
                model.colorPickerChangeMapStyleData('lightGreen');
                clearSelection();
            });
            $('#rrazdan_green').click(function () {
                model.colorPickerChangeMapStyleData('green');
                clearSelection();
            });
            $('#rrazdan_blue').click(function () {
                model.colorPickerChangeMapStyleData('blue');
                clearSelection();
            });
            $('#rrazdan_lightGrey').click(function () {
                model.colorPickerChangeMapStyleData('lightGrey');
                clearSelection();
            });
            $('#rrazdan_grey').click(function () {
                model.colorPickerChangeMapStyleData('grey');
                clearSelection();
            });

            $('#rrazdan_origin').click(function () {
                model.setMarkerAnimationState('origin');
                if(!model.originAnimationState){
                    $('#rrazdan_origin').removeClass('rrazdan_activeLink');
                }
                else{
                    $('#rrazdan_origin').addClass('rrazdan_activeLink');
                    $('#rrazdan_destination').removeClass('rrazdan_activeLink');                    
                }
                clearSelection();
            });
            $('#rrazdan_destination').click(function () {
                model.setMarkerAnimationState('destination');
                if(!model.destinationAnimationState){
                    $('#rrazdan_destination').removeClass('rrazdan_activeLink');
                }
                else{
                    $('#rrazdan_destination').addClass('rrazdan_activeLink');
                    $('#rrazdan_origin').removeClass('rrazdan_activeLink');                    
                }
                clearSelection();
            });
            $('#rrazdan_duration').click(function () {
                model.setMarkerAnimationState('');
                $('#rrazdan_origin').removeClass('rrazdan_activeLink');                    
                $('#rrazdan_destination').removeClass('rrazdan_activeLink');                    
                $('#rrazdan_direction').removeClass('rrazdan_activeLink');                    
                clearSelection();
            });
            $('#rrazdan_direction').click(function () {
                model.setMarkerAnimationState('');
                model.toggleRouteDisplay();
                if(!model.routeDisplayState){
                    $('#rrazdan_direction').removeClass('rrazdan_activeLink');
                }
                else{
                    $('#rrazdan_direction').addClass('rrazdan_activeLink');
                }
                clearSelection();
            });
            $('#rrazdan_reset').click(function () {
                $('#rrazdan_durationIFrame').empty();
                $(window).colorbox.close();
                model.setMarkerAnimationState('');
                model.reset();
            });

            //add controller for origin and destination blurbs, this code placed here instead of initView because
            //DOM elements only loaded in this function
            google.maps.event.addDomListener(document.getElementById('rrazdan_origin'), 'click', function() {
            model.infoWindow.open(model.map, model.originMarker);});

            google.maps.event.addDomListener(document.getElementById('rrazdan_destination'), 'click', function() {
            model.infoWindow2.open(model.map, model.destinationMarker);});

            //display marker blurbs, these values are strictly view related with no logic thus are created and placed in a view
            model.infoWindow = new google.maps.InfoWindow(
            {                 
                 content: Mustache.render(templates.originMessage, model)
            });
            model.infoWindow2 = new google.maps.InfoWindow(
            {   
                 content: Mustache.render(templates.destinationMessage, model)
            });

            var renderedDurationTemplate;
            //stricly display related thus this chunk of code is in the view. This code placed here instead of initView because
            //DOM elements only loaded in this function
            function popUpDuration(){
                var durationLink = $('#rrazdan_durationLink'); 
                durationLink.colorbox({
                    inline: true,
                    width:"310",
                    scrolling:false
                });
            }
            
            //controller for when user clicks on duration option            
            $('#rrazdan_duration').click(function(){       
                console.log('Clicked Time option');
                renderedDurationTemplate = Mustache.render(templates.duration, model);
                $('#rrazdan_durationIFrame').html(renderedDurationTemplate);
                popUpDuration();
            });
        }
    },

    initView: function(){
        if(firstTime && calledFromGenerateButton){
            console.log("Initializing mapView");

            //load google maps API
            function loadGoogleMapsScript(src, callback){ 
                var script = document.createElement('script');
                script.type = 'text/javascript';
                if(callback){
                    script.onload = callback;
                }
                document.getElementsByTagName("head")[0].appendChild(script);
                script.src = src;
                console.log('Done loading Google Maps API');
            }

            loadGoogleMapsScript('https://maps.googleapis.com/maps/api/js?key=AIzaSyDEDdaRyIPiGWqnVgY_AMDN8MZ32Gqa1O0&sensor=false&callback=initializeMap',
                function(){console.log('Maps API loader complete');});

            //load infobox library
            function loadInfoBoxScript(src, callback){
                var script = document.createElement('script');
                script.type = 'text/javascript';
                if(callback){
                    script.onload = callback;
                }
                document.getElementsByTagName("head")[0].appendChild(script);
                script.src = src;
                console.log('Done loading Infobox library');            
            }

            loadInfoBoxScript('/widgets/rrazdan/infobox.js', function(){console.log('Infobox loader complete');});
            
            firstTime = false;
            calledFromGenerateButton = false;
        }
        else if(!firstTime && calledFromGenerateButton){
            model.reset();
            initializeMap();
            calledFromGenerateButton = false;
        }
        model.addView(mapView.updateView);
    }
}

  /*
   * Initialize the widget.
   */
    console.log("Initializing rrazdan(" + userid + ", " + htmlId + ")");
    portal.loadTemplates("widgets/rrazdan/templates.json", 
        function(t) { 
            templates = t;
            $(htmlId).html(templates.baseHTML);
            startView.initView();     
        });
}