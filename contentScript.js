const nameCache = {};
const elements = document.body.querySelectorAll('a[data-hovercard-type=user]');

for (const element of elements) {
    const hoverCardUrl = element.getAttribute('data-hovercard-url');
    const href = element.getAttribute('href');

    if (!hoverCardUrl || !href) {
        continue;
    }

    const userName = href.split('/').pop();

    getName(hoverCardUrl, href)
        .then(name => {
            element.innerHTML = element.innerHTML.replaceAll(userName, name);
        })
        .catch(error => console.error(error));
}

function getName(hoverCardUrl, href) {
    if (!nameCache[hoverCardUrl]) {
        nameCache[hoverCardUrl] = getNameFromHoverCard(hoverCardUrl, href);
    }

    return nameCache[hoverCardUrl];
}

async function getNameFromHoverCard(hoverCardUrl, href) {
    const url = `${href}`;
    const response = await fetch(url);
    const text = await response.text();
    const pattern = new RegExp(`<title>.+? \\((.+)\\)<\\/title>`);
    const matched = text.match(pattern);

    return matched[1];
}
