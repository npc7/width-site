export default {
  layout: "layouts/doc.njk",
  permalink: (data) => (data.isDocsHome ? "/zh/docs/" : `/zh/docs/${data.page.fileSlug}/`),
};
