(function () {
  var STORAGE_KEY = 'todos.v1';
  var todos = [];
  var filter = 'all';

  var factEl = document.getElementById('fact');
  var listEl = document.getElementById('todo-list');
  var formEl = document.getElementById('add-form');
  var inputEl = document.getElementById('new-task');
  var addBtn = document.getElementById('add-btn');
  var filterRow = document.getElementById('filter-row');
  var emptyAll = document.getElementById('empty-all');
  var emptyOpen = document.getElementById('empty-open');
  var emptyDone = document.getElementById('empty-done');
  var summaryEl = document.getElementById('summary');
  var summaryText = document.getElementById('summary-text');
  var clearBtn = document.getElementById('clear-done');

  function load() {
    try {
      var raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        var parsed = JSON.parse(raw);
        if (Array.isArray(parsed)) {
          todos = parsed.filter(function (t) { return t && typeof t.text === 'string'; });
        }
      }
    } catch (e) { todos = []; }
  }

  function save() {
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(todos)); } catch (e) {}
  }

  function add() {
    var text = inputEl.value.trim();
    if (!text) return;
    todos.unshift({ id: String(Date.now()) + '-' + Math.random().toString(36).slice(2, 8), text: text, done: false });
    inputEl.value = '';
    addBtn.disabled = true;
    save();
    render();
  }

  function toggle(id) {
    todos = todos.map(function (t) { return t.id === id ? { id: t.id, text: t.text, done: !t.done } : t; });
    save();
    render();
  }

  function remove(id) {
    todos = todos.filter(function (t) { return t.id !== id; });
    save();
    render();
  }

  function clearDone() {
    todos = todos.filter(function (t) { return !t.done; });
    save();
    render();
  }

  function render() {
    var openCount = todos.filter(function (t) { return !t.done; }).length;
    var doneCount = todos.length - openCount;
    var visible = todos.filter(function (t) {
      return filter === 'open' ? !t.done : filter === 'done' ? t.done : true;
    });

    factEl.hidden = false;
    factEl.textContent = openCount + ' open';

    filterRow.hidden = todos.length === 0;
    emptyAll.hidden = todos.length !== 0;
    emptyOpen.hidden = !(todos.length > 0 && visible.length === 0 && filter === 'open');
    emptyDone.hidden = !(todos.length > 0 && visible.length === 0 && filter === 'done');

    listEl.innerHTML = '';
    visible.forEach(function (t) {
      var li = document.createElement('li');
      li.className = 'todo-item';
      li.setAttribute('data-done', String(t.done));

      var check = document.createElement('button');
      check.type = 'button';
      check.className = 'todo-check';
      check.setAttribute('role', 'checkbox');
      check.setAttribute('aria-checked', String(t.done));
      check.setAttribute('aria-label', t.done ? 'Mark "' + t.text + '" as not done' : 'Mark "' + t.text + '" as done');
      if (t.done) {
        check.innerHTML = '<svg width="14" height="14" viewBox="0 0 14 14" aria-hidden="true"><path d="M2.5 7.5l3 3 6-6" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>';
      }
      check.addEventListener('click', function () { toggle(t.id); });

      var span = document.createElement('span');
      span.className = 'todo-text';
      span.textContent = t.text;

      var del = document.createElement('button');
      del.type = 'button';
      del.className = 'btn btn-ghost btn-compact';
      del.textContent = 'Delete';
      del.addEventListener('click', function () { remove(t.id); });

      li.appendChild(check);
      li.appendChild(span);
      li.appendChild(del);
      listEl.appendChild(li);
    });

    summaryEl.hidden = todos.length === 0;
    summaryText.textContent = openCount + ' open, ' + doneCount + ' done';
    clearBtn.hidden = doneCount === 0;
  }

  formEl.addEventListener('submit', function (e) { e.preventDefault(); add(); });
  inputEl.addEventListener('input', function () { addBtn.disabled = !inputEl.value.trim(); });
  clearBtn.addEventListener('click', clearDone);
  Array.prototype.forEach.call(document.querySelectorAll('.choice'), function (btn) {
    btn.addEventListener('click', function () {
      filter = btn.getAttribute('data-filter');
      Array.prototype.forEach.call(document.querySelectorAll('.choice'), function (b) {
        b.setAttribute('aria-pressed', String(b === btn));
      });
      render();
    });
  });

  load();
  render();
})();
