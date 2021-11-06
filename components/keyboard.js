app.component('keyboard', {
    emits: ['push'],
    template: `<div class="keyboard">
                    <div class="keys">
                        <div class="key"
                            v-for="key in keyboard.keys"
                            @click="pushKey(key)">

                            {{key.display}}
                            
                        </div>
                    </div>

                    <div class="operators">
                        <div class="operator"
                            v-for="operator in keyboard.operators"
                            @click="pushKey(operator)">
    
                            {{operator.display}}
    
                        </div>
                    </div>
                </div>`,

    data() {
        return {

            keyboard: { // ==== Different keyboard operators ==== //

                operators: [{

                    display: '/',
                    type:'operator'

                }, {

                    display: '*',
                    type:'operator'

                }, {

                    display: '-',
                    type:'operator'

                }, {

                    display: '+',
                    type:'operator'

                }],

                keys: [{

                    display: 'H',
                    type:'function'

                }, {

                    display: 'AC',
                    type:'function'

                }, {

                    display: 'DEL',
                    type:'function'

                }, {

                    display: 7,
                    type:'number'

                }, {

                    display: 8,
                    type:'number'

                }, {

                    display: 9,
                    type:'number'

                }, {

                    display: 4,
                    type:'number'

                }, {

                    display: 5,
                    type:'number'

                }, {

                    display: 6,
                    type:'number'

                }, {

                    display: 1,
                    type:'number'

                }, {

                    display: 2,
                    type:'number'

                }, {

                    display: 3,
                    type:'number'

                }, {

                    display: '.',
                    type:'coma'

                }, {

                    display: 0,
                    type:'number'

                }, {

                    display: '=',
                    type:'function'

                }]
            }
        }
    },

    methods: {

        pushKey(key) { // This method pushing key to main

            this.$emit('push', key)
            
        }
    }
});