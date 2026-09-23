// Inisialisasi Icon Lucide
document.addEventListener('DOMContentLoaded', () => {
    if (window.lucide) {
        lucide.createIcons();
    }
});

// Element DOM
const menuToggle = document.getElementById('menuToggle');
const sidebar = document.getElementById('sidebar');
const overlay = document.getElementById('drawerOverlay');
const chatInput = document.getElementById('chatInput');
const btnSend = document.getElementById('btnSend');
const messagesContainer = document.getElementById('messagesContainer');
const btnCopy = document.getElementById('btnCopy');

// Handler Drawer Menu Mobile
function toggleDrawer() {
    sidebar.classList.toggle('active');
    overlay.classList.toggle('active');
}

if (menuToggle && overlay) {
    menuToggle.addEventListener('click', toggleDrawer);
    overlay.addEventListener('click', toggleDrawer);
}

// Menambahkan Pesan Ke Chat (Tanpa Reversal String)
function appendMessage(text, sender = 'Saya', isSent = true) {
    if (!text || !text.trim()) return;

    const timeStr = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    const messageRow = document.createElement('div');
    messageRow.className = `message-row ${isSent ? 'sent' : 'received'}`;

    messageRow.innerHTML = `
        <span class="message-sender">${sender}</span>
        <div class="message-bubble">${escapeHtml(text)}</div>
        <span class="message-time">${timeStr}</span>
    `;

    messagesContainer.appendChild(messageRow);
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
}

// Sanitasi Input HTML
function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

// Event Send Message
if (btnSend && chatInput) {
    btnSend.addEventListener('click', () => {
        const text = chatInput.value;
        if (text) {
            appendMessage(text, 'Saya', true);
            chatInput.value = '';
        }
    });

    chatInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            btnSend.click();
        }
    });
}

// Salin Informasi Room
if (btnCopy) {
    btnCopy.addEventListener('click', () => {
        const info = "ID Room: 23444 | Passcode: cf2233";
        navigator.clipboard.writeText(info).then(() => {
            alert("Info Room berhasil disalin!");
        }).catch(err => {
            console.error("Gagal menyalin text: ", err);
        });
    });
}
