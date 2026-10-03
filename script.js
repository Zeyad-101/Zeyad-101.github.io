document.addEventListener('DOMContentLoaded', () => {
  const observerOptions = { root: null, rootMargin: '0px', threshold: 0.1 };
  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  const fadeElements = document.querySelectorAll('.fade-in');
  fadeElements.forEach(el => observer.observe(el));

  const terminalText = `> ./zeyad --status
role: SWE Student
focus: web \u00b7 AI \u00b7 OSS
status: open to work`;

  const typingContainer = document.getElementById('typing-text');
  if (typingContainer) {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      typingContainer.textContent = terminalText;
    } else {
      let currentIndex = 0;
      typingContainer.textContent = '';
      const typeChar = () => {
        if (currentIndex < terminalText.length) {
          typingContainer.textContent += terminalText.charAt(currentIndex);
          currentIndex++;
          const delay = Math.random() * 40 + 20;
          setTimeout(typeChar, delay);
        }
      };
      setTimeout(typeChar, 500);
    }
  }

  const btnCopyEmail = document.getElementById('btn-copy-email');
  if (btnCopyEmail) {
    btnCopyEmail.addEventListener('click', () => {
      navigator.clipboard.writeText('ziadwaled4@gmail.com').then(() => {
        btnCopyEmail.textContent = 'Email copied!';
        setTimeout(() => { btnCopyEmail.textContent = 'Get in touch'; }, 2000);
      });
    });
  }

  loadContent();
});

async function loadContent() {
  try {
    const [projectsRes, experienceRes, skillsRes, achievementsRes] = await Promise.all([
      fetch('data/projects.json'),
      fetch('data/experience.json'),
      fetch('data/skills.json'),
      fetch('data/achievements.json')
    ]);

    const projects = await projectsRes.json();
    const experience = await experienceRes.json();
    const skills = await skillsRes.json();
    const achievements = await achievementsRes.json();

    const projectsList = document.getElementById('projects-list');
    if (projectsList) {
      const media = p => p.image
        ? `<img src="${p.image}" alt="${p.imageAlt || p.title}" loading="lazy">`
        : `<div class="terminal-card"><div class="terminal-chrome"><div class="terminal-dots"><div class="terminal-dot dot-red"></div><div class="terminal-dot dot-amber"></div><div class="terminal-dot dot-green"></div></div><div class="font-mono text-[12px] text-text-secondary">${p.slug}</div></div><pre class="font-mono text-sm text-cyan whitespace-pre-wrap p-4">${(p.terminal || []).join('\n')}</pre></div>`;
      projectsList.innerHTML = projects.map(p => `
        <article class="card p-8 md:p-10 flex flex-col space-y-8">
          <div class="flex flex-col md:flex-row gap-8 justify-between">
            <div class="flex-1 space-y-4">
              <div class="flex items-center gap-3">
                ${p.featured ? '<span class="bg-cyan-dim text-cyan font-mono text-xs px-2 py-1 rounded-[4px] uppercase tracking-widest">★ Featured</span>' : ''}
                <span class="font-mono text-text-secondary text-sm">${p.tag}</span>
              </div>
              <h3 class="font-inter font-bold text-3xl text-text-primary">${p.title}</h3>
              <p class="font-inter text-text-secondary text-base leading-150 max-w-lg">${p.description}</p>
              <ul class="space-y-2 font-inter text-text-secondary text-sm">
                ${p.highlights.map(h => `<li><span class="text-cyan mr-2">-></span> ${h}</li>`).join('')}
              </ul>
              <div class="flex flex-wrap gap-3 pt-2">
                ${p.stack.map(s => `<span class="skill-chip-ghost text-sm px-4 py-2 rounded-[4px] font-inter">${s}</span>`).join('')}
              </div>
              <div class="pt-4 flex flex-wrap gap-6">
                ${(p.links || []).map(l => `<a href="${l.url}" target="_blank" rel="noopener noreferrer" class="font-mono text-cyan text-sm hover:underline">${l.label} -></a>`).join('')}
              </div>
            </div>
            <div class="flex-1 w-full">
              <div class="media-slot h-64 md:h-full min-h-[250px]">${media(p)}</div>
            </div>
          </div>
        </article>
      `).join('') + `
        <p class="font-mono text-text-secondary text-sm pt-4">More (Khatak, Ishara, Alfred, SkillSwap, Query-Flow…) on
          <a href="https://github.com/Zeyad-101?tab=repositories" target="_blank" rel="noopener noreferrer" class="text-cyan hover:underline">GitHub -></a></p>`;
    }

    const experienceList = document.getElementById('experience-list');
    if (experienceList) {
      experienceList.innerHTML = experience.map(job => `
        <div class="relative pl-[24px] pb-4" style="border-left: 2px solid var(--cyan-dim);">
          <div class="absolute w-3 h-3 bg-cyan rounded-full -left-[5px] top-0"></div>
          <div class="pt-1">
            <h3 class="font-inter font-bold text-xl text-text-primary">${job.role}</h3>
            <div class="font-mono text-text-secondary text-sm mt-1">${job.org} \u00b7 ${job.dateRange}</div>
          </div>
          ${job.metrics.length ? `<div class="flex flex-row flex-wrap gap-[36px] my-4" style="gap: 36px;">
            ${job.metrics.map(m => `
              <div class="flex flex-col gap-1">
                <span class="font-mono font-bold text-[26px] text-cyan leading-none">${m.number}</span>
                <span class="font-inter text-text-secondary text-[12px] font-normal leading-tight">${m.label}</span>
              </div>
            `).join('')}
          </div>` : '<div class="my-4"></div>'}
          <ul class="space-y-3 font-inter text-text-secondary text-base leading-150 max-w-3xl">
            ${job.bullets.map(b => `<li>${b}</li>`).join('')}
          </ul>
        </div>
      `).join('');
    }

    const skillsList = document.getElementById('skills-list');
    if (skillsList) {
      skillsList.innerHTML = skills.map(s => `
        <div class="card p-6 md:p-8 border-hairline w-full">
          <h3 class="font-mono ${s.primary ? 'text-cyan' : 'text-text-secondary'} text-sm mb-6 uppercase tracking-widest">${s.category}</h3>
          <div class="flex flex-wrap gap-3">
            ${s.items.map(item => `<span class="${s.primary ? 'skill-chip-solid' : 'skill-chip-ghost'} text-sm px-4 py-2 rounded-[4px] font-inter">${item}</span>`).join('')}
          </div>
        </div>
      `).join('');
    }

    const achievementsList = document.getElementById('achievements-list');
    if (achievementsList) {
      achievementsList.innerHTML = achievements.map(a => `
        <div class="card p-6 md:p-8 flex flex-col space-y-4 ${a.highlighted ? 'bg-amber-dim' : ''}">
          <h3 class="font-inter font-bold text-xl ${a.highlighted ? 'text-amber' : 'text-text-primary'}">${a.title}</h3>
          <p class="font-inter text-text-secondary text-base leading-150 max-w-3xl">${a.description}</p>
        </div>
      `).join('');
    }

  } catch (error) {
    console.error('Error loading content:', error);
  }
}
