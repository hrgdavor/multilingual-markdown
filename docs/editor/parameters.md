# welcome {{"ts":1632992505630,"id":"0fa3e022-fd3b-46de-9e6e-b00845ff2a61","h":"4c6d3994c1238b3a80d3ccf7435735fd"}}
```js {{"ts":1632992505630,"id":"2c764afc-790d-4b44-ae7e-b2ce61bb6de9","h":"f292d7a18d101ecac98e48734829f7da"}}
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



# basic jscad script {{"ts":1632992505630,"id":"cccbcc15-4d3b-405d-9494-882f92c9f44e","h":"4def2a938aa85fd3facb22a7b2a8038d"}}

```js {{"ts":1632992505630,"id":"bdc1fabc-d2af-4823-a4ce-4a02659f4881","h":"d3af123f92c750e2a79ff13028936ab2"}}
const jscad = require('@jscad/modeling')
const { sphere } = jscad.primitives

function main(){
    return sphere({radius:33})
}

module.exports = {main}
```

### intro {{"ts":1632992505630,"id":"0bec66ee-b28b-4187-a1a6-044d1eda68a9","h":"4650fb12de4abe2785102f6b87c73448"}}

You have a basic jscad script in the editor, and the part that is actually creating the model is in line 5:

```js {{"ts":1632992505630,"id":"42613bfc-64f2-4318-b6b7-374aefd802cf","h":"5d00ae3a812bf6a40393b714d93c98ed"}}
sphere({radius:33})
```

but you need some extra fluff so it becomes a regular JavaScript file that can be run.

**note**: You can checkout the API on this <a href="https://openjscad.xyz/docs/module-modeling_primitives.html" target="_blank">page</a>

### basic steps {{"ts":1632992505631,"id":"384f4690-02ab-4669-f6f7-e4cd73cc8bf6","h":"5a950dad429386fc1721638e9b808329"}}

First you need to import(require) jscad modeling library like this:

```js {{"ts":1632992505631,"id":"50c7e19c-06ed-4e8f-c588-f3fea2b0ae9e","h":"da9664c53bb51a30ede5670c5a040478"}}
const jscad = require('@jscad/modeling')
```

After that you can declare some primitives to use (let us take sphere function from modeling/primitives package)

```js {{"ts":1632992505631,"id":"fc2f5338-07ee-417d-d2eb-6a458b84b9f4","h":"c067cd3306956bce6b0f941b08aeff19"}}
const { sphere } = jscad.primitives
```

Then you must create a function called main, that will be used by jscad intepreter to build your model

```js {{"ts":1632992505631,"id":"81b07fc6-adff-434a-b629-081fe14fc8c4","h":"56b9ee20edbc5703bce8769d5355e353"}}
function main(){
    return sphere({radius:33})
}
```

And since JS nowdays is organized into modules, the same choice was made for jscad scripts. That means you have to export your main function, so that jscad intepreter can use it

```js {{"ts":1632992505631,"id":"75148345-49fe-4764-c23d-4995bc408b0a","h":"6d46244c1b89a6e8f465798691dbd651"}}
module.exports = {main}
```

# parameters right now {{"ts":1632992505631,"id":"516c0d10-8531-4e3f-8d33-f07a8f9b4fc8","h":"5c909052342b9aea985320da9c9804fa"}}

```js {{"ts":1632992505631,"id":"ba34f4dc-48dd-4f71-d5d4-3ef834f41d65","h":"511bbb08a7c371f48847f67b3f7bc667"}}
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



# Intro for new syntax and code styles {{"ts":1632992505632,"id":"32f4a1a6-c3d7-406d-d4f0-55165e7a8e8e","h":"e29693c134577bc64299e6dc343e5936"}}

```js {{"ts":1632992505632,"id":"a67cafed-d0e4-4445-c6b7-11b077e2a953","h":"40e37a9008fb3dcda51f14484b51771b"}}
const { sphere } = jscad.primitives
//---
  radius = 22,
//---
  return sphere({radius:_PARAMS_.radius})
```

This proposal aims to simplify writing scripts that use parameters .

It is an improvement/alternative to`getParameterDefinitions`.

### Intro for the new syntax {{"ts":1632992505632,"id":"815a84de-4496-47b5-83ec-488e8bec69cc","h":"fc13cda274217ae8950e277d3e3db384"}}

New syntax uses the parameter declaration but the end result is the same json data as you would write in `getParameterDefinitions`.

To simplify the parser and make it more reliable you must use a marker comment `//jscadparams` to activate new syntax for the lines after it.

When you declare parameter like this

```js {{"ts":1632992505632,"id":"9758d281-aac7-4f14-86c7-ce8ed8d8829e","h":"250f1bb7f44e42bed6f9f87db92259e0"}}
radius = 22,
```

it is enough information to generate the definition

```json {{"ts":1632992505632,"id":"2dc1f588-1576-4b30-8323-1e2f09004a82","h":"f9ddfb4745db55b98aeebb1830e2a757"}}
{"type":"int","name":"radius ","initial":22},
```

and with this new syntax you do not have to duplicate the information in the declaration and in the `getParameterDefinitions` function. It is also less error prone.

