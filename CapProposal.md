## Contact Info 
* Name: Patrick Murphy
* Email Address: engine_ear@mac.com
* Github (Repo or Your Account): PMurphy1940/HandPickt

## Pre Approval - get a 👍
Name of Project: HandPickT

Brief Proposal: (The problem you are trying to solve and how you plan to solve it ) 
`An app to track garden planting, and allow user to know when to expect harvest of specific vegetables/fruits.`


## Final Proposal (After you get the 👍 on your pre proposal)

Overview of app: 
`HandPickt will allow a user to save a plant to their 'garden'. Stored data will include: user comments, planting date, and => supplied from trefle.io ( days_to_harvest, duration, description, sowing, active growth months, fruiting months, min/max tolerable temperature, possible image link if speed allows ). The app will calculate estimated time to harvest using planting date(CRUD POST date) and the days_to_harvest. The app will then indicate to the user that a plant is approaching, or actively in a harvest period. The user may remove a plant if it has died, or is past its useful harvest window. The user may edit a stored plant, changes allowed will be planting date or comments only.`





## MVP Definition
1. User CRUD enabled plants
2. User may view all plants in their garden, simple view will show user controlled data and an image. Detail view will display the extended data supplied by trefle.io
3. Login/registration
4. General CRUD enabled user notes regarding the garden as a whole. example "I need to remember to water on Saturday"
5. Ability to comment on and save a plant card to remember for next year, instead of an outright delete. ie. "This plant was an excellent producer. Definitely want it again next year!" or "Don't fall for this one again. Total waste of space."
6. When adding a plant, the user will be warned if they are planning to add a plant that is WAY out of season.


## Dream Stretch Goals
1. Use the Spoonacular API to provide a spotlight recipe that features a plant that has reached its harvest window.
2. Allow the user to save/bookmark a recipe they find appealing.
3. A message style section that will allow users to trade tips on care and pest management, with the ability to hide a user that continually trolls the system.

-- in these, #3 may come first depending on my timing to MVP. I feel confident in being able to quickly implement that. Activating another API may be more troublesome, but given enough time #1 is something I personally would like to have.

## User Stories (can be integrated into MVP def)
* As a gardener, I often forget when I've sown certain seeds. Knowing when to harvest can be particularly challenging for 'root' vegetables as they are out of view.
* As a gardener, it would be nice to know when I can expect harvest to occur so I can prepare. ie. purchase canning supplies, get other ingredients needed for recipes etc...
* As a gardener, I often forget year to year which plants were worth the effort and which ones weren't.
* As a gardener, I often exhaust the recipes I have when a harvest is particularly bountiful. (Stretch...) 


## Planning Links
* ERD - https://dbdiagram.io/d/5eea4ba89ea313663b3ab24f
* Wireframes https://www.figma.com/file/DXyuPNnh0ooUbBsy1DniRF/HandPickt?node-id=11%3A430
* Link to Repo with tickets
* Plan/outline the components your project will need showing the data relationship (props and state). This may be included with your wireframes. Add to your README.md.

## Research Planning Links or Documents 
Start on it before one-on-one but doesn’t have to be fully fleshed out

## Research for any external tools/technology you plan on using (i.e. external API’S): 

trefle.io => an open global scientific plant species database which contains an 'edible' available query
