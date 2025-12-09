// private-voting.js - Xử lý bầu cử khép kín với mật khẩu

let currentUser = null;
let selectedCandidate = null;
const CANDIDATES = [
    { id: 1, name: "Nguyễn Văn A", position: "Lớp trưởng", votes: 0 },
    { id: 2, name: "Trần Thị B", position: "Lớp phó", votes: 0 },
    { id: 3, name: "Lê Văn C", position: "Bí thư", votes: 0 }
];

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    currentUser = getCurrentUser();
    
    if (!currentUser) {
        window.location.href = 'login.html';
        return;
    }
    
    displayUserInfo();
    setupEventListeners();
    checkIfAlreadyVoted();
});

// Display user info
function displayUserInfo() {
    const userInfo = document.getElementById('userInfo');
    const userName = document.getElementById('userName');
    const userRole = document.getElementById('userRole');
    
    if (currentUser) {
        userInfo.style.display = 'flex';
        userName.textContent = currentUser.username;
        userRole.textContent = currentUser.role === 'admin' ? 'Quản trị viên' : 'Sinh viên';
    }
}

// Setup event listeners
function setupEventListeners() {
    const logoutBtn = document.getElementById('logoutBtn');
    const unlockVotingBtn = document.getElementById('unlockVoting');
    const passwordInput = document.getElementById('electionPasswordInput');
    const confirmVoteBtn = document.getElementById('confirmVoteBtn');
    const cancelVoteBtn = document.getElementById('cancelVoteBtn');
    
    logoutBtn.addEventListener('click', logout);
    unlockVotingBtn.addEventListener('click', unlockVoting);
    passwordInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') unlockVoting();
    });
    passwordInput.addEventListener('input', clearError);
    
    confirmVoteBtn.addEventListener('click', confirmVote);
    cancelVoteBtn.addEventListener('click', cancelSelection);
}

// Check if user already voted
function checkIfAlreadyVoted() {
    const votedUsers = JSON.parse(localStorage.getItem('voted_users_private') || '[]');
    const hasVoted = votedUsers.includes(currentUser.username);
    
    if (hasVoted) {
        // If already voted, skip password and show voted notice
        document.getElementById('lockScreen').style.display = 'none';
        document.getElementById('votingArea').classList.add('unlocked');
        document.getElementById('candidatesListPrivate').style.display = 'none';
        document.getElementById('alreadyVotedNotice').style.display = 'block';
    }
}

// Unlock voting with password
function unlockVoting() {
    const passwordInput = document.getElementById('electionPasswordInput');
    const passwordError = document.getElementById('passwordError');
    const enteredPassword = passwordInput.value.trim();
    
    // Get election config
    const electionConfig = JSON.parse(localStorage.getItem('election_config') || '{}');
    
    // Check if private mode is active
    if (electionConfig.mode !== 'private') {
        showError('Chế độ bầu cử khép kín chưa được kích hoạt!');
        return;
    }
    
    // Check password
    if (enteredPassword === electionConfig.password) {
        // Password correct - unlock voting area
        document.getElementById('lockScreen').style.display = 'none';
        document.getElementById('votingArea').classList.add('unlocked');
        loadCandidates();
    } else {
        // Password incorrect
        passwordInput.classList.add('error');
        passwordError.style.display = 'block';
        passwordInput.value = '';
        passwordInput.focus();
        
        // Remove error after animation
        setTimeout(() => {
            passwordInput.classList.remove('error');
        }, 500);
    }
}

// Clear password error
function clearError() {
    document.getElementById('passwordError').style.display = 'none';
}

// Show error message
function showError(message) {
    const passwordError = document.getElementById('passwordError');
    passwordError.textContent = '❌ ' + message;
    passwordError.style.display = 'block';
    
    const passwordInput = document.getElementById('electionPasswordInput');
    passwordInput.classList.add('error');
    
    setTimeout(() => {
        passwordInput.classList.remove('error');
    }, 500);
}

