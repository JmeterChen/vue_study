const app = new Vue({
  el: '#app',
  data:{
    books:[
      {
        id: 1,
        name: 'kobe自传',
        price: 58.99,
        nums: 8
      },
      {
        id: 2,
        name: 'james自传',
        price: 68.50,
        nums: 2
      },
      {
        id: 3,
        name: 'Python自传',
        price: 78.99,
        nums: 3
      },
      {
        id: 4,
        name: 'Java自传',
        price: 108.50,
        nums: 5
      }
    ]
  },
  methods:{
    deNums(index){
      console.log("index:", index)
      this.books[index].nums --
    },
    inNums(index){
      console.log("index:", index)
      this.books[index].nums ++
    },
    remove(index){
      this.books.splice(index, 1)
    }
  },
  filters:{
    getFinallPrice(price){
      return "￥" + price.toFixed(2)
    }
  },
  computed:{
    // 写法 1：最基本的 for 循环 计算购物车所有书的总价
    allPrice(){
      let total = 0
      for(i=0; i<this.books.length; i++){
        total += this.books[i].nums * this.books[i].price
      }
      return total
    }
  }
})