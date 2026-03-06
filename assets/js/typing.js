/**
 * Typing animation for the homepage hero.
 *
 * Keeps the prefix "Hi! I am Harini! I am " static,
 * then loops through phrases — typing each one character by character,
 * waiting, then deleting back to nothing before typing the next.
 */
(function () {
  'use strict';

  var phrases = [
    "trying not to live on autopilot.",
    "debugging my own defaults.",
    "engineering intention into chaos.",
  ];

  var TYPE_SPEED    = 62;   // ms per character when typing
  var DELETE_SPEED  = 32;   // ms per character when deleting
  var PAUSE_AFTER   = 2400; // ms to wait after full phrase is typed
  var PAUSE_BEFORE  = 450;  // ms to wait before typing next phrase

  var typingEl = document.getElementById('typing-text');
  var cursorEl = document.getElementById('typing-cursor');

  // Only run on pages that have the typing element
  if (!typingEl) return;

  var phraseIndex = 0;
  var charIndex   = 0;
  var isDeleting  = false;

  function tick() {
    var current = phrases[phraseIndex];

    if (isDeleting) {
      // Remove one character
      charIndex--;
      typingEl.textContent = current.substring(0, charIndex);

      if (charIndex === 0) {
        // Done deleting — move to next phrase
        isDeleting  = false;
        phraseIndex = (phraseIndex + 1) % phrases.length;
        setTimeout(tick, PAUSE_BEFORE);
        return;
      }

      setTimeout(tick, DELETE_SPEED);

    } else {
      // Add one character
      charIndex++;
      typingEl.textContent = current.substring(0, charIndex);

      if (charIndex === current.length) {
        // Done typing — pause then start deleting
        isDeleting = true;
        setTimeout(tick, PAUSE_AFTER);
        return;
      }

      setTimeout(tick, TYPE_SPEED);
    }
  }

  // Small initial delay so the page feels settled before animation starts
  setTimeout(tick, 600);
})();
