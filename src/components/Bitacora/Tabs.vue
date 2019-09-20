<template>
    <b-tabs content-class="mt-3">
        <b-tab title="Agenda" active>
            <TabAgenda />
        </b-tab>
        <!-- <b-tab title="Second"><p>I'm the second tab</p></b-tab>
        <b-tab title="Disabled" disabled><p>I'm a disabled tab!</p></b-tab> -->
    </b-tabs>
</template>

<script>

    import TabAgenda from './TabAgenda'

    export default {
        
        components: {
            TabAgenda
        }

    }
</script>