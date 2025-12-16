// ===== 共通ユーティリティ =====
function normalizeName(name) {
return name.replace(/\s+/g, "");
}

// ===== イベント設定（タイトル・説明） =====
function loadEventSettings() {
const title = localStorage.getItem("eventTitle");
const desc = localStorage.getItem("eventDescription");

if (title && document.getElementById("eventTitle")) { document.getElementById("eventTitle").textContent = title; document.title = title; } if (desc && document.getElementById("eventDescription")) { document.getElementById("eventDescription").innerHTML = desc.replace(/\n/g, "<br>"); }

if (document.getElementById("adminTitle")) { document.getElementById("adminTitle").value = title || ""; document.getElementById("adminDescription").value = desc || ""; } }

function saveEventSettings() {
const title = document.getElementById("adminTitle").value;
const desc = document.getElementById("adminDescription").value;

localStorage.setItem("eventTitle", title); localStorage.setItem("eventDescription", desc);

alert("参加者画面に反映されました。");
}

// ===== 回答処理 =====
const form = document.getElementById("entryForm");
if (form) {
form.addEventListener("submit", function (e) { e.preventDefault();

const name = document.getElementById("name").value;
const key = normalizeName(name);

const data = {
name: name,
attendance: document.getElementById("attendance").value,
gift: document.getElementById("gift").value,
memo: document.getElementById("memo").value
};

localStorage.setItem("entry_" + key, JSON.stringify(data));
alert("送信しました。ありがとうございました。");
form.reset();
});
}

// ===== 管理者表示 =====
function loadResults() {
const result = document.getElementById("result");
if (!result) return;

result.innerHTML = "";

Object.keys(localStorage)
.filter(k => k.startsWith("entry_"))
.forEach(k => {
const d = JSON.parse(localStorage.getItem(k));
const div = document.createElement("div"); div.innerHTML = ` <strong>${d.name <http://d.name> }</strong><br>
参加状況：${d.attendance}<br>
記念品口数：${d.gift}<br>
備考：${d.memo}<br><hr>
`;
result.appendChild(div);
});
}

// ===== 全リセット =====
function resetAll() {
if (!confirm("【最終警告】\n本当に全回答を削除しますか？\nこの操作は取り消せません。")) return;

Object.keys(localStorage)
.filter(k => k.startsWith("entry_"))
.forEach(k => localStorage.removeItem(k));

alert("全回答を削除しました。");
loadResults();
}

// 初期ロード
loadEventSettings();
loadResults();
