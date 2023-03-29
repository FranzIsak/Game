// Take care of key inputs
export class InputHandler {
    constructor(){
        // Keep track of which keys are being pressed down
        this.keys = [];
        window.addEventListener('keydown', e => {
            // console.log(e.key);
            if ((   e.key === 'ArrowDown' ||  
                    e.key === 'ArrowUp' ||
                    e.key === 'ArrowLeft' ||
                    e.key === 'ArrowRight' ||
                    e.key === 'Enter' ||
                    e.key === 'b' ||
                    e.key === ' ' ||
                    e.key === 'd' 
                ) && this.keys.indexOf(e.key) === -1){
                this.keys.push(e.key);
            }
        });
        window.addEventListener('keyup', e => {
            if (    e.key === 'ArrowDown' || 
                    e.key === 'ArrowUp' ||
                    e.key === 'ArrowLeft' ||
                    e.key === 'ArrowRight' ||
                    e.key === 'Enter' ||
                    e.key === 'b' ||
                    e.key === ' ' ||
                    e.key === 'd' ){
                this.keys.splice(this.keys.indexOf(e.key), 1);
            }
        });
    }
}