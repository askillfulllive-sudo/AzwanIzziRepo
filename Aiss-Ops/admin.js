/**
 * ================================================================
 * AZWANIZZI SKILLFULL SERVICE (A.I.S.S) - ADMIN CONSOLE CONTROLLER
 * Full Management: Bookings, Reviews, 177 Technicians & Site Settings
 * ================================================================
 */

// ==========================================
// 1. STORAGE KEYS & DEFAULT SEED DATA
// ==========================================
const STORAGE_KEYS = {
    AUTH: 'aiss_admin_auth',
    USER: 'aiss_admin_user',
    BOOKINGS: 'aiss_admin_bookings',
    REVIEWS: 'aiss_admin_reviews',
    TECHS: 'aiss_admin_techs',
    SETTINGS: 'aiss_admin_settings'
};

// Default Admin Credentials
const DEFAULT_AUTH = {
    username: 'admin',
    password: 'aiss2026', // Can be changed in settings
    displayName: 'Azwan Izzi (Chief Ops)',
    role: 'Super Admin'
};

// Seed Bookings (KK and surrounding areas)
const SEED_BOOKINGS = [
    {
        id: 'BK-2026-001',
        customerName: 'Hj. Mohd Zulkifli',
        phone: '0128334455',
        location: 'Luyang, Kota Kinabalu',
        serviceType: 'Troubleshoot / PCB Repair',
        unitHp: '2.0 HP Inverter',
        qty: 1,
        slotDate: '2026-10-05',
        slotTime: '10:00 AM',
        deposit: 69.00,
        totalEstimate: 280.00,
        status: 'confirmed',
        assignedTech: 'Hj. Azwan (AISS-01)',
        notes: 'Aircond bilik tidur keluar angin panas, compressor mati hidup.',
        createdAt: '2026-10-03T10:15:00Z'
    },
    {
        id: 'BK-2026-002',
        customerName: 'Pn. Jennifer Lim',
        phone: '0168229911',
        location: 'Penampang Baru, KK',
        serviceType: 'Kimia Overhaul (Full Dismantle)',
        unitHp: '1.5 HP Inverter',
        qty: 2,
        slotDate: '2026-10-06',
        slotTime: '02:00 PM',
        deposit: 69.00,
        totalEstimate: 360.00,
        status: 'pending',
        assignedTech: 'Belum Ditugaskan',
        notes: 'Aircond ada bau hapak dan air menitis dari casing.',
        createdAt: '2026-10-03T14:30:00Z'
    },
    {
        id: 'BK-2026-003',
        customerName: 'En. Safuan Abdullah',
        phone: '0143556789',
        location: 'Inanam Square, KK',
        serviceType: 'Pemasangan Unit Baharu',
        unitHp: '1.0 HP Standard',
        qty: 1,
        slotDate: '2026-10-07',
        slotTime: '11:00 AM',
        deposit: 69.00,
        totalEstimate: 350.00,
        status: 'in_progress',
        assignedTech: 'Mohd Ridzuan (AISS-14)',
        notes: 'Pasang unit Daikin baharu di ruang tamu tingkat 2.',
        createdAt: '2026-10-02T09:00:00Z'
    },
    {
        id: 'BK-2026-004',
        customerName: 'Dr. Siti Rohani',
        phone: '0112998877',
        location: 'Damai Specialist, KK',
        serviceType: 'Troubleshoot PCB Cassette',
        unitHp: '3.0 HP Cassette',
        qty: 1,
        slotDate: '2026-10-02',
        slotTime: '09:00 AM',
        deposit: 69.00,
        totalEstimate: 450.00,
        status: 'completed',
        assignedTech: 'Hj. Azwan (AISS-01)',
        notes: 'Ganti sensor suhu bilik dan capacitor kipas.',
        createdAt: '2026-10-01T08:00:00Z'
    },
    {
        id: 'BK-2026-005',
        customerName: 'Mr. Wong Chee Keong',
        phone: '0138901234',
        location: 'Likas Bay, Kota Kinabalu',
        serviceType: 'Servis Biasa (Normal Cleaning)',
        unitHp: '1.0 HP & 1.5 HP',
        qty: 3,
        slotDate: '2026-10-08',
        slotTime: '03:30 PM',
        deposit: 69.00,
        totalEstimate: 210.00,
        status: 'confirmed',
        assignedTech: 'Farhan Ali (AISS-22)',
        notes: 'Pencucian filter, blower coil dan check gas R32.',
        createdAt: '2026-10-03T16:45:00Z'
    }
];

// Seed Reviews (Dikosongkan mengikut arahan pengguna supaya tiada ulasan dummy)
const SEED_REVIEWS = [];

// Seed Sample Techs (from 177 list)
const SEED_TECHS = [
    { id: 'TECH-001', code: 'AISS-01', name: 'Hj. Azwan Izzi', phone: '01118875753', area: 'Kota Kinabalu (Pusat)', state: 'Sabah', tier: 'Pakar Utama', exp: '22 Tahun', status: 'active' },
    { id: 'TECH-002', code: 'AISS-14', name: 'Mohd Ridzuan', phone: '0128123456', area: 'Inanam / Menggatal', state: 'Sabah', tier: 'Platinum', exp: '9 Tahun', status: 'active' },
    { id: 'TECH-003', code: 'AISS-22', name: 'Farhan Ali', phone: '0138987654', area: 'Penampang / Putatan', state: 'Sabah', tier: 'Gold', exp: '7 Tahun', status: 'active' },
    { id: 'TECH-004', code: 'AISS-45', name: 'Alex Wong', phone: '0168456123', area: 'Likas / Sepanggar', state: 'Sabah', tier: 'Platinum', exp: '12 Tahun', status: 'active' },
    { id: 'TECH-005', code: 'AISS-88', name: 'Jamil Kasim', phone: '0198765432', area: 'Tawau & Lahad Datu', state: 'Sabah', tier: 'Gold', exp: '8 Tahun', status: 'active' },
    { id: 'TECH-006', code: 'AISS-102', name: 'Sufian Salleh', phone: '0148761122', area: 'Sandakan', state: 'Sabah', tier: 'Silver', exp: '5 Tahun', status: 'active' },
    { id: 'TECH-007', code: 'AISS-140', name: 'Razif Hakim', phone: '0178992233', area: 'Kuching / Samarahan', state: 'Sarawak', tier: 'Gold', exp: '10 Tahun', status: 'active' },
    { id: 'TECH-008', code: 'AISS-177', name: 'Khairul Anwar', phone: '0189001144', area: 'Klang Valley / Bangi', state: 'Selangor', tier: 'Pakar Bertauliah', exp: '14 Tahun', status: 'active' }
];

// Seed Site Settings
const SEED_SETTINGS = {
    announcementEnabled: true,
    announcementText: 'Kunci Giliran Juruteknik Anda: Bayar Deposit Awal Serendah RM69 Dahulu!',
    depositAmount: 69.00,
    whatsappContact: '601118875753',
    emergencyService: true,
    operatingHours: '08:00 AM - 07:00 PM (Setiap Hari)',
    autoConfirmDeposit: true
};

