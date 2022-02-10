<template>
  <div class="pagination">
      <!-- 上一页：当当前页pageNO是第一页时禁用，点击该按钮触发自定义事件将当前页-1 并将页码通过自定义事件传给父组件，父组件发送请求该页数据 -->
    <button :disabled = 'pageNo == 1' @click="$emit('getPageNo',pageNo-1)">上一页</button>
    <!-- 当中间的连续页的起始页大于 1 时，我们显示这个表示第一页的按钮，点击之后触发自定义事件将1作为当前页码传给父组件发送请求获取该页数据 -->
    <button v-if="cNum.sNum > 1" @click="$emit('getPageNo',1)" :class="{active: pageNo === 1}">1</button>
    <!-- 当该页为第五页时，我们只设置了五个连续页，那么连续页起始页就是3，第一页也会呈现，但是如果单独一个第二页设置为 ... 则不符合实际，所以在此将第二页也呈现出来 -->
    <button v-show="pageNo === 5" @click="$emit('getPageNo',2)" :class="{active: pageNo === 2}">2</button>
    <!-- 当起始页大于3时，中间的 2、3页可以省略为 ...  -->
    <button v-if="cNum.sNum > 3">...</button>

    <!-- 中间的连续页，结束页有多少我们就循环呈现多少个页码，但是对于起始页之前的页码不做呈现，这样保证连续页是我们所要求的数量 -->
    <button v-for="(page,index) in cNum.eNum" :key="index" v-if = "page>=cNum.sNum" @click="$emit('getPageNo',page)" :class="{active: pageNo === page}">{{page}}</button>
    
    <!-- 当连续页的结束页小于总页数-2时，中间连续页与最后一页中间有至少两个页码，则设置为 ... 将其省略 -->
    <button v-if="cNum.eNum < totalPage-2">···</button>
    <!-- 如果当前页是总页数-4，也就意味着，连续页的结束页是总页数-2，不应呈现的只是倒数第二页，但是不符合实际，所以将其呈现出来 -->
    <button v-show="pageNo === totalPage-4" @click="$emit('getPageNo',totalPage-4)" :class="{active: pageNo === totalPage-4}">{{totalPage-1}}</button>
    <!-- 当连续页结束页页码小于总页数时，我们将最后一页呈现出来 -->
    <button v-if="cNum.eNum < totalPage" @click="$emit('getPageNo',totalPage)" :class="{active: pageNo === totalPage}">{{totalPage}}</button>
    <!-- 下一页：当当前页是最后一页时，我们禁用该按钮 -->
    <button :disabled = 'pageNo == totalPage' @click="$emit('getPageNo',pageNo+1)">下一页</button>
    <button style="margin-left: 30px">共 {{total}} 条</button>
  </div>
</template>

<script>
  export default {
    name: "Pagination",
    props:['pageNo','pageSize','total','continues'],
    computed:{
        // 总共多少页
        totalPage(){
            return Math.ceil(this.total/this.pageSize)
        },
        // 连续页码的起始页和结束页
        cNum(){
            // 起始数和结束数
            let sNum = 0
            let eNum = 0
            // 如果总页数小于连续页数
            if(this.continues > this.totalPage){
                sNum = 1
                eNum = this.totalPage
            }else{
                // 总页数大于连续页数
                sNum = this.pageNo - ((this.continues-1)/2)
                eNum = this.pageNo + ((this.continues-1)/2)
                console.log(sNum,eNum)
                // 如果起始页出现0和负数
                if(sNum <= 0){
                    sNum = 1
                    eNum = this.continues
                }
                // 如果结束页大于总页数
                if(eNum > this.totalPage){
                    eNum = this.totalPage
                    sNum = this.totalPage - this.continues+1
                }
            }

            return {sNum,eNum}
           
        }
    }
  }
</script>

<style lang="less" scoped>
  .pagination {
      text-align: center;
    button {
      margin: 0 5px;
      background-color: #f4f4f5;
      color: #606266;
      outline: none;
      border-radius: 2px;
      padding: 0 4px;
      vertical-align: top;
      display: inline-block;
      font-size: 13px;
      min-width: 35.5px;
      height: 28px;
      line-height: 28px;
      cursor: pointer;
      box-sizing: border-box;
      text-align: center;
      border: 0;

      &[disabled] {
        color: #c0c4cc;
        cursor: not-allowed;
      }

      &.active {
        cursor: not-allowed;
        background-color: #409eff;
        color: #fff;
      }
    }
  }
</style>