module.exports = function (eleventyConfig) {
  eleventyConfig.addPassthroughCopy("src/assets");

  const pathPrefix = process.env.PATHPREFIX || "";
  if (pathPrefix) {
    eleventyConfig.addTransform("pathprefix", function (content, outputPath) {
      if (!outputPath || !outputPath.endsWith(".html")) return content;
      return content.replace(/((?:href|src)=)"\/(?!\/)/g, `$1"${pathPrefix}/`);
    });
  }

  eleventyConfig.addFilter("chapterUrl", function (slug) {
    return `/chapters/${slug}/`;
  });

  eleventyConfig.addFilter("prevChapter", function (slug, chapters) {
    const idx = chapters.findIndex((ch) => ch.slug === slug);
    return idx > 0 ? chapters[idx - 1] : null;
  });

  eleventyConfig.addFilter("nextChapter", function (slug, chapters) {
    const idx = chapters.findIndex((ch) => ch.slug === slug);
    return idx < chapters.length - 1 ? chapters[idx + 1] : null;
  });

  eleventyConfig.setServerOptions({
    host: "0.0.0.0",
    port: 5173,
  });

  return {
    dir: {
      input: "src",
      output: "_site",
      includes: "_includes",
      data: "_data",
    },
    markdownTemplateEngine: "njk",
  };
};
