async function fetchSystemData() {
    try {
        const response = await fetch('/system/set-data');
        const json = await response.json();

        if (json && json.currentData && json.currentData.data) {
            const systemData = json.currentData.data;

            if (systemData.v) {
                document.getElementById('voltage-value').innerText = systemData.v.replace(/[^\d.]/g, '');
                document.getElementById('voltage-unit').innerText = systemData.v.replace(/[\d.]/g, '');
            }

            if (systemData.i) {
                document.getElementById('current-value').innerText = systemData.i.replace(/[^\d.]/g, '');
                document.getElementById('current-unit').innerText = systemData.i.replace(/[\d.]/g, '');
            }

            if (systemData.P) {
                document.getElementById('power-value').innerText = systemData.P;
            }
        }
    } catch (error) {
        console.error("Erro na leitura de dados:", error);
    }
}

setInterval(fetchSystemData, 10);
