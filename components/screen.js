app.component('screen', {
    template: `<div class="screen">               
                    <div class="current">

                        <span v-for="val in current">{{val}}</span>

                    </div>
                    
                    <div class="result">

                        <span v-if="result">{{result}}</span>

                    </div>
                </div>`,

    props: { //The following props retrieve the values of current, result, validated, histories and hide contained in main
        current: Array,
        result: Number,
        validated: Array,
        histories: Array,
    }
});