// ==========================================
// 2. STATE MANAGER & INITIALIZATION
// ==========================================
class AdminState {
    constructor() {
        this.init();
    }

    init() {
        if (!localStorage.getItem(STORAGE_KEYS.USER)) {
            localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(DEFAULT_AUTH));
        }
        if (!localStorage.getItem(STORAGE_KEYS.BOOKINGS)) {
            localStorage.setItem(STORAGE_KEYS.BOOKINGS, JSON.stringify(SEED_BOOKINGS));
        }
        // Bersihkan sebarang data dummy review lama dalam localStorage
        const existingReviewsRaw = localStorage.getItem(STORAGE_KEYS.REVIEWS);
        if (!existingReviewsRaw) {
            localStorage.setItem(STORAGE_KEYS.REVIEWS, JSON.stringify(SEED_REVIEWS));
        } else {
            try {
                const parsed = JSON.parse(existingReviewsRaw);
                if (Array.isArray(parsed) && parsed.some(r => r && (r.id === 'REV-01' || r.id === 'REV-02' || r.id === 'REV-03' || r.id === 'REV-04'))) {
                    const cleaned = parsed.filter(r => r && !['REV-01', 'REV-02', 'REV-03', 'REV-04'].includes(r.id));
                    localStorage.setItem(STORAGE_KEYS.REVIEWS, JSON.stringify(cleaned));
                }
            } catch (e) {
                localStorage.setItem(STORAGE_KEYS.REVIEWS, JSON.stringify([]));
            }
        }
        if (!localStorage.getItem(STORAGE_KEYS.TECHS)) {
            localStorage.setItem(STORAGE_KEYS.TECHS, JSON.stringify(SEED_TECHS));
        }
        if (!localStorage.getItem(STORAGE_KEYS.SETTINGS)) {
            localStorage.setItem(STORAGE_KEYS.SETTINGS, JSON.stringify(SEED_SETTINGS));
        }
    }

    isLoggedIn() {
        return localStorage.getItem(STORAGE_KEYS.AUTH) === 'true';
    }

    login(username, password) {
        const user = JSON.parse(localStorage.getItem(STORAGE_KEYS.USER) || JSON.stringify(DEFAULT_AUTH));
        if (username.trim().toLowerCase() === user.username.toLowerCase() && password === user.password) {
            localStorage.setItem(STORAGE_KEYS.AUTH, 'true');
            return { success: true, user };
        }
        return { success: false, message: 'Nama Pengguna atau Kata Laluan Salah!' };
    }

    logout() {
        localStorage.removeItem(STORAGE_KEYS.AUTH);
    }

    getUser() {
        return JSON.parse(localStorage.getItem(STORAGE_KEYS.USER) || JSON.stringify(DEFAULT_AUTH));
    }

    updatePassword(newPassword) {
        const user = this.getUser();
        user.password = newPassword;
        localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(user));
    }

    getBookings() {
        return JSON.parse(localStorage.getItem(STORAGE_KEYS.BOOKINGS) || '[]');
    }

    saveBookings(bookings) {
        localStorage.setItem(STORAGE_KEYS.BOOKINGS, JSON.stringify(bookings));
    }

    getReviews() {
        return JSON.parse(localStorage.getItem(STORAGE_KEYS.REVIEWS) || '[]');
    }

    saveReviews(reviews) {
        localStorage.setItem(STORAGE_KEYS.REVIEWS, JSON.stringify(reviews));
        try {
            if ('BroadcastChannel' in window) {
                const bc = new BroadcastChannel('aiss_sync_channel');
                bc.postMessage({ type: 'reviews_updated', reviews });
                setTimeout(() => bc.close(), 100);
            }
        } catch (e) {}
    }

    getTechs() {
        return JSON.parse(localStorage.getItem(STORAGE_KEYS.TECHS) || '[]');
    }

    saveTechs(techs) {
        localStorage.setItem(STORAGE_KEYS.TECHS, JSON.stringify(techs));
    }

    getSettings() {
        return JSON.parse(localStorage.getItem(STORAGE_KEYS.SETTINGS) || JSON.stringify(SEED_SETTINGS));
    }

    saveSettings(settings) {
        localStorage.setItem(STORAGE_KEYS.SETTINGS, JSON.stringify(settings));
        try {
            if ('BroadcastChannel' in window) {
                const bc = new BroadcastChannel('aiss_sync_channel');
                bc.postMessage({ type: 'settings_updated', settings });
                setTimeout(() => bc.close(), 100);
            }
        } catch (e) {}
    }
}

const state = new AdminState();

// ==========================================
// 3. UI CONTROLLER & VIEW RENDERING
// ==========================================
let currentTab = 'dashboard';
let bookingFilter = 'all';
let bookingSearch = '';
let activeBookingId = null;

document.addEventListener('DOMContentLoaded', () => {
    checkAuthUI();
    setupEventListeners();
});

function checkAuthUI() {
    if (!state.isLoggedIn()) {
        window.location.replace('auth.html');
        return;
    }

    renderDashboard();
    renderBookings();
    renderReviews();
    renderTechs();
    renderSettings();
}

function setupEventListeners() {
    // Logout
    const btnLogout = document.getElementById('btnLogout');
    if (btnLogout) {
        btnLogout.addEventListener('click', () => {
            if (confirm('Adakah anda pasti ingin log keluar dari panel pentadbir?')) {
                state.logout();
                window.location.replace('auth.html');
            }
        });
    }

    // Tab Navigation
    document.querySelectorAll('.admin-nav-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const target = btn.dataset.tab;
            switchTab(target);
        });
    });

    // Booking Filters
    const bFilterSelect = document.getElementById('bookingStatusFilter');
    if (bFilterSelect) {
        bFilterSelect.addEventListener('change', (e) => {
            bookingFilter = e.target.value;
            renderBookings();
        });
    }

    const bSearchInput = document.getElementById('bookingSearchInput');
    if (bSearchInput) {
        bSearchInput.addEventListener('input', (e) => {
            bookingSearch = e.target.value.toLowerCase();
            renderBookings();
        });
    }

    // Auto-Save Real-time on Announcement Toggle Switch
    const annToggle = document.getElementById('settingAnnToggle');
    if (annToggle) {
        annToggle.addEventListener('change', () => {
            const settings = state.getSettings();
            settings.announcementEnabled = annToggle.checked;
            state.saveSettings(settings);
            showToast(annToggle.checked ? 'Bar Slot Panas Diaktifkan Di Laman Web!' : 'Bar Slot Panas Telah Dimatikan & Disembunyikan!', annToggle.checked ? 'success' : 'info');
        });
    }
}

function switchTab(tabId) {
    currentTab = tabId;
    document.querySelectorAll('.admin-tab-pane').forEach(p => p.classList.add('hidden'));
    const activePane = document.getElementById('pane_' + tabId);
    if (activePane) activePane.classList.remove('hidden');

    if (tabId === 'settings') {
        renderSettings();
    }

    document.querySelectorAll('.admin-nav-btn').forEach(btn => {
        if (btn.dataset.tab === tabId) {
            btn.classList.add('bg-brand-blue/20', 'text-brand-blue', 'border-brand-blue');
            btn.classList.remove('text-gray-400', 'border-transparent');
        } else {
            btn.classList.remove('bg-brand-blue/20', 'text-brand-blue', 'border-brand-blue');
            btn.classList.add('text-gray-400', 'border-transparent');
        }
    });

    // Close mobile admin drawer if open
    const mobDrawer = document.getElementById('adminMobileDrawer');
    if (mobDrawer) mobDrawer.classList.add('hidden');
}

