// Agent data embedded directly for offline use
const agents = [
  {
    agent_id: "1",
    name: "John Doe",
    email: "john.doe@example.com",
    phone: "123-456-7890",
    availabletimes: "Mon-Fri 9am-5pm",
    address: "123 Main St, City, Country",
    languages: "English, Spanish",
    certifications: "Certified Real Estate Agent, Licensed Broker",
    category: "Real Estate"
  },
  {
    agent_id: "2",
    name: "Jane Smith",
    email: "jane.smith@example.com",
    phone: "234-567-8901",
    availabletimes: "Mon-Fri 10am-6pm",
    address: "456 Elm St, City, Country",
    languages: "English, French",
    certifications: "Certified Insurance Agent",
    category: "Medical"
  },
  {
    agent_id: "3",
    name: "Bob Johnson",
    email: "bob.johnson@example.com",
    phone: "345-678-9012",
    availabletimes: "Sat-Sun 8am-4pm",
    address: "789 Oak St, City, Country",
    languages: "English, German",
    certifications: "Licensed Financial Advisor",
    category: "Finance"
  },
  {
    agent_id: "4",
    name: "Alice Brown",
    email: "alice.brown@example.com",
    phone: "456-789-0123",
    availabletimes: "Mon-Fri 9am-5pm",
    address: "321 Pine St, City, Country",
    languages: "English",
    certifications: "Certified Medical Agent",
    category: "Medical"
  },
  {
    agent_id: "5",
    name: "Carlos Martinez",
    email: "carlos.martinez@example.com",
    phone: "567-890-1234",
    availabletimes: "Mon-Sat 8am-6pm",
    address: "654 Maple St, City, Country",
    languages: "Spanish, English",
    certifications: "Licensed Real Estate Agent",
    category: "Real Estate"
  },
  {
    agent_id: "6",
    name: "Linda Lee",
    email: "linda.lee@example.com",
    phone: "678-901-2345",
    availabletimes: "Mon-Fri 9am-5pm",
    address: "987 Cedar St, City, Country",
    languages: "English, Chinese",
    certifications: "Certified Financial Planner",
    category: "Finance"
  },
  {
    agent_id: "7",
    name: "Mohammed Al-Farsi",
    email: "mohammed.alfarsi@example.com",
    phone: "789-012-3456",
    availabletimes: "Sun-Fri 10am-7pm",
    address: "321 Birch St, City, Country",
    languages: "Arabic, English",
    certifications: "Licensed Medical Agent",
    category: "Medical"
  },
  {
    agent_id: "8",
    name: "Sophie Dubois",
    email: "sophie.dubois@example.com",
    phone: "890-123-4567",
    availabletimes: "Mon-Fri 8am-4pm",
    address: "159 Spruce St, City, Country",
    languages: "French, English",
    certifications: "Certified Real Estate Agent",
    category: "Real Estate"
  }
];

window.selectedLanguage = '';

function getUniqueLanguages(agents) {
    const langs = agents.flatMap(agent => agent.languages.split(',').map(l => l.trim()));
    return Array.from(new Set(langs));
}

function renderLanguageFilter(agents) {
    let sidebar = document.getElementById('sidebar');
    if (!sidebar) {
        sidebar = document.createElement('div');
        sidebar.id = 'sidebar';
        sidebar.className = 'sidebar';
        document.body.insertBefore(sidebar, document.getElementById('main'));
    }
    const uniqueLangs = getUniqueLanguages(agents);
    sidebar.innerHTML = `<div class='sidebar-section'><strong>Filter by Language:</strong></div>
        <form id='languageFilterForm' class='sidebar-section'>
            ${uniqueLangs.map(lang => `<label style='display:block;margin-bottom:10px;'><input type='checkbox' name='langRadio' value='${lang}'> ${lang}</label>`).join('')}
            <button type='submit' style='background:#2980b9;color:#fff;padding:7px 16px;border:none;border-radius:4px;cursor:pointer;font-size:1em;margin-top:10px;'>Apply</button>
        </form>`;
    document.getElementById('language-filter').style.display = 'none';
    document.getElementById('languageFilterForm').onsubmit = function(e) {
        e.preventDefault();
        const checked = Array.from(document.querySelectorAll('input[name="langRadio"]:checked')).map(el => el.value);
        let agentsToShow = window.agents;
        if (checked.length > 0) {
            agentsToShow = agentsToShow.filter(agent => checked.some(lang => agent.languages.split(',').map(l => l.trim()).includes(lang)));
        }
        showAgentList(agentsToShow);
    };
}

function updateAgentList(filteredAgents) {
    let agentsToShow = filteredAgents || window.agents;
    if (window.selectedLanguage && window.selectedLanguage !== '') {
        agentsToShow = agentsToShow.filter(agent => agent.languages.split(',').map(l => l.trim()).includes(window.selectedLanguage));
    }
    // Show filter only when agent list is visible
    document.getElementById('language-filter').style.display = 'block';
    showAgentList(agentsToShow);
}

