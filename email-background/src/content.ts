const matchItems : MatchItem[] = [
  {
    callback: doGmailMatch,
    matches: [
      /^https:\/\/mail\.google\.com\/mail\/.*/,
    ]
  }
];

const currentUrl = window.location.href;

function waitUntilReady(elementQuery: string): Promise<void> {
  console.log('wait until ready: ', elementQuery)
  return new Promise((resolve) => {
    const observer = new MutationObserver((mutationsList) => {
      if (mutationsList.length > 0) {
        const element = document.querySelector(elementQuery);
        if (element) {
          observer.disconnect(); // Stop observing once the element is found
          resolve(); // Resolve the promise once the element is found
        }
      }
    });

    observer.observe(document.body, {
      childList: true, // Detect elements added/removed
      attributes: true, // Detect attribute changes
      characterData: true, // Detect text changes
      subtree: true, // Observe the whole document
    });
  });
}

function waitUntilFound(finderFunction: () => HTMLElement | null): Promise<HTMLElement> {
  console.log('wait until found')
  return new Promise((resolve) => {
    const observer = new MutationObserver(() => {
      const element = finderFunction();
      if (element) {
        observer.disconnect(); // Stop observing once found
        resolve(element); // Resolve the promise with the found element
      }
    });

    // Initial check in case the element is already present
    const element = finderFunction();
    if (element) {
      resolve(element); // Resolve immediately if found
      return;
    }

    observer.observe(document.body, {
      childList: true, // Detect elements added/removed
      attributes: true, // Detect attribute changes
      characterData: true, // Detect text changes
      subtree: true, // Observe the whole document
    });
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

