/**
 * 書籍訂單查詢系統 - 前端邏輯 (Vanilla ES6 JavaScript)
 * 相容於 Workflow of Search.json 搜尋邏輯與資料結構
 */

// 1. 內建 100 筆模擬測試資料 (Mock Database)
const mockOrders = [
  { "訂單編號": "ORD-2026-1001", "顧客姓名": "陳立偉", "會員編號": "MEM-8801", "e-mail": "liwei.chen@example.com", "聯絡電話": "0912-345-678", "書籍名稱": "原子習慣：細微改變帶來巨大成就", "圖書分類": "心理勵志", "購買金額（元）": 380, "購買日期": "2026-08-01" },
  { "訂單編號": "ORD-2026-1002", "顧客姓名": "林雅婷", "會員編號": "MEM-8802", "e-mail": "yating.lin@example.com", "聯絡電話": "0921-987-654", "書籍名稱": "被討厭的勇氣：自我啟發之父「阿德勒」的教導", "圖書分類": "心理勵志", "購買金額（元）": 300, "購買日期": "2026-08-01" },
  { "訂單編號": "ORD-2026-1003", "顧客姓名": "張家豪", "會員編號": "MEM-8803", "e-mail": "chiahao.chang@example.com", "聯絡電話": "0933-111-222", "書籍名稱": "富爸爸，窮爸爸", "圖書分類": "商業理財", "購買金額（元）": 420, "購買日期": "2026-08-02" },
  { "訂單編號": "ORD-2026-1004", "顧客姓名": "黃怡君", "會員編號": "MEM-8804", "e-mail": "yichun.huang@example.com", "聯絡電話": "0955-444-333", "書籍名稱": "Python 自動化狂潮：AI 時代的實戰應用", "圖書分類": "電腦資訊", "購買金額（元）": 580, "購買日期": "2026-08-02" },
  { "訂單編號": "ORD-2026-1005", "顧客姓名": "王志明", "會員編號": "MEM-8805", "e-mail": "chiming.wang@example.com", "聯絡電話": "0966-777-888", "書籍名稱": "百年孤寂（五十週年紀念版）", "圖書分類": "文學小說", "購買金額（元）": 450, "購買日期": "2026-08-03" },
  { "訂單編號": "ORD-2026-1006", "顧客姓名": "吳美玲", "會員編號": "MEM-8806", "e-mail": "meiling.wu@example.com", "聯絡電話": "0977-222-111", "書籍名稱": "投資最重要的事：頂尖價值投資人的忠告", "圖書分類": "商業理財", "購買金額（元）": 390, "購買日期": "2026-08-03" },
  { "訂單編號": "ORD-2026-1007", "顧客姓名": "劉建宏", "會員編號": "MEM-8807", "e-mail": "chienhong.liu@example.com", "聯絡電話": "0988-333-999", "書籍名稱": "深入淺出 JavaScript 前端開發思維", "圖書分類": "電腦資訊", "購買金額（元）": 620, "購買日期": "2026-08-04" },
  { "訂單編號": "ORD-2026-1008", "顧客姓名": "蔡淑芬", "會員編號": "MEM-8808", "e-mail": "shufen.tsai@example.com", "聯絡電話": "0911-555-777", "書籍名稱": "人類大歷史：從野獸到扮演上帝", "圖書分類": "人文史地", "購買金額（元）": 500, "購買日期": "2026-08-04" },
  { "訂單編號": "ORD-2026-1009", "顧客姓名": "楊宗翰", "會員編號": "MEM-8809", "e-mail": "tsunghan.yang@example.com", "聯絡電話": "0922-444-666", "書籍名稱": "設計心理學：日常設計的日常美學", "圖書分類": "藝術設計", "購買金額（元）": 480, "購買日期": "2026-08-05" },
  { "訂單編號": "ORD-2026-1010", "顧客姓名": "許佩珊", "會員編號": "MEM-8810", "e-mail": "peishan.hsu@example.com", "聯絡電話": "0933-888-000", "書籍名稱": "快思慢想（經典講義版）", "圖書分類": "心理勵志", "購買金額（元）": 400, "購買日期": "2026-08-05" },
  { "訂單編號": "ORD-2026-1011", "顧客姓名": "鄭智偉", "會員編號": "MEM-8811", "e-mail": "chiwei.cheng@example.com", "聯絡電話": "0944-123-789", "書籍名稱": "原則：生活和工作", "圖書分類": "商業理財", "購買金額（元）": 520, "購買日期": "2026-08-06" },
  { "訂單編號": "ORD-2026-1012", "顧客姓名": "謝佳玲", "會員編號": "MEM-8812", "e-mail": "chialing.hsieh@example.com", "聯絡電話": "0955-987-123", "書籍名稱": "解憂雜貨店", "圖書分類": "文學小說", "購買金額（元）": 320, "購買日期": "2026-08-06" },
  { "訂單編號": "ORD-2026-1013", "顧客姓名": "郭俊傑", "會員編號": "MEM-8813", "e-mail": "chunjieh.kuo@example.com", "聯絡電話": "0966-456-789", "書籍名稱": "Clean Code 無瑕的程式碼", "圖書分類": "電腦資訊", "購買金額（元）": 650, "購買日期": "2026-08-07" },
  { "訂單編號": "ORD-2026-1014", "顧客姓名": "曾淑華", "會員編號": "MEM-8814", "e-mail": "shuhua.tseng@example.com", "聯絡電話": "0977-789-012", "書籍名稱": "槍炮、病菌與鋼鐵", "圖書分類": "人文史地", "購買金額（元）": 490, "購買日期": "2026-08-07" },
  { "訂單編號": "ORD-2026-1015", "顧客姓名": "廖威宇", "會員編號": "MEM-8815", "e-mail": "weiyu.liao@example.com", "聯絡電話": "0988-012-345", "書籍名稱": "色彩風格論：視覺創作者的配色天書", "圖書分類": "藝術設計", "購買金額（元）": 550, "購買日期": "2026-08-08" },
  { "訂單編號": "ORD-2026-1016", "顧客姓名": "賴冠宇", "會員編號": "MEM-8816", "e-mail": "kuanyu.lai@example.com", "聯絡電話": "0912-888-999", "書籍名稱": "股票作手回憶錄", "圖書分類": "商業理財", "購買金額（元）": 360, "購買日期": "2026-08-08" },
  { "訂單編號": "ORD-2026-1017", "顧客姓名": "徐明宏", "會員編號": "MEM-8817", "e-mail": "minghong.hsu@example.com", "聯絡電話": "0923-777-666", "書籍名稱": "被隱藏的時間：世界史的關鍵轉折", "圖書分類": "人文史地", "購買金額（元）": 430, "購買日期": "2026-08-09" },
  { "訂單編號": "ORD-2026-1018", "顧客姓名": "周雅筑", "會員編號": "MEM-8818", "e-mail": "yachu.chou@example.com", "聯絡電話": "0934-666-555", "書籍名稱": "靈魂的誕生：現代心理學導論", "圖書分類": "心理勵志", "購買金額（元）": 370, "購買日期": "2026-08-09" },
  { "訂單編號": "ORD-2026-1019", "顧客姓名": "葉柏翰", "會員編號": "MEM-8819", "e-mail": "pohan.yeh@example.com", "聯絡電話": "0945-555-444", "書籍名稱": "系統架構設計大師班", "圖書分類": "電腦資訊", "購買金額（元）": 780, "購買日期": "2026-08-10" },
  { "訂單編號": "ORD-2026-1020", "顧客姓名": "蘇靜宜", "會員編號": "MEM-8820", "e-mail": "chingyi.su@example.com", "聯絡電話": "0956-444-333", "書籍名稱": "挪威的森林（三十週年紀念典藏版）", "圖書分類": "文學小說", "購買金額（元）": 380, "購買日期": "2026-08-10" }
];