function showAgentList(agents) {
    document.getElementById('language-filter').style.display = 'block';
    document.getElementById('agent-list').style.display = 'block';
    document.getElementById('agent-details').style.display = 'none';
    const listDiv = document.getElementById('agent-list');
    listDiv.innerHTML = '<h2>Agents List</h2>';
    if (!agents || agents.length === 0) {
        listDiv.innerHTML += '<div style="margin-top:20px;color:#c13c1a;font-weight:500;">No agents found.</div>';
        return;
    }
    agents.forEach((agent, idx) => {
        const item = document.createElement('div');
        item.className = 'agent-item card-agent';
        item.innerHTML = `
            <div class='agent-header'>
                <span class='agent-name'>${agent.name}</span>
                <button class='agent-page-btn' data-idx='${window.agents.indexOf(agent)}'>Agent page</button>
            </div>
            <div class='agent-info'>
                <span class='agent-icon'><i class='fa fa-map-marker'></i></span> ${agent.address}<br>
                <span class='agent-icon'><i class='fa fa-phone'></i></span> <a href='tel:${agent.phone}' class='agent-link-phone'>${agent.phone}</a> (TTY 711)<br>
                <span class='agent-icon'><i class='fa fa-envelope'></i></span> <a href='mailto:${agent.email}' class='agent-link-email'>Email</a><br>
                <span class='agent-icon'><i class='fa fa-volume-up'></i></span> ${agent.languages} spoken
            </div>
        `;
        listDiv.appendChild(item);
    });
    Array.from(document.getElementsByClassName('agent-page-btn')).forEach(el => {
        el.onclick = function() {
            const idx = this.getAttribute('data-idx');
            document.getElementById('agent-list').style.display = 'none';
            document.getElementById('language-filter').style.display = 'none';
            showAgentDetails(window.agents[idx], window.agents);
        };
    });
}

function showAgentDetails(agent, agents) {
    document.getElementById('language-filter').style.display = 'none';
    const detailsDiv = document.getElementById('agent-details');
    detailsDiv.innerHTML = `
        <button class='back-btn' id='backToListBtn' style='margin-bottom:18px;'>← Back to list</button>
        <div class='agent-detail-card'>
            <div class='agent-detail-left'>
                <div class='agent-detail-name' style='font-weight:800;font-size:2.1em;'>${agent.name}</div>
                <div class='agent-detail-company'>${agent.certifications ? agent.certifications.split(',')[0] : ''}</div>
                <div class='agent-detail-desc'>${agent.description || "RealSoft offers a variety of plans designed to meet every member's needs. Finding that right asset is easier with the right agent by your side. I'm here to guide you through the process, whether you prefer to meet in person, connect online or chat over the phone. Let's find the asset that meets your budget and needs, together!"}</div>
                <div class='agent-detail-contact' style='margin-top:18px;line-height:2;'>
                    <span class='agent-icon'><i class='fa fa-phone'></i></span> <a href='tel:${agent.phone}' class='agent-link-phone'>${agent.phone}</a> (TTY 711)<br>
                    <span class='agent-icon'><i class='fa fa-envelope'></i></span> <a href='mailto:${agent.email}' class='agent-link-email'>Email</a><br>
                    <span class='agent-icon'><i class='fa fa-volume-up'></i></span> ${agent.languages} spoken
                </div>
                <div class='agent-detail-moreinfo'>
                    <h4>More info</h4>
                    <ul>
                        <li><strong>Available Times:</strong> ${agent.availabletimes}</li>
                        <li><strong>Address:</strong> ${agent.address}</li>
                        <li><strong>Certifications:</strong> ${agent.certifications}</li>
                    </ul>
                </div>
                <button id='bookAppointmentBtn' class='agent-detail-appointment'>Request an appointment</button>
            </div>
        </div>
        <div id='appointmentModal' class='modal' style='display:none;position:fixed;top:0;left:0;width:100vw;height:100vh;background:rgba(0,0,0,0.4);z-index:1000;align-items:center;justify-content:center;'>
            <div style='background:#fff;padding:30px 25px;border-radius:8px;max-width:350px;width:90%;box-shadow:0 4px 16px rgba(44,62,80,0.15);position:relative;'>
                <span id='closeModalBtn' style='position:absolute;top:10px;right:15px;cursor:pointer;font-size:1.2em;'>&times;</span>
                <h3>Book Appointment</h3>
                <form id='appointmentForm'>
                    <label>Name:<br><input type='text' name='userName' required style='width:100%;margin-bottom:10px;'></label><br>
                    <label>Phone:<br><input type='text' name='userPhone' required style='width:100%;margin-bottom:10px;'></label><br>
                    <label>Email:<br><input type='email' name='userEmail' required style='width:100%;margin-bottom:10px;'></label><br>
                    <button type='submit' style='background:#2980b9;color:#fff;padding:8px 16px;border:none;border-radius:4px;cursor:pointer;width:100%;'>Submit</button>
                </form>
                <div id='thankYouMsg' style='display:none;margin-top:20px;color:#2980b9;font-weight:bold;text-align:center;'></div>
            </div>
        </div>`;
    detailsDiv.style.display = 'block';
    document.getElementById('agent-list').style.display = 'none';
    var backBtn = document.getElementById('backToListBtn');
    if (backBtn) {
        backBtn.onclick = function() {
            showAgentList(agents);
        };
    }
    document.getElementById('bookAppointmentBtn').onclick = function() {
        document.getElementById('appointmentModal').style.display = 'flex';
        document.getElementById('thankYouMsg').style.display = 'none';
    };
    document.getElementById('closeModalBtn').onclick = function() {
        document.getElementById('appointmentModal').style.display = 'none';
    };
    document.getElementById('appointmentForm').onsubmit = function(e) {
        e.preventDefault();
        document.getElementById('appointmentForm').style.display = 'none';
        document.getElementById('thankYouMsg').textContent = 'Thanks for booking an appointment. Agent will get in touch with you soon.';
        document.getElementById('thankYouMsg').style.display = 'block';
        setTimeout(function() {
            document.getElementById('appointmentModal').style.display = 'none';
            document.getElementById('appointmentForm').reset();
            document.getElementById('appointmentForm').style.display = 'block';
        }, 3000);
    };
}

window.onload = function() {
    window.agents = agents;
    renderLanguageFilter(window.agents);
    updateAgentList();
    document.getElementById('agent-list').style.display = 'block';
    document.getElementById('agent-details').style.display = 'none';
};
