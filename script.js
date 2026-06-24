const notFoundPage = new URL('404.html', window.location.href);

async function pageExists(url) {
  try {
    const response = await fetch(url, { method: 'GET' });
    return response.ok;
  } catch (error) {
    return false;
  }
}

document.addEventListener('click', async (event) => {
  const link = event.target.closest('a');

  if (!link) {
    return;
  }

  const url = new URL(link.href);

  if (url.origin !== window.location.origin || url.href === notFoundPage.href) {
    return;
  }

  event.preventDefault();

  if (await pageExists(url.href)) {
    window.location.href = url.href;
  } else {
    window.location.href = notFoundPage.href;
  }
});
