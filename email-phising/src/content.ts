const matchItems : MatchItem[] = [
  {
    callback: doGmailMatch,
    matches: [
      /^https:\/\/mail\.google\.com\/mail\/.*/,
    ]
  }
];

const currentUrl = window.location.href;

function onDomChange(callback: () => null): void {
  const observer = new MutationObserver(() => {
    callback(); // Run the callback on every DOM change
  });

  observer.observe(document.body, {
    childList: true, // Detect addition/removal of child elements
    attributes: true, // Detect attribute changes
    characterData: true, // Detect text changes
    subtree: true, // Observe the entire DOM tree
  });
}


// Start depending on URL
for (const item of matchItems) {
  for (const rMatch of item.matches) {
    if (rMatch.test(currentUrl)) {
      item.callback(currentUrl)
    }
  }
}

