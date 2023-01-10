const {
    createApp
} = Vue
// Array di oggetti
createApp({
    data(){
        return{
            activeItem: 0,
            newMessage: '',
            newTask: '',
            search: '', 
        user: {
            name: 'Carlo Carli',
            avatar: '_io',
            visible: true,
        },
        // dati contatti 
        contacts: [
            {
                name: 'Michele',
                avatar: '_1',
                visible: true,
                search: true,
                messages: [
                    {   
                        date: '10/01/2020 15:30:55',   
                        text: 'Hai portato a spasso il cane?',   
                        status: 'sent' ,
                    },   
                    {   
                        date: '10/01/2020 15:50:00',   
                        text: 'Ricordati di dargli da mangiare',   
                        status: 'sent',
                    },   
                    {   
                        date: '10/01/2020 16:15:22',   
                        text: 'Tutto fatto!',   
                        status: 'received',
                    }  
                ]
            },
            {   
                name: 'Fabio',   
                avatar: '_2',   
                visible: false,   
                search: true,
                messages: [   
                    {   
                        date: '20/03/2020 16:30:00',   
                        text: 'Ciao come stai?',   
                        status: 'sent',
                    },   
                    {   
                        date: '20/03/2020 16:30:55',   
                        text: 'Bene grazie! Stasera ci vediamo?',   
                        status: 'received',
                    },   
                    {   
                        date: '20/03/2020 16:35:00',   
                        text: 'Mi piacerebbe ma devo andare a fare la spesa.',   
                        status: 'sent',
                    }   
                ],   
            },  
            {   
                name: 'Samuele',   
                avatar: '_3',   
                visible: false,   
                search: true,
                messages: [   
                    {   
                        date: '28/03/2020 10:10:40',   
                        text: 'La Marianna va in campagna',   
                        status: 'received',
                    },   
                    {   
                        date: '28/03/2020 10:20:10',   
                        text: 'Sicuro di non aver sbagliato chat?',   
                        status: 'sent',
                    },   
                    {   
                        date: '28/03/2020 16:15:22',   
                        text: 'Ah scusa!',   
                        status: 'received',
                    }   
                ],   
            },   
            {   
                name: 'Luisa',   
                avatar: '_4',   
                visible: false,   
                search: true,
                messages: [   
                    {   
                        date: '10/01/2020 15:30:55',   
                        text: 'Lo sai che ha aperto una nuova pizzeria?',   
                        status: 'sent',
                    },   
                    {   
                        date: '10/01/2020 15:50:00',   
                        text: 'Si, ma preferirei andare al cinema',   
                        status: 'received',
                    } 
                ],   
            }, 
        ],
    }
},
//Ricerca nella chat
computed: {
    contactFind() {
        let filterlist;
        if (this.search != '') {
            filterlist = this.contacts.filter((element) => {
                return element.name.toLowerCase().includes(this.search.toLowerCase())
            })
        }
        else {
            filterlist = this.contacts
        }
        return filterlist      
    }
},
methods:{
    imgProfile(index){
        return "./img/avatar" + this.contacts[index].avatar + ".jpg";
    },
    selectedChat(index){
        this.activeItem = index
    },
    chatSendRec(number, active) {
        const chatSendRec = this.contacts[active].messages[number].text
        return chatSendRec
     },
    getTime(d){
        let date = luxon.DateTime.fromFormatExplain(d, "dd/MM/yyyy hh:mm:ss")
        return date.result.hour + ":" + date.rawMatches[9]
      },
      currentTime(){
        return luxon.DateTime.now().toFormat("dd/MM/yyyy hh:mm:ss");;
      },
    
      //Nuovi messaggi e risposta automatica
enterMessage(){
  if(this.newTask.split(" ").join("") != ''){
    this.contacts[this.activeItem].messages.push(
      {
        date: this.currentTime(),
        message: this.newTask,
        status: 'sent',
      }
    )
    this.newTask = '';
    
    
    setTimeout(() => {
      const realTime = this.currentTime();
      this.contacts[this.activeItem].messages.push(
        {
          date: realTime,
          message: 'Lo so',
          status: 'received'
        }
      )
      this.contacts[this.activeItem].lastAccess = this.getTime(realTime);
    }, 2000);
    }
},
        // Rimuove elementi dalla lista
        removeTask(index){
            this.contacts[index].messages.splice(index, 1);
        },

        
}
}).mount('#app');