// ==========================================
// 4. DASHBOARD RENDERER
// ==========================================
function renderDashboard() {
    const bookings = state.getBookings();
    const reviews = state.getReviews();
    const techs = state.getTechs();

    const pendingCount = bookings.filter(b => b.status === 'pending').length;
    const confirmedCount = bookings.filter(b => b.status === 'confirmed').length;
    const completedCount = bookings.filter(b => b.status === 'completed').length;
    
    // Total Revenue Collected
    const totalDeposit = bookings.reduce((sum, b) => sum + (b.deposit || 0), 0);
    const totalSales = bookings.reduce((sum, b) => sum + (b.totalEstimate || 0), 0);

    // Update KPI Counters
    setText('kpiPending', pendingCount);
    setText('kpiConfirmed', confirmedCount);
    setText('kpiCompleted', completedCount);
    setText('kpiDepositCollected', 'RM ' + totalDeposit.toFixed(2));
    setText('kpiTotalSales', 'RM ' + totalSales.toLocaleString('en-US', { minimumFractionDigits: 2 }));
    setText('kpiTotalTechs', techs.length + ' Ahli');
    // Kira Purata Penilaian Sebenar mengikut rekod ulasan admin
    let avgRating = '5.0';
    if (reviews.length > 0) {
        const totalRating = reviews.reduce((sum, r) => sum + (Number(r.rating) || 5), 0);
        avgRating = (totalRating / reviews.length).toFixed(1);
    }
    setText('kpiTotalReviews', `${avgRating} ⭐ (${reviews.length} Ulasan)`);

    // Recent Bookings Feed (Top 5)
    const recentList = document.getElementById('recentBookingsList');
    if (recentList) {
        recentList.innerHTML = bookings.slice(0, 5).map(b => `
            <div class="glass-card p-4 rounded-2xl flex items-center justify-between border border-white/5 hover:border-brand-blue/30 transition">
                <div class="flex items-center gap-3">
                    <div class="w-11 h-11 rounded-xl bg-blue-500/10 text-brand-blue flex items-center justify-center font-bold text-sm border border-blue-500/20">
                        ${b.id.slice(-3)}
                    </div>
                    <div>
                        <div class="flex items-center gap-2">
                            <span class="text-sm font-bold text-white">${b.customerName}</span>
                            <span class="text-xs px-2.5 py-0.5 rounded-full ${getStatusBadgeClass(b.status)} uppercase font-bold">${formatStatus(b.status)}</span>
                        </div>
                        <span class="text-xs text-gray-300 block mt-0.5">${b.location} • ${b.serviceType}</span>
                    </div>
                </div>
                <div class="text-right">
                    <span class="text-sm font-heading font-black text-amber-300 block">Dep. RM${b.deposit}</span>
                    <button onclick="viewBookingDetails('${b.id}')" class="text-xs text-brand-blue hover:underline font-bold">Urus &rarr;</button>
                </div>
            </div>
        `).join('');
    }
}

// ==========================================
// 5. BOOKINGS TAB RENDERER & ACTIONS
// ==========================================
function renderBookings() {
    const tableBody = document.getElementById('bookingsTableBody');
    if (!tableBody) return;

    let bookings = state.getBookings();

    // Filter by Status
    if (bookingFilter !== 'all') {
        bookings = bookings.filter(b => b.status === bookingFilter);
    }

    // Filter by Search
    if (bookingSearch.trim()) {
        bookings = bookings.filter(b => 
            b.customerName.toLowerCase().includes(bookingSearch) ||
            b.phone.includes(bookingSearch) ||
            b.location.toLowerCase().includes(bookingSearch) ||
            b.id.toLowerCase().includes(bookingSearch)
        );
    }

    if (bookings.length === 0) {
        tableBody.innerHTML = `<tr><td colspan="7" class="text-center py-8 text-gray-300 text-sm">Tiada rekod tempahan ditemui mengikut penapis semasa.</td></tr>`;
        return;
    }

    tableBody.innerHTML = bookings.map(b => `
        <tr>
            <td class="font-mono text-sm text-brand-blue font-bold">${b.id}</td>
            <td>
                <span class="font-bold text-white block text-sm">${b.customerName}</span>
                <span class="text-xs text-gray-300">${b.phone}</span>
            </td>
            <td>
                <span class="text-sm font-medium text-gray-200 block">${b.location}</span>
                <span class="text-xs text-gray-400">${b.serviceType}</span>
            </td>
            <td>
                <span class="text-sm font-bold text-gray-200 block">${b.slotDate}</span>
                <span class="text-xs text-amber-300 font-semibold">${b.slotTime}</span>
            </td>
            <td>
                <span class="font-mono text-sm font-bold text-emerald-400 block">RM ${b.deposit.toFixed(2)}</span>
                <span class="text-xs text-gray-400">Est: RM ${b.totalEstimate.toFixed(2)}</span>
            </td>
            <td>
                <span class="text-xs px-3 py-1 rounded-full ${getStatusBadgeClass(b.status)} uppercase font-bold inline-block">
                    ${formatStatus(b.status)}
                </span>
            </td>
            <td class="text-right">
                <div class="inline-flex items-center gap-2">
                    <button onclick="sendCustomerWhatsApp('${b.id}')" title="WhatsApp Pelanggan" class="w-8 h-8 rounded-lg bg-emerald-500/20 text-emerald-400 hover:bg-emerald-500/40 flex items-center justify-center text-sm transition">
                        <i class="fa-brands fa-whatsapp text-sm"></i>
                    </button>
                    <button onclick="viewBookingDetails('${b.id}')" title="Papar & Urus" class="w-8 h-8 rounded-lg bg-blue-500/20 text-brand-blue hover:bg-blue-500/40 flex items-center justify-center text-sm transition">
                        <i class="fa-solid fa-pen-to-square text-sm"></i>
                    </button>
                    <button onclick="deleteBooking('${b.id}')" title="Padam Tempahan" class="w-8 h-8 rounded-lg bg-red-500/20 text-red-400 hover:bg-red-500/40 flex items-center justify-center text-sm transition">
                        <i class="fa-solid fa-trash-can text-sm"></i>
                    </button>
                </div>
            </td>
        </tr>
    `).join('');
}

