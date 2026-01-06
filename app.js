
const tg = window.Telegram.WebApp;
tg.expand();

let balance = 0;
let matchesPlayed = 0;
let hasJoined = false;

// ১. লগিন হ্যান্ডেল (একবার দেখাবে)
if (localStorage.getItem("isLoggedIn")) {
    document.getElementById("login-screen").style.display = "none";
    document.getElementById("main-app").style.display = "block";
    loadUserData();
}

function handleLogin() {
    localStorage.setItem("isLoggedIn", true);
    document.getElementById("login-screen").style.display = "none";
    document.getElementById("main-app").style.display = "block";
    loadUserData();
}

function loadUserData() {
    const user = tg.initDataUnsafe?.user;
    document.getElementById("user-name").innerText = user?.first_name || "Gamer";
    document.getElementById("p-name").innerText = user?.username || user?.first_name;
}

// ২. পেজ নেভিগেশন
function showPage(pageId) {
    document.querySelectorAll('.page').forEach(p => p.style.display = 'none');
    document.getElementById(pageId).style.display = 'block';
}

function showCategory(type) {
    if(type === 'ff') showPage('ff-category');
}

// ৩. জয়েনিং লজিক
let currentMatchFee = 0;
function openJoinModal(id, fee) {
    if(hasJoined) return;
    currentMatchFee = fee;
    document.getElementById("join-modal").style.display = "flex";
}

function confirmJoin() {
    const pName = document.getElementById("game-name-input").value;
    if(pName.length < 3) return alert("সঠিক নাম দিন");
    
    if(balance < currentMatchFee) {
        alert("আপনার ব্যালেন্স নেই! দয়া করে ডিপোজিট করুন।");
        return;
    }

    // এডমিন পেন্ডিং লজিক (সিমুলেশন)
    alert("আপনার জয়েনিং রিকোয়েস্ট অ্যাডমিনের কাছে পাঠানো হয়েছে (Pending)");
    document.getElementById("join-modal").style.display = "none";
    
    // মনে করুন অ্যাডমিন এপ্রুভ করেছে (লজিক অনুযায়ী)
    document.getElementById("join-btn-102").innerText = "JOINED";
    document.getElementById("join-btn-102").style.background = "grey";
    hasJoined = true;
    balance -= currentMatchFee;
    matchesPlayed++;
    updateUI();
}

function updateUI() {
    document.getElementById("top-balance").innerText = balance;
    document.getElementById("dep-bal").innerText = balance;
    document.getElementById("match-count").innerText = matchesPlayed;
}

// ৪. রুম ডিটেইলস (শুধু জয়েন করা ইউজারদের জন্য)
function showRoom(id) {
    if(hasJoined) {
        alert("Room ID: 556677, Pass: 1234");
    } else {
        alert("ম্যাচে জয়েন করলেই রুম ডিটেইলস দেখতে পাবেন!");
    }
}

// ৫. ওয়ালেট লজিক
function showAddMoney() {
    document.getElementById("payment-methods").style.display = "block";
}

function showBkash() {
    const trx = prompt("বিকাশ নাম্বার: 017XXXXXXXX এ ২০ টাকা পাঠিয়ে TrxID দিন:");
    if(trx) {
        alert("আপনার ট্রানজ্যাকশনটি পেন্ডিং আছে। অ্যাডমিন চেক করে ব্যালেন্স অ্যাড করে দিবে।");
    }
}

function closeModal() { document.getElementById("join-modal").style.display = "none"; }

// ৬. টাইম কাউন্টডাউন (Simple)
function startTimer() {
    let countDownDate = new Date().getTime() + 86400000; // ২৪ ঘণ্টা পর
    setInterval(function() {
        let now = new Date().getTime();
        let distance = countDownDate - now;
        let h = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        let m = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        let s = Math.floor((distance % (1000 * 60)) / 1000);
        document.getElementById("timer").innerHTML = h + "h " + m + "m " + s + "s ";
    }, 1000);
}
startTimer();

