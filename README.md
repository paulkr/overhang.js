overHang.js
===========

`overHang.js` is a JQuery plugin that displays sleek, instant notifications, confirmations or prompts inside a given element.

The Idea
--------

Originally, this was created for a project I was working on but I decided to put in a little bit of work to polish it up.

Usage
-----

In order to use `overHang.js`, there are a setup requirements.

1) Include a reference to the latest JQuery version in your project

2) Include a reference to the `overHang.min.js` file

3) Apply `overHang.js` to an element 

```html
<script src="//ajax.googleapis.com/ajax/libs/jquery/2.1.1/jquery.min.js"></script>
<script src="lib/overHang.min.js"></script>
```

```javascript
$("element").overHang();
```

Features
--------

`overHang.js` takes 3 parameters.

#### `activity`

The default activity is `"notification"`. Other options are `"prompt"` or `"confirmation"`.

```javascript
$("object").overHang({
	activity : "notification",
	// activity : "prompt",
	// activity : "confirmation"
})
```

#### `message`

The `message` parameter takes a string to be displayed. For `prompts`, it acts as a placeholder and for `confirmations` it acts as the yes/no question.

```javascript
$("object").overHang({
	activity : "prompt",
	message : "Enter your name"
})
```

#### `col`

The `col` parameter takes a color hex code string or theme name from [flatuicolors.com](http://flatuicolors.com) for the background of the overHang banner. Theme names include `"turquoise"`, `"emerald"`, `"river"`, `"amethyst"`, `"asphalt"`, `"flower"`, `"carrot"`, `"alizarin"`, `"clouds"`, `"concrete"`.

```javascript
$("object").overHang({
	activity : "confirmation",
	message : "Are you sure?",
	col : "alizarin"
})
```

Demo
----

[Check it out here!](http://paulkr.github.io/overHang)


www.PaulKr.com