function viewBookingDetails(bookingId) {
    activeBookingId = bookingId;
    const bookings = state.getBookings();
    const b = bookings.find(item => item.id === bookingId);
    if (!b) return;

    // Populate Modal
    setText('m_bkId', b.id);
    setText('m_bkCust', b.customerName);
    setText('m_bkPhone', b.phone);
    setText('m_bkLoc', b.location);
    setText('m_bkService', b.serviceType);
    setText('m_bkHp', b.unitHp);
    setText('m_bkQty', b.qty + ' Unit');
    setText('m_bkSlot', b.slotDate + ' @ ' + b.slotTime);
    setText('m_bkNotes', b.notes || 'Tiada catatan tambahan.');

    const statusSelect = document.getElementById('m_bkStatusSelect');
    if (statusSelect) statusSelect.value = b.status;

    const techSelect = document.getElementById('m_bkTechSelect');
    if (techSelect) {
        const techs = state.getTechs();
        techSelect.innerHTML = `
            <option value="Belum Ditugaskan">-- Belum Ditugaskan --</option>
            ${techs.map(t => `<option value="${t.name} (${t.code})" ${b.assignedTech && b.assignedTech.includes(t.code) ? 'selected' : ''}>${t.name} - ${t.area}</option>`).join('')}
        `;
    }

    const modal = document.getElementById('bookingDetailsModal');
    if (modal) modal.classList.remove('hidden');
}

function saveBookingStatus() {
    if (!activeBookingId) return;
    const bookings = state.getBookings();
    const b = bookings.find(item => item.id === activeBookingId);
    if (!b) return;

    const statusSelect = document.getElementById('m_bkStatusSelect');
    const techSelect = document.getElementById('m_bkTechSelect');

    if (statusSelect) b.status = statusSelect.value;
    if (techSelect) b.assignedTech = techSelect.value;

    state.saveBookings(bookings);
    showToast('Tempahan ' + b.id + ' berjaya dikemaskini!', 'success');
    closeModal('bookingDetailsModal');
    renderBookings();
    renderDashboard();
}

function deleteBooking(bookingId) {
    if (!confirm('Adakah anda pasti ingin memadam rekod tempahan ' + bookingId + '?')) return;
    let bookings = state.getBookings();
    bookings = bookings.filter(b => b.id !== bookingId);
    state.saveBookings(bookings);
    showToast('Tempahan ' + bookingId + ' telah dipadam.', 'info');
    renderBookings();
    renderDashboard();
}

function openAddBookingModal() {
    const form = document.getElementById('addBookingForm');
    if (form) form.reset();
    const modal = document.getElementById('addBookingModal');
    if (modal) modal.classList.remove('hidden');
}

function handleAddBookingSubmit(e) {
    e.preventDefault();
    const name = document.getElementById('newCustName').value;
    const phone = document.getElementById('newCustPhone').value;
    const loc = document.getElementById('newCustLoc').value;
    const service = document.getElementById('newCustService').value;
    const date = document.getElementById('newCustDate').value;
    const time = document.getElementById('newCustTime').value;
    const notes = document.getElementById('newCustNotes').value;

    const bookings = state.getBookings();
    const newId = 'BK-' + new Date().getFullYear() + '-' + String(bookings.length + 1).padStart(3, '0');

    const newBooking = {
        id: newId,
        customerName: name,
        phone: phone,
        location: loc,
        serviceType: service,
        unitHp: '1.5 HP Inverter',
        qty: 1,
        slotDate: date,
        slotTime: time,
        deposit: 69.00,
        totalEstimate: 180.00,
        status: 'confirmed',
        assignedTech: 'Belum Ditugaskan',
        notes: notes,
        createdAt: new Date().toISOString()
    };

    bookings.unshift(newBooking);
    state.saveBookings(bookings);
    showToast('Tempahan baharu ' + newId + ' berjaya ditambah!', 'success');
    closeModal('addBookingModal');
    renderBookings();
    renderDashboard();
}

function sendCustomerWhatsApp(bookingId) {
    const bookings = state.getBookings();
    const b = bookings.find(item => item.id === bookingId);
    if (!b) return;

    let cleanPhone = b.phone.replace(/[^0-9]/g, '');
    if (cleanPhone.startsWith('0')) cleanPhone = '6' + cleanPhone;

    const message = `Salam ${b.customerName}, kami dari AZWANIZZI SKILLFULL SERVICE (A.I.S.S) Kota Kinabalu.%0A%0ARekod Tempahan Anda:%0A- No. Tempahan: ${b.id}%0A- Servis: ${b.serviceType}%0A- Tarikh Slot: ${b.slotDate} (${b.slotTime})%0A- Lokasi: ${b.location}%0A- Deposit RM69: Diterima & Disahkan.%0A- Juruteknik Bertugas: ${b.assignedTech}%0A%0ASila maklumkan jika ada sebarang perubahan masa. Terima kasih!`;

    window.open(`https://wa.me/${cleanPhone}?text=${message}`, '_blank');
}

function printWorkOrder() {
    if (!activeBookingId) return;
    const bookings = state.getBookings();
    const b = bookings.find(item => item.id === activeBookingId);
    if (!b) return;

    const printArea = document.getElementById('printReceiptArea');
    if (!printArea) return;

    printArea.innerHTML = `
        <div style="font-family: 'Montserrat', sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #ccc; border-radius: 8px;">
            <div style="text-align: center; border-bottom: 2px solid #00a3ff; padding-bottom: 12px; margin-bottom: 15px;">
                <h2 style="margin: 0; color: #0b1329;">AZWANIZZI SKILLFULL SERVICE (A.I.S.S)</h2>
                <p style="margin: 4px 0; font-size: 12px; color: #555;">Kota Kinabalu, Sabah • Tel/WA: 011-18875753</p>
                <h4 style="margin: 8px 0 0 0; color: #0080ff; text-transform: uppercase;">RESIT TEMPAHAN / WORK ORDER</h4>
            </div>
            <table style="width: 100%; font-size: 13px; line-height: 1.8;">
                <tr><td><strong>No. Rujukan</strong></td><td>: ${b.id}</td></tr>
                <tr><td><strong>Nama Pelanggan</strong></td><td>: ${b.customerName}</td></tr>
                <tr><td><strong>No. Telefon</strong></td><td>: ${b.phone}</td></tr>
                <tr><td><strong>Alamat / Daerah</strong></td><td>: ${b.location}</td></tr>
                <tr><td><strong>Jenis Servis</strong></td><td>: ${b.serviceType}</td></tr>
                <tr><td><strong>Spesifikasi Unit</strong></td><td>: ${b.unitHp} (${b.qty} unit)</td></tr>
                <tr><td><strong>Tarikh & Masa Slot</strong></td><td>: ${b.slotDate} (${b.slotTime})</td></tr>
                <tr><td><strong>Deposit Telah Dibayar</strong></td><td>: <span style="color: #10b981; font-weight: bold;">RM ${b.deposit.toFixed(2)}</span></td></tr>
                <tr><td><strong>Anggaran Baki Bayaran</strong></td><td>: RM ${(b.totalEstimate - b.deposit).toFixed(2)}</td></tr>
                <tr><td><strong>Juruteknik Bertugas</strong></td><td>: ${b.assignedTech}</td></tr>
                <tr><td><strong>Catatan Pelanggan</strong></td><td>: ${b.notes || '-'}</td></tr>
            </table>
            <div style="margin-top: 25px; padding-top: 15px; border-top: 1px dashed #aaa; font-size: 11px; text-align: center; color: #666;">
                * Deposit RM69 ditolak penuh dalam bil akhir servis. Jaminan alat ganti tulen & waranti mengikut terma A.I.S.S.
            </div>
        </div>
    `;

    window.print();
}

