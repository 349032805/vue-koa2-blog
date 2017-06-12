import Vue from 'vue';
let Constructor = Vue.extend(require('./main.vue'));
let instance = null;
//该构造函数手动返回一个Promise对象
const Box = function(content, title, options){
    if(instance){         //如果再次点击，要直接返回，保证要单例
        return Promise.reject();
        //只能返回一个rejected状态的promise对象，如果该组件后面跟一个遮罩层，就不怕用户再次点击了，也点击不了的
    }
    if(Vue.prototype.$isServer){
        console.log('$isServer');
        return;
    }
    //如果没传则为空对象
    options = options || {};
    options.content = content || '没有指定内容!';
    options.title =  title || '提示';

    let component = new Constructor({
        data: options
    });
    component.$mount();
    document.body.appendChild(component.$el);
    component.visible = true;
    component.$el.style.zIndex = '2000';
    component.$el.style.transform = 'translate(-50%, -50%)';
    instance = component;
    return new Promise((resolve, reject) => {
        component
           .comfirm()
           .then(() => {
               instance = null;//点击了‘确定’
               resolve();
           })
           .catch(() => {
               instance = null;//点击了 '取消'或'x'
               reject();
           })
    });
};

export default Box;