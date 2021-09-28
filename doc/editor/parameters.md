# welcome
```js
// this editor will show code examples
// you are free to play with the examples 
// your changes will be overwritten when you switch to different page of the tutorial




```

This is a presentation of a new jscad feature.

 It is an alternative/improvement to `getParameterDefinitions` to simplify writing scripts that use parameters.

On the right side you will be able to see live rendering of jscad scripts as well as parameters.

In the middle you have 2 editors that will display examples mentioned in the texts here.

- top editor is where a jscad script is

- bottom editor displays old version of  `getParameterDefinitions` 


New syntax will be used in top editor and old syntax will be generated into the bottom editor.

If you like the new syntax, you can use this page to generate old `getParameterDefinitions`  while you wait for this feature to be implemented into openjscad.xyz

The plan for later is to convert this page into a tutorial for using parameters in jscad scripts.



# basic jscad script

```js
const jscad = require('@jscad/modeling')
const { sphere } = jscad.primitives

function main(){
    return sphere({radius:33})
}

module.exports = {main}
```

### intro

You have a basic jscad script in the editor, and the part that is actually creating the model is in line 5:

```js
sphere({radius:33})
```

but you need some extra fluff so it becomes a regular JavaScript file that can be run.

**note**: You can checkout the API on this <a href="https://openjscad.xyz/docs/module-modeling_primitives.html" target="_blank">page</a>

### basic steps

First you need to import(require) jscad modeling library like this:

```js
const jscad = require('@jscad/modeling')
```

After that you can declare some primitives to use (let us take sphere function from modeling/primitives package)

```js
const { sphere } = jscad.primitives
```

Then you must create a function called main, that will be used by jscad intepreter to build your model

```js
function main(){
    return sphere({radius:33})
}
```

And since JS nowdays is organized into modules, the same choice was made for jscad scripts. That means you have to export your main function, so that jscad intepreter can use it

```js
module.exports = {main}
```

# parameters right now

```js
const jscad = require('@jscad/modeling')
const { sphere } = jscad.primitives

function main({radius=22}){
  return sphere({radius})
}

function getParameterDefinitions(){
  return [
    {"type": "int","name": "radius","initial": 22}
  ]
}
module.exports = {main, getParameterDefinitions}
```

Currently there is a nice option that you can use to make your jscad scripts parametric towards the end-user.

If you define a function called `getParameterDefinitions` you can return a definition of parameters and jscad will generate a form with inputs based on your definition. And you have to export that function like you have to for `main`.

You can get more details on different types of parameters in user docs <a href="https://openjscad.xyz/docs/tutorial-03_usingParameters.html" target="_blank">here</a>

If you look at the current example, you can see how we defined input for radius.

Change values in the form and observe the changes in the rendered sphere. 

***hint**: you must remove focus from input to cause onchange event, that will then trigger new render of the model*



# Intro for new syntax and code styles

```js
const { sphere } = jscad.primitives
//---
  radius = 22,
//---
  return sphere({radius:_PARAMS_.radius})
```

This proposal aims to simplify writing scripts that use parameters .

It is an improvement/alternative to`getParameterDefinitions`.

### Intro for the new syntax

New syntax uses the parameter declaration but the end result is the same json data as you would write in `getParameterDefinitions`. 

To simplify the parser and make it more reliable you must use a marker comment `//jscadparams` to activate new syntax for the lines after it.

When you declare parameter like this

```js
radius = 22,
```

it is enough information to generate the definition

```json
{"type":"int","name":"radius ","initial":22},
```

and with this new syntax you do not have to duplicate the information in the declaration and in the `getParameterDefinitions` function. It is also less error prone.

More options in the new syntax will be explained in following pages.

### different code styles supported

The default code style that will also be used in the text here is using <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment" target="_blank">destructuring </a> . But if you notice a select box in the top right corner above the editor you can choose alternative syntax.

- `Destructured parameters` - destructuring directly in func parameters declaration
- `Defaults & destructuring` - using an object with defaults + destructuring
- `Defaults & Object.assign` - using an object with defaults + Object.assign

Try out each option and decide which one you prefer.

### I love this, when can I start using the new syntax?

This is currently a proposal to be added to jscad, but you can start using this new syntax right away.

- paste your script in the top editor,
- the correct definition for `getParameterDefinitions` function will be generated in the bottom editor
- After that copy paste code from the bottom editor to your script and enjoy :)

when you add more parameters to your script, just repeat the steps above.

#  - caption

```js
const { sphere } = jscad.primitives
//---
  radius = 22,// Radius
//---
  return sphere({radius:_PARAMS_.radius})
```

If you add a comment in the same line where you declare the parameter, the comment text will be used as caption for the input.

```js
radius = 22,// Radius
```



#  - option: type=slider ...

```js
const { sphere } = jscad.primitives
//---
  radius = 22,// Radius {type:'slider'}
//---
  return sphere({radius:_PARAMS_.radius})
```

You can further customize with any attribute supported by `getParameterDefinitions` by adding a JSON object as last thing in the comment.

```js
radius = 22,// Radius {type:'slider'}
```



In this example we changed the type of input to `slider`. You can see that the form has changed and a slider is now used instead of an input box.

Try the slider and notice how the model changes only after you release the slider.



**link**: detailed docs for parameters are <a href="https://openjscad.xyz/docs/tutorial-03_usingParameters.html" target="_blank">here</a>

# - NEW option: live=1

```js
const { sphere } = jscad.primitives
//---
  radius = 22,// Radius {type:'slider', live:1}
//---
  return sphere({radius:_PARAMS_.radius})
```

In this step we added an attribute `live:1`. You could also use `live:true`.

```js
radius = 22,// Radius {type:'slider', live:1}
```



Try the slider now and notice how the model changes as you move slider interactively.

This option is not yet available in jscad, but it is intended to be added as part of this proposal.



**link**: detailed docs for parameters are <a href="https://openjscad.xyz/docs/tutorial-03_usingParameters.html" target="_blank">here</a>

# - Groups

```js
const { sphere } = jscad.primitives
const { translate } = jscad.transforms
//---
  // size
  radius = 22,// Radius {type:'slider', live:1}
  // location (initially closed) {initial: 'closed'}
  x=0, // {type:'slider', live:1}
  y=0, // {type:'slider', live:1}
  z=0, // {type:'slider', live:1}
//---
  return translate([_PARAMS_.x,_PARAMS_.y,_PARAMS_.z],sphere({radius:_PARAMS_.radius, height:_PARAMS_.x}))
```

In this example we show how easy it is to group parameters.

Just add a comment line and it is considered as group name.

You can also customize the group like you can do with parameters, and make it initially closed by adding `{initial: 'closed'}`

```js
// location (initially closed) {initial: 'closed'}
```



**link**: detailed docs for parameters are <a href="https://openjscad.xyz/docs/tutorial-03_usingParameters.html" target="_blank">here</a>

