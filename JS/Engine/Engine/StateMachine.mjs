//We just came like on Ladder - until we came to action
//Minus of this is that we call multiple dispatch
//But in real case we already have player input from outer functions - so this case can be simplify,
//for example - we call Click and take Input from variable - so we just process one function in click and after change state
//Its just prototype for me - will use something like this in future
export class LadderStateMachine{ //LeverageStateMachine
        constructor(){
            this.State = "Idle"; //CurrentState
            this.Translations = { //AviableTransaltions for each State - with innenr Tralnslation functions
                "Idle" : { //State
                    //So when we in Idle State we want just to check and came to other State
                    Click: function(Self){
                        Self.SetState("Click");
                    },
                    Move:function(Self){
                        Self.SetState("Move");
                    }
                },
                "Click" :{
                    //But when we came to other State we want to do action
                    "Left": function(Self){
                        console.log("LeftClick");
                        Self.SetState("Idle");
                    },
                    "Right": function(Self){
                        console.log("RightClick");
                        Self.SetState("Idle");
                    }
                },
                "Move" :{
                    "Left": function(Self){
                        console.log("LeftMove");
                        Self.SetState("Idle");
                    },
                    "Right": function(Self){
                        console.log("RightMove");
                        Self.SetState("Idle");
                    }
                }
            }
        }
        DispatchState(Action,...Args){
            let AviableTransaltions = this.Translations[this.State];
            let AviableActions = AviableTransaltions[Action];
            if (AviableActions){
                this.Translations[this.State][Action](this);
            }
        }
        SetState(NewState){
            this.State = NewState;
        }
    }
    //let PlayerStateMachine = new StateMachine();
    //PlayerStateMachine.DispatchState("Click");
    //PlayerStateMachine.DispatchState("Left");