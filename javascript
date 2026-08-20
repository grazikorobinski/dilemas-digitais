document.addEventListener('DOMContentLoaded', () => {
    // Interatividade ao clicar na caixa de detecção facial
    const faceBoxes = document.querySelectorAll('.face-box');
    const inspectorDetails = document.getElementById('inspectorDetails');

    faceBoxes.forEach(box => {
        box.addEventListener('click', () => {
            const id = box.getAttribute('data-id');
            const match = box.getAttribute('data-match');
            const status = box.getAttribute('data-status');
            const role = box.getAttribute('data-role');

            const isWarning = status === 'SUSPEITO';
            const statusColor = isWarning ? '#f43f5e' : '#38bdf8';

            inspectorDetails.innerHTML = `
                <div class="detail-row"><span class="detail-label">Identificador:</span> <strong>${id}</strong></div>
                <div class="detail-row"><span class="detail-label">Precisão:</span> <strong>${match}</strong></div>
                <div class="detail-row"><span class="detail-label">Classificação:</span> <strong>${role}</strong></div>
                <div class="detail-row"><span class="detail-label">Status do Sistema:</span> <span style="color: ${statusColor}; font-weight: bold;">${status}</span></div>
                <div class="detail-row" style="margin-top: 10px; font-size: 0.75rem; color: #64748b;">
                    Coordenadas: X=${box.style.left}, Y=${box.style.top}<br>
                    Algoritmo: ResNet-50 / Biometria Vetorial
                </div>
            `;
        });
    });

    // Controle de Pause/Resume do Varredor de Tela
    const btnToggleScan = document.getElementById('btnToggleScan');
    const scanLine = document.querySelector('.scan-line');
    let isScanning = true;

    btnToggleScan.addEventListener('click', () => {
        isScanning = !isScanning;
        if (isScanning) {
            scanLine.style.animationPlayState = 'running';
            btnToggleScan.textContent = 'Pausar Varredura';
        } else {
            scanLine.style.animationPlayState = 'paused';
            btnToggleScan.textContent = 'Retomar Varredura';
        }
    });

    // Filtro de Alertas
    const btnFilterAlerts = document.getElementById('btnFilterAlerts');
    let showingOnlyAlerts = false;

    btnFilterAlerts.addEventListener('click', () => {
        showingOnlyAlerts = !showingOnlyAlerts;
        faceBoxes.forEach(box => {
            if (showingOnlyAlerts) {
                if (!box.classList.contains('warning')) {
                    box.style.display = 'none';
                }
            } else {
                box.style.display = 'block';
            }
        });

        btnFilterAlerts.textContent = showingOnlyAlerts ? 'Mostrar Todos' : 'Filtrar Apenas Alertas';
    });

    // Enquete Interativa
    const pollButtons = document.querySelectorAll('.poll-btn');
    const pollResults = document.getElementById('pollResults');
    const pollOptionsContainer = document.querySelector('.poll-options');

    pollButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            pollOptionsContainer.style.display = 'none';
            pollResults.classList.remove('hidden');
        });
    });
});