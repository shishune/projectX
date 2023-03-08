function insertLinkInHead (tagHref, tagRel) {
  let linkTag = document.createElement('link');
  linkTag.href = tagHref;
  linkTag.rel = tagRel;
  document.head.appendChild(linkTag); 
}

export { insertLinkInHead };