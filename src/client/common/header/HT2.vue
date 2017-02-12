<template>
    <h2 :class="[ 'ui', !!color ? color : '', { image:!!imageSrc }, 'header']">
        <img v-if="imageSrc" :src="imageSrc" class="image">
        <div class="content">
            {{ content}}
        </div>
    </h2>
</template>
<style>
    .image {
        margin-top: -100px;
    }
</style>
<script>
    export default {
        name: "HT2",
        props: {
            content: {
                type: String,
                required: true
            },
            imageSrc: String,
            color : String
        }
    }
</script>