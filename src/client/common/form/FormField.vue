<template>
    <div class="field">
        <div :class="['ui', align, { icon:!!icon }, 'input']">
            <i v-if="icon" :class="[ 'icon', icon ]"></i>
            <input type = "text"
                   name = "email"
                   v-bind="{
                        value: value,
                        placeholder: placeholder
                   }"
                   @input.stop = "updateValue($event.target.value)"
            >
        </div>
    </div>
</template>
<style>
</style>
<script>
    const Events = {
        VALUE_CHANGED: "changed"
    };
    export default {
        name: "form-field",
        props: {
            value: String,
            align: {
                type: String,
                default: 'left'
            },
            icon : String,
            placeholder : String
        },
        methods: {
            updateValue(value) {
                this.$emit(Events.VALUE_CHANGED, value);
            }
        }
    }
</script>