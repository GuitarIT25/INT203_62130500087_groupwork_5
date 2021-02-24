const app = Vue.createApp({
    data() {
        return {
            like: 'images/heart.png',
            search: 'images/search.png',
            close: 'images/close.png',
            boxstate: false,
            viewstate: false,
            viewpath: '',
            input: '',
            photos: [{
                    src: './images/dodge.jpg',
                    title: 'dodge charger',
                    state: false
                },
                {
                    src: './images/ferrary.jpg',
                    title: 'ferrary',
                    state: false
                },
                {
                    src: './images/ford.jpg',
                    title: 'ford',
                    state: false
                },
                {
                    src: './images/tesla.jpg',
                    title: 'tesla',
                    state: false
                }
            ]
        }

    },
    methods: {
        showstate(index) {
            this.photos[index].state = !this.photos[index].state;
        },
        showinputbox() {
            this.boxstate = !this.boxstate;
            this.input = '';
        },
        openview(index) {
            this.viewpath = this.photos[index].src;
            this.viewstate = !this.viewstate;
        },
        closeview() {
            this.viewpath = undefined;
            this.viewstate = !this.viewstate;
        },
        assigninput(input){
            this.input = input;
        }


    },
    computed: {
        countmyfar() {
            return this.photos.filter(s => s.state).length;
        },
        sumphoto() {
            return this.photos.length;
        },
        searching() {
            return this.photos.filter(s => {
                return s.title.toLowerCase().includes(this.input.toLowerCase())
            });

        }
    }
})

app.component('view-com', {
    props: ['viewstate','closeicon','viewsrc'],
    template: 
    `<div v-show='viewstate' class="flex justify-center bg-black mr-2 text-white">
          <img class="m-3" v-bind:src="viewsrc" width="200" height="2000">
          <button @click="close" class="mb-72">
            <img v-bind:src="closeicon" alt="close" class="w-5">
          </button>
    </div>`,
    methods:{
        close(){
            this.$emit('close-view');
        }
    }
})

app.component('search-item', {
    props: ['boxstate','searchicon'],
    template: 
    `
    <div class="flex items-center justify-end mr-4">
                <span v-show="boxstate">
                    <input @input="assigninput" v-model="input" 
                        placeholder="Please enter a search" class="p-2 mr-2 bg-white rounded border-2 border-blue-300">
                </span>
                <div v-show="boxstate">
                    <button v-on:click="showinputbox" class="bg-green-500 text-white py-1 px-2 rounded">
                        Cancel
                    </button>
                </div>

                <button v-show="!boxstate" @click="showinputbox">
                    <img class="h-6 m-3" v-bind:src="searchicon">
                </button>
    </div>
    `,
    data(){
        return{
            input:''
        }
    },
    methods:{
        assigninput(){
            this.$emit('assign-input',this.input);
        },
        showinputbox(){
            this.$emit('showinput-box');
            this.input = '';
        }
    }
})

app.component('photos-list',{
    props:['likeicon','searching'],
    template:
    `
    <div class="m-5">
        <ul class="grid grid-cols-2 gap-y-10 ml-10 lg:grid-cols-5">
            <li v-if='searching.length !==0' v-for="(photos,index) in searching">
                <p class="text-lg font-semibold">
                    {{photos.title}}
                </p>
                <div>
                    <button @click="showstate(index)" @dblclick="openview(index)">
                        <img class="mt-3" v-bind:src="photos.src" width="100" height="1000">
                    </button>
                </div>
                <span v-show="photos.state">
                    <img v-bind:src="likeicon" height="24" viewBox="0 0 24 24" width="24">
                </span>
                </li>
                <li v-else>
                <p>No Photo</p>
            </li>
        </ul>
    </div>
    `,
    methods:{
        showstate(index){
            this.$emit(`show-state`,index);
        },
        openview(index){
            this.$emit(`open-view`,index);
        }
    }
})


app.mount('#app');