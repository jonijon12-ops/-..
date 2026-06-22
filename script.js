const entryInput = document.getElementById('entryInput');
const saveButton = document.getElementById('saveButton');
const clearButton = document.getElementById('clearButton');
const entriesContainer = document.getElementById('entries');
const STORAGE_KEY = 'gamerDiaryEntries';

function loadEntries() {
  const saved = localStorage.getItem(STORAGE_KEY);
  return saved ? JSON.parse(saved) : [];
}

function saveEntries(entries) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(entries));
}

function formatDate(timestamp) {
  const date = new Date(timestamp);
  return date.toLocaleString('ru-RU', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
}

function renderEntries() {
  const entries = loadEntries();
  entriesContainer.innerHTML = entries.length
    ? entries.map(entry => `
        <div class="entry">
          <time>${formatDate(entry.timestamp)}</time>
          <div>${entry.text.replace(/\n/g, '<br>')}</div>
        </div>
      `).join('')
    : '<div class="entry">Здесь пока нет записей. Напиши что-то новое!</div>';
}

saveButton.addEventListener('click', () => {
  const text = entryInput.value.trim();
  if (!text) {
    alert('Напиши, что у тебя было сегодня, прежде чем сохранять.');
    return;
  }

  const entries = loadEntries();
  entries.unshift({ text, timestamp: Date.now() });
  saveEntries(entries);
  entryInput.value = '';
  renderEntries();
});

clearButton.addEventListener('click', () => {
  if (!entryInput.value.trim()) {
    entryInput.value = '';
    return;
  }
  if (confirm('Очистить текстовое поле?')) {
    entryInput.value = '';
  }
});

renderEntries();
