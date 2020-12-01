<template>
    <header>
        <Navigation></Navigation>

    </header>
</template>

<script>
import Navigation from './Nav.vue';
export default {
    components:{Navigation},
    props: ['user'],
}
</script>
