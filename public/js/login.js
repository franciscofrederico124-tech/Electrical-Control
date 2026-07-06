document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('loginForm');
    const submitBtn = document.getElementById('submitBtn');
    const messageBox = document.getElementById('messageBox');

    function showMessage(text, type) {
        messageBox.className = 'message-box';

        if (type === 'error' || type === 'warning' || type === 'success') {
            messageBox.classList.add(type);
        }

        messageBox.innerText = text;
    }

    loginForm.addEventListener('submit', async (event) => {
        event.preventDefault();

        const email = document.getElementById('email').value.trim().toLowerCase();
        const password = document.getElementById('password').value;

        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if (!emailRegex.test(email) || password.length < 10) {
            showMessage("E-mail ou senha incorretos.", "warning");
            return;
        }

        submitBtn.disabled = true;
        submitBtn.innerText = "A ligar ao servidor...";
        showMessage("A processar autenticação...", "warning");

        try {
            const response = await fetch('/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email, password })
            });

            const data = await response.json();

            if (!data.success) {
                showMessage(data.message, "error");
                submitBtn.disabled = false;
                submitBtn.innerText = "Entrar";
                return;
            }

            showMessage(data.message || 'Sucesso. Seja bem-vindo de volta!', "success");
            submitBtn.disabled = false;
            submitBtn.innerText = "Entrar";

            setTimeout(() => {
                window.location.href = '/system/dashboard';
            }, 1000);

        } catch (error) {
            console.log(error)
            showMessage("Erro interno", "error");
            submitBtn.disabled = false;
            submitBtn.innerText = "Entrar";
        }
    });
});
