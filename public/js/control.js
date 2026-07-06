document.addEventListener('DOMContentLoaded', () => {
    const switches = [
        { id: 'switchLighting', name: 'Iluminação Geral' },
        { id: 'switchProduction', name: 'Sistema de Produção Solar' }
    ];

    switches.forEach(item => {
        const element = document.getElementById(item.id);
        if (!element) return;

        element.addEventListener('change', (event) => {
            const isChecked = event.target.checked;
            const statusText = isChecked ? 'LIGADO' : 'DESLIGADO';

            console.log(`[Atuador Local] ${item.name} alterado para: ${statusText}`);
        });
    });
});
