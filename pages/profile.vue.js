const Profile = {
    template: `
        <template>
            <div class="app-wrapper pl-0">
                <Header/>
                <div class="app-content mt-5 pt-3 p-md-3 p-lg-4">
                    <div class="container-xl">
                        <h1 class="app-page-title">Profile</h1>
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
    
        data() {
            return {
            };
        },
        computed: {
            
        },
        methods: {
    
        },
};