// 補充生成 80 筆動態測試資料，補齊 100 筆測試規模
const categories = ["商業理財", "文學小說", "電腦資訊", "心理勵志", "人文史地", "藝術設計"];
const names = ["陳", "林", "張", "黃", "王", "吳", "劉", "蔡", "楊", "許", "鄭", "謝", "郭", "曾", "廖"];
const givenNames = ["建志", "雅雯", "冠廷", "宗憲", "怡婷", "家豪", "心怡", "俊宏", "詩婷", "偉婷"];
const bookTitles = [
  "微服務架構實戰指南", "演算法心法精要", "資本論現代解讀", "藝術的歷史與流派",
  "思考致富聖經", "情商 EQ 頂級修練", "三體三部曲全集", "寫給開發者的 UX 課",
  "寫作是最好的自我投資", "敘事心理學", "靜心哲學與減壓", "資料結構大師指南"
];

for (let i = 21; i <= 100; i++) {
  const padId = String(i).padStart(4, '0');
  const name = names[i % names.length] + givenNames[i % givenNames.length];
  const cat = categories[i % categories.length];
  const title = bookTitles[i % bookTitles.length] + ` (第${(i % 3) + 1}版)`;
  const price = 250 + (i * 7) % 650;
  const day = String((i % 28) + 1).padStart(2, '0');
  
  mockOrders.push({
    "訂單編號": `ORD-2026-${1000 + i}`,
    "顧客姓名": name,
    "會員編號": `MEM-${8800 + i}`,
    "e-mail": `user${i}@example.com`,
    "聯絡電話": `09${(i % 9) + 1}0-${100 + i}-${200 + i}`,
    "書籍名稱": title,
    "圖書分類": cat,
    "購買金額（元）": price,
    "購買日期": `2026-07-${day}`
  });
}

