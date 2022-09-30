# LocationGuessr
Game where you guess where the random given coordinates are on the map.
https://thepadguy.github.io/LocationGuessr

## About
 LocationGuessr is a game based on GeoGuessr but with a twist.
  In LocationGuessr you are given the coordinates of a random place in the globe
along with a static map of that place (upper left map) and you are tasked with finding this place
on a world map (lower right map). You can drag and zoom the bottom right map and you can click
on it to place a pin wherever you believe the forementioned place is. If you want to change
your pin's position simply click another place on the map (only one pin can be on the map).
When you are certain use the "GUESS" button to check your answer. A panel will appear containing
information about your guess and your distance from the target and simultaneously a pin on the target
coordinates will be placed on the map that is now centered on it. To play again (or to skip a level)
use the "NEXT LEVEL" button. It is also important to note that if you are in a mobile device, each time
you change the orientation of your device, the page will reload, this means that if you are in the "maps"
page the level will be automatically changed, so if you want to play a certain level, don't change the orientation
while you are playing it.
Please note that the static map may take a while to load depending on your (necessary) internet connection.
There is also the chance that instead of an image it displays "Sorry there are no images available" or
just a grey area (which is no problem if the target is snowy since that is the normal thing to be displayed). This
mostly happens when the target is on the Arctic Ocean or any other ocean. While I have tried and succeeded to minimize
this issue as much as possible I cannot say for certain that it won't happen to you, so I humbly ask for your
understanding and patience. The best way to deal with this issue is to use the "NEXT LEVEL" button.

## Credits
 The static map displayed is an embedded [google map](https://maps.google.com) and the interactive map is created using [Leaflet.js](https://leafletjs.com), data from [OpenStreetMap](https://www.openstreetmap.org/) and tiles from [OpenTopoMap](https://opentopomap.org/). Also the code is inspired by [W3Schools](https://www.w3schools.com/) and countless StackOverflow posts and the font used is [Party Confetti](https://www.fontspace.com/party-confetti-font-f69513) by [Niskala Huruf](https://www.fontspace.com/niskala-huruf). The forementioned data, images, maps, map data, map tiles and fonts are owned by their respective creators and not by me who is not associated with any of them.
 
 ## FAIR USE
 This site is for educational purposes only!  
Copyright Disclaimer under section 107 of the Copyright Act 1976, allowance is made for "fair use" for purposes such as criticism, comment, news, reporting, teaching, scholarship, education and research.  
Fair use is a use permitted by copyright statute that might otherwise be infringing.  
Fair use definition:  
(Source: [https://en.wikipedia.org/wiki/Fair\_use](https://en.wikipedia.org/wiki/Fair_use))  
Fair use is a doctrine in United States law that permits limited use of copyrighted material without having to first acquire permission from the copyright holder. Fair use is one of the limitations to copyright intended to balance the interests of copyright holders with the public interest in the wider distribution and use of creative works by allowing as a defense to copyright infringement claims certain limited uses that might otherwise be considered infringement. Unlike "fair dealing" rights that exist in most countries with a British legal history, the fair use right is a general exception that applies to all different kinds of uses with all types of works and turns on a flexible proportionality test that examines the purpose of the use, the amount used, and the impact on the market of the original work.  
The doctrine of "fair use" originated in the Anglo-American common law during the 18th and 19th centuries as a way of preventing copyright law from being too rigidly applied and "stifling the very creativity which \[copyright\] law is designed to foster." Though originally a common law doctrine, it was enshrined in statutory law when the U.S. Congress passed the Copyright Act of 1976. The U.S. Supreme Court has issued several major decisions clarifying and reaffirming the fair use doctrine since the 1980s, most recently in the 2021 decision Google LLC v. Oracle America, Inc.

## INFO
 LocationGuessr was created on 30/9/2022 by [me.](https://github.com/thepadguy) It is built using HTML, CSS and Javascript and tested locally on Microsoft Edge version 105.0.1343.53 on Windows 10. LocationGuessr uses [Leaflet.js](https://leafletjs.com) along with map data from [OpenStreetMap](https://www.openstreetmap.org/), map tile data from [OpenTopoMap](https://opentopomap.org/), maps from [google maps](https://maps.google.com) and [this font](https://www.fontspace.com/party-confetti-font-f69513). The source code for this project can be found [here](https://github.com/thepadguy/LocationGuessr).
