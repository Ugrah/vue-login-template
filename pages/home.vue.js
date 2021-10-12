const Home = {
    template: `
        <template>
        <div class="app-wrapper pl-0">
            <Header/>
                <div class="app-content pt-3 p-md-3 p-lg-4">
                    <div class="container-xl">

                        <h1 class="app-page-title mt-5">Home</h1>

                        <div id="home-is-signedout" class="app-card alert alert-dismissible shadow-sm mb-4 border-left-decoration" role="alert">
                            <div class="inner">
                                <div class="app-card-body p-3 p-lg-4">
                                    <h3 class="mb-3">Your App home!</h3>
                                    <div class="row gx-5 gy-3">
                                        <div class="col-12 col-lg-9">
                                            <div>Prepare your home app content.</div>
                                        </div>
                                        <!--//col-->
                                        <div class="col-12 col-lg-3">
                                        </div>
                                        <!--//col-->
                                    </div>
                                    <!--//row-->
                                    <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                                </div>
                                <!--//app-card-body-->

                            </div>
                            <!--//inner-->
                        </div>
                        <!--//app-card-->

                    </div>
                    <!--//container-fluid-->
                </div>
                <!--//app-content-->

                <Footer/>
            </div>
        </template>`,

    async beforeCreate() {
        const authUser =  await this.$root.fetchAuthStatus();
        if (!authUser) this.$router.push('/login')
    },  
    mounted() {
        this.$root.tooglerIsOpen = false
    },

    data() {
        return {
            email: "",
            validationErrors: [],
        };
    },
    computed: {
        
    },
    methods: {

    },
};
