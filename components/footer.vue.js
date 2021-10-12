const Footer = {
    template: `
    <footer v-bind:class="[getCurrentUrl == '/login' ? 'app-auth-footer' : 'footer']">
        <div class="container text-center py-3">
            <small class="copyright">Designed by Grulog <i>Maxmind © 2021.</i></small>

        </div>
    </footer>
    `,
    computed: {
        authstatus() {
            //  used to show/hide `content` link
            return this.$root.authstatus;
        },
        getCurrentUrl() {
            return window.location.pathname;
        }
    },
};