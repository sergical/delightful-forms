import Reveal from "reveal.js";
import "reveal.js/dist/reveal.css";
import "reveal.js/dist/theme/black.css";
import Highlight from "reveal.js/plugin/highlight/highlight";
import "reveal.js/plugin/highlight/monokai.css";
import Notes from "reveal.js/plugin/notes/notes";
import "./style.css";

const deck = new Reveal({
  // Display presentation control arrows
  controls: true,

  // Help the user learn the controls by providing hints
  controlsTutorial: true,

  // Determines where controls appear
  controlsLayout: "bottom-right",

  // Visibility rule for backwards navigation arrows
  controlsBackArrows: "faded",

  // Display a presentation progress bar
  progress: true,

  // Display the page number of the current slide
  slideNumber: true,

  // Add the current slide number to the URL hash
  hash: true,

  // Push each slide change to the browser history
  history: true,

  // Enable keyboard shortcuts for navigation
  keyboard: true,

  // Enable the slide overview mode
  overview: true,

  // Vertical centering of slides
  center: true,

  // Enable touch navigation on devices with touch input
  touch: true,

  // Loop the presentation
  loop: false,

  // Change the presentation direction to be RTL
  rtl: false,

  // See https://revealjs.com/vertical-slides/#navigation-mode
  navigationMode: "default",

  // Randomizes the order of slides each time the presentation loads
  shuffle: false,

  // Turn fragments on and off globally
  fragments: true,

  // Enable slide navigation via mouse wheel
  mouseWheel: false,

  // Hide cursor when inactive
  hideInactiveCursor: true,

  // Time before the cursor is hidden (in ms)
  hideCursorTime: 5000,

  // Transition style
  transition: "slide", // none/fade/slide/convex/concave/zoom

  // Transition speed
  transitionSpeed: "default", // default/fast/slow

  // Transition style for full page slide backgrounds
  backgroundTransition: "fade",

  // Number of slides away from the current that are visible
  viewDistance: 3,

  // Parallax background image
  parallaxBackgroundImage: "",

  // Parallax background size
  parallaxBackgroundSize: "",

  // Number of pixels to move the parallax background per slide
  parallaxBackgroundHorizontal: null,
  parallaxBackgroundVertical: null,

  // Plugins configuration
  plugins: [Highlight, Notes],
});

deck.initialize();