// Load candidates
function loadCandidates() {
    const candidatesList = document.getElementById('candidatesListPrivate');
    
    // Load votes from localStorage
    const votes = JSON.parse(localStorage.getItem('election_votes_private') || '{}');
    
    candidatesList.innerHTML = CANDIDATES.map(candidate => {
        const voteCount = votes[candidate.id] || 0;
        return `
            <div class="candidate-card-private" data-candidate-id="${candidate.id}">
                <div style="display: flex; align-items: center; gap: 20px;">
                    <div style="font-size: 3em;">👤</div>
                    <div style="flex: 1;">
                        <h3 style="margin: 0; color: var(--dark-color);">${candidate.name}</h3>
                        <p style="margin: 5px 0 0 0; color: #666; font-size: 1.1em;">
                            <strong>${candidate.position}</strong>
                        </p>
                    </div>
                    <div style="text-align: center;">
                        <div style="font-size: 2em; font-weight: bold; color: var(--primary-color);">
                            ${voteCount}
                        </div>
                        <div style="color: #999; font-size: 0.9em;">phiếu bầu</div>
                    </div>
                </div>
            </div>
        `;
    }).join('');
    
    // Add click handlers
    document.querySelectorAll('.candidate-card-private').forEach(card => {
        card.addEventListener('click', () => selectCandidate(card));
    });
}

// Select candidate
function selectCandidate(card) {
    // Remove previous selection
    document.querySelectorAll('.candidate-card-private').forEach(c => {
        c.classList.remove('selected');
    });
    
    // Add selection to clicked card
    card.classList.add('selected');
    
    const candidateId = parseInt(card.dataset.candidateId);
    selectedCandidate = CANDIDATES.find(c => c.id === candidateId);
    
    // Show confirmation section
    document.getElementById('selectedCandidateName').textContent = selectedCandidate.name;
    document.getElementById('selectedCandidatePosition').textContent = selectedCandidate.position;
    document.getElementById('voteConfirmSection').style.display = 'block';
    
    // Scroll to confirmation section
    document.getElementById('voteConfirmSection').scrollIntoView({ behavior: 'smooth', block: 'center' });
}

// Cancel selection
function cancelSelection() {
    document.querySelectorAll('.candidate-card-private').forEach(c => {
        c.classList.remove('selected');
    });
    selectedCandidate = null;
    document.getElementById('voteConfirmSection').style.display = 'none';
}

// Confirm vote
function confirmVote() {
    if (!selectedCandidate) {
        alert('Vui lòng chọn một ứng viên!');
        return;
    }
    
    // Double confirm
    const confirmMessage = `Bạn có chắc chắn muốn bầu cho "${selectedCandidate.name}" không?\n\nSau khi xác nhận, bạn KHÔNG THỂ thay đổi lựa chọn.`;
    if (!confirm(confirmMessage)) {
        return;
    }
    
    // Save vote
    const votes = JSON.parse(localStorage.getItem('election_votes_private') || '{}');
    votes[selectedCandidate.id] = (votes[selectedCandidate.id] || 0) + 1;
    localStorage.setItem('election_votes_private', JSON.stringify(votes));
    
    // Mark user as voted
    const votedUsers = JSON.parse(localStorage.getItem('voted_users_private') || '[]');
    votedUsers.push(currentUser.username);
    localStorage.setItem('voted_users_private', JSON.stringify(votedUsers));
    
    // Show success message
    alert('✅ Bầu cử thành công!\n\nPhiếu bầu của bạn đã được ghi nhận. Cảm ơn bạn đã tham gia!');
    
    // Hide voting area and show already voted notice
    document.getElementById('candidatesListPrivate').style.display = 'none';
    document.getElementById('voteConfirmSection').style.display = 'none';
    document.getElementById('alreadyVotedNotice').style.display = 'block';
}
