export default {
  layout: "layouts/doc.njk",
  permalink: (data) => (data.isDocsHome ? "/docs/" : `/docs/${data.page.fileSlug}/`),
};
