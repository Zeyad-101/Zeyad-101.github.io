let data = {
  projects: [],
  experience: [],
  skills: [],
  achievements: []
};

async function init() {
  try {
    const [p, e, s, a] = await Promise.all([
      fetch('../site/data/projects.json').then(r => r.json()),
      fetch('../site/data/experience.json').then(r => r.json()),
      fetch('../site/data/skills.json').then(r => r.json()),
      fetch('../site/data/achievements.json').then(r => r.json())
    ]);
    data.projects = p;
    data.experience = e;
    data.skills = s;
    data.achievements = a;
    
    renderProjects();
    renderExperience();
    renderSkills();
    renderAchievements();
  } catch(err) {
    console.error("Error loading JSON:", err);
    alert("Could not load JSON files. Make sure you are running via a local server.");
  }
}

function switchTab(tabId) {
  document.querySelectorAll('.tab-content').forEach(el => el.classList.remove('active'));
  document.querySelectorAll('.tab-btn').forEach(el => el.classList.remove('active'));
  document.getElementById(tabId).classList.add('active');
  event.target.classList.add('active');
}

function renderArrayInput(label, array, type, index, field) {
  let html = `<div class="form-group"><label>${label}</label>`;
  html += `<div class="array-container">`;
  array.forEach((item, i) => {
    html += `
      <div class="array-item">
        <input type="text" value="${item.replace(/"/g, '&quot;')}" onchange="updateArrayItem('${type}', ${index}, '${field}', ${i}, this.value)">
        <button class="remove-array-btn" onclick="updateArrayItem('${type}', ${index}, '${field}', ${i}, null)">X</button>
      </div>
    `;
  });
  html += `<button class="btn" onclick="updateArrayItem('${type}', ${index}, '${field}', 'add', null)">+ Add Item</button></div></div>`;
  return html;
}

window.updateArrayItem = function(type, index, field, arrIndex, val) {
  if (arrIndex === 'add') data[type][index][field].push("");
  else if (val === null) data[type][index][field].splice(arrIndex, 1);
  else data[type][index][field][arrIndex] = val;
  
  if (type === 'projects') renderProjects();
  if (type === 'experience') renderExperience();
  if (type === 'skills') renderSkills();
};

// ---- PROJECTS ----
function renderProjects() {
  const container = document.getElementById('projects-container');
  container.innerHTML = data.projects.map((p, i) => `
    <div class="item-card">
      <button class="delete-btn" onclick="deleteItem('projects', ${i})">Delete</button>
      <div class="form-group"><label>Title</label><input type="text" value="${p.title}" onchange="updateItem('projects', ${i}, 'title', this.value)"></div>
      <div class="form-group"><label>Tag (e.g. Open Source)</label><input type="text" value="${p.tag}" onchange="updateItem('projects', ${i}, 'tag', this.value)"></div>
      <div class="form-group"><label>Description</label><textarea onchange="updateItem('projects', ${i}, 'description', this.value)">${p.description}</textarea></div>
      <div class="form-group"><label>CTA Text</label><input type="text" value="${p.cta}" onchange="updateItem('projects', ${i}, 'cta', this.value)"></div>
      <div class="form-group"><label>CTA Link</label><input type="text" value="${p.ctaLink}" onchange="updateItem('projects', ${i}, 'ctaLink', this.value)"></div>
      <div class="form-group"><label>Media Placeholder</label><input type="text" value="${p.mediaPlaceholder}" onchange="updateItem('projects', ${i}, 'mediaPlaceholder', this.value)"></div>
      <div class="form-group"><label>Featured?</label><input type="checkbox" ${p.featured ? 'checked' : ''} onchange="updateItem('projects', ${i}, 'featured', this.checked)"></div>
      
      ${renderArrayInput('Highlights', p.highlights, 'projects', i, 'highlights')}
      ${renderArrayInput('Stack', p.stack, 'projects', i, 'stack')}
    </div>
  `).join('');
}
function addProject() {
  data.projects.push({ slug:"", tag:"", title:"", note:"", description:"", highlights:[], stack:[], mediaFolder:"", cta:"", ctaLink:"", featured:false, mediaPlaceholder:"" });
  renderProjects();
}

