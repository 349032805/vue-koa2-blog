import Vue from 'vue';
//用预定义选项创建可复用的组件构造器
let MessageConstructor = Vue.extend(require('./main.vue'));

//私有变量
let instance;
let instances = [];
let seed = 1;
let zIndex = 2000;
//这里其实只是借用Message构造函数来包装一下而已，它完成了组件的实例化，挂载，插入
const Message = function(options){
    //当前vue实例是否运行于服务器
    if(Vue.prototype.$isServer){
        console.log('$isServer');
        return;
    }

    //如果没传则为空对象
    options = options || {};
    //如果传进来的是字符串
    if(typeof options === 'string'){
        options = {
            message: options
        };
    }
    //userOnClose为关闭时的回调函数， 这里可能是function，也可能是undefined
    let userOnClose = options.onClose;
    options.onClose = function(){
        Message.close(id, userOnClose);
    };
    //给组件一个id
    let id = `message_${ seed++ }`;

    //new一个message实例,到这里需要保证options是一个对象，它会覆盖原来的预定义对象
    instance = new MessageConstructor({
        data: options
    });

    //给组件id
    instance.id = id;
    //实例对象被挂载到文档之外，下面必须手动用dom api把它插入到文档中
    instance.vm = instance.$mount();
    document.body.appendChild(instance.vm.$el);
    //让message组件显示。这一步一定要放在appendChild后面，不然动画不起作用
    instance.visible = true;
    //利用vm.$el拿到组件根节点，对它设置样式
    instance.dom = instance.vm.$el;
    instance.dom.style.zIndex = zIndex++;
    //添加对mes数组里面
    instances.push(instance);

    //手动返回一个实例对象
    return instance.vm;
};
//传入id和回调函数
Message.close = function(id, userOnClose){
    for(let i = 0, len = instances.length; i < len; i++){
        if(id === instances[i].id){
            if(typeof userOnClose === 'function'){
                userOnClose(instances[i]);
            }
            let deleteInstance = instances.splice(i, 1);
            break;
        }
    }
};

export default Message;