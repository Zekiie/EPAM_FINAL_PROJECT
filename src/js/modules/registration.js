export class RegisterForm {
    regForm () {
        document.getElementById("root").innerHTML += `
    <div class="signup">
        <div class="signup-classic">
            <h2>Create an Account</h2>
            <i class="fas fa-times" id="close-signup"></i>
            <form class="signup-form" id="signup-form">
                <fieldset class="username">
                    <input type="text" placeholder="username" required>
                </fieldset>
                <fieldset class="email">
                    <input type="email" placeholder="email" id="email" required>
                    <span class="popuptext" id="myPopup-email">You have entered an invalid email address!</span>
                </fieldset>
                <fieldset class="password">
                    <input type="password" placeholder="password" 
                    minlength="4" maxlength="8" size="8" id="password" pattern="^(?=.*\\d)(?=.*[a-z])(?=.*[A-Z])(?!.*\\s).*$" required>
                    <span class="popuptext" id="myPopup-psw">Your passwort isn't strong enough!</span>
                </fieldset>
                <button type="submit" class="btn" id="signIn-submit">Sign up</button>
            </form>
        </div>
    </div>
        `
    }
    saveUser () {
        const id = (id) => document.getElementById(id);
        const signup =  document.querySelector(".signup-classic");
        const formSignup = [...id("signup-form")];
        const signinSbm = id("signIn-submit");
        const email = id('email');
        const password = id('password');
        let objUser = {};
    console.log(formSignup );
        function refreshUsers (key, objUsers) {
            localStorage.setItem(key, JSON.stringify(objUsers))
        }

        function validateEmail(mail, popup) {
            if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail) && mail !== '') {
                popup.classList.remove("show");
                return true
            } else {
                popup.classList.add("show");
            }
        }


        function validatePassword(psw, popup) {
            if (/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?!.*\s)*.{5,8}$/g.test(psw) && psw !== '') {
                popup.classList.remove("show");
                return true
            } else {
                popup.classList.add("show");
            }
        }

        function addUserDetail () {
            event.preventDefault();
            formSignup.map(el => {
                if (el.id && el.value !== "") {
                    objUser[[el.id]] = el.value;
                }
            });

            if (Object.keys(objUser).length > 0 &&   validateEmail(objUser.email, id("myPopup-email")) && validatePassword(password.value, id("myPopup-psw"))) {
                refreshUsers ("user", objUser);
                signup.style.display = 'none';
            }
        }
        email.addEventListener('change', () => validateEmail(email.value, id("myPopup-email")));
        password.addEventListener('change', () => validatePassword(password.value, id("myPopup-psw")));
        signinSbm.addEventListener("click", addUserDetail);
    }
    closeSignup () {

    }
}