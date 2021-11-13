 


> Open this page at [https://tsunyi.github.io/pxt-xtronpro-buttons/](https://tsunyi.github.io/pxt-xtronpro-buttons/)

## Usage

Add Xtron Pro additional buttons

Xtron Pro has two more buttons than other MakeCode Arcade consoles. They are located on the core of Xtron Pro, the start button is shared with the power button, so the core of Xtron Pro has three user buttons for programming.

![xtronpro-additional-buttons](https://user-images.githubusercontent.com/8207663/141603877-891bf52a-4e33-4512-a19d-d47a5eb482e8.jpg)

After adding this extension, you will get two other options on the following blocks.

![image](https://user-images.githubusercontent.com/8207663/141604180-fda8673f-716d-4f09-a317-dc852a675d18.png)

JavaScript API

```block
controller.C.onEvent(ControllerButtonEvent.Pressed, function () {
  ...
})

controller.start.onEvent(ControllerButtonEvent.Pressed, function () {
  ...
})

controller.C.isPressed()

controller.start.isPressed()
```
## Use as Extension

This repository can be added as an **extension** in MakeCode.

* open [https://arcade.makecode.com/](https://arcade.makecode.com/)
* click on **New Project**
* click on **Extensions** under the gearwheel menu
* search for **https://github.com/tsunyi/pxt-xtronpro-buttons** and import

## Edit this project ![Build status badge](https://github.com/tsunyi/pxt-xtronpro-buttons/workflows/MakeCode/badge.svg)

To edit this repository in MakeCode.

* open [https://arcade.makecode.com/](https://arcade.makecode.com/)
* click on **Import** then click on **Import URL**
* paste **https://github.com/tsunyi/pxt-xtronpro-buttons** and click import

## Blocks preview

This image shows the blocks code from the last commit in master.
This image may take a few minutes to refresh.

![A rendered view of the blocks](https://github.com/tsunyi/pxt-xtronpro-buttons/raw/master/.github/makecode/blocks.png)

#### Metadata (used for search, rendering)

* for PXT/arcade
<script src="https://makecode.com/gh-pages-embed.js"></script><script>makeCodeRender("{{ site.makecode.home_url }}", "{{ site.github.owner_name }}/{{ site.github.repository_name }}");</script>
