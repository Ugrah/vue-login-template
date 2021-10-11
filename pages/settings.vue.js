const Profile = {
    template: `
        <div class="app-wrapper pl-0">
            <Header/>
            <div class="app-content pt-3 p-md-3 p-lg-4">
                <div class="container-xl">
                    <h1 class="app-page-title">Profile</h1>
                </div>
                <!--//container-fluid-->
            </div>
            <!--//app-content-->

            <Footer/>
        </div>`,

    data() {
        return {
            email: "",
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
    async created() {
        const authUser =  await this.$root.fetchAuthStatus();
        if (!authUser) this.$router.push('/login')
    },
    mounted() {
        this.$root.tooglerIsOpen = false
    },
    methods: {
        async fetchAuthStatus() {
            if (localStorage.tokenAccess) {
                this.$emit("auth-verified", true);
            } else {
                // triggered at load. Relevant only when you have a session.
                // for JWT and similar: check against token, and pass refresh token if expired
                console.log("Fetching auth status..");
                // this.$emit("auth-verified", false);
                // return;

                const res = await axios.get(this.urls.authget, {
                    crossdomain: true,
                });

                const authData = res.data;
                console.log(`GET auth done!`, authData);

                if (authData["auth-status"]) {
                    console.log("Auth approved!");
                } else {
                    // this is silent error since user will ..
                    // .. most likely not have access the first time the screen loads
                    console.log("Auth denied..! Re-login.");
                }
                this.$emit("auth-verified", authData["auth-status"]);
            }
        },
        async login() {
            try {
                // main login flow
                const res = await axios.post(this.urls.authpost, { email: this.email });
                const authData = res.data;

                console.log(`POST auth done!`, authData);

                if (!authData["auth-status"]) {
                    this.validationErrors.push(
                        "Could not verify email. Validate and resubmit."
                    );
                }
                this.$emit("auth-verified", authData["auth-status"]);
            } catch (e) {
                this.validationErrors.push[e.message];
                console.error(e);
            }
        },
        validateAndSubmit() {
            // .. validate before sending the request off to server.
            this.validationErrors = [];
            if (this.validate()) {
                this.login();
            }
        },
        validate() {
            const errors = [];
            const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            if (!pattern.test(this.email)) errors.push("Invalid email.");

            if (errors) this.validationErrors = errors;
            else this.validationErrors = [];

            return !this.validationErrors.length;
        },
    },
};