function exportBookingsCSV() {
    const bookings = state.getBookings();
    if (!bookings.length) {
        showToast('Tiada data untuk dieksport!', 'error');
        return;
    }

    const headers = ['ID', 'Nama Pelanggan', 'No Telefon', 'Lokasi', 'Jenis Servis', 'Tarikh Slot', 'Masa', 'Deposit RM', 'Anggaran Jumlah RM', 'Status', 'Juruteknik'];
    const rows = bookings.map(b => [
        `"${b.id}"`,
        `"${b.customerName}"`,
        `"${b.phone}"`,
        `"${b.location}"`,
        `"${b.serviceType}"`,
        `"${b.slotDate}"`,
        `"${b.slotTime}"`,
        b.deposit,
        b.totalEstimate,
        `"${b.status}"`,
        `"${b.assignedTech}"`
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map(r => r.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `AISS_Bookings_Backup_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    showToast('Data tempahan berjaya dieksport ke fail CSV!', 'success');
}

// ==========================================
// 6. FIREBASE REALTIME DATABASE & REVIEWS CONTROLLER
// ==========================================
const FIREBASE_RTDB_URL = 'https://skillfull-e5fb3-default-rtdb.asia-southeast1.firebasedatabase.app';
const AISS_ADMIN_KEY = 'AISS_ADMIN_2026';

let currentReviewFormat = 'text'; // 'text' | 'image'
let currentReviewImageBase64 = null;
let isFirebaseConnected = false;

const firebaseService = {
    async checkConnection() {
        try {
            const res = await fetch(`${FIREBASE_RTDB_URL}/reviews.json?shallow=true`, { method: 'GET' });
            if (res.ok) {
                isFirebaseConnected = true;
                updateFirebaseBadge(true);
                return true;
            } else if (res.status === 401) {
                isFirebaseConnected = false;
                updateFirebaseBadge(false, 'Rules Dikunci (401)');
                return false;
            } else {
                isFirebaseConnected = false;
                updateFirebaseBadge(false, `HTTP ${res.status}`);
                return false;
            }
        } catch (e) {
            isFirebaseConnected = false;
            updateFirebaseBadge(false, 'Offline');
            return false;
        }
    },

    async getReviews() {
        try {
            const res = await fetch(`${FIREBASE_RTDB_URL}/reviews.json`);
            if (res.status === 401) {
                isFirebaseConnected = false;
                updateFirebaseBadge(false, 'Rules Dikunci (401)');
                return null;
            }
            if (!res.ok) throw new Error(`HTTP ${res.status}`);
            const data = await res.json();
            if (!data) return [];
            if (Array.isArray(data)) return data.filter(Boolean);
            return Object.keys(data).map(key => ({
                ...data[key],
                firebaseKey: key,
                id: data[key].id || key
            }));
        } catch (e) {
            console.warn('Firebase RTDB getReviews error:', e.message);
            return null;
        }
    },

    async saveReview(review) {
        try {
            // Tanam adminKey secara automatik ke dalam data ulasan untuk melepasi Firebase Rules
            const payload = { ...review, adminKey: AISS_ADMIN_KEY };
            const res = await fetch(`${FIREBASE_RTDB_URL}/reviews.json`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            });
            if (res.status === 401) {
                isFirebaseConnected = false;
                updateFirebaseBadge(false, 'Tidak Dibenarkan (401)');
                return { success: false, unauthorized: true, error: '401 Unauthorized' };
            }
            if (!res.ok) throw new Error(`HTTP ${res.status}`);
            const data = await res.json();
            return { success: true, firebaseKey: data.name };
        } catch (e) {
            console.warn('Firebase saveReview error:', e.message);
            return { success: false, error: e.message };
        }
    },

    async updateReview(firebaseKey, updates) {
        if (!firebaseKey) return;
        try {
            // Tanam adminKey secara automatik ke dalam kemaskini untuk melepasi Firebase Rules
            const payload = { ...updates, adminKey: AISS_ADMIN_KEY };
            const res = await fetch(`${FIREBASE_RTDB_URL}/reviews/${firebaseKey}.json`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            });
            if (res.status === 401) {
                isFirebaseConnected = false;
                updateFirebaseBadge(false, 'Tidak Dibenarkan (401)');
                return { status: 401 };
            }
            return { ok: res.ok };
        } catch (e) {
            console.warn('Firebase updateReview error:', e.message);
            return { error: e.message };
        }
    },

    async deleteReview(firebaseKey) {
        if (!firebaseKey) return;
        try {
            await fetch(`${FIREBASE_RTDB_URL}/reviews/${firebaseKey}.json`, {
                method: 'DELETE'
            });
        } catch (e) {
            console.warn('Firebase deleteReview error:', e.message);
        }
    }
};

function updateFirebaseBadge(connected, note = '') {
    const badge = document.getElementById('firebaseStatusBadge');
    if (!badge) return;
    if (connected) {
        badge.className = 'text-xs px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 font-bold flex items-center gap-1.5';
        badge.innerHTML = '<i class="fa-solid fa-cloud-check text-emerald-400"></i> Firebase RTDB: Terhubung';
    } else {
        badge.className = 'text-xs px-2.5 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30 font-bold flex items-center gap-1.5';
        badge.innerHTML = `<i class="fa-solid fa-cloud-arrow-up text-amber-400"></i> Firebase: ${note || 'Offline'}`;
    }
}

// Tukar Format Testimoni: Teks Sahaja vs Upload Gambar Sahaja
function setReviewFormat(format) {
    currentReviewFormat = format;
    const inputFormat = document.getElementById('newRevFormat');
    if (inputFormat) inputFormat.value = format;

    const btnText = document.getElementById('btnFormatText');
    const btnImage = document.getElementById('btnFormatImage');
    const secText = document.getElementById('sectionRevText');
    const secImage = document.getElementById('sectionRevImage');
    const commentInput = document.getElementById('newRevComment');

    if (format === 'text') {
        if (btnText) btnText.className = 'py-2.5 px-3 rounded-xl text-xs font-bold transition flex items-center justify-center gap-2 bg-brand-blue text-white shadow-lg';
        if (btnImage) btnImage.className = 'py-2.5 px-3 rounded-xl text-xs font-bold transition flex items-center justify-center gap-2 text-gray-400 hover:text-white';
        if (secText) secText.classList.remove('hidden');
        if (secImage) secImage.classList.add('hidden');
        if (commentInput) commentInput.required = true;
    } else {
        if (btnImage) btnImage.className = 'py-2.5 px-3 rounded-xl text-xs font-bold transition flex items-center justify-center gap-2 bg-brand-blue text-white shadow-lg';
        if (btnText) btnText.className = 'py-2.5 px-3 rounded-xl text-xs font-bold transition flex items-center justify-center gap-2 text-gray-400 hover:text-white';
        if (secText) secText.classList.add('hidden');
        if (secImage) secImage.classList.remove('hidden');
        if (commentInput) commentInput.required = false;
    }
}
window.setReviewFormat = setReviewFormat;

// Pemampatan & Muat Naik Gambar Testimoni
function handleReviewImageSelect(e) {
    const file = e.target.files && e.target.files[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
        showToast('Sila pilih fail format gambar sahaja (PNG, JPG, WebP)!', 'error');
        return;
    }

    const reader = new FileReader();
    reader.onload = function (evt) {
        const img = new Image();
        img.onload = function () {
            // Mampatkan gambar guna HTML5 Canvas (Maks 900px lebar/tinggi)
            const canvas = document.createElement('canvas');
            const maxDim = 900;
            let width = img.width;
            let height = img.height;

            if (width > maxDim || height > maxDim) {
                if (width > height) {
                    height = Math.round((height * maxDim) / width);
                    width = maxDim;
                } else {
                    width = Math.round((width * maxDim) / height);
                    height = maxDim;
                }
            }

            canvas.width = width;
            canvas.height = height;
            const ctx = canvas.getContext('2d');
            ctx.drawImage(img, 0, 0, width, height);

            // Cuba WebP dahulu, jika tidak disokong guna JPEG
            let compressedDataUrl = canvas.toDataURL('image/webp', 0.82);
            if (!compressedDataUrl.startsWith('data:image/webp')) {
                compressedDataUrl = canvas.toDataURL('image/jpeg', 0.82);
            }

            currentReviewImageBase64 = compressedDataUrl;

            // Kira anggaran saiz
            const sizeInKb = Math.round((compressedDataUrl.length * 3) / 4 / 1024);

            // Kemaskini UI Preview
            const previewCard = document.getElementById('revImagePreviewCard');
            const previewImg = document.getElementById('revImagePreviewImg');
            const dropzone = document.getElementById('revImageDropzone');
            const fileNameEl = document.getElementById('revImageFileName');
            const fileSizeEl = document.getElementById('revImageFileSize');

            if (previewImg) previewImg.src = compressedDataUrl;
            if (fileNameEl) fileNameEl.innerText = file.name;
            if (fileSizeEl) fileSizeEl.innerText = `${sizeInKb} KB (Dimampatkan untuk Firebase)`;
            if (dropzone) dropzone.classList.add('hidden');
            if (previewCard) previewCard.classList.remove('hidden');

            showToast(`Gambar berjaya diproses & dimampatkan (${sizeInKb} KB)!`, 'info');
        };
        img.src = evt.target.result;
    };
    reader.readAsDataURL(file);
}
window.handleReviewImageSelect = handleReviewImageSelect;

function removeReviewImage() {
    currentReviewImageBase64 = null;
    const fileInput = document.getElementById('newRevFileInput');
    if (fileInput) fileInput.value = '';

    const previewCard = document.getElementById('revImagePreviewCard');
    const dropzone = document.getElementById('revImageDropzone');
    const previewImg = document.getElementById('revImagePreviewImg');

    if (previewImg) previewImg.src = '';
    if (previewCard) previewCard.classList.add('hidden');
    if (dropzone) dropzone.classList.remove('hidden');
}
window.removeReviewImage = removeReviewImage;

// Lightbox Preview Gambar Ulasan Penuh
function openImageLightbox(src, caption = '') {
    const modal = document.getElementById('imageLightboxModal');
    const img = document.getElementById('lightboxImg');
    const cap = document.getElementById('lightboxCaption');

    if (img) img.src = src;
    if (cap) cap.innerText = caption;
    if (modal) modal.classList.remove('hidden');
}
window.openImageLightbox = openImageLightbox;

function closeImageLightbox() {
    const modal = document.getElementById('imageLightboxModal');
    if (modal) modal.classList.add('hidden');
}
window.closeImageLightbox = closeImageLightbox;

// Render Paparan Senarai Ulasan di Admin Console
function renderReviews() {
    const list = document.getElementById('reviewsAdminList');
    if (!list) return;

    // Semak sambungan Firebase di latar belakang
    firebaseService.checkConnection();

    const reviews = state.getReviews();
    if (reviews.length === 0) {
        list.innerHTML = `<div class="p-8 text-center text-gray-400 text-sm glass-card rounded-2xl col-span-3 border border-white/10">Tiada rekod testimoni ulasan pelanggan. Klik "Tambah Ulasan" untuk masukkan ulasan pertama.</div>`;
        return;
    }

    list.innerHTML = reviews.map(r => `
        <div class="glass-card p-6 rounded-2xl border border-white/10 flex flex-col justify-between hover:border-yellow-400/40 transition">
            <div>
                <div class="flex items-center justify-between mb-3">
                    <div class="flex text-yellow-400 text-sm gap-1">
                        ${'<i class="fa-solid fa-star"></i>'.repeat(r.rating || 5)}
                    </div>
                    <div class="flex items-center gap-1.5">
                        ${r.image ? `
                            <span class="text-[10px] px-2 py-0.5 rounded-full bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 uppercase font-bold flex items-center gap-1">
                                <i class="fa-solid fa-image"></i> Gambar
                            </span>
                        ` : `
                            <span class="text-[10px] px-2 py-0.5 rounded-full bg-blue-500/20 text-blue-300 border border-blue-500/30 uppercase font-bold flex items-center gap-1">
                                <i class="fa-solid fa-align-left"></i> Teks
                            </span>
                        `}
                        <span class="text-xs px-2.5 py-0.5 rounded-full ${r.status === 'published' ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30' : 'bg-gray-500/20 text-gray-400 border border-gray-500/30'} uppercase font-bold">
                            ${r.status === 'published' ? 'Paparan Web' : 'Arkib'}
                        </span>
                    </div>
                </div>

                ${r.image ? `
                    <div class="mb-3.5 relative group rounded-xl overflow-hidden border border-white/15 bg-black/60 max-h-48 flex items-center justify-center cursor-pointer shadow-lg"
                        onclick="openImageLightbox('${r.image}', 'Testimoni: ${r.name} (${r.service})')">
                        <img src="${r.image}" alt="Testimoni ${r.name}" class="w-full h-44 object-cover group-hover:scale-105 transition duration-300" />
                        <div class="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition flex items-center justify-center gap-2 text-white text-xs font-bold">
                            <i class="fa-solid fa-magnifying-glass-plus text-base"></i>
                            <span>Buka Gambar Penuh</span>
                        </div>
                    </div>
                ` : ''}

                ${r.comment ? `
                    <p class="text-sm text-gray-200 italic mb-4 leading-relaxed line-clamp-3">"${r.comment}"</p>
                ` : ''}
            </div>
            <div class="pt-3.5 border-t border-white/10 flex items-center justify-between">
                <div>
                    <h5 class="text-sm font-bold text-white">${r.name}</h5>
                    <span class="text-xs text-gray-300 block mt-0.5">${r.location} • ${r.service}</span>
                    ${r.firebaseKey ? `
                        <span class="text-[10px] text-brand-blue font-mono flex items-center gap-1 mt-0.5">
                            <i class="fa-solid fa-cloud text-[9px]"></i> Disimpan di Firebase RTDB
                        </span>
                    ` : ''}
                </div>
                <div class="flex items-center gap-2">
                    <button onclick="toggleReviewStatus('${r.id}')" title="Tukar Status Paparan" class="w-8 h-8 rounded-lg bg-blue-500/20 text-brand-blue hover:bg-blue-500/30 flex items-center justify-center text-sm">
                        <i class="fa-solid fa-eye"></i>
                    </button>
                    <button onclick="deleteReview('${r.id}')" title="Padam Ulasan" class="w-8 h-8 rounded-lg bg-red-500/20 text-red-400 hover:bg-red-500/30 flex items-center justify-center text-sm">
                        <i class="fa-solid fa-trash"></i>
                    </button>
                </div>
            </div>
        </div>
    `).join('');
}

function openAddReviewModal() {
    const form = document.getElementById('addReviewForm');
    if (form) form.reset();
    removeReviewImage();
    setReviewFormat('text');
    const modal = document.getElementById('addReviewModal');
    if (modal) modal.classList.remove('hidden');
}

async function handleAddReviewSubmit(e) {
    e.preventDefault();
    const btn = document.getElementById('btnSubmitReview');
    const originalBtnHtml = btn ? btn.innerHTML : 'Terbitkan Ulasan';

    const name = document.getElementById('newRevName').value.trim();
    const loc = document.getElementById('newRevLoc').value.trim();
    const rating = parseInt(document.getElementById('newRevRating').value, 10);
    const service = document.getElementById('newRevService').value.trim();
    const format = currentReviewFormat;
    const comment = document.getElementById('newRevComment').value.trim();
    const caption = document.getElementById('newRevImageCaption') ? document.getElementById('newRevImageCaption').value.trim() : '';

    if (format === 'text' && !comment) {
        showToast('Sila masukkan teks ulasan pelanggan!', 'error');
        return;
    }

    if (format === 'image' && !currentReviewImageBase64) {
        showToast('Sila pilih 1 gambar testimoni untuk dimuat naik!', 'error');
        return;
    }

    if (btn) {
        btn.disabled = true;
        btn.innerHTML = '<i class="fa-solid fa-spinner animate-spin"></i><span>Menyimpan ulasan...</span>';
    }

    const reviews = state.getReviews();
    const newRev = {
        id: 'REV-' + String(reviews.length + 1).padStart(2, '0') + '-' + Date.now().toString().slice(-4),
        name,
        location: loc,
        rating,
        service,
        unit: '1.5 HP Inverter',
        date: new Date().toLocaleDateString('ms-MY', { day: 'numeric', month: 'long', year: 'numeric' }),
        format: format,
        comment: format === 'text' ? comment : (caption || 'Testimoni bergambar pelanggan'),
        image: format === 'image' ? currentReviewImageBase64 : null,
        status: 'published',
        createdAt: new Date().toISOString()
    };

    // 1. Simpan ke Local State & Kemaskini Paparan Serta-Merta
    reviews.unshift(newRev);
    state.saveReviews(reviews);
    renderReviews();
    renderDashboard();
    closeModal('addReviewModal');

    // 2. Simpan ke Firebase Realtime Database
    try {
        const fbRes = await firebaseService.saveReview(newRev);
        if (fbRes.success) {
            newRev.firebaseKey = fbRes.firebaseKey;
            state.saveReviews(reviews);
            renderReviews();
            showToast('Ulasan & gambar testimoni berjaya disimpan ke Firebase Realtime Database!', 'success');
        } else {
            showToast('Ulasan disimpan ke simpanan tempatan. (Firebase perlukan tetapan Rules).', 'info');
        }
    } catch (err) {
        showToast('Ulasan disimpan ke simpanan tempatan.', 'info');
    }

    if (btn) {
        btn.disabled = false;
        btn.innerHTML = originalBtnHtml;
    }
}

async function toggleReviewStatus(revId) {
    const reviews = state.getReviews();
    const r = reviews.find(item => item.id === revId);
    if (!r) return;
    r.status = r.status === 'published' ? 'archived' : 'published';
    state.saveReviews(reviews);

    if (r.firebaseKey) {
        await firebaseService.updateReview(r.firebaseKey, { status: r.status });
    }

    showToast(`Status ulasan ${r.name} ditukar kepada ${r.status}.`, 'info');
    renderReviews();
}

async function deleteReview(revId) {
    if (!confirm('Padam ulasan ini daripada sistem dan Firebase?')) return;
    let reviews = state.getReviews();
    const target = reviews.find(r => r.id === revId);

    if (target && target.firebaseKey) {
        await firebaseService.deleteReview(target.firebaseKey);
    }

    reviews = reviews.filter(r => r.id !== revId);
    state.saveReviews(reviews);
    showToast('Ulasan telah dipadam.', 'info');
    renderReviews();
    renderDashboard();
}

// Fungsi Muat Naik Semua Ulasan ke Firebase RTDB
async function syncAllReviewsToFirebase() {
    const reviews = state.getReviews();
    if (reviews.length === 0) {
        showToast('Tiada ulasan dalam simpanan tempatan untuk dimuat naik.', 'info');
        const connected = await firebaseService.checkConnection();
        if (!connected) openFirebaseRulesModal();
        return;
    }

    showToast('Memulakan penyegerakan semua ulasan ke Firebase...', 'info');

    let successCount = 0;
    let unauthorized = false;

    for (const r of reviews) {
        if (!r.firebaseKey) {
            const res = await firebaseService.saveReview(r);
            if (res.success) {
                r.firebaseKey = res.firebaseKey;
                successCount++;
            } else if (res.unauthorized) {
                unauthorized = true;
            }
        }
    }

    state.saveReviews(reviews);
    if (unauthorized) {
        showToast('Ralat 401: Sila buka akses Security Rules di Firebase Console!', 'error');
        openFirebaseRulesModal();
    } else if (successCount > 0) {
        showToast(`${successCount} ulasan berjaya disegerakkan ke Firebase Realtime Database!`, 'success');
    } else {
        const connected = await firebaseService.checkConnection();
        if (connected) {
            showToast('Semua ulasan telah pun disegerakkan dengan Firebase!', 'success');
        } else {
            showToast('Gagal berhubung ke Firebase. Pastikan Rules Firebase telah ditetapkan.', 'error');
            openFirebaseRulesModal();
        }
    }
    renderReviews();
}
window.syncAllReviewsToFirebase = syncAllReviewsToFirebase;

// ==========================================
// 7. TECHNICIANS NETWORK TAB RENDERER
// ==========================================
function renderTechs() {
    const tableBody = document.getElementById('techsTableBody');
    if (!tableBody) return;

    const techs = state.getTechs();
    tableBody.innerHTML = techs.map(t => `
        <tr>
            <td class="font-mono text-sm text-brand-blue font-bold">${t.code}</td>
            <td>
                <span class="font-bold text-white block text-sm">${t.name}</span>
                <span class="text-xs text-gray-300">Pengalaman: ${t.exp}</span>
            </td>
            <td class="text-sm text-gray-200">${t.phone}</td>
            <td class="text-sm text-gray-200">${t.area}, ${t.state}</td>
            <td>
                <span class="text-xs px-3 py-1 rounded-full ${getTierBadgeClass(t.tier)} font-bold uppercase inline-block">
                    ${t.tier}
                </span>
            </td>
            <td>
                <span class="text-xs px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 uppercase font-bold inline-block">
                    ${t.status === 'active' ? 'Aktif' : 'Cuti'}
                </span>
            </td>
            <td class="text-right">
                <a href="https://wa.me/${t.phone.replace(/[^0-9]/g, '')}" target="_blank" class="w-8 h-8 rounded-lg bg-emerald-500/20 text-emerald-400 hover:bg-emerald-500/40 inline-flex items-center justify-center text-sm transition" title="Hubungi Juruteknik">
                    <i class="fa-brands fa-whatsapp text-sm"></i>
                </a>
            </td>
        </tr>
    `).join('');
}

function openAddTechModal() {
    const form = document.getElementById('addTechForm');
    if (form) form.reset();
    const modal = document.getElementById('addTechModal');
    if (modal) modal.classList.remove('hidden');
}

function handleAddTechSubmit(e) {
    e.preventDefault();
    const name = document.getElementById('newTechName').value;
    const phone = document.getElementById('newTechPhone').value;
    const area = document.getElementById('newTechArea').value;
    const stateVal = document.getElementById('newTechState').value;
    const tier = document.getElementById('newTechTier').value;
    const exp = document.getElementById('newTechExp').value;

    const techs = state.getTechs();
    const newCode = 'AISS-' + String(techs.length + 1).padStart(2, '0');

    const newTech = {
        id: 'TECH-' + String(techs.length + 1).padStart(3, '0'),
        code: newCode,
        name,
        phone,
        area,
        state: stateVal,
        tier,
        exp,
        status: 'active'
    };

    techs.push(newTech);
    state.saveTechs(techs);
    showToast('Juruteknik ' + name + ' (' + newCode + ') berjaya didaftarkan!', 'success');
    closeModal('addTechModal');
    renderTechs();
    renderDashboard();
}

// ==========================================
// 8. SITE SETTINGS TAB & PASSWORD MANAGEMENT
// ==========================================
function renderSettings() {
    const settings = state.getSettings();
    const annToggle = document.getElementById('settingAnnToggle');
    const annInput = document.getElementById('settingAnnText');
    const depInput = document.getElementById('settingDeposit');
    const waInput = document.getElementById('settingWa');

    if (annToggle) annToggle.checked = settings.announcementEnabled;
    if (annInput) annInput.value = settings.announcementText;
    if (depInput) depInput.value = settings.depositAmount;
    if (waInput) waInput.value = settings.whatsappContact;
}

function saveSiteSettings(e) {
    if (e) e.preventDefault();
    const settings = state.getSettings();

    const annToggle = document.getElementById('settingAnnToggle');
    const annInput = document.getElementById('settingAnnText');
    const depInput = document.getElementById('settingDeposit');
    const waInput = document.getElementById('settingWa');

    if (annToggle) settings.announcementEnabled = annToggle.checked;
    if (annInput) settings.announcementText = annInput.value;
    if (depInput) settings.depositAmount = parseFloat(depInput.value) || 69.00;
    if (waInput) settings.whatsappContact = waInput.value;

    state.saveSettings(settings);
    showToast(settings.announcementEnabled ? 'Tetapan Laman Web Disimpan: Bar Pengumuman Aktif!' : 'Tetapan Laman Web Disimpan: Bar Pengumuman Telah Dimatikan!', 'success');
}

function handlePasswordChange(e) {
    e.preventDefault();
    const oldP = document.getElementById('oldPassword').value;
    const newP = document.getElementById('newPassword').value;
    const confirmP = document.getElementById('confirmPassword').value;

    const user = state.getUser();
    if (oldP !== user.password) {
        showToast('Kata laluan semasa tidak tepat!', 'error');
        return;
    }
    if (newP.length < 6) {
        showToast('Kata laluan baharu mestilah sekurang-kurangnya 6 aksara!', 'error');
        return;
    }
    if (newP !== confirmP) {
        showToast('Pengesahan kata laluan baharu tidak sepadan!', 'error');
        return;
    }

    state.updatePassword(newP);
    showToast('Kata laluan pentadbir berjaya dikemaskini!', 'success');
    document.getElementById('changePasswordForm').reset();
}

// Reset System to Factory Seed Data
function resetSystemData() {
    if (!confirm('AMARAN: Adakah anda pasti ingin menetapkan semula semua data tempahan, ulasan dan juruteknik kepada nilai asal?')) return;
    localStorage.removeItem(STORAGE_KEYS.BOOKINGS);
    localStorage.removeItem(STORAGE_KEYS.REVIEWS);
    localStorage.removeItem(STORAGE_KEYS.TECHS);
    localStorage.removeItem(STORAGE_KEYS.SETTINGS);
    state.init();
    showToast('Data sistem telah ditetapkan semula!', 'info');
    renderDashboard();
    renderBookings();
    renderReviews();
    renderTechs();
    renderSettings();
}

// ==========================================
// 9. HELPER UTILITIES
// ==========================================
function closeModal(modalId) {
    const m = document.getElementById(modalId);
    if (m) m.classList.add('hidden');
}

function setText(id, text) {
    const el = document.getElementById(id);
    if (el) el.innerText = text;
}

function formatStatus(status) {
    switch (status) {
        case 'pending': return 'Menunggu';
        case 'confirmed': return 'Disahkan';
        case 'in_progress': return 'Dalam Servis';
        case 'completed': return 'Selesai';
        case 'cancelled': return 'Batal';
        default: return status;
    }
}

function getStatusBadgeClass(status) {
    switch (status) {
        case 'pending': return 'badge-pending';
        case 'confirmed': return 'badge-confirmed';
        case 'in_progress': return 'badge-progress';
        case 'completed': return 'badge-completed';
        case 'cancelled': return 'badge-cancelled';
        default: return 'bg-gray-500/20 text-gray-300';
    }
}

function getTierBadgeClass(tier) {
    if (tier.includes('Pakar')) return 'bg-yellow-500/20 text-yellow-300 border border-yellow-500/30';
    if (tier.includes('Platinum')) return 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/30';
    if (tier.includes('Gold')) return 'bg-amber-500/20 text-amber-300 border border-amber-500/30';
    return 'bg-blue-500/20 text-blue-300 border border-blue-500/30';
}

function showToast(message, type = 'info') {
    const container = document.getElementById('toastContainer');
    if (!container) return;

    const toast = document.createElement('div');
    toast.className = `toast-msg toast-${type}`;
    
    let icon = 'fa-circle-info';
    if (type === 'success') icon = 'fa-circle-check';
    if (type === 'error') icon = 'fa-triangle-exclamation';

    toast.innerHTML = `
        <i class="fa-solid ${icon} text-lg"></i>
        <span>${message}</span>
    `;

    container.appendChild(toast);

    setTimeout(() => {
        toast.style.opacity = '0';
        toast.style.transform = 'translateY(-20px)';
        setTimeout(() => toast.remove(), 300);
    }, 3500);
}
