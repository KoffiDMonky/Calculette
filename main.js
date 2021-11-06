const app = Vue.createApp({

    data() {

        return {

            current: [0], //current item populate to process

            validated: { //validated item to be pushed in histories

                operation: [], //operation array

                result: 0  //result of the operation

            },

            showHistory: false, // Show history allows to determine if the history is visible or not according to its status

            justValidated: false, //  Allows to determine if the operation has just been validated or not

            neon: false, //Activates or deactivates the neon mode according to its status

            histories: [],  // Array in which an object containing the operation and the result is push to store when user validate the operation. Used to display the data in the history and resuming an operation when it's clicked

        }

    },
    methods: {
        
        getKey(key) { //=====process key recived====

            /*==========================/
            *   Switch case in function 
            *   of types of keys
            /*=========================*/

            switch (  key.type  ) {

                //====OPERATORS====//
                case 'operator':

                    // Get last key from current
                    let lastKey = this.current[  this.current.length - 1  ];

                    // if current is 0 do nothing unless operator is '-'
                    if (  this.current == 0  ) {

                        // if key operator is '-' then current become '-'
                        if (  key.display == '-'  ) {

                            // The current is '-'
                            this.current = [key.display];

                            // remove justValidated state
                            this.justValidated = false;

                        }

                    // if key operator is '-' and last key is anything but '-'
                    } else if (  key.display == '-' && lastKey != '-'  ) {

                        // add '-' to current
                        this.current.push(key.display);

                        // remove justValidated state
                        this.justValidated = false;

                    // if last key is an operator
                    } else if (  ['+','-','*','/'].indexOf(lastKey) != -1  ) {
                        
                        // do nothing

                    // if no special case
                    } else {

                        // push it
                        this.current.push(  key.display  );

                        // remove justValidated state
                        this.justValidated = false;

                    }

                    break;

                //====FUNCTIONS====//
                case 'function':
                    switch (  key.display  ) {

                        case '=': // In case key is '=', call the val method 
                            this.val();
                            break;
                        
                        case 'H': // In case key is 'H', showHistory's value is reversed
                            this.showHistory = !this.showHistory;
                            break;
                        
                        case 'DEL': // In case key is 'DEL', call the Del method 
                            this.del();
                            break;

                        case 'C':  // In case key is 'C', call the Clear method     
                            this.clear();
                            break;
                        
                        case 'AC': // In case key is 'AC', call the allclear method 
                            this.allclear();
                            break;
                        
                    } // END of function's switch
                    break;

                //====DEFAULTS====//
                default:

                    // if current is '0'
                    if (  this.current[0] == '0'  ) {

                        // if key pushed is '.'
                        if (  key.display == '.'  ) {

                            // push key into current to make "0."
                            this.current.push(  key.display  );
                            
                        } else {

                            // current become key
                            this.current = [key.display];
                        }

                    // if justValidated
                    } else if (  this.justValidated  ) {

                        // current become key
                        this.current = [key.display];

                    // any other case 
                    } else {

                        // push key into current
                        this.current.push(  key.display  );

                    }
                    
                    // remove justValidated state
                    this.justValidated = false;
                    break;

            } // END OF SWITCH
        },

        val() { //=====validate the operation====

            // if last validated entry isnt the same
            if (  !this.justValidated   &&   this.validated.operation.join('') != this.current.join('')  ) {
                
                // push the operation in validated
                this.validated.operation = this.current;
                
                // push the calc in result
                this.validated.result = this.calc;

                // current value become operation result
                this.current = [this.calc];
                
                // push validated object in histories
                this.histories.push(  Object.assign(  {}, this.validated  )  );

                // set justValidated to true
                this.justValidated = true;
            }
        },
        
        del() { //=====delete last character=====

            // if last entry isnt 1 digit
            if (  String(  this.current[ this.current.length - 1 ]  ).length != 1  ) {

                // set "lastEntry" as last entry and remove it from current
                lastEntry = this.current.pop();

                // push into current all last digit seperated
                this.current.push(... String(  lastEntry  ).split("")  );
                
                // remove the last one
                this.current.pop();

            // if current is '0'
            } else if (  this.current[0] == '0'  ) {
                
                // do nothing

            }else{

                // remove the last one
                this.current.pop();

            }

            // remove justValidated state
            this.justValidated = false;
        },

        clear() { //=====clear current datas=====

            this.current = [0];

        },

        allclear() { //=====clear all datas=====

            this.current = [0];  // Reset current
            this.histories = []; // Reset histories
            this.validated = {   // Reset the object validated
                operation: [],
                result: 0        // Reset result
            };
        },
        pushOldOpe(ope) { //===== Push old operation of history ====
            
            this.current = [...ope]; // remplace current value with an history operation value

        },

        style() { //===== Active/Desactive Neon mode ====

            if (  this.neon  ) {

                document.body.classList.add('neon'); // If the boolean data is true, style() add the css class neon

            } else {

                document.body.classList.remove('neon'); // Else style() remove the css class neon

            }
        },
    },

    computed: {

        calc() { //=====calculate current data=====
            
            // if last entry isnt a number
            if (  !Number.isInteger(  this.current[  this.current.length - 1  ]  )  ) {
                
                // if 2 last entries are not a number
                // (in case of '*-')
                if (  !Number.isInteger(  this.current[  this.current.length - 2  ]  )  ) {

                    // calculate without 2 last entries
                    return eval(  this.current.slice(0, -2).join('')  );
    
                // else calculate without last entry
                } else {
                
                    // calculate without last entry
                    return eval(  this.current.slice(0, -1).join('')  );
    
                }
            } else {

                // calculate
                return eval(  this.current.join('')  );

            }
        },

    }
})