const Settings = {
    template: `
        <div class="app-wrapper pl-0">
            <Header/>
            <div class="app-content pt-3 p-md-3 p-lg-4">
                <div class="container-xl">
                    <h1 class="app-page-title mt-5">Settings</h1>
                </div>
                <!--//container-fluid-->
            </div>
            <!--//app-content-->

            <Footer/>
        </div>`,

    async beforeCreate() {
        const authUser = await this.$root.fetchAuthStatus();
        if (!authUser) this.$router.push('/login')
    },

    data() {
        return {
        };
    },
    computed: {

    },
    methods: {

    },
};
