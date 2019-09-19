<template>
    <b-row>
        <b-col sm="12" md="6" lg="3">
            <div>
                <b-card
                    img-src=""
                    img-alt="Image"
                    img-top
                    tag="article"
                    class="mb-2 text-center"
                    title="Personas"
                >

                    <div>
                        <b-link :to="{ name: 'personas' }">
                            <b-img  width="250" src="https://image.flaticon.com/icons/svg/476/476863.svg" fluid></b-img>
                        </b-link>
                        
                    </div>
                </b-card>
            </div>
        </b-col>
        
    </b-row>
</template>

<script>
    export default {
                
    }
</script>