// 2. 狀態管理 (State)
let currentData = [...mockOrders];
let filteredData = [...mockOrders];
let isApiMode = false;
let currentPage = 1;
const pageSize = 10;
let currentSearchQuery = "";
let currentSortKey = "date-desc";

// DOM 元素引用
const searchInput = document.getElementById("searchInput");
const searchForm = document.getElementById("searchForm");
const resetBtn = document.getElementById("resetBtn");
const categoryFilter = document.getElementById("categoryFilter");
const sortBySelect = document.getElementById("sortBySelect");
const tableBody = document.getElementById("tableBody");
const loadingState = document.getElementById("loadingState");
const emptyState = document.getElementById("emptyState");

const totalCountEl = document.getElementById("totalCount");
const totalAmountEl = document.getElementById("totalAmount");
const exportCsvBtn = document.getElementById("exportCsvBtn");

const themeToggleBtn = document.getElementById("themeToggleBtn");
const themeText = document.getElementById("themeText");
const settingsToggleBtn = document.getElementById("settingsToggleBtn");
const settingsPanel = document.getElementById("settingsPanel");
const webhookUrlInput = document.getElementById("webhookUrlInput");
const modeSwitchBtn = document.getElementById("modeSwitchBtn");
const currentModeText = document.getElementById("currentModeText");

const prevPageBtn = document.getElementById("prevPageBtn");
const nextPageBtn = document.getElementById("nextPageBtn");
const currentPageText = document.getElementById("currentPageText");
const pageStartNum = document.getElementById("pageStartNum");
const pageEndNum = document.getElementById("pageEndNum");
const pageTotalNum = document.getElementById("pageTotalNum");

// Modal 元素
const detailModal = document.getElementById("detailModal");
const modalCloseBtn = document.getElementById("modalCloseBtn");
const modalConfirmBtn = document.getElementById("modalConfirmBtn");
const modalPrintBtn = document.getElementById("modalPrintBtn");

// 3. 搜尋過濾核心邏輯 (與 Workflow of Search.json 中的 IF 節點相符)
function filterOrders() {
  const query = searchInput.value.trim().toLowerCase();
  const selectedCat = categoryFilter.value;
  currentSearchQuery = query;

  filteredData = currentData.filter(item => {
    // 比對全數欄位拼接字串 (根據 Workflow of Search.json 規範)
    const concatenatedString = [
      item["訂單編號"] || "",
      item["顧客姓名"] || "",
      item["會員編號"] || "",
      item["e-mail"] || "",
      item["聯絡電話"] || "",
      item["書籍名稱"] || "",
      item["圖書分類"] || "",
      String(item["購買金額（元）"] || ""),
      item["購買日期"] || ""
    ].join("").toLowerCase();

    const matchesQuery = query === "" || concatenatedString.includes(query);
    const matchesCategory = selectedCat === "" || item["圖書分類"] === selectedCat;

    return matchesQuery && matchesCategory;
  });

  applySorting();
  currentPage = 1;
  renderTable();
}

// 4. 排序邏輯
function applySorting() {
  const sortVal = sortBySelect.value;
  currentSortKey = sortVal;

  filteredData.sort((a, b) => {
    if (sortVal === "date-desc") {
      return new Date(b["購買日期"]) - new Date(a["購買日期"]);
    } else if (sortVal === "date-asc") {
      return new Date(a["購買日期"]) - new Date(b["購買日期"]);
    } else if (sortVal === "price-desc") {
      return (b["購買金額（元）"] || 0) - (a["購買金額（元）"] || 0);
    } else if (sortVal === "price-asc") {
      return (a["購買金額（元）"] || 0) - (b["購買金額（元）"] || 0);
    }
    return 0;
  });
}

