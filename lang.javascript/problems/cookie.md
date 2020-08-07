## Cookie 缓存问题

### 1. 无法删除 cookie 的问题

> https://www.jb51.net/article/44560.htm
>
> https://www.cnblogs.com/cyeldxlz/p/8108076.html

1. Cookie 存在路径 path 和域 domain 的概念，清除时需要确定目标 cookie 的 path 和 domain 。

2. 确保没有跨域，否则只能读取，不可以复写。