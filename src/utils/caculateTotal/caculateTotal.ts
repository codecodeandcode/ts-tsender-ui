export function caculateTotal(Amount: string): number {
    if (!Amount) return 0;

    return Amount
        .split(/[\s,]+/)        // 按逗号或空格分隔
        .map((v) => v.trim())   // 去掉前后空格
        .filter((v) => v.length > 0) // 过滤掉空字符串
        .map(Number)            // 转换为数字
        .filter((n) => !isNaN(n)) // 去掉非法数字
        .reduce((acc, n) => acc + n, 0); // 求和
}

/*map 的参数 (v) => ... 表示“对数组里的每个元素执行某个操作”。

这里的 v 就是 数组里的每一项。

例如："10, 20 30".split(/[\s,]+/) 得到 ["10", "20", "30"]。

遍历时，第一次 v = "10"，第二次 v = "20"，第三次 v = "30"。

也就是说，v 只是个变量名，你完全可以写成 (item) => item.trim()，效果一样。


reduce 是用来把数组“缩减”为一个值的方法。它会遍历数组，把每次的结果累计到 acc（accumulator，累加器）里。

.reduce((acc, n) => acc + n, 0)


acc：上一次累计的结果（初始值是 0）。

n：数组当前元素。

0：初始值。*/
