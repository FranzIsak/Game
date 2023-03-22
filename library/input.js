// Take care of key inputs
export class InputHandler {
    constructor(){
        // Keep track of which keys are being pressed down
        this.keys = [];
        window.addEventListener('keydown', e => {
            if ((   e.key === 'ArrowDown' ||  
                    e.key === 'ArrowUp' ||
                    e.key === 'ArrowLeft' ||
                    e.key === 'ArrowRight' ||
                    e.key === 'Enter'
                ) && this.keys.indexOf(e.key) === -1){
                this.keys.push(e.key);
            }
            // console.log(e.key, this.keys);

        });
        window.addEventListener('keyup', e => {
            if (    e.key === 'ArrowDown' || 
                    e.key === 'ArrowUp' ||
                    e.key === 'ArrowLeft' ||
                    e.key === 'ArrowRight' ||
                    e.key === 'Enter'){
                this.keys.splice(this.keys.indexOf(e.key), 1);
            }

            // console.log(e.key, this.keys);

        });
    }
}