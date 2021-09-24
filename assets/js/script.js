
class Memory {

    constructor() {
        this.start();
    }

    start()
    {
        this.board = document.querySelector('#memory');
        this.board.addEventListener('click', this.onClick.bind(this));
    }

    onClick(event)
    {
        const target = event.target;

        if (
            !target.classList.contains('card') ||
            target.classList.contains('active')
        ) {
            return;
        }

        console.log('i was clicked' + target.id);
        

    
        this.getCardPairCode(target.id).then(
            function(jsonResponse){
                const response = JSON.parse(jsonResponse);

                debugger;
            }
        );
    }

    getCardPairCode(cardId)
    {
       return this.sendRequest("getCardPairCode", cardId);
    }

    sendRequest(name, data)
    {   
        return new Promise(function (resolve, reject){
            const req = new XMLHttpRequest();
    
            req.open('POST', '/request-handler.php', true);
    
            req.setRequestHeader("Content-Type", "application/json");
    
            req.onreadystatechange = function() {
                if(this.readyState === XMLHttpRequest.DONE) {
                    if(this.status === 200) {
                        resolve(this.response);
                    } else {
                        reject();
                    }
                }
            }
    
            const requestData = JSON.stringify({'name': name, 'data': data});
    
            req.send(requestData);
    
    
        });
    }
}


let memory = new Memory();
