app.component('histories', {
    template: `<div class="histories">
                    <h2> Historique </h2>
                    <div class="scroll">
                        <div class="history"
                            v-for="history in histories"
                            @click="goBack(history.operation)">

                            <span v-for="val in history.operation">{{val}}</span>
                            <span> = {{history.result}}</span>

                        </div>
                    </div>
                </div>`,
                
    methods: {

        goBack(ope){ // this method pushing history operation to main

            this.$emit('old-ope', ope)

        },
    },

    props: {  //The following props retrieve the values of histories contained in main
        histories: Object
    }
});