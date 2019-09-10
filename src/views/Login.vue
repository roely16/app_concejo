<template>
    <!-- <FormLogin /> -->
    <div>
        <b-container  fluid>
            <b-row class="justify-content-md-center" align-v="center">
                <FormLogin style="margin-top:200px" />
            </b-row>
        </b-container>
	</div>
</template>

<style scoped>
    .align-items-center {
		display: flex; 
		align-items: center;  
		justify-content: center; 	
	}
</style>

<script>

    import FormLogin from '../components/Login/FormLogin'

    export default {

        components: {
            FormLogin
        }

    }
</script>