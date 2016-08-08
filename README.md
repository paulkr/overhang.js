overhang.js
===========

`overhang.js` is a JQuery plugin to display sleek, instant notifications, confirmations or prompts inside a given element.

[See it in action!](http://paulkr.github.io/overhang.js)

Installation
------------

You can install overhang through npm:

```bash
$ npm install overhang
```
or through bower:

```bash
$ bower install overhang
```

Alternatively, you can download the files in the `dist/` folder manually.

Usage
-----

Include a reference to the latest version of jQuery and jQuery UI.


```html
<script type="text/javascript" src="//ajax.googleapis.com/ajax/libs/jquery/2.1.4/jquery.min.js"></script>
<script type="text/javascript" src="//ajax.googleapis.com/ajax/libs/jqueryui/1.10.4/jquery-ui.min.js"></script>
```

Include references to the Javascript and CSS files.

```html
<link rel="stylesheet" type="text/css" href="dist/overhang.min.css" />
<script type="text/javascript" src="dist/overhang.min.js"></script>
```

Configuration Parameters
------------------------

`overhang.js` has 3 primary features - notifications, prompts and confirmations. Most of the options are customizable for all of these features.

### Defaults

##### `type`

This is the type of the notification that you want to display.
The preset types are `success`, `error`, `warn`, `info`, `prompt` and `confirm`.

If you would like to use a custom theme, leave this parameter blank and follow the rules for setting a custom theme.

```javascript
$("body").overhang({
   custom: true, // Set custom to true
   primary: "#34495E", // Your custom primary color
   accent: "#F4B350" // Your custom accent color
});
```

`primary` - The background color of the alert.

`accent` - The bottom border color.

If you want to display either a prompt or confirmation alert, set the type to `prompt` or `confirm`, respectively. Prompts and confirmations both have preset themes, but you can customize them by using the `custom` option.

##### `textColor`

The color of the text. The default is set to white.

##### `message`

The message to be displayed in your alert.

##### `duration`

The duration in seconds to show the alert for. The default is `1.5` seconds.

##### `speed`

The speed to drop and raise the alert in milliseconds. The default is set to `500`.

##### `closeConfirm`

Set this to true if you would like the user to have to close the alert rather than it disappearing by itself. The default is set to `false`.

##### `upper`

Set this to true if you would like your message in all uppercase letters. The default is set to `false`.

##### `easing`

JQuery UI easing option for the drop effect. The default is set to `"easeOutBounce"`

#### Basic Alert Notification Example

```javascript
// Some error notification
$("body").overhang({
   type: "error",
   message: "You could not be logged in at this time.",
   closeConfirm: "true"
});
```

### Prompts

When using prompts, all you need to do is set the `type` parameter to `"prompt"`.

#### Prompt Example

```javascript
// Some prompt notification
$("body").overhang({
   type: "prompt",
   message: "What is your name"
});
```

### Confirmations

When using confirmations, there are additional options that you can customize.

##### `yesMessage`

This is the text on the "true" button that would to display. The default is set to `"Yes"`.

##### `noMessage`

This is the text on the "false" button that would to display. The default is set to `"No"`.

##### `yesColor`

This is the color of the "true" button. The default is set to `"#2ECC71"`.

##### `noColor`

This is the color of the "false" button. The default is set to `"#E74C3C"`.

#### Confirmation Example

```javascript
// Some confirmation
$("body").overhang({
   type: "confirm",
   yesMessage: "Yes please!",
   noMessage: "No thanks."
});
```

Retrieving Data
---------------

The `prompt` and `confirm` features both allow you to get data from the user. The responses are stored as data in the DOM of the target element that `overhang.js` has been applied to.

To retrieve the data you would use jQuery like this:

```javascript
// From a prompt
alert($("target-element").data("overhangPrompt"));

// From a confirmation (either true or false)
alert($("target-element").data("overhangConfirm"));
```

If the user has not yet given a response, the default values will be set to `null`.

Callbacks
---------

The option callback argument is a function that will run once the user has made an action on the overhang notification. The callback will run after any of these cases:

- The submission of a prompt
- The selection on a confirmation
- The close button on a normal notification with a true `closeConfirm`
- The raise of a normal notification

Note: For confirmations or prompts, the callback will not run when the close button is clicked and nothing is selected.

#### Example
```javascript
$("body").overhang({
	type: "confirm",
	message: "Are you sure?",

  // This code will run once an option is clicked.
	callback: function () {
		var selection = $("body").data("overhangConfirm");
		alert("You made your selection of " + selection);
	}
});
```