More options in the new syntax will be explained in following pages.

### different code styles supported {{"ts":1632992505633,"id":"f621bc2f-3413-43b5-de48-55666b8ca47a","h":"fb606f4c9d897630244b5c4cbb75c8b0"}}

The default code style that will also be used in the text here is using <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment" target="_blank">destructuring </a> . But if you notice a select box in the top right corner above the editor you can choose alternative syntax.

- `Destructured parameters` - destructuring directly in func parameters declaration
- `Defaults & destructuring` - using an object with defaults + destructuring
- `Defaults & Object.assign` - using an object with defaults + Object.assign

Try out each option and decide which one you prefer.

### I love this, when can I start using the new syntax? {{"ts":1632992505633,"id":"840da145-7595-418b-eaa0-03370b6644ee","h":"87ba6b3439d4d06491ebf583cc7ba5da"}}

This is currently a proposal to be added to jscad, but you can start using this new syntax right away.

- paste your script in the top editor,
- the correct definition for `getParameterDefinitions` function will be generated in the bottom editor
- After that copy paste code from the bottom editor to your script and enjoy :)

when you add more parameters to your script, just repeat the steps above.

#  - caption {{"ts":1632992505634,"id":"2bd0e9f3-9e03-4190-e35f-c293e6250454","h":"4f7af1f4285ffdb897e91b11f076c807"}}

```js {{"ts":1632992505633,"id":"fc967fd7-1b2b-4e0d-da53-e6d1496fd8cf","h":"db688626a3566f08ad72bc9e49743fc7"}}
const { sphere } = jscad.primitives
//---
  radius = 22,// Radius
//---
  return sphere({radius:_PARAMS_.radius})
```

If you add a comment in the same line where you declare the parameter, the comment text will be used as caption for the input.

```js {{"ts":1632992505634,"id":"befc805b-30c8-47b1-8ee3-e6e5ccde5f34","h":"a4a4506471d4e1c78086657a66dd7b1a"}}
radius = 22,// Radius
```



#  - option: type=slider ... {{"ts":1632992505635,"id":"379a311d-a8fa-4ea6-9390-ce4201bc208a","h":"066acb304fcfa8b0a60bc8b50751b9d9"}}

```js {{"ts":1632992505634,"id":"654ad267-ca86-4484-8c27-99602a368b49","h":"a9bec20c3c6edf4d883dc7e803576f76"}}
const { sphere } = jscad.primitives
//---
  radius = 22,// Radius {type:'slider'}
//---
  return sphere({radius:_PARAMS_.radius})
```

You can further customize with any attribute supported by `getParameterDefinitions` by adding a JSON object as last thing in the comment.

```js {{"ts":1632992505635,"id":"5287f88c-a38f-4795-bfcd-f9f19705b6fd","h":"85435978afbbd5c4279d807ed5bb7873"}}
radius = 22,// Radius {type:'slider'}
```



In this example we changed the type of input to `slider`. You can see that the form has changed and a slider is now used instead of an input box.

Try the slider and notice how the model changes only after you release the slider.



**link**: detailed docs for parameters are <a href="https://openjscad.xyz/docs/tutorial-03_usingParameters.html" target="_blank">here</a>

# - NEW option: live=1 {{"ts":1632992505635,"id":"232faa59-a88b-4297-9d07-6df692902020","h":"f17c9de4361cf287add6c08437377d82"}}

```js {{"ts":1632992505635,"id":"07963ebd-231f-443f-e3d4-c6a68b3dc3ac","h":"22f4ca74eacde065ad464f2b47b1915f"}}
const { sphere } = jscad.primitives
//---
  radius = 22,// Radius {type:'slider', live:1}
//---
  return sphere({radius:_PARAMS_.radius})
```

In this step we added an attribute `live:1`. You could also use `live:true`.

```js {{"ts":1632992505635,"id":"c7284f63-c067-4ba4-b652-e8075e4cce91","h":"e60a318fdf6b8b4cca500d105d20491b"}}
radius = 22,// Radius {type:'slider', live:1}
```



Try the slider now and notice how the model changes as you move slider interactively.

This option is not yet available in jscad, but it is intended to be added as part of this proposal.



**link**: detailed docs for parameters are <a href="https://openjscad.xyz/docs/tutorial-03_usingParameters.html" target="_blank">here</a>

# - Groups {{"ts":1632992505637,"id":"8c970c9f-bd42-422f-e9b1-315640998440","h":"5f4583f2f3d59ef2a5dee06d7ffc829e"}}

```js {{"ts":1632992505635,"id":"f01a625c-51a6-4224-e63d-8d2f2be0f24a","h":"6e13bfbaba7bd0cbedce5505757afad7"}}
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

```js {{"ts":1632992505637,"id":"6b3013bf-5b8b-433c-d8c8-71eb83d2d33a","h":"ca02022683be4e1cf1b20a626aeaf322"}}
// location (initially closed) {initial: 'closed'}
```



**link**: detailed docs for parameters are <a href="https://openjscad.xyz/docs/tutorial-03_usingParameters.html" target="_blank">here</a>

