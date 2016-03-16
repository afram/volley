# Volley

> A JavaScript CSS breakpoint interpreter

Volley is for those times you need to trigger JavaScript functions when your responsive
media queries fire. This library works with any grid, it reads your CSS, and it
follows your naming conventions. There is no limit on the number of breakpoints
you can have either!

Volley is written using commonjs with browserify/webpack in mind. If you
think you'll find Volley useful as a standalone global library, please let me
know (or submit a PR).

## Usage
Setting up Volley is simple. You need to configure a little bit of CSS, and then
require the library with either webpack or browserify.

### CSS
In order for Volley to read in your media queries, you need to first configure
your css with a couple of pseudo selectors on the body element as follows.

```css
  body:before {
    content: "small";
    display: none;
  }

  body:after {
    content: "small,medium,large,extralarge";
    display: none;
  }

  @media only screen and (min-width: 768px) {
    body:before {
      content: "medium";
    }
  }

  @media only screen and (min-width: 922px) {
    body:before {
      content: "large";
    }
  }

  @media only screen and (min-width: 1200px) {
    body:before {
      content: "extralarge";
    }
  }
```

As you can see, the `before` pseudo selector's content property holds the current
viewport width name (as chosen by you). The `after` pseudo selector's content
property contains all of your viewport width names in ascending order.

When the viewport width changes, the content value changes, and the `resize` event
is triggered, causing the JavaScript event handlers you set up to execute.

### Script
With the CSS out of the way, you can now get right into using Volley. There are 5
public methods available, `at`, `above`, `below`, `between`, and `getCurrentBreakpoint`.
The first 4 are for setting handlers at specific breakpoints, while `getCurrentBreakpoint`
is for as you might expect, reading the current breakpoint.

#### options
There are currently 2 options you can pass to the handler setting functions, they are
`fireOnSet` and `nextTick`.

##### fireOnSet [true]
Should the handler function be triggered immediately after it is set, if the current
breakpoint meets conditions of the handler. True by default.

##### nextTick [true]
Should the handler be executed on the next JavaScript frame. True by default.

#### at
The `at` method is for setting handlers to execute at a specific breakpoint.

```js
import volley from 'volley';

volley.at('medium', (evt) => { /* handle medium viewport */ });

// options as a second argument should you want/need to change them
volley.at(
  'medium',
  {fireOnSet: true, nextTick: true},
  () => { /* handle medium viewport */ }
);
```

#### above
The `above` method is for setting handlers to execute at the stated breakpoint and
above (inclusive).

```js
import volley from 'volley';

// This will trigger for medium, large, and extralarge, but not small viewport
volley.above('medium', (evt) => { /* handle medium and above viewport */ });

// options as a second argument should you want/need to change them
volley.above(
  'medium',
  {fireOnSet: true, nextTick: true},
  () => { /* handle medium viewport */ }
);
```

#### below
The `below` method is for setting handlers to execute at the stated breakpoint and
below (inclusive).

```js
import volley from 'volley';

// This will trigger for small and medium, but not large or extralarge viewports
volley.below('medium', (evt) => { /* handle medium and below viewport */ });

// options as a second argument should you want/need to change them
volley.below(
  'medium',
  {fireOnSet: true, nextTick: true},
  () => { /* handle medium viewport */ }
);
```

#### between
The `between` method is for setting handlers to execute between the stated breakpoints
(inclusive).

```js
import volley from 'volley';

// This will trigger for medium and large, but not small or extralarge viewports
volley.below('medium', 'large', (evt) => { /* handle medium and large viewport */ });

// options as a second argument should you want/need to change them
volley.below(
  'medium',
  'large',
  {fireOnSet: true, nextTick: true},
  () => { /* handle medium viewport */ }
);
```

#### getCurrentBreakpoint
The `getCurrentBreakpoint` method is for retrieving the current breakpoint
programmatically.

```js
import volley from 'volley';

let breakpoint = volley.getCurrentBreakpoint();
```