// 5. 渲染表格與高亮 (Render Table)
function renderTable() {
  // 更新統計資訊
  totalCountEl.textContent = filteredData.length.toLocaleString();
  const sumAmount = filteredData.reduce((sum, item) => sum + Number(item["購買金額（元）"] || 0), 0);
  totalAmountEl.textContent = `$${sumAmount.toLocaleString()}`;

  if (filteredData.length === 0) {
    tableBody.innerHTML = "";
    emptyState.style.display = "block";
    updatePaginationControls(0);
    return;
  }

  emptyState.style.display = "none";

  // 分頁切片
  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = Math.min(startIndex + pageSize, filteredData.length);
  const pageItems = filteredData.slice(startIndex, endIndex);

  let html = "";
  pageItems.forEach(item => {
    html += `
      <tr onclick="openDetailModal('${item["訂單編號"]}')">
        <td>${highlightText(item["訂單編號"])}</td>
        <td><strong>${highlightText(item["顧客姓名"])}</strong></td>
        <td><code>${highlightText(item["會員編號"])}</code></td>
        <td>${highlightText(item["書籍名稱"])}</td>
        <td><span class="badge">${highlightText(item["圖書分類"])}</span></td>
        <td style="color: var(--accent-color); font-weight:600;">$${Number(item["購買金額（元）"]).toLocaleString()}</td>
        <td>${highlightText(item["購買日期"])}</td>
        <td>${highlightText(item["聯絡電話"])}</td>
        <td style="color: var(--text-muted);">${highlightText(item["e-mail"])}</td>
        <td><button class="btn" style="padding: 3px 8px; font-size: 12px;">查看</button></td>
      </tr>
    `;
  });

  tableBody.innerHTML = html;
  updatePaginationControls(filteredData.length);
}

// 高亮符合的搜尋關鍵字
function highlightText(text) {
  if (!text) return "";
  const str = String(text);
  if (!currentSearchQuery) return str;

  const reg = new RegExp(`(${escapeRegExp(currentSearchQuery)})`, 'gi');
  return str.replace(reg, '<mark class="highlight-match">$1</mark>');
}

