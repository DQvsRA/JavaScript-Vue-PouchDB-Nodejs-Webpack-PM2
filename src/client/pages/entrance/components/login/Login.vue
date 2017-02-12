<template>
    <div class="ui login middle aligned center aligned grid">
        <div class="column">
            <HT2 v-bind="{ color:'teal', imageSrc:'assets/images/logo.png',
                content:'Log-in to your account' }"/>
            <form class="ui large form">
                <div class="ui stacked segment">
                    <FormField v-bind="{ icon:'user', value:email,
                        placeholder:'E-mail address'
                    }" @changed="updateEmail"
                    />
                    <FormField v-bind = "{ icon:'lock', value:password,
                        placeholder:'Password'
                    }" @changed="updatePassword"
                    />
                    <div class="ui fluid large teal submit button"
                        @click.stop="loginClicked">Login</div>
                </div>
                <div class="ui error message"></div>
            </form>
            <div class="ui message">
                New to us? <a href="#">Sign Up</a>
            </div>
        </div>
    </div>
</template>
<style scoped>
    .grid {
        height: 100%;
    }
    .login {
        position: inherit;
    }
    .column {
        max-width: 450px;
    }
</style>

<script>
    const Events = {
        LOGIN_CLICKED       : "loginClicked"
    ,   EMAIL_CHANGED       : "emailChanged"
    ,   PASSWORD_CHANGED    : "passwordChanged"
    };
    export default {
        name: "Login",
        props: [
            'email',
            'password'
        ],
        methods: {
            loginClicked(){
                this.$emit(Events.LOGIN_CLICKED);
            },
            updateEmail(value){
                this.$emit(Events.EMAIL_CHANGED, value);
            },
            updatePassword(value){
                this.$emit(Events.PASSWORD_CHANGED, value);
            }
        },
        components: {
            FormField : require('../../../../common/form/FormField.vue'),
            HT2 : require('../../../../common/header/HT2.vue')
        }
    };
</script>