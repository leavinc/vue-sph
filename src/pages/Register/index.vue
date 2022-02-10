<template>
  <div class="register-container">
    <!-- 注册内容 -->
    <div class="register">
      <h3>注册新用户
        <span class="go">我有账号，去 <a href="login.html" target="_blank">登陆</a>
        </span>
      </h3>
      <div class="content">
        <label>手机号:</label>
        <input type="text" placeholder="请输入你的手机号" v-model="phone" name="phone" v-validate='{required:true,regex:/^1\d{10}$/}' :class="{invalid:errors.has('phone')}">
        <span class="error-msg">{{errors.first('phone')}}</span>
      </div>
      <div class="content">
        <label>验证码:</label>
        <input type="text" placeholder="请输入验证码" v-model="code" name="code" v-validate='{required:true,regex:/^\d{6}$/}' :class="{invalid:errors.has('code')}">
        <button style="width:100px;height:38px" @click="getCode">获取验证码</button>
        <span class="error-msg">{{errors.first('code')}}</span>
      </div>
      <div class="content">
        <label>登录密码:</label>
        <input type="password" placeholder="请输入你的登录密码" name="password" v-model="password" v-validate='{required:true,regex:/^[0-9A-Za-z]{8,20}$/}' :class="{invalid:errors.has('password')}">
        <span class="error-msg">{{errors.first('password')}}</span>
      </div>
      <div class="content">
        <label>确认密码:</label>
        <input type="password" placeholder="请输入确认密码" name="password1" v-model="password1" v-validate='{required:true,is:password}' :class="{invalid:errors.has('code')}">
        <span class="error-msg">{{errors.first('password1')}}</span>
      </div>
      <div class="controls">
        <input v-model="agree" type="checkbox" :checked = 'agree' name='agree' v-validate='{required:true,agree:true}' :class="{invalid:errors.has('agree')}">
        <span>同意协议并注册《尚品汇用户协议》</span>
        <span class="error-msg">{{errors.first('agree')}}</span>
      </div>
      <div class="btn">
        <button @click="userRegister">完成注册</button>
      </div>
    </div>
  </div>
</template>

<script>

  export default {
    name: 'Register',
    data() {
      return {
        // 手机号
        phone:'',
        // 验证码
        code:'',
        // 密码
        password:'',
        // 验证密码
        password1:'',
        // 协议
        agree:true
      }
    },
    methods: {
      // 获取验证码
      async getCode(){
        try {
          this.phone && (await this.$store.dispatch('user/getCode',this.phone))
          this.code = this.$store.state.user.code
        } catch (error) {
          alert(error.message)
        }
      },
      // 用户注册
      async userRegister(){
        // 判断表单中所有验证是否满足，有一个不满足返回false，全都满足返回true
        const success = await this.$validator.validateAll()
        if(success){
          try {
            // 解构赋值
            const {phone,code,password,password1} = this
            // 判断条件，满足就向服务器发送请求注册
            phone && code && password === password1 && (await this.$store.dispatch('user/userRegister',{phone,code,password}))
            // 成功注册后跳转路由至登陆页面
            this.$router.push('/login')
          } catch (error) {
            alert(error.message)
          }
        }else{
          alert('请完善信息')
        }
      }

    },
    mounted() {
     
    },
  }
</script>

<style lang="less" scoped>
  .register-container {
    .register {
      width: 1200px;
      height: 445px;
      border: 1px solid rgb(223, 223, 223);
      margin: 0 auto;

      h3 {
        background: #ececec;
        margin: 0;
        padding: 6px 15px;
        color: #333;
        border-bottom: 1px solid #dfdfdf;
        font-size: 20.04px;
        line-height: 30.06px;

        span {
          font-size: 14px;
          float: right;

          a {
            color: #e1251b;
          }
        }
      }

      div:nth-of-type(1) {
        margin-top: 40px;
      }

      .content {
        padding-left: 390px;
        margin-bottom: 18px;
        position: relative;

        label {
          font-size: 14px;
          width: 96px;
          text-align: right;
          display: inline-block;
        }

        input {
          width: 270px;
          height: 38px;
          padding-left: 8px;
          box-sizing: border-box;
          margin-left: 5px;
          outline: none;
          border: 1px solid #999;
        }

        img {
          vertical-align: sub;
        }

        .error-msg {
          position: absolute;
          top: 100%;
          left: 495px;
          color: red;
        }
      }

      .controls {
        text-align: center;
        position: relative;

        input {
          vertical-align: middle;
        }

        .error-msg {
          position: absolute;
          top: 100%;
          left: 495px;
          color: red;
        }
      }

      .btn {
        text-align: center;
        line-height: 36px;
        margin: 17px 0 0 55px;

        button {
          outline: none;
          width: 270px;
          height: 36px;
          background: #e1251b;
          color: #fff !important;
          display: inline-block;
          font-size: 16px;
        }
      }
    }

    .copyright {
      width: 1200px;
      margin: 0 auto;
      text-align: center;
      line-height: 24px;

      ul {
        li {
          display: inline-block;
          border-right: 1px solid #e4e4e4;
          padding: 0 20px;
          margin: 15px 0;
        }
      }
    }
  }
</style>