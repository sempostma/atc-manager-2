# Changelog
All notable changes to this project will be documented in this file.

## [2.3.0] - 2018-09-13
### Added
- Set take-off runway [chrstphd]
- Ability to change font size in the settings window (save to localstorage) [chrstphd]
- Easing airplane's speed, altitude, heading, etc. after command is given
- Add spawn speed slider to options panel [KableKiB]
- Content editor - Submit/edit new airplanes/airports for approval
- Saves Editor - IN PROGRESS
- Airplane Info Panel
- Persist some settings to local storage (settings like ILS and text colors)

### Changed
- Apply command immediately when enter is pressed [wonderfulllama, AWT-Colin]
- When planes overlapping separate change the location of the text so it's easier to know which plane to click on (How should this be implemented? Right clicking on airplane to change position of text. Automatically detect if info text is over another plane's info text? Some other way?) [wonderfulllama]
Aircraft spawning at the same rate with different gamespeeds [KableKiB]
- When a plane starts to land and has an altitude set, it shows the green arrow up, while descending. [AWT-Colin]
- IRL you cannot fly faster than 250KT below FL100. However the planes start to slow down right after they passed below 10.000 feet. They should start sooner with their slowdown. [AWT-Colin]
- Show all waypoints/runways in the direct to dropdown when selecting a new waypoint/runway [AWT-Colin]
- "Direct to" lowercase to uppercase conversion
- Descend ratio while decelerating [AWT-Colin]
- Make it easier to clearly read runway numbers numbers. [AWT-Colin]
- Difficulty selection reset bug [AWT-Colin]
- clear out he heading value if the waypoint is valid - [KableKiB]

## [2.2.0] - 2018-09-09
### Changed 
- Fixed issue were plane speed became Nan [xtesseract]
- Spell mistakes fixed [FlightGearLego]
- Fixed a bug were planes would still spawn after the game was paused [PURRING_SILENCER, KableKiB]
- Show correct tgtSpeed
- Command is given by pressing button or pressing a key [wonderfulllama]
- Highlight selected plane [wonderfulllama]
- Show the runway on which the plane is taking off from [ShadingVaz]
- If outbound and alt less than 1900, keep heading

## [2.1.0] - 2018-09-05
### CHANGED:
- climbspeed
- decendSpeed
- accelerationSpeed
- deAccelerationSpeed.
- Switch size
- Description
- Traffic stack color

## [2.0.0] - 2018-08-26
### Added
- Better icons
- Android icons
- Apple icons
- Microsoft icons
- Safari icons
- Updated theme colors
- In-game icons
- Safety prompts when discarding unsaved data
- Info panel
- About panel
- Logs panel
- Donation info
- More (realistic) logs
- Tab close message if the user has unsaved progress
- New planes
  - Boeing 757
  - Boeing 767
  - Boeing 777
  - Airbus A380
  - Airbus A330
  - Boeing 787 Dreamliner
  - Airbus A319
  - Airbus A320
  - Airbus A321
  - Airbus A350
  - Boeing 717
  - McDonell Douglas MD-88
  - McDonell Douglas MD-90
  - Embraer 190
  - McDonell Douglas MD-82
  - McDonell Douglas MD-83
 - New operators
  - Southwest Airlines
  - American Airlines
  - British Airways
  - Continental Airlines
  - Lufthansa
  - Air France
  - China Southern Airlines
  - China Eastern Airlines
  - All Nippon Airways
  - Ryanair
  - Turkish Airlines
  - Emirates
  - FedEx Express
  - UPS Airlines
  - Cathay Pacific
  - Qatar Airways
  - Korean Air
  - Cargolux
  - Air China
  - Egyptair
- App caching (performance & offline use)
- Altimeter setting
- Atis info
- Pilot messages are now included in the logs

### Changed
- Fixed an issue where saving a map without a name caused issues
- Better checkboxes (the old ones were ugly)
- Styling tweaks
- Game not updating in the background fixed
- Updated operators on some aircraft
- Speech synthesis default rate
- Runway left/right switched fix
- Default airport/map colors changed
- Optimized web-app size

### Removed
- Speech recognition option is removed (because it hasn't yet been implemented)