//debounce防抖函数,当持续触发事件时，debounce会合并事件且不会去触发事件，当一定时间内没有触发再这个事件时，才真正去触发事件
const debounce = (fn, delay) => {
    let ctx;    //保存上下文
    let args;   //保存参数
    let timer = null;   //定时器
    const doFn = function(){
        fn.apply(ctx, args);
        timer = null;
    };
    return function(){
        ctx = this;
        args = arguments;
        // 当持续触发事件时，若发现事件触发的定时器已设置时，则清除之前的定时器
        if(timer){
            clearTimeout(timer);
            timer = null;
        }
        // 重新设置事件触发的定时器
        timer = setTimeout(doFn, delay);
    };
};

export default debounce;