// ---- EXPERIENCE ----
function renderExperience() {
  const container = document.getElementById('experience-container');
  container.innerHTML = data.experience.map((e, i) => `
    <div class="item-card">
      <button class="delete-btn" onclick="deleteItem('experience', ${i})">Delete</button>
      <div class="form-group"><label>Role</label><input type="text" value="${e.role}" onchange="updateItem('experience', ${i}, 'role', this.value)"></div>
      <div class="form-group"><label>Organization</label><input type="text" value="${e.org}" onchange="updateItem('experience', ${i}, 'org', this.value)"></div>
      <div class="form-group"><label>Date Range</label><input type="text" value="${e.dateRange}" onchange="updateItem('experience', ${i}, 'dateRange', this.value)"></div>
      
      <div class="form-group"><label>Metrics (Number | Label)</label>
        ${e.metrics.map((m, mi) => `
          <div class="array-item">
            <input type="text" value="${m.number}" placeholder="Number" style="flex:0.3" onchange="updateExpMetric(${i}, ${mi}, 'number', this.value)">
            <input type="text" value="${m.label}" placeholder="Label" onchange="updateExpMetric(${i}, ${mi}, 'label', this.value)">
            <button class="remove-array-btn" onclick="updateExpMetric(${i}, ${mi}, 'delete', null)">X</button>
          </div>
        `).join('')}
        <button class="btn" onclick="updateExpMetric(${i}, 'add', null, null)">+ Add Metric</button>
      </div>

      ${renderArrayInput('Bullets', e.bullets, 'experience', i, 'bullets')}
    </div>
  `).join('');
}
window.updateExpMetric = function(index, mi, field, val) {
  if (mi === 'add') data.experience[index].metrics.push({number:"", label:""});
  else if (field === 'delete') data.experience[index].metrics.splice(mi, 1);
  else data.experience[index].metrics[mi][field] = val;
  renderExperience();
};
function addExperience() {
  data.experience.push({ role:"", org:"", dateRange:"", metrics:[], bullets:[] });
  renderExperience();
}

// ---- SKILLS ----
function renderSkills() {
  const container = document.getElementById('skills-container');
  container.innerHTML = data.skills.map((s, i) => `
    <div class="item-card">
      <button class="delete-btn" onclick="deleteItem('skills', ${i})">Delete</button>
      <div class="form-group"><label>Category</label><input type="text" value="${s.category}" onchange="updateItem('skills', ${i}, 'category', this.value)"></div>
      <div class="form-group"><label>Primary Style (Solid BG)?</label><input type="checkbox" ${s.primary ? 'checked' : ''} onchange="updateItem('skills', ${i}, 'primary', this.checked)"></div>
      ${renderArrayInput('Items', s.items, 'skills', i, 'items')}
    </div>
  `).join('');
}
function addSkillCategory() {
  data.skills.push({ category:"", primary:false, items:[] });
  renderSkills();
}

// ---- ACHIEVEMENTS ----
function renderAchievements() {
  const container = document.getElementById('achievements-container');
  container.innerHTML = data.achievements.map((a, i) => `
    <div class="item-card">
      <button class="delete-btn" onclick="deleteItem('achievements', ${i})">Delete</button>
      <div class="form-group"><label>Title</label><input type="text" value="${a.title}" onchange="updateItem('achievements', ${i}, 'title', this.value)"></div>
      <div class="form-group"><label>Description</label><textarea onchange="updateItem('achievements', ${i}, 'description', this.value)">${a.description}</textarea></div>
      <div class="form-group"><label>Highlighted (Amber BG)?</label><input type="checkbox" ${a.highlighted ? 'checked' : ''} onchange="updateItem('achievements', ${i}, 'highlighted', this.checked)"></div>
    </div>
  `).join('');
}
function addAchievement() {
  data.achievements.push({ title:"", description:"", highlighted:false });
  renderAchievements();
}

// ---- UTILS ----
window.updateItem = function(type, index, field, value) {
  data[type][index][field] = value;
};
window.deleteItem = function(type, index) {
  if(confirm("Are you sure you want to delete this item?")) {
    data[type].splice(index, 1);
    if(type === 'projects') renderProjects();
    if(type === 'experience') renderExperience();
    if(type === 'skills') renderSkills();
    if(type === 'achievements') renderAchievements();
  }
};

window.saveData = function(type) {
  const jsonStr = JSON.stringify(data[type], null, 2);
  const blob = new Blob([jsonStr], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = type + ".json";
  a.click();
  URL.revokeObjectURL(url);
};

init();
