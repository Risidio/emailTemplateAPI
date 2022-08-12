let testEmailForm = document.querySelector('.test-email-form');
        let emailInput = document.getElementById('email');

        testEmailForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            console.log(123);
            console.log("Test Data: " + emailInput.value);
            await fetch(`http://localhost:4000/test-email`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email: emailInput.value })
            })
            .then(res => {
                return res.json()
            })
            .then(resData => {
                emailInput.value = ''
                return
            })
            .catch(err => {
                console.log(err);
            })
        })