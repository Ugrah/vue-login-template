const Signup = {
    template: `<div class="row g-0 app-auth-wrapper">
    <div class="col-12 col-md-7 col-lg-6 auth-main-col text-center p-5">
        <div class="d-flex flex-column align-content-end">
            <div class="app-auth-body mx-auto">	
            <div class="app-auth-branding mb-4"><a class="app-logo" href="index.html"><img class="logo-icon me-2" src="assets/images/app-logo.svg" alt="logo"></a></div>
            <h2 class="auth-heading text-center mb-4">Sign up to {{ this.$root.appName }} </h2>					

            <div class="auth-form-container text-start mx-auto">
                <form class="auth-form auth-signup-form">         
                    <div class="email mb-3">
                        <label class="sr-only" for="signup-email">Your Name</label>
                        <input id="signup-name" name="signup-name" type="text" class="form-control signup-name" placeholder="Full name" required="required">
                    </div>
                    <div class="email mb-3">
                        <label class="sr-only" for="signup-email">Your Email</label>
                        <input id="signup-email" name="signup-email" type="email" class="form-control signup-email" placeholder="Email" required="required">
                    </div>
                    <div class="password mb-3">
                        <label class="sr-only" for="signup-password">Password</label>
                        <input id="signup-password" name="signup-password" type="password" class="form-control signup-password" placeholder="Create a password" required="required">
                    </div>
                    <div class="extra mb-3">
                        <div class="form-check">
                            <input class="form-check-input" type="checkbox" value="" id="RememberPassword">
                            <label class="form-check-label" for="RememberPassword">
                            I agree to Portal's <a href="#" class="app-link">Terms of Service</a> and <a href="#" class="app-link">Privacy Policy</a>.
                            </label>
                        </div>
                    </div><!--//extra-->
                    
                    <div class="text-center">
                        <button type="submit" class="btn app-btn-primary w-100 theme-btn mx-auto">Sign Up</button>
                    </div>
                </form><!--//auth-form-->
                
                <div class="auth-option text-center pt-5">Already have an account? <a class="text-link" href="login.html" >Log in</a></div>
            </div><!--//auth-form-container-->		

            </div><!--//auth-body-->
            <Footer/>
            <!--//app-auth-footer-->	
        </div><!--//flex-column-->   
    </div><!--//auth-main-col-->
    <div class="col-12 col-md-5 col-lg-6 h-100 auth-background-col">
        <div class="auth-background-holder">
        </div>
        <div class="auth-background-mask"></div>
        <div class="auth-background-overlay p-3 p-lg-5">
            <div class="d-flex flex-column align-content-end h-100">
                <div class="h-100"></div>
                <div class="overlay-content p-3 p-lg-4 rounded d-none">
                    <h5 class="mb-3 overlay-title">Explore Portal Admin Template</h5>
                    <div></div>
                </div>
            </div>
        </div><!--//auth-background-overlay-->
    </div><!--//auth-background-col-->

</div><!--//row-->
 
<style>
  .auth-background-holder {
    background:url('~./images/background/background-1.jpg') no-repeat center center;
    background-size:cover;height:100vh;min-height:100%;
  }
</style>`,

    data() {
        return {
            username: "",
            password: null,
            validationErrors: [],
        };
    },
    computed: {
        authstatus() {
            // this way of sharing values is ok for small projects.
            // large projects must use Vuex
            return this.$root.authstatus;
        },

        urls() {
            // fetch URLs from root
            return this.$root.apiurls;
        },
    },
    methods: {
        async login() {
            try {
                // main login flow
                const res = await axios.post(this.urls.authpost, { username: this.username, password: this.password });
                const authData = res.data;


                // console.log(`POST auth done!`, authData);

                // Set signin condition
                if( typeof authData.id !== 'undefined' ) {
                    Swal.fire({position: 'top-end', icon: 'error', title: 'Error credentials', text: 'Impossible to connect. verify your identifiers', showConfirmButton: false, timer: 2000})
                    this.validationErrors.push( "'Impossible to connect. verify your identifiers'.");
                    return;
                } 

                this.$root.$emit("auth-verified", !authData.id ? false : authData);
                // localStorage.setItem('user', JSON.stringify(authData.data));
                // console.log( localStorage.getItem('user') )

                this.$root.setCookie('user', JSON.stringify(authData.data), 1)
                let user = this.$root.getCookie('user')
                if(user) {
                    Swal.fire({
                        position: 'top-end',
                        icon: 'success',
                        title: 'Your been signin sucessfully',
                        showConfirmButton: false,
                        timer: 2000
                    }).then((result) => {
                        let appAuthStatus = this.$root.setAuthStatus(user);
                        console.log( appAuthStatus );
                        this.$root.authstatus = true;
                        this.$router.push('/');
                    })
                }


                // console.log(this.$root.)

                // if (!authData["auth-status"]) {
                //     this.validationErrors.push(
                //         "Could not verify username and password. Validate and resubmit."
                //     );
                // }
                // this.$emit("auth-verified", authData["auth-status"]);
            } catch (e) {
                this.validationErrors.push[e.message];
                console.error(e);
                Swal.fire({
                    position: 'top-end',
                    icon: 'error',
                    title: 'Error credentials',
                    text: e.message,
                    showConfirmButton: false,
                    timer: 2000
                })
            }
        },
        validateAndSubmit() {
            // .. validate before sending the request off to server.
            this.validationErrors = [];
            if (this.validate()) {
                console.log('Run axios to trigger signin')
                this.login();
            }
        },
        validate() {
            const errors = [];
            // const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            // if (!pattern.test(this.email)) errors.push("Invalid email.");

            if (!this.username) errors.push('Username not valid')
            if (!this.password) errors.push('Password not valid')

            if (errors) this.validationErrors = errors;
            else this.validationErrors = [];

            return !this.validationErrors.length;
        },
    },
};
