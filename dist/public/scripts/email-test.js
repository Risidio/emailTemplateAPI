let testEmailForm = document.querySelector('.test-email-form');
        let emailInput = document.getElementById('email');

        testEmailForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            console.log('123');
            await fetch(`https://risidio-mail-test-interface.herokuapp.com/test-email`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email: emailInput.value })
            })
            .then(res => {
                console.log('Email Sent');
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