(() => {
  const root = document.documentElement;
  const principlesEl = document.querySelector("#principles");
  const sectionsEl = document.querySelector("#sections");
  const lastUpdatedEl = document.querySelector("#last-updated");
  const toggleThemeBtn = document.querySelector("#toggle-theme");

  const renderPrinciples = () => {
    principlesEl.innerHTML = guideData.principles
      .map(
        (item) => `
          <article class="card">
            <div class="badge">原则</div>
            <h3>${item.title}</h3>
            <p class="text-block">${item.detail}</p>
          </article>
        `
      )
      .join("");
  };

  const renderSections = () => {
    sectionsEl.innerHTML = guideData.categories
      .map(
        (section) => `
          <article class="section-card">
            <div class="section-header">
              <div>
                <p class="eyebrow">${section.subtitle}</p>
                <h2>${section.title}</h2>
              </div>
              <span class="pill">${section.entries.length} 条话术</span>
            </div>
            ${section.entries
              .map(
                (entry) => `
                  <div class="entry">
                    <p class="entry-title">${entry.label}</p>
                    <p class="label">话术</p>
                    <p class="text-block">${entry.speech}</p>
                    <p class="label">真相</p>
                    <p class="text-block">${entry.truth}</p>
                    <p class="label">应对建议</p>
                    <p class="text-block">${entry.response}</p>
                  </div>
                `
              )
              .join("")}
          </article>
        `
      )
      .join("");
  };

  const applyTheme = (theme) => {
    root.dataset.theme = theme;
    localStorage.setItem("guide-theme", theme);
    toggleThemeBtn.textContent = theme === "dark" ? "切换到浅色" : "切换到深色";
  };

  const initTheme = () => {
    const stored = localStorage.getItem("guide-theme");
    if (stored === "dark" || stored === "light") {
      applyTheme(stored);
    } else {
      const prefersDark = window.matchMedia("(prefers-color-scheme: dark)")
        .matches;
      applyTheme(prefersDark ? "dark" : "light");
    }
  };

  const init = () => {
    renderPrinciples();
    renderSections();
    lastUpdatedEl.textContent = `最后更新：${guideData.updatedAt}`;
    initTheme();
    toggleThemeBtn.addEventListener("click", () => {
      const next = root.dataset.theme === "dark" ? "light" : "dark";
      applyTheme(next);
    });
  };

  init();
})();