function escapeRegExp(string) {
  return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

// 6. 分頁控制
function updatePaginationControls(totalItems) {
  const totalPages = Math.max(1, Math.ceil(totalItems / pageSize));
  currentPageText.textContent = `${currentPage} / ${totalPages}`;

  const start = totalItems === 0 ? 0 : (currentPage - 1) * pageSize + 1;
  const end = Math.min(currentPage * pageSize, totalItems);

  pageStartNum.textContent = start;
  pageEndNum.textContent = end;
  pageTotalNum.textContent = totalItems;

  prevPageBtn.disabled = currentPage <= 1;
  nextPageBtn.disabled = currentPage >= totalPages;
}

// 7. Modal 詳情彈窗
window.openDetailModal = function(orderId) {
  const item = currentData.find(o => o["訂單編號"] === orderId);
  if (!item) return;

  document.getElementById("modalOrderId").textContent = item["訂單編號"] || "-";
  document.getElementById("modalOrderDate").textContent = item["購買日期"] || "-";
  document.getElementById("modalCustomerName").textContent = item["顧客姓名"] || "-";
  document.getElementById("modalMemberId").textContent = item["會員編號"] || "-";
  document.getElementById("modalPhone").textContent = item["聯絡電話"] || "-";
  document.getElementById("modalEmail").textContent = item["e-mail"] || "-";
  document.getElementById("modalBookName").textContent = item["書籍名稱"] || "-";
  document.getElementById("modalCategory").textContent = item["圖書分類"] || "-";
  document.getElementById("modalPrice").textContent = `$${Number(item["購買金額（元）"] || 0).toLocaleString()}`;

  detailModal.classList.add("active");
};

function closeModal() {
  detailModal.classList.remove("active");
}

// 8. 導出 CSV 功能
function exportToCSV() {
  if (filteredData.length === 0) {
    alert("當前沒有可導出的訂單資料！");
    return;
  }

  const headers = ["訂單編號", "顧客姓名", "會員編號", "書籍名稱", "圖書分類", "購買金額（元）", "購買日期", "聯絡電話", "e-mail"];
  let csvContent = "\uFEFF" + headers.join(",") + "\n"; // 加入 UTF-8 BOM 防亂碼

  filteredData.forEach(row => {
    const values = headers.map(header => {
      const val = row[header] !== undefined ? String(row[header]) : "";
      return `"${val.replace(/"/g, '""')}"`;
    });
    csvContent += values.join(",") + "\n";
  });

  const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
  const link = document.createElement("a");
  const url = URL.createObjectURL(blob);
  link.setAttribute("href", url);
  link.setAttribute("download", `書籍訂單查詢結果_${new Date().toISOString().slice(0,10)}.csv`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

// 9. API 呼叫 (與 Workflow of Search.json 中的 Webhook 對接)
async function fetchFromWebhook(query) {
  let url = webhookUrlInput.value.trim();
  if (!url) {
    url = "https://n8n-gjxoez2y.roamerhost.com/webhook-test/b8f99923-6b57-4d84-afbc-e4f7288f163b";
  }

  loadingState.style.display = "block";
  tableBody.innerHTML = "";
  emptyState.style.display = "none";

  try {
    const targetUrl = `${url}?q=${encodeURIComponent(query)}`;
    const response = await fetch(targetUrl, {
      method: "GET",
      headers: { "Accept": "application/json" }
    });

    if (!response.ok) {
      if (response.status === 400 || response.status === 404) {
        throw new Error(`HTTP ${response.status} (n8n Webhook Test 模式未開啟或處於 Listen 狀態中)`);
      }
      throw new Error(`HTTP 錯誤碼: ${response.status}`);
    }

    const data = await response.json();
    if (Array.isArray(data)) {
      currentData = data.map(d => d.json || d);
    } else if (data && typeof data === 'object') {
      currentData = Array.isArray(data.data) ? data.data : [data];
    } else {
      currentData = [];
    }
    filterOrders();
  } catch (err) {
    console.warn("Webhook fetch failure:", err);
    alert(`💡 提醒：無法連線至 n8n Webhook Test 網址 (${err.message})。\n\n提示：n8n 的 "Test Webhook" 需要在工作流編輯器中點擊 "Test step" 或 "Execute workflow" 激活。系統已自動啟用內建 100 筆資料集為您展示查詢功能！`);
    currentData = [...mockOrders];
    filterOrders();
  } finally {
    loadingState.style.display = "none";
  }
}

// 10. 事件監聽 (Event Listeners)
searchForm.addEventListener("submit", (e) => {
  e.preventDefault();
  if (isApiMode) {
    fetchFromWebhook(searchInput.value.trim());
  } else {
    filterOrders();
  }
});

resetBtn.addEventListener("click", () => {
  searchInput.value = "";
  categoryFilter.value = "";
  sortBySelect.value = "date-desc";
  filterOrders();
});

categoryFilter.addEventListener("change", filterOrders);
sortBySelect.addEventListener("change", () => {
  applySorting();
  renderTable();
});

prevPageBtn.addEventListener("click", () => {
  if (currentPage > 1) {
    currentPage--;
    renderTable();
  }
});

nextPageBtn.addEventListener("click", () => {
  const totalPages = Math.ceil(filteredData.length / pageSize);
  if (currentPage < totalPages) {
    currentPage++;
    renderTable();
  }
});

exportCsvBtn.addEventListener("click", exportToCSV);

// 主題切換 (護眼暗色 vs 護眼亮色)
themeToggleBtn.addEventListener("click", () => {
  const currentTheme = document.documentElement.getAttribute("data-theme");
  if (currentTheme === "dark") {
    document.documentElement.setAttribute("data-theme", "light");
    themeText.textContent = "護眼模式 (亮色)";
    themeToggleBtn.querySelector(".icon").textContent = "☀️";
  } else {
    document.documentElement.setAttribute("data-theme", "dark");
    themeText.textContent = "護眼模式 (暗色)";
    themeToggleBtn.querySelector(".icon").textContent = "🌙";
  }
});

// Settings & Mode Toggle
settingsToggleBtn.addEventListener("click", () => {
  settingsPanel.classList.toggle("active");
});

modeSwitchBtn.addEventListener("click", () => {
  isApiMode = !isApiMode;
  if (isApiMode) {
    modeSwitchBtn.textContent = "切換為模擬數據模式";
    currentModeText.textContent = "實時 Webhook API 模式";
    currentModeText.style.color = "#52b788";
  } else {
    modeSwitchBtn.textContent = "切換為 API 模式";
    currentModeText.textContent = "靜態模擬模式 (Mock Dataset)";
    currentModeText.style.color = "var(--accent-color)";
    currentData = [...mockOrders];
    filterOrders();
  }
});

modalCloseBtn.addEventListener("click", closeModal);
modalConfirmBtn.addEventListener("click", closeModal);
modalPrintBtn.addEventListener("click", () => window.print());

detailModal.addEventListener("click", (e) => {
  if (e.target === detailModal) closeModal();
});

// 11. 初始化執行
filterOrders();
