
## Welcome to `HandPickT`!
HandPickT is a vegetable garden plant tracking app built with React.js. Designed with mobile devices in mind, it affords the user the ability to:<br>
• Store plants to the database. ie. 'plant in their garden'<br>
• See estimated time to harvest, calculated from the planting date<br>
• Make notes regarding their garden. <br>
• Search the plant database or their own 'garden' for keywords<br>
• Archive or delete a plant after it is no longer producing or has been removed from the garden.

### `Getting started`

Feel free to clone or fork this repository and try it out. sample.json contains the category list and plants necessary to populate a user garden.<br>
To connect with saved routes use<br>

```json-server -p5002 -w sample.json```<br>

To install the required node modules<br>

```npm install``<br>

To launch use<br>

```npm start```

## `Using HandPickT`
### `Login/Register`

The login and register pages are the gateway to HandPickt. You may register a new user account with a user name, email address and password. This build uses simple `Non-secure` authentication. Do not enter any sensitive information! <br>• `Registering` a new user will verify that the user name and email are unique to the system and will promt if a duplicate is found. Password must be entered twice to ensure accuracy. The user may elect to show password fields by clicking the show/hide icon adjacent to the first password field ('eye'.) On a successful registration, the user will be routed to the `Dashboard` page.<br> 
• `Login` of an existing user is verified by user name and password. The system will prompt if the user name is not in the database or if the password does not match the stored value. A successful login will route the user the the `Dashboard` page.

### `Dashboard`

The Dashboard contains the links to all other pages in `HandPickT`. The user may navagate to 'My Garden', 'Notes', 'Add Plant', or 'Archives' by clicking either the image buttons located on the main part of the screen or at any point in the app using the `Nav Bar` links located at the bottom of all views. <br>
• If a recurring user note is indicated that it pertains to the current day, a small, pulsing PostIt note will appear by the 'Notes' link.<br>
• Logout is available in the upper right corner of this view(and most other views as well.)<br>
• The search page is only accessable from the Dashboard and is also located in the upper right of the view. 

### `Bottom Nav Bar`

The bottom Nav Bar contains links to the four main views in HandPickT. The center (fifth) link changes to an 'Add' link on appropriate pages.

### `My Garden`

My Garden is the heart of HandPickT. It contains all the plants currently in the user's garden. The plant cards are sorted according by 'nearest to harvest.' <br>
• The user may inspect, modify, delete, or archive a plant from this page.<br>
• A pie graph with a knife and fork in the upper right corner of each card give a quick visual indication of how close each plant is to harvest.<br>
• Clicking the pie graph in the inspect view will allow the user to put the plant into 'Early Harvest' in case it is producing ahead of schedule.<br>
• In the Inspect view, a user may modify the planting date or their comments regarding this particular plant by clicking anywhere in those fields. If <em>any</em> changes are made, a `Save Changes` button will become visible at the bottom of the screen. Days to harvest is recalculated as the planting date field is modified (as is the pie graph.) Clicking the `Back` button without Saving Changes will discard any changes made.

### `Notes`

The notes section of HandPickT allows the user to store notes regarding the general state of the garden. Notes are displayed as PostIt notes on a cork board. <br>

Notes are either:<br>
• Static. ie. "Pick up some canning supplies"<br>
<em>or</em><br>
• Recurring. ie. "Spend some time weeding the beds" (set to happen on Tuesday and Friday)<br>
Recurring notes can be set to occur on any combination of weekdays. Notes that pertain to the current day will display a pulsing 'Today!' at the bottom of the note.

• The user may click anywhere on the note to go to a zoomed in `Inspect` view of that note. This view allows editing the note and the option to toggle its occurence between static and recurring, as well as altering the days on which a recurring note is triggered. The user may click the PostIt recycle at the top of the view to randomly change the PostIt note image<br>
• Clicking the PostIt note at the center of the Nav Bar on this view will take the user to the Add New Note view.<br>
• The Add New Note view operates the same as the Inspect view above.

### `Add Plant`

The add plant view allows the user to place new plants into their garden. The Categories list is a horizontally scrolling list of various vegetable categories. Choosing a category will exchange the view for the list of plants contained within that category. The user may `Plant` a particular variety, which will take them to detailed view of that plant.<br> 
• The user may add a comment which will be attached to this instance of the plant. Multiple copies of the same type of plant may be placed in the same garden.<br>
• The user may click `Plant It` to place the plant into their garden with a current timestamp (used to calculate days remaining until harvest.) The user will then be redirected to a success page allowing them to 'Plant Another' or 'Return to the Dashboard'<br>

### `Archives`

The Archives view contains all the plants that the user has decided to archive in place of deleting. The Archives view operates the same as 'My Garden' above. The only notable difference is the 'Days To Harvest' field has been replaced with an 'Archived On' date.

### `Search my HandPickT`

The search HandPickT feature is available from the Dashboard. The user may choose to search the plants `Database`, or any of their entries in `My Garden`, `My Notes`, or `My Archives`. Selecting any one of the user entries automatically deselects 'Database'. Conversely, selecting 'Database' will deselect the user fields. If all user fields become deselcted, 'Database' will automatically become selected. 

## `UX Highlights`

`Add Plant` Selecting a Category will change the view to the plants contained therein. Grammar is checked on the category name and any plurality is removed to ensure that the displayed message is correct. ie. "Select {an onion} to plant.", <em>not</em> "select {a onions} to plant." <br>
`Scroll Position` is saved upon entering 'Details' views and the user is returned to the same position in the field when they return.<br>
`View Password` button allows the user to see the text entered in the password field.<br>
`Logout` takes the user to a 'Thank You for using HandPickt' view instead of simply returning to